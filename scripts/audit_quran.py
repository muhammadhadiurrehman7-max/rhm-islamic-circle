#!/usr/bin/env python3
"""Compare live AlQuran Cloud Uthmani text with Tanzil's independent Uthmani text.

Discrepancy detector only. It never edits sacred text and does not use fuzzy matching.
"""
from __future__ import annotations
import json
import sys
import unicodedata
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

TANZIL_URL = ("https://tanzil.net/pub/download/index.php?"
    "quranType=uthmani&outType=txt-2&agree=true&marks=true&sajdah=true&rub=true&stanween=true")
API_URL = "https://api.alquran.cloud/v1/quran/quran-uthmani"
EXPECTED_SURAHS, EXPECTED_AYAHS = 114, 6236


def download(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "RHM-Islam-360-Quran-Audit/1.0"})
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read().decode("utf-8-sig")


def parse_tanzil(payload: str) -> dict[tuple[int, int], str]:
    records = {}
    for line_no, raw in enumerate(payload.splitlines(), 1):
        line = raw.strip("\ufeff").strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("|", 2)
        if len(parts) != 3:
            continue
        try:
            key = (int(parts[0]), int(parts[1]))
        except ValueError:
            continue
        if key in records:
            raise ValueError(f"Duplicate Tanzil key {key} at line {line_no}")
        records[key] = parts[2]
    if not records:
        raise ValueError("Tanzil response could not be parsed; inspect upstream format.")
    return records


def parse_api(payload: str) -> dict[tuple[int, int], str]:
    data = json.loads(payload)
    if data.get("code") != 200:
        raise ValueError(f"AlQuran Cloud returned code {data.get('code')}")
    records = {}
    for surah in data.get("data", {}).get("surahs", []):
        sn = int(surah["number"])
        for ayah in surah.get("ayahs", []):
            key = (sn, int(ayah["numberInSurah"]))
            if key in records:
                raise ValueError(f"Duplicate API key {key}")
            records[key] = ayah["text"].lstrip("\ufeff")
    if not records:
        raise ValueError("AlQuran Cloud response could not be parsed.")
    return records


def describe(a: str, b: str) -> str:
    def cps(value: str) -> str:
        return " ".join(f"U+{ord(ch):04X}" for ch in value[:100])
    return f"Tanzil: {a[:180]!r}\nAPI: {b[:180]!r}\nTanzil codepoints: {cps(a)}\nAPI codepoints: {cps(b)}"


def main() -> int:
    print("Downloading Tanzil Uthmani reference…")
    reference = parse_tanzil(download(TANZIL_URL))
    print("Downloading AlQuran Cloud Uthmani edition…")
    candidate = parse_api(download(API_URL))
    ref_keys, api_keys = set(reference), set(candidate)
    missing, extra = sorted(ref_keys - api_keys), sorted(api_keys - ref_keys)
    exact, nfc_only, different = [], [], []
    for key in sorted(ref_keys & api_keys):
        a, b = reference[key], candidate[key]
        if a == b:
            exact.append(key)
        elif unicodedata.normalize("NFC", a) == unicodedata.normalize("NFC", b):
            nfc_only.append((key, a, b))
        else:
            different.append((key, a, b))

    output = Path("audit-results")
    output.mkdir(exist_ok=True)
    lines = [
        "# Quran text comparison report", "",
        f"- Run time UTC: {datetime.now(timezone.utc).isoformat()}",
        "- Independent reference: Tanzil Project Uthmani download.",
        "- App source: AlQuran Cloud quran-uthmani full edition.",
        "- Method: verse key and raw Unicode comparison; NFC-only differences are reported separately.",
        "- No diacritics are stripped. No text is changed or automatically approved.", "",
        "## Summary",
        f"- Reference verses: {len(reference)}",
        f"- App verses: {len(candidate)}",
        f"- Exact matches: {len(exact)}",
        f"- NFC-equivalent but raw-different: {len(nfc_only)}",
        f"- Differences after NFC: {len(different)}",
        f"- Missing keys: {missing}",
        f"- Unexpected keys: {extra}", "",
        "## NFC-equivalent differences"
    ]
    for key, a, b in nfc_only:
        lines += [f"### {key[0]}:{key[1]}", describe(a, b), ""]
    lines += ["## Differences after NFC"]
    for key, a, b in different:
        lines += [f"### {key[0]}:{key[1]}", describe(a, b), ""]
    (output / "quran-comparison.md").write_text("\n".join(lines), encoding="utf-8")
    summary = {
        "reference_verses": len(reference), "app_verses": len(candidate),
        "exact_matches": len(exact), "nfc_equivalent_raw_differences": len(nfc_only),
        "unicode_differences_after_nfc": len(different),
        "missing_keys": missing, "unexpected_keys": extra
    }
    (output / "quran-comparison.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    if len(reference) != EXPECTED_AYAHS or len(candidate) != EXPECTED_AYAHS:
        print(f"ERROR: expected {EXPECTED_AYAHS} verses in both sources.", file=sys.stderr)
        return 2
    if len({key[0] for key in reference}) != EXPECTED_SURAHS:
        print(f"ERROR: expected {EXPECTED_SURAHS} Surahs.", file=sys.stderr)
        return 2
    return 1 if missing or extra or different else 0


if __name__ == "__main__":
    raise SystemExit(main())
