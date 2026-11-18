"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Timings = { Fajr: string; Sunrise: string; Dhuhr: string; Asr: string; Sunset: string; Maghrib: string; Isha: string; Imsak?: string; Midnight?: string };
type ApiResponse = { code?: number; status?: string; data?: { timings?: Timings; date?: { readable?: string; hijri?: { date?: string; month?: { en?: string } } }; meta?: { timezone?: string; method?: { name?: string } } } };
const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const timeOnly = (value?: string) => (value || "").split(" ")[0];
function dateForApi(date: Date) {
  return [String(date.getDate()).padStart(2,"0"),String(date.getMonth()+1).padStart(2,"0"),date.getFullYear()].join("-");
}
function minutesFromTime(value: string) {
  const [h,m] = timeOnly(value).split(":").map(Number);
  return h * 60 + m;
}
export default function PrayerTimesPage() {
  const [city,setCity] = useState("Islamabad");
  const [country,setCountry] = useState("Pakistan");
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
  const load = useCallback(async (targetCity:string,targetCountry:string) => {
    setLoading(true); setError("");
    const now = new Date();
    setToday(now.toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"}));
    try {
      const url = "https://api.aladhan.com/v1/timingsByCity/"+dateForApi(now)+"?city="+encodeURIComponent(targetCity)+"&country="+encodeURIComponent(targetCountry)+"&method=1";
      const response = await fetch(url,{cache:"no-store"});
      if(!response.ok) throw new Error("Prayer-time service is unavailable right now.");
      const json = await response.json() as ApiResponse;
      if(json.code !== 200 || !json.data?.timings) throw new Error("No prayer times were returned for this location.");
      setTimings(json.data.timings);
      setReadableDate(json.data.date?.readable || "");
      setHijriDate([json.data.date?.hijri?.date,json.data.date?.hijri?.month?.en].filter(Boolean).join(" "));
      setTimezone(json.data.meta?.timezone || "");
      setMethod(json.data.meta?.method?.name || "Calculation method 1");
      setCity(targetCity); setCountry(targetCountry);
    } catch (e) {
      setTimings(null);
      setError(e instanceof Error ? e.message : "Could not load prayer times. Please try again.");
    } finally { setLoading(false); }
  },[]);
  useEffect(()=>{void load("Islamabad","Pakistan");},[load]);
  const nextPrayer = useMemo(()=>{
    if(!timings) return null;
    const now=new Date(); const current=now.getHours()*60+now.getMinutes();
    const entries=prayerNames.map(name=>({name,time:timeOnly(timings[name]),minutes:minutesFromTime(timings[name])}));
    return entries.find(item=>item.minutes>current) || {...entries[0],name:"Fajr",tomorrow:true};
  },[timings,today]);
  const applyLocation=()=>{const c=cityInput.trim(),n=countryInput.trim();if(c&&n)void load(c,n);};
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
        setTimezone(json.data.meta?.timezone||"");setMethod(json.data.meta?.method?.name||"Calculation method 1");setCity("Your location");setCountry("GPS");
      }catch(e){setError(e instanceof Error?e.message:"Location lookup failed.");setTimings(null);}
      finally{setLoading(false);}
    },()=>{setLoading(false);setError("Location permission was not granted. You can enter a city instead.");},{enableHighAccuracy:false,timeout:10000});
  };
  return <main className="prayer-page">
    <div className="prayer-hero"><span className="eyebrow">SALAH • DAILY WORSHIP</span><h1>Prayer Times</h1><p>Plan your day around Salah. Choose a city or use your device location to view today's calculated prayer schedule.</p><div className="prayer-date">{today}{hijriDate?" · "+hijriDate:""}</div></div>
    <section className="prayer-location" aria-label="Prayer time location">
      <div className="prayer-location-fields"><label>City<input value={cityInput} onChange={e=>setCityInput(e.target.value)} placeholder="e.g. Islamabad"/></label><label>Country<input value={countryInput} onChange={e=>setCountryInput(e.target.value)} placeholder="e.g. Pakistan"/></label><button type="button" onClick={applyLocation} disabled={loading||!cityInput.trim()||!countryInput.trim()}>Update city</button><button type="button" className="prayer-gps" onClick={useMyLocation} disabled={loading}>Use my location</button></div>
      <p className="prayer-current-location">Showing: <strong>{city}, {country}</strong>{timezone?" · "+timezone:""}</p>
    </section>
    {loading&&<p className="prayer-feedback" role="status">Loading today's prayer times…</p>}
    {error&&<div className="prayer-error" role="alert">{error}<button type="button" onClick={()=>void load(city,country)}>Try again</button></div>}
    {timings&&<section className="prayer-times-grid" aria-label="Today's prayer times">
      {prayerNames.map((name,index)=><article className={"prayer-time-card "+(nextPrayer?.name===name?"is-next":"")} key={name}><span>{["01","02","03","04","05"][index]}</span><h2>{name}</h2><strong>{timeOnly(timings[name])}</strong>{nextPrayer?.name===name&&<small>{(nextPrayer as {tomorrow?:boolean}).tomorrow?"Next · tomorrow":"Next prayer"}</small>}</article>)}
      <article className="prayer-time-card prayer-sunrise"><span>DAYLIGHT</span><h2>Sunrise</h2><strong>{timeOnly(timings.Sunrise)}</strong><small>Not a Salah time</small></article>
    </section>}
    {timings&&<section className="prayer-note"><h2>About these times</h2><p>Calculation: {method}. Prayer schedules can differ by calculation method, local horizon and mosque practice. Use this as a helpful guide and confirm the timings followed by your local mosque.</p><p>Times are supplied for the selected date and location. The highlighted next prayer is based on your device's current clock.</p></section>}
    <nav className="prayer-related" aria-label="Related worship tools"><a href="/daily-life#qibla">Qibla finder ↗</a><a href="/duas">Daily Duas ↗</a><a href="/journey">Learning journey ↗</a></nav>
  </main>;
}
