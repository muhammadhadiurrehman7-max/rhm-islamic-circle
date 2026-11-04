"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type Language = "en" | "ur";
type Coordinates = { latitude: number; longitude: number };
const KAABA = { latitude: 21.422487, longitude: 39.826206 };

function bearingToKaaba({ latitude, longitude }: Coordinates) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const toDeg = (value: number) => (value * 180) / Math.PI;
  const lat1 = toRad(latitude);
  const lat2 = toRad(KAABA.latitude);
  const deltaLon = toRad(KAABA.longitude - longitude);
  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

const content = {
  en: {
    eyebrow: "Everyday Muslim life",
    title: "A practical guide to living Islam",
    intro: "Learn the everyday acts of worship, cleanliness and good character with clear steps, source references and helpful tools. Start with what you need today.",
    qibla: "Find the Qibla",
    getLocation: "Use my location",
    locationHelp: "Allow location access to calculate the direction from where you are. Your coordinates stay in this browser session and are not sent to RHM.",
    wudu: "Wudu (ablution)",
    ghusl: "Ghusl (full ritual bath)",
    cleanliness: "Personal cleanliness",
    salah: "Prepare for Salah",
    daily: "Daily Muslim manners",
    note: "Important note",
  },
  ur: {
    eyebrow: "روزمرہ مسلمان زندگی",
    title: "اسلام کے مطابق زندگی گزارنے کی عملی رہنمائی",
    intro: "عبادات، طہارت، صفائی اور اچھے اخلاق کو آسان مراحل اور مستند حوالوں کے ساتھ سیکھیں۔ آج اپنی ضرورت کے موضوع سے آغاز کریں۔",
    qibla: "قبلہ معلوم کریں",
    getLocation: "میرا مقام استعمال کریں",
    locationHelp: "اپنے مقام سے قبلے کا رخ معلوم کرنے کے لیے لوکیشن کی اجازت دیں۔ آپ کے نقاط اسی براؤزر سیشن میں رہتے ہیں اور RHM کو نہیں بھیجے جاتے۔",
    wudu: "وضو",
    ghusl: "غسل",
    cleanliness: "ذاتی صفائی",
    salah: "نماز کی تیاری",
    daily: "روزمرہ اسلامی آداب",
    note: "اہم وضاحت",
  },
};

