"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Timings = { Fajr: string; Sunrise: string; Dhuhr: string; Asr: string; Sunset: string; Maghrib: string; Isha: string; Imsak?: string; Midnight?: string };
type ApiResponse = { code?: number; status?: string; data?: { timings?: Timings; date?: { readable?: string; hijri?: { date?: string; month?: { en?: string } } }; meta?: { timezone?: string; method?: { name?: string } } } };
type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
type ReminderSettings = Record<PrayerName, boolean>;
type AzanSettings = { enabled: boolean; volume: number; prayers: ReminderSettings };
const defaultAzanSettings: AzanSettings = { enabled: false, volume: 0.8, prayers: { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true } };
const azanAudio: Record<PrayerName, string> = {
  Fajr: "https://archive.org/download/adhan.recordings.from.doha.qatar/Adhan_Doha_Qatar_01_Fajr_Adhan.mp3",
  Dhuhr: "https://archive.org/download/adhan.recordings.from.doha.qatar/Adhan_Doha_Qatar_02_Dhuhr_Adhan.mp3",
  Asr: "https://archive.org/download/adhan.recordings.from.doha.qatar/Adhan_Doha_Qatar_03_Asr_Adhan.mp3",
  Maghrib: "https://archive.org/download/adhan.recordings.from.doha.qatar/Adhan_Doha_Qatar_04_Maghrib_Adhan.mp3",
  Isha: "https://archive.org/download/adhan.recordings.from.doha.qatar/Adhan_Doha_Qatar_05_Isha_Adhan.mp3",
};
const prayerNames: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const defaultReminders: ReminderSettings = { Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false };
const timeOnly = (value?: string) => (value || "").split(" ")[0];
function dateForApi(date: Date, timeZone?: string) {
  const parts = timeZone
    ? new Intl.DateTimeFormat("en-GB", { timeZone, day: "2-digit", month: "2-digit", year: "numeric" }).formatToParts(date)
    : new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return [values.day, values.month, values.year].join("-");
}
function minutesInTimeZone(timeZone?: string) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", { ...(timeZone ? { timeZone } : {}), hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return Number(values.hour) * 60 + Number(values.minute);
  } catch {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }
}
function minutesFromTime(value: string) {
  const [h,m] = timeOnly(value).split(":").map(Number);
  return h * 60 + m;
}
function localDateKey(timeZone?: string) {
  try { return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
  catch { return new Date().toISOString().slice(0,10); }
}
export default function PrayerTimesPage() {
  const [city,setCity] = useState("Islamabad");
  const [country,setCountry] = useState("Pakistan");
  const [area,setArea] = useState("");
  const [areaInput,setAreaInput] = useState("");
  const [cityInput,setCityInput] = useState("Islamabad");
  const [countryInput,setCountryInput] = useState("Pakistan");
  const [timings,setTimings] = useState<Timings|null>(null);
  const [readableDate,setReadableDate] = useState("");
  const [hijriDate,setHijriDate] = useState("");
  const [timezone,setTimezone] = useState("");
  const [method,setMethod] = useState("");
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [today,setToday] = useState("");
  const [clockTick,setClockTick] = useState(0);
  const [reminders,setReminders] = useState<ReminderSettings>(defaultReminders);
  const [reminderMessage,setReminderMessage] = useState("Choose which Salah reminders you would like to receive.");
  const notifiedRef = useRef<Set<string>>(new Set());
  const playedRef = useRef<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [azanSettings, setAzanSettings] = useState<AzanSettings>(defaultAzanSettings);
  const [azanMessage, setAzanMessage] = useState("Automatic Azan is off. Enable audio once on this device to allow scheduled playback while this page is open.");
  const [audioReady, setAudioReady] = useState(false);
  const [playingPrayer, setPlayingPrayer] = useState<PrayerName | null>(null);
  const load = useCallback(async (targetArea:string,targetCity:string,targetCountry:string) => {
    setLoading(true); setError("");
    const now = new Date();
    setToday(now.toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"}));
    try {
      const address = [targetArea,targetCity,targetCountry].filter(Boolean).join(", ");
      const buildUrl = (date: string) => "https://api.aladhan.com/v1/timingsByAddress/"+date+"?address="+encodeURIComponent(address)+"&method=1";
      const initialDate = dateForApi(now);
      let response = await fetch(buildUrl(initialDate),{cache:"no-store"});
      if(!response.ok) throw new Error("Prayer-time service is unavailable right now.");
      let json = await response.json() as ApiResponse;
      if(json.code !== 200 || !json.data?.timings) throw new Error("No prayer times were returned for this area. Check the spelling or try the nearest larger locality.");
      const locationDate = json.data.meta?.timezone ? dateForApi(now, json.data.meta.timezone) : initialDate;
      if(locationDate !== initialDate) {
        response = await fetch(buildUrl(locationDate),{cache:"no-store"});
        if(!response.ok) throw new Error("Prayer-time service is unavailable right now.");
        json = await response.json() as ApiResponse;
        if(json.code !== 200 || !json.data?.timings) throw new Error("No prayer times were returned for this area.");
      }
      setTimings(json.data.timings);
      setReadableDate(json.data.date?.readable || "");
      setHijriDate([json.data.date?.hijri?.date,json.data.date?.hijri?.month?.en].filter(Boolean).join(" "));
      setTimezone(json.data.meta?.timezone || "");
      setMethod(json.data.meta?.method?.name || "Calculation method 1");
      setArea(targetArea); setCity(targetCity); setCountry(targetCountry);
      notifiedRef.current.clear();
    } catch (e) {
      setTimings(null);
      setError(e instanceof Error ? e.message : "Could not load prayer times. Please try again.");
    } finally { setLoading(false); }
  },[]);
  useEffect(()=>{
    void load("","Islamabad","Pakistan");
    try {
      const saved = window.localStorage.getItem("rhm-azan-reminders-v1");
      if(saved) setReminders({ ...defaultReminders, ...JSON.parse(saved) as Partial<ReminderSettings> });
      const savedAzan = window.localStorage.getItem("rhm-azan-audio-v1");
      if(savedAzan) {
        const parsed = JSON.parse(savedAzan) as Partial<AzanSettings>;
        setAzanSettings({ ...defaultAzanSettings, ...parsed, prayers: { ...defaultAzanSettings.prayers, ...(parsed.prayers || {}) } });
      }
    } catch { /* Keep reminders disabled if saved settings cannot be read. */ }
  },[load]);
  useEffect(()=>{const timer=window.setInterval(()=>setClockTick(Date.now()),15000);return()=>window.clearInterval(timer);},[]);
  useEffect(()=>{
    try { window.localStorage.setItem("rhm-azan-reminders-v1",JSON.stringify(reminders)); } catch { /* Browser storage may be unavailable. */ }
  },[reminders]);
  useEffect(()=>{
    try { window.localStorage.setItem("rhm-azan-audio-v1", JSON.stringify(azanSettings)); } catch { /* Audio preferences remain usable for this session. */ }
  },[azanSettings]);
  useEffect(()=>{
    if(!timings || !azanSettings.enabled || !audioReady || !audioRef.current) return;
    const now = new Date();
    const dateKey = localDateKey(timezone);
    const current = new Intl.DateTimeFormat("en-GB", { timeZone: timezone || undefined, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);
    for(const name of prayerNames) {
      if(!azanSettings.prayers[name] || current !== timeOnly(timings[name])) continue;
      const key = dateKey + "-" + name + "-" + timeOnly(timings[name]) + "-" + [area,city,country].join("|");
      if(playedRef.current.has(key)) continue;
      playedRef.current.add(key);
      const audio = audioRef.current;
      audio.src = azanAudio[name];
      audio.volume = azanSettings.volume;
      audio.currentTime = 0;
      setPlayingPrayer(name);
      setAzanMessage("Playing the " + name + " Azan.");
      void audio.play().catch(() => {
        playedRef.current.delete(key);
        setPlayingPrayer(null);
        setAzanMessage("Your device blocked automatic playback. Open this page and tap Enable automatic Azan again, then keep the page active for scheduled playback.");
      });
    }
  },[timings,timezone,azanSettings,audioReady,clockTick,area,city,country]);
  useEffect(()=>{
    if(!timings || typeof window === "undefined" || !("Notification" in window) || Notification.permission !== "granted") return;
    const now = new Date();
    const dateKey = localDateKey(timezone);
    for(const name of prayerNames) {
      if(!reminders[name]) continue;
      const prayerTime = timeOnly(timings[name]);
      const current = new Intl.DateTimeFormat("en-GB",{timeZone:timezone || undefined,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(now);
      if(current === prayerTime) {
        const key = dateKey+"-"+name+"-"+prayerTime+"-"+[area,city,country].join("|");
        if(!notifiedRef.current.has(key)) {
          notifiedRef.current.add(key);
          new Notification("It is time for "+name, { body: "Prayer time for "+[area,city,country].filter(Boolean).join(", ")+". May Allah accept your Salah.", tag:"rhm-azan-"+name });
        }
      }
    }
  },[timings,timezone,reminders,clockTick,area,city,country]);
  const nextPrayer = useMemo(()=>{
    if(!timings) return null;
    const current=minutesInTimeZone(timezone);
    const entries=prayerNames.map(name=>({name,time:timeOnly(timings[name]),minutes:minutesFromTime(timings[name])}));
    return entries.find(item=>item.minutes>current) || {...entries[0],name:"Fajr",tomorrow:true};
  },[timings,timezone,today,clockTick]);
  const applyLocation=()=>{const a=areaInput.trim(),c=cityInput.trim(),n=countryInput.trim();if(c&&n)void load(a,c,n);};
  const enableAzanAudio = async () => {
    const audio = audioRef.current;
    if(!audio) return;
    try {
      audio.src = azanAudio.Fajr;
      audio.volume = 0;
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
      audio.volume = azanSettings.volume;
      setAudioReady(true);
      setAzanSettings(current => ({ ...current, enabled: true }));
      setAzanMessage("Azan audio enabled on this device. Scheduled playback works while this page remains open and the browser allows audio.");
    } catch {
      setAudioReady(false);
      setAzanMessage("This browser did not allow audio setup. Tap the button again, check silent mode and media permissions, or use a supported browser.");
    }
  };
  const testAzan = async () => {
    const audio = audioRef.current;
    if(!audio) return;
    const name = nextPrayer?.name && prayerNames.includes(nextPrayer.name as PrayerName) ? nextPrayer.name as PrayerName : "Fajr";
    try {
      audio.src = azanAudio[name];
      audio.volume = azanSettings.volume;
      audio.currentTime = 0;
      setPlayingPrayer(name);
      await audio.play();
      setAzanMessage("Test playback: " + name + " Azan.");
    } catch {
      setPlayingPrayer(null);
      setAzanMessage("Could not play the test audio. Check your internet connection and tap Enable automatic Azan first.");
    }
  };
  const toggleReminder=async(name:PrayerName,checked:boolean)=>{
    if(checked) {
      if(!("Notification" in window)) { setReminderMessage("This browser does not support notifications. Try a recent version of Chrome, Edge or Firefox."); return; }
      const permission=Notification.permission==="default" ? await Notification.requestPermission() : Notification.permission;
      if(permission!=="granted") { setReminderMessage("Notifications are blocked. Allow them for this site in your browser settings, then try again."); return; }
      setReminderMessage("Reminder enabled. Keep this page open and allow browser notifications for alerts at prayer time.");
    }
    setReminders(current=>({...current,[name]:checked}));
  };
  const useMyLocation=()=>{
    if(!navigator.geolocation){setError("Location is not supported by this browser.");return;}
    setLoading(true);setError("");
    navigator.geolocation.getCurrentPosition(async pos=>{
      try {
        const now=new Date();
        const url="https://api.aladhan.com/v1/timings/"+Math.floor(now.getTime()/1000)+"?latitude="+pos.coords.latitude+"&longitude="+pos.coords.longitude+"&method=1";
        const response=await fetch(url,{cache:"no-store"});
        if(!response.ok)throw new Error("Could not calculate times for your location.");
        const json=await response.json() as ApiResponse;
        if(json.code!==200||!json.data?.timings)throw new Error("No prayer times were returned for your location.");
        setTimings(json.data.timings);setReadableDate(json.data.date?.readable||"");setHijriDate([json.data.date?.hijri?.date,json.data.date?.hijri?.month?.en].filter(Boolean).join(" "));
        setTimezone(json.data.meta?.timezone||"");setMethod(json.data.meta?.method?.name||"Calculation method 1");setArea("");setCity("Your location");setCountry("GPS");notifiedRef.current.clear();
      }catch(e){setError(e instanceof Error?e.message:"Location lookup failed.");setTimings(null);}
      finally{setLoading(false);}
    },()=>{setLoading(false);setError("Location permission was not granted. You can enter an area or city instead.");},{enableHighAccuracy:false,timeout:10000});
  };
  return <main className="prayer-page">
    <header className="quran-topbar"><a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islam 360</a><button type="button" className="prayer-back-button" onClick={() => { if (typeof window !== "undefined" && window.history.length > 1 && document.referrer && new URL(document.referrer).origin === window.location.origin) { window.history.back(); } else { window.location.assign("/explore"); } }} aria-label="Go back to the previous page"><span aria-hidden="true">←</span> Back</button></header>
    <div className="prayer-hero"><span className="eyebrow">SALAH • DAILY WORSHIP</span><h1>Prayer Times & Azan Reminders</h1><p>Choose your neighbourhood or area to see its prayer schedule, then enable reminders for the Salah times you want to remember.</p><div className="prayer-date">{readableDate || today}{hijriDate?" · "+hijriDate:""}</div></div>
    <section className="prayer-location" aria-label="Prayer time location">
      <div className="prayer-location-fields"><label>Area / neighbourhood<input value={areaInput} onChange={e=>setAreaInput(e.target.value)} placeholder="e.g. Satellite Town, Bahria Town (optional)"/></label><label>City<input value={cityInput} onChange={e=>setCityInput(e.target.value)} placeholder="e.g. Rawalpindi"/></label><label>Country<input value={countryInput} onChange={e=>setCountryInput(e.target.value)} placeholder="e.g. Pakistan"/></label><button type="button" onClick={applyLocation} disabled={loading||!cityInput.trim()||!countryInput.trim()}>Update area</button><button type="button" className="prayer-gps" onClick={useMyLocation} disabled={loading}>Use my location</button></div>
      <p className="prayer-current-location">Showing: <strong>{[area,city,country].filter(Boolean).join(", ")}</strong>{timezone?" · "+timezone:""}</p>
    </section>
    {loading&&<p className="prayer-feedback" role="status">Loading today's prayer times…</p>}
    {error&&<div className="prayer-error" role="alert">{error}<button type="button" onClick={()=>void load(area,city,country)}>Try again</button></div>}
    {timings&&<section className="prayer-times-grid" aria-label="Today's prayer times">
      {prayerNames.map((name,index)=><article className={"prayer-time-card "+(nextPrayer?.name===name?"is-next":"")} key={name}><span>{["01","02","03","04","05"][index]}</span><h2>{name}</h2><strong>{timeOnly(timings[name])}</strong>{nextPrayer?.name===name&&<small>{(nextPrayer as {tomorrow?:boolean}).tomorrow?"Next · tomorrow":"Next prayer"}</small>}</article>)}
      <article className="prayer-time-card prayer-sunrise"><span>DAYLIGHT</span><h2>Sunrise</h2><strong>{timeOnly(timings.Sunrise)}</strong><small>Not a Salah time</small></article>
    </section>}
    <audio ref={audioRef} preload="none" playsInline onEnded={()=>{setPlayingPrayer(null);setAzanMessage("Azan playback finished.");}} onError={()=>{setPlayingPrayer(null);setAzanMessage("Azan audio could not be loaded. Check your connection and try the test button again.");}} />
    {timings&&<section className="prayer-note"><h2>Listen to the Azan</h2><p>Enable audio once on this phone or computer. RHM will then attempt to play the correct full Azan at each selected prayer time while this page is open.</p><div className="azan-audio-controls"><button type="button" onClick={()=>void enableAzanAudio()}>{azanSettings.enabled && audioReady ? "Refresh audio permission" : "Enable automatic Azan"}</button><button type="button" className="azan-test-button" onClick={()=>void testAzan()}>Play test Azan</button><label className="azan-volume">Volume <input type="range" min="0" max="1" step="0.05" value={azanSettings.volume} onChange={event=>{const volume=Number(event.target.value);setAzanSettings(current=>({...current,volume}));if(audioRef.current)audioRef.current.volume=volume;}} /></label></div><p className="azan-reminder-status" role="status">{azanMessage}{playingPrayer ? " · " + playingPrayer + "" : ""}</p><div className="azan-reminder-list">{prayerNames.map(name=><label className="azan-reminder-option" key={name}><input type="checkbox" checked={azanSettings.prayers[name]} onChange={event=>setAzanSettings(current=>({...current,prayers:{...current.prayers,[name]:event.target.checked}}))}/><span><strong>{name} Azan</strong><small>{timeOnly(timings[name])}</small></span></label>)}</div><p className="azan-reminder-limit">Mobile reliability note: browsers may pause pages or block sound when the screen is locked, the app is closed, battery saving is active, or the phone is in silent mode. For dependable lock-screen/background Azan, a native Android/iOS app with scheduled alarms and notification permissions is required. Keep RHM open for web playback; do not rely on it as your only prayer-time alarm.</p><p className="azan-reminder-limit">Audio source: five prayer-specific recordings from “Adhan Recordings from Doha, Qatar”, Internet Archive, marked Public Domain Mark 1.0. <a href="https://archive.org/details/adhan.recordings.from.doha.qatar" target="_blank" rel="noreferrer">View recording source and rights</a>.</p></section>}
    {timings&&<section className="prayer-note"><h2>Azan & Salah reminders</h2><p>Select the prayers for which you want a browser notification. Your choices are saved on this device.</p><div className="azan-reminder-list">{prayerNames.map(name=><label className="azan-reminder-option" key={name}><input type="checkbox" checked={reminders[name]} onChange={event=>void toggleReminder(name,event.target.checked)}/><span><strong>{name}</strong><small>{timeOnly(timings[name])}</small></span></label>)}</div><p className="azan-reminder-status" role="status">{reminderMessage}</p><p className="azan-reminder-limit">Important: reminders run while this RHM page is open in your browser. Browser notifications must be allowed. For alerts when the browser is closed, RHM will need a push-notification service and an installed/permission-enabled device.</p></section>}
    {timings&&<section className="prayer-note"><h2>About these times</h2><p>Calculation: {method}. Prayer schedules can differ by calculation method, local horizon and mosque practice. Use this as a helpful guide and confirm the timings followed by your local mosque.</p><p>Times are supplied for the selected area and its time zone. If the schedule differs from your local mosque, follow your mosque's timetable.</p></section>}
    <style jsx global>{`
      .prayer-back-button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:42px;padding:9px 17px;border:1px solid #2878b8;border-radius:999px;background:#102b46;color:#fff;font:600 14px/1.2 inherit;text-decoration:none;cursor:pointer;transition:background .18s ease,transform .18s ease}.prayer-back-button span{font-size:19px;line-height:1}.prayer-back-button:hover{background:#2878b8;transform:translateX(-2px)}.prayer-back-button:focus-visible{outline:3px solid #d6ad55;outline-offset:3px}html[data-site-theme="dark"] .prayer-back-button{background:#2878b8;border-color:#75b8e8;color:#fff}html[data-site-theme="dark"] .prayer-back-button:hover{background:#1d5f91}@media(max-width:520px){.prayer-back-button{min-height:40px;padding:8px 13px;font-size:13px}}.prayer-location-fields label:first-child{min-width:min(280px,100%)}
      .azan-audio-controls{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:16px 0}.azan-audio-controls button{min-height:44px;padding:10px 18px;border:0;border-radius:999px;background:#173b30;color:#fff;font-weight:700;cursor:pointer}.azan-audio-controls .azan-test-button{background:#d9a65b;color:#17251e}.azan-volume{display:flex;align-items:center;gap:10px;font-weight:600}.azan-volume input{width:130px;accent-color:#28634b}.azan-reminder-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin:18px 0}
      .azan-reminder-option{display:flex;align-items:center;gap:10px;padding:13px 15px;border:1px solid var(--border,#d5dce5);border-radius:12px;background:var(--surface,#fff);color:var(--text,#183047);cursor:pointer}
      .azan-reminder-option input{width:18px;height:18px;accent-color:#2878b8;flex:0 0 auto}
      .azan-reminder-option span{display:flex;flex-direction:column;gap:3px}.azan-reminder-option small{opacity:.78;font-variant-numeric:tabular-nums}
      .azan-reminder-status{font-weight:600}.azan-reminder-limit{font-size:.9rem;line-height:1.7;opacity:.85}
      html[data-site-theme="dark"] .azan-reminder-option{background:#142b40;border-color:#456078;color:#f1f5f9}
      @media(max-width:700px){.prayer-location-fields label{width:100%}.prayer-location-fields button{width:100%}.azan-audio-controls{align-items:stretch;flex-direction:column}.azan-audio-controls button{width:100%}.azan-volume{justify-content:space-between}.azan-volume input{width:55%}}
    `}</style>
    <nav className="prayer-related" aria-label="Related worship tools"><a href="/daily-life#qibla">Qibla finder ↗</a><a href="/duas">Daily Duas ↗</a><a href="/journey">Learning journey ↗</a></nav>
  </main>;
}
