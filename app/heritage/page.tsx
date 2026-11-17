"use client";

import Link from "next/link";

const places = [
{ id:"kaaba", name:"Al-Masjid al-Haram & the Kaaba", city:"Makkah, Saudi Arabia", era:"Ancient sanctuary · continually expanded", image:"https://commons.wikimedia.org/wiki/Special:FilePath/The_Ka%27ba,_Great_Mosque_of_Mecca,_Saudi_Arabia_(4).jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:The_Ka%27ba,_Great_Mosque_of_Mecca,_Saudi_Arabia_(4).jpg", note:"At the centre of Al-Masjid al-Haram stands the Kaaba, the qibla toward which Muslims pray. During Hajj and Umrah, pilgrims perform tawaf by circling the Kaaba. The mosque has been expanded across many centuries to welcome worshippers." },
{ id:"masjid-nabawi", name:"Al-Masjid an-Nabawi — The Prophet’s Mosque", city:"Madinah, Saudi Arabia", era:"Founded in 622 CE", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Medium_shot_of_the_Green_Dome_at_The_Prophet%27s_Mosque_(Al_Masjid-e-Nabawi).jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:Medium_shot_of_the_Green_Dome_at_The_Prophet%27s_Mosque_(Al_Masjid-e-Nabawi).jpg", note:"The Prophet’s Mosque was established by Prophet Muhammad ﷺ after the Hijrah to Madinah in 622 CE. It became a place for prayer, teaching and community life. The mosque has been expanded many times; the Green Dome is a later landmark, not part of the original building." },
{ name:"Al-Aqsa Mosque and Sanctuary", city:"Jerusalem, Palestine", era:"A sacred site with a long layered history", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Alaqsa_mosque_at_night.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/Category:Al-Aqsa", note:"Al-Masjid al-Aqsa is part of the wider Al-Aqsa sanctuary in Jerusalem, a place of profound religious and historical significance. The Dome of the Rock is a distinct shrine within the same compound." },
{ name:"Quba Mosque", city:"Madinah, Saudi Arabia", era:"Established after the Hijrah in 622 CE", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Quba_Mosque_Madinah.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/Category:Quba_Mosque", note:"Quba is widely known as the first mosque established by Prophet Muhammad ﷺ after his arrival near Madinah. The Prophet visited it and encouraged prayer there." },
{ name:"Sultan Ahmed Mosque (Blue Mosque)", city:"Istanbul, Türkiye", era:"Built 1609–1616", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Sultan_Ahmed_Mosque_in_Istanbul.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:Sultan_Ahmed_Mosque_in_Istanbul.jpg", note:"Commissioned by Sultan Ahmed I, this Ottoman mosque is famous for its cascading domes, six minarets and blue Iznik tile decoration." },
{ name:"Sheikh Zayed Grand Mosque", city:"Abu Dhabi, United Arab Emirates", era:"Opened in 2007", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Sheikh_Zayed_Grand_Mosque_%40_Abu_Dhabi_(15856602738).jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:Sheikh_Zayed_Grand_Mosque_%40_Abu_Dhabi_(15856602738).jpg", note:"A modern landmark known for its white marble, extensive courtyards, intricate floral designs and large prayer hall." },
{ name:"Faisal Mosque", city:"Islamabad, Pakistan", era:"Completed in 1986", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Faisal_Mosque,_Islamabad,_Pakistan.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:Faisal_Mosque,_Islamabad,_Pakistan.jpg", note:"Designed by Turkish architect Vedat Dalokay, the mosque is recognised for its striking tent-inspired form at the foot of the Margalla Hills." },
{ name:"Badshahi Mosque", city:"Lahore, Pakistan", era:"Built 1671–1673", image:"https://commons.wikimedia.org/wiki/Special:FilePath/BadshahiMosqueLahore.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:BadshahiMosqueLahore.jpg", note:"Commissioned by Mughal emperor Aurangzeb, this monumental mosque is celebrated for its red sandstone, marble domes and vast courtyard." },
{ name:"Umayyad Mosque (Great Mosque of Damascus)", city:"Damascus, Syria", era:"Major construction in the early 8th century", image:"https://commons.wikimedia.org/wiki/Special:FilePath/The_Umayyad_Mosque,_Damascus,_Syria.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:The_Umayyad_Mosque,_Damascus,_Syria.jpg", note:"Built during the Umayyad period on a site with earlier religious structures, it is a major monument of early Islamic architecture." },
{ name:"Great Mosque of Córdoba", city:"Córdoba, Spain", era:"Founded in 785–786 CE; later additions", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Great_Mosque_of_C%C3%B3rdoba_(Spain).jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:Great_Mosque_of_C%C3%B3rdoba_(Spain).jpg", note:"A landmark of Islamic-era al-Andalus, renowned for its forest of columns and red-and-white arches. The building later became a cathedral; its layered history should be understood in context." },
{ name:"Hassan II Mosque", city:"Casablanca, Morocco", era:"Opened in 1993", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Hassan_II_Mosque_and_Its_Minaret_in_Casablanca,_Morocco_2.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/File:Hassan_II_Mosque_and_Its_Minaret_in_Casablanca,_Morocco_2.jpg", note:"A major modern mosque overlooking the Atlantic Ocean, known for its monumental minaret and detailed Moroccan craftsmanship." },
{ name:"Great Mosque of Kairouan", city:"Kairouan, Tunisia", era:"Founded in 670 CE; rebuilt and enlarged", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Great_Mosque_of_Kairouan.jpg?width=1200", credit:"https://commons.wikimedia.org/wiki/Category:Great_Mosque_of_Kairouan", note:"One of North Africa’s most important early Islamic monuments, with a celebrated courtyard, hypostyle prayer hall and historic minaret." }
];

export default function IslamicHeritagePage() {
  return <main className="quran-page heritage-page">
    <header className="quran-topbar"><Link className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</Link><div className="quran-top-actions"><Link className="quran-home-link" href="/quran">Back to learning centre</Link></div></header>
    <div className="heritage-wrap">
      <header className="heritage-hero"><span className="eyebrow">Explore Islamic civilisation</span><h1>Islamic Heritage &amp; Famous Mosques</h1><p>Discover remarkable mosques and sacred places across the Muslim world through real photographs and short historical introductions.</p><span className="heritage-arabic" lang="ar" dir="rtl">مساجد ومعالم إسلامية</span></header>


      <section className="heritage-history-intro" aria-labelledby="heritage-history-title">
        <div className="heritage-section-heading">
          <span className="eyebrow">More than monuments</span>
          <h2 id="heritage-history-title">A living legacy across centuries</h2>
          <p>Islamic history is a wide and diverse story: faith and worship, scholarship and libraries, trade and travel, art and architecture, languages and local cultures. Explore it with curiosity and respect for the people and communities who shaped it.</p>
        </div>
        <div className="heritage-history-links">
          <a href="#timeline"><span>01</span><strong>Historical timeline</strong><small>Key eras and turning points</small></a>
          <a href="#civilisations"><span>02</span><strong>Dynasties & regions</strong><small>From Arabia to Africa and Asia</small></a>
          <a href="#knowledge"><span>03</span><strong>Knowledge & scholarship</strong><small>Libraries, scholars and learning</small></a>
          <a href="#arts"><span>04</span><strong>Arts & architecture</strong><small>Design, calligraphy and craft</small></a>
        </div>
      </section>

      <section className="heritage-history-section" id="timeline">
        <div className="heritage-section-heading"><span className="eyebrow">A brief historical guide</span><h2>Islamic history timeline</h2><p>Dates are approximate where historical conventions differ. This is an introduction, not a complete account of every region or community.</p></div>
        <div className="heritage-timeline">
          <article><span className="heritage-date">c. 610 CE</span><div><h3>The beginning of Qur’anic revelation</h3><p>Muslims traditionally date the first revelation to Prophet Muhammad ﷺ to around 610 CE in the Cave of Hira near Makkah.</p></div></article>
          <article><span className="heritage-date">622 CE</span><div><h3>The Hijrah to Madinah</h3><p>The migration from Makkah to Yathrib, later known as Madinah, marks the beginning of the Islamic Hijri calendar. A new Muslim community took shape there.</p></div></article>
          <article><span className="heritage-date">632–661 CE</span><div><h3>The Rightly Guided Caliphs</h3><p>The period following the Prophet’s ﷺ death saw the leadership of Abu Bakr, Umar, Uthman and Ali رضي الله عنهم. It was also a period of major political change and expansion.</p></div></article>
          <article><span className="heritage-date">661–750 CE</span><div><h3>The Umayyad period</h3><p>With its centre in Damascus, the Umayyad caliphate governed a vast territory and left important monuments, including the Dome of the Rock and the Great Mosque of Damascus.</p></div></article>
          <article><span className="heritage-date">750 CE onward</span><div><h3>The Abbasid era and wider learning networks</h3><p>Baghdad became a major centre of administration, trade, translation and scholarship. Knowledge also flourished in cities across North Africa, Persia, Central Asia and beyond.</p></div></article>
          <article><span className="heritage-date">8th–15th centuries</span><div><h3>Al-Andalus and the western Islamic world</h3><p>Muslim-ruled parts of the Iberian Peninsula developed distinctive traditions in architecture, agriculture, philosophy, poetry and learning, alongside complex relationships among religious communities.</p></div></article>
          <article><span className="heritage-date">13th–16th centuries</span><div><h3>New centres across Africa and Asia</h3><p>Important Muslim states, scholarly networks and trading cities developed across the Sahel, East Africa, South Asia and Southeast Asia. Islamic history was never limited to one empire.</p></div></article>
          <article><span className="heritage-date">c. 1299–1922</span><div><h3>The Ottoman state and empire</h3><p>From north-west Anatolia, the Ottoman state grew into a long-lasting empire with major architectural, artistic, legal and administrative legacies across three continents.</p></div></article>
          <article><span className="heritage-date">1526–1857</span><div><h3>The Mughal era in South Asia</h3><p>The Mughal dynasty shaped the history of much of South Asia through its courts, gardens, architecture, painting, literature and varied regional relationships.</p></div></article>
        </div>
      </section>

      <section className="heritage-history-section" id="civilisations">
        <div className="heritage-section-heading"><span className="eyebrow">Many regions, many stories</span><h2>Explore Islamic civilisations</h2><p>These labels are broad starting points. Each region had different rulers, languages, schools of thought and local traditions; none should be treated as a single uniform culture.</p></div>
        <div className="heritage-topic-grid">
          <article><span>01 · ARABIA</span><h3>Makkah, Madinah & the early Muslim community</h3><p>Learn about the Prophet’s ﷺ life, the Hijrah, the early community and the places connected with the beginnings of Islam.</p></article>
          <article><span>02 · WEST ASIA</span><h3>Damascus, Baghdad & the great cities</h3><p>Explore Umayyad and Abbasid history, urban life, libraries, trade routes and the movement of ideas.</p></article>
          <article><span>03 · AFRICA</span><h3>North Africa, the Sahel & East Africa</h3><p>Discover Kairouan, Cairo, Timbuktu, Swahili coastal cities and the diverse ways Islam became rooted in African societies.</p></article>
          <article><span>04 · IBERIA</span><h3>Al-Andalus</h3><p>Study the layered history of Muslim-ruled Iberia, including Córdoba, Granada, scholarship, architecture and cultural exchange.</p></article>
          <article><span>05 · SOUTH ASIA</span><h3>Delhi, Lahore, Agra & beyond</h3><p>Explore Sultanate and Mughal histories, Sufi networks, regional kingdoms, languages, gardens, mosques and forts.</p></article>
          <article><span>06 · CENTRAL & SOUTHEAST ASIA</span><h3>Samarkand, Bukhara & maritime networks</h3><p>Learn about scholarship along the Silk Roads and the spread and development of Muslim communities across island and mainland Southeast Asia.</p></article>
        </div>
      </section>

      <section className="heritage-history-section" id="knowledge">
        <div className="heritage-section-heading"><span className="eyebrow">The pursuit of knowledge</span><h2>Scholars, libraries & learning</h2><p>Muslim intellectual history includes religious sciences as well as medicine, mathematics, astronomy, geography, philosophy, literature and the arts. These examples introduce only a few of its many contributors.</p></div>
        <div className="heritage-scholar-grid">
          <article><h3>Al-Khwarizmi</h3><span>Mathematics · 9th century</span><p>His mathematical writings helped transmit and develop methods that became foundational to algebra.</p></article>
          <article><h3>Al-Razi</h3><span>Medicine · 9th–10th century</span><p>A physician and writer whose medical works were read and discussed in later scholarly traditions.</p></article>
          <article><h3>Ibn al-Haytham</h3><span>Optics · 10th–11th century</span><p>Known for influential work on vision, light and experimental investigation.</p></article>
          <article><h3>Al-Biruni</h3><span>Science & history · 10th–11th century</span><p>Wrote on astronomy, mathematics, geography and the cultures and traditions of the societies he studied.</p></article>
          <article><h3>Fatima al-Fihri</h3><span>Education · 9th century</span><p>Tradition associates her patronage with the founding of the Qarawiyyin mosque and learning centre in Fez.</p></article>
          <article><h3>Ibn Khaldun</h3><span>History & society · 14th century</span><p>His Muqaddimah offered influential analysis of historical change, society, power and economic life.</p></article>
        </div>
        <div className="heritage-note">Historical care: scholars worked in different languages, faith communities and intellectual settings. Their work was shaped by exchange across cultures; avoid attributing every later discovery to one person or civilisation.</div>
      </section>

      <section className="heritage-history-section" id="arts">
        <div className="heritage-section-heading"><span className="eyebrow">Beauty, craft & devotion</span><h2>Islamic arts & architecture</h2><p>There is no single Islamic architectural style. Regional materials, climates, patrons and artistic traditions created a rich variety of forms.</p></div>
        <div className="heritage-art-grid">
          <article><div className="heritage-art-symbol">۞</div><h3>Geometric patterns</h3><p>Interlacing shapes and repeated forms appear in many buildings, tiles, woodwork and manuscripts.</p></article>
          <article><div className="heritage-art-symbol" lang="ar">اقرأ</div><h3>Arabic calligraphy</h3><p>Calligraphers developed scripts for Qur’anic manuscripts, inscriptions, architecture and works of art.</p></article>
          <article><div className="heritage-art-symbol">⌂</div><h3>Domes, arches & minarets</h3><p>These features vary widely by place and period, serving structural, visual and community functions.</p></article>
          <article><div className="heritage-art-symbol">✧</div><h3>Gardens, tiles & craft</h3><p>Water, planting, ceramics, carved plaster, textiles and woodwork shaped many regional artistic traditions.</p></article>
        </div>
      </section>

      <div className="heritage-note">Choose a sacred place below to view its photograph and read a short introduction. Start with the Kaaba in Makkah or the Prophet’s Mosque in Madinah. A respectful learning gallery: dates and descriptions are concise introductions. Some sites have complex, layered histories and are sacred to more than one community.</div>
      <section className="heritage-grid" aria-label="Famous mosques and Islamic heritage places">
        {places.map((place) => <article className="heritage-card" id={place.id ?? undefined} key={place.name}>
          <a className="heritage-photo-link" href={place.credit} target="_blank" rel="noreferrer" aria-label={"View photo source for "+place.name}>
            <img className="heritage-photo" src={place.image} alt={place.name+" in "+place.city} loading="lazy" />
          </a>
          <div className="heritage-card-content"><span className="heritage-city">{place.city}</span><h2>{place.name}</h2><span className="heritage-era">{place.era}</span><p>{place.note}</p><a className="heritage-credit" href={place.credit} target="_blank" rel="noreferrer">Verify photograph and licence ↗</a></div>
        </article>)}
      </section>
      <p className="heritage-disclaimer">Photographs are linked from Wikimedia Commons. Each photo-source link leads to its file or category page, where the photographer and licence information can be checked. Availability of individual image files may change.</p>
      <div className="heritage-return"><Link href="/quran">← Return to RHM Islamic learning centre</Link></div>
    </div>
    <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
  </main>;
}