export default function DailyLifePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [sensorEnabled, setSensorEnabled] = useState(false);
  const t = content[language];
  const qiblaBearing = useMemo(() => coordinates ? bearingToKaaba(coordinates) : null, [coordinates]);
  const arrowRotation = qiblaBearing !== null && heading !== null ? qiblaBearing - heading : qiblaBearing ?? 0;

  useEffect(() => {
    if (!sensorEnabled) return;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const compass = event as DeviceOrientationEvent & { webkitCompassHeading?: number };
      if (typeof compass.webkitCompassHeading === "number") {
        setHeading(compass.webkitCompassHeading);
      } else if (typeof event.alpha === "number") {
        setHeading((360 - event.alpha + 360) % 360);
      }
    };
    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, [sensorEnabled]);

  const locate = () => {
    if (!navigator.geolocation) {
      setLocationMessage("This browser does not support location. You can still use the Qibla bearing from a manually selected location in a future update.");
      return;
    }
    setLocationMessage("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setLocationMessage("Location found. Hold your phone flat and keep it away from magnets and metal objects.");
      },
      (error) => setLocationMessage(error.code === error.PERMISSION_DENIED ? "Location permission was not granted. Enable it in your browser settings and try again." : "Could not determine your location. Move to an open area and try again."),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  const enableCompass = async () => {
    const orientation = DeviceOrientationEvent as typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> };
    if (typeof orientation.requestPermission === "function") {
      try {
        const permission = await orientation.requestPermission();
        if (permission !== "granted") {
          setLocationMessage("Compass permission was not granted. You can still use the Qibla bearing shown in degrees.");
          return;
        }
      } catch {
        setLocationMessage("This device did not allow compass access. Use the bearing in degrees instead.");
        return;
      }
    }
    setSensorEnabled(true);
    setLocationMessage("Compass enabled where supported. Calibrate your phone if the direction appears inaccurate.");
  };

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a href="/" className={styles.brand}>RHM Islamic Circle</a>
        <nav><a href="/">Home</a><a href="/learn">Discover Islam</a><a href="/quran">Qur’an</a></nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <div className={styles.languages} aria-label="Choose language">
            <button className={language === "en" ? styles.activeLanguage : ""} onClick={() => setLanguage("en")}>English</button>
            <button className={language === "ur" ? styles.activeLanguage : ""} onClick={() => setLanguage("ur")}>اردو</button>
          </div>
        </div>
        <h1 dir={language === "ur" ? "rtl" : "ltr"}>{t.title}</h1>
        <p dir={language === "ur" ? "rtl" : "ltr"}>{t.intro}</p>
        <div className={styles.heroLinks}>
          <a href="#qibla">{t.qibla} ↘</a><a href="#wudu">{t.wudu} ↘</a><a href="#cleanliness">{t.cleanliness} ↘</a>
        </div>
      </section>

      <section className={styles.qiblaCard} id="qibla">
        <div className={styles.qiblaText}>
          <span className={styles.eyebrow}>QIBLA FINDER</span>
          <h2>{t.qibla}</h2>
          <p>{t.locationHelp}</p>
          <button className={styles.primaryButton} onClick={locate}>{t.getLocation}</button>
          {coordinates && <button className={styles.secondaryButton} onClick={enableCompass}>Enable phone compass</button>}
          {locationMessage && <p className={styles.status} role="status">{locationMessage}</p>}
          {qiblaBearing !== null && <div className={styles.bearing}><strong>{Math.round(qiblaBearing)}°</strong><span>Clockwise from true north</span></div>}
          {coordinates && <small>Location: {coordinates.latitude.toFixed(3)}, {coordinates.longitude.toFixed(3)} · Distance to Kaaba is not shown.</small>}
        </div>
        <div className={styles.compassArea}>
          <div className={styles.compass} aria-label={qiblaBearing === null ? "Qibla compass waiting for location" : "Qibla direction compass"}>
            <span className={styles.north}>N</span><span className={styles.east}>E</span><span className={styles.south}>S</span><span className={styles.west}>W</span>
            <div className={styles.compassNeedle} style={{ transform: `rotate(${arrowRotation}deg)` }}><span>▲</span></div>
            <div className={styles.compassCenter}>RHM</div>
          </div>
          <p>{heading === null ? "Compass sensor not active — the displayed degree is the direction from true north." : "Rotate your phone until the arrow points straight ahead. Sensor accuracy varies by device."}</p>
        </div>
      </section>

      <section className={styles.contentGrid}>
        <article className={styles.lesson} id="wudu">
          <span className={styles.lessonNumber}>01 · PURIFICATION</span><h2>{t.wudu}</h2>
          <p>Wudu is the prescribed ablution before Salah and certain acts of worship. The Qur’an explains washing the face and arms, wiping the head and washing the feet in Surah al-Ma’idah 5:6.</p>
          <h3>A simple step-by-step guide</h3>
          <ol><li>Make the intention in your heart and begin by saying Bismillah.</li><li>Wash both hands up to the wrists.</li><li>Rinse the mouth and gently rinse the nose.</li><li>Wash the entire face.</li><li>Wash the right arm, then the left, including the elbows.</li><li>Wipe the head; wipe the ears according to the taught Sunnah method.</li><li>Wash the right foot, then the left, including the ankles.</li></ol>
          <div className={styles.callout}><strong>Why is Wudu valuable?</strong><p>It is obedience to Allah, prepares a Muslim for prayer, and is connected with spiritual purification. Sahih Muslim 244 describes sins being washed away with the water of ablution. This is a spiritual virtue, not a medical claim.</p></div>
          <p className={styles.reference}>References: Qur’an 5:6 · Sahih Muslim 244 · <a href="https://quran.com/5/6" target="_blank" rel="noreferrer">Read the verse</a> · <a href="https://sunnah.com/muslim:244" target="_blank" rel="noreferrer">Read the Hadith</a></p>
        </article>

        <article className={styles.lesson} id="ghusl">
          <span className={styles.lessonNumber}>02 · MAJOR PURIFICATION</span><h2>{t.ghusl}</h2>
          <p>Ghusl is a full ritual bath required in specific states, such as after janabah. Menstruation and postnatal bleeding have their own rulings about when ghusl is required.</p>
          <h3>General Sunnah method</h3>
          <ol><li>Make the intention in the heart.</li><li>Wash the hands and clean any impurity from the body.</li><li>Perform Wudu as for Salah.</li><li>Pour water over the head, ensuring it reaches the roots of the hair.</li><li>Wash the entire body, ensuring water reaches all areas.</li></ol>
          <p className={styles.reference}>The details of obligatory parts and recommended sequence can differ by school of law. Ask a qualified scholar for personal cases.</p>
        </article>

        <article className={styles.lesson} id="cleanliness">
          <span className={styles.lessonNumber}>03 · TAHARAH & HYGIENE</span><h2>{t.cleanliness}</h2>
          <p>Islam teaches care for ritual purity and everyday cleanliness. Keep the body, clothes, prayer area and living spaces clean; remove physical impurities before prayer.</p>
          <h3>Daily cleanliness checklist</h3>
          <ul><li>Clean yourself properly after using the toilet; use water where available and maintain privacy.</li><li>Wash hands regularly, especially before eating and after using the toilet.</li><li>Keep nails trimmed and maintain personal grooming.</li><li>Care for teeth; use a toothbrush or siwak.</li><li>Keep clothes, bedding, kitchen and prayer space clean.</li><li>Maintain bathing, hair and skin hygiene without wastefulness.</li><li>Do not waste water during Wudu or bathing.</li></ul>
          <div className={styles.callout}><strong>Fitrah practices</strong><p>A narration in Sahih Muslim 257b mentions trimming the moustache, clipping nails, removing underarm hair and pubic hair, along with circumcision. The timing and rulings should be learned with proper context; do not turn personal hygiene into shame or harshness.</p></div>
          <p className={styles.reference}>References: Sahih Muslim 223 and 257b · <a href="https://sunnah.com/muslim:223" target="_blank" rel="noreferrer">Purification and faith</a> · <a href="https://sunnah.com/muslim:257b" target="_blank" rel="noreferrer">Acts of Fitrah</a></p>
        </article>

        <article className={styles.lesson} id="salah">
          <span className={styles.lessonNumber}>04 · BEFORE PRAYER</span><h2>{t.salah}</h2>
          <ul><li>Check that the prayer time has entered for your location.</li><li>Make sure your body, clothing and place of prayer are clean.</li><li>Perform Wudu, or the valid alternative when its conditions apply.</li><li>Wear clothing that fulfils the requirements of covering the awrah.</li><li>Face the Qibla as accurately as reasonably possible.</li><li>Make the intention in your heart and pray with calmness and focus.</li></ul>
          <p className={styles.reference}>The conditions and details of prayer should be learned from a trusted teacher in your school of law.</p>
        </article>

        <article className={styles.lesson}>
          <span className={styles.lessonNumber}>05 · WHEN WATER IS NOT POSSIBLE</span><h2>Tayammum</h2>
          <p>Tayammum is a prescribed dry purification in circumstances described by Islamic law, such as when water is unavailable or using it would cause harm. It is not a convenience substitute for ordinary Wudu.</p>
          <p>Its conditions and method have important details. Learn them from Qur’an 5:6 and a qualified teacher before relying on it in a personal situation.</p>
          <p className={styles.reference}><a href="https://quran.com/5/6" target="_blank" rel="noreferrer">Qur’an 5:6</a></p>
        </article>

        <article className={styles.lesson}>
          <span className={styles.lessonNumber}>06 · CHARACTER</span><h2>{t.daily}</h2>
          <ul><li>Speak truthfully and keep promises.</li><li>Show kindness to parents, relatives, neighbours and guests.</li><li>Respect people’s privacy and avoid gossip and mockery.</li><li>Eat and drink with gratitude and avoid waste.</li><li>Keep public spaces clean and do not harm people or animals.</li><li>Return trusts and deal honestly in work and business.</li><li>Make time for remembrance, dua and beneficial knowledge.</li></ul>
        </article>
      </section>

      <section className={styles.note}>
        <h2>{t.note}</h2>
        <p>This page is an educational starting point, not a fatwa. Some details of Wudu, Ghusl, Tayammum and prayer differ among recognised schools of Islamic law. We will label differences, cite source texts and seek qualified review before publishing detailed rulings. Never treat a compass reading as infallible: magnetic interference, sensor calibration and device limitations can affect it.</p>
      </section>
      <footer className={styles.footer}><a href="/">RHM Islamic Circle</a><span>Learn with care. Verify religious guidance. Ask qualified scholars when needed.</span></footer>
    </main>
  );
}
