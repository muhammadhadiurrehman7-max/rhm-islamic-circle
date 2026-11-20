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
    <header className="quran-topbar"><Link className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islam 360</Link><div className="quran-top-actions"><Link className="quran-home-link" href="/quran">Back to learning centre</Link></div></header>
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

      <section className="heritage-history-section" id="early-events">
        <div className="heritage-section-heading"><span className="eyebrow">The early Muslim community</span><h2>Key events in the Prophet’s ﷺ lifetime</h2><p>These events are presented as a concise historical overview. The Qur’an gives spiritual and moral lessons about several of them; consult reliable Seerah works for fuller context and differences in reported details.</p></div>
        <div className="heritage-timeline">
          <article><span className="heritage-date">624 CE</span><div><h3>The Battle of Badr</h3><p>A major early encounter between the Muslims of Madinah and the Quraysh of Makkah. The Qur’an refers to divine support at Badr and calls believers to gratitude and steadfastness. <strong>Study:</strong> Qur’an 3:123–127 and 8:1–19.</p></div></article>
          <article><span className="heritage-date">625 CE</span><div><h3>The Battle of Uhud</h3><p>The Muslims faced a difficult setback at Uhud. Qur’anic passages reflect on discipline, patience, consultation and learning from hardship. <strong>Study:</strong> Qur’an 3:121–175.</p></div></article>
          <article><span className="heritage-date">627 CE</span><div><h3>The Battle of the Trench (Al-Ahzab)</h3><p>Madinah faced a confederate siege. The community used a defensive trench, and the Qur’an describes the trial and the believers’ response. <strong>Study:</strong> Qur’an 33:9–27.</p></div></article>
          <article><span className="heritage-date">628 CE</span><div><h3>The Treaty of Hudaybiyyah</h3><p>An agreement between the Muslims and Quraysh created a period of truce and opened the way for wider peaceful contact. The Qur’an describes it as a manifest victory. <strong>Study:</strong> Qur’an 48:1–27.</p></div></article>
          <article><span className="heritage-date">630 CE</span><div><h3>The opening of Makkah</h3><p>The Prophet ﷺ returned to Makkah with the Muslim community. The event is remembered in Seerah as a turning point; study accounts alongside the Prophet’s teachings on humility and mercy. <strong>Related reading:</strong> Qur’an 110.</p></div></article>
          <article><span className="heritage-date">632 CE</span><div><h3>The Farewell Pilgrimage</h3><p>During his final Hajj, the Prophet ﷺ addressed the Muslim community. Reports of the sermon are preserved in Hadith collections with variations in wording and transmission; avoid treating popular composite versions as one verbatim transcript.</p></div></article>
        </div>
        <div className="heritage-note">Important: the Qur’an is the primary source for its own accounts. Hadith and Seerah reports have different chains and levels of reliability; check the specific source and wording rather than relying on unsourced social-media timelines.</div>
      </section>

      <section className="heritage-history-section" id="later-turning-points">
        <div className="heritage-section-heading"><span className="eyebrow">A changing world</span><h2>Later turning points in Muslim history</h2><p>These milestones help orient learners, but no single empire represents all Muslims. Political rule, religious scholarship and everyday Muslim communities often followed different paths.</p></div>
        <div className="heritage-timeline">
          <article><span className="heritage-date">661 CE</span><div><h3>Beginning of Umayyad rule</h3><p>After a period of internal conflict, Mu‘awiyah established Umayyad rule with its centre in Damascus. The transition and the events around it are interpreted differently across Muslim historical traditions.</p></div></article>
          <article><span className="heritage-date">750 CE</span><div><h3>Abbasid revolution</h3><p>The Abbasids replaced Umayyad rule in most of the central caliphate. Baghdad, founded in 762 CE, later became a major centre of administration, commerce and scholarship.</p></div></article>
          <article><span className="heritage-date">711 CE onward</span><div><h3>Islam in Sindh and South Asia</h3><p>Arab campaigns reached Sindh in the early 8th century, while Islam spread across South Asia over many centuries through varied routes including trade, migration, scholarship, Sufi networks and changing states. Avoid reducing this long history to one conquest.</p></div></article>
          <article><span className="heritage-date">10th–13th centuries</span><div><h3>Regional dynasties and scholarly centres</h3><p>Fatimid, Seljuk, Ghaznavid, Ghurid and many other states shaped different regions. Cairo, Nishapur, Bukhara, Delhi and other cities supported varied institutions of learning and culture.</p></div></article>
          <article><span className="heritage-date">1258 CE</span><div><h3>Baghdad under Mongol attack</h3><p>The Mongol capture of Baghdad was a devastating event for the Abbasid caliphate in the city. It did not end Islamic civilisation or scholarship, which continued and developed across many other regions.</p></div></article>
          <article><span className="heritage-date">1453 CE</span><div><h3>Ottoman conquest of Constantinople</h3><p>Sultan Mehmed II captured Constantinople, making it the Ottoman capital. The city’s history includes Byzantine, Ottoman and modern Turkish periods and remains culturally layered.</p></div></article>
          <article><span className="heritage-date">1492 CE</span><div><h3>End of Nasrid rule in Granada</h3><p>The surrender of Granada marked the end of the last Muslim-ruled kingdom in Iberia. The subsequent history of Muslims and other communities in the peninsula includes forced conversions, expulsions and cultural change.</p></div></article>
          <article><span className="heritage-date">1526 CE</span><div><h3>Beginning of Mughal rule in North India</h3><p>Babur’s victory at Panipat established Mughal rule in parts of North India. The empire later changed significantly under different rulers and interacted with many regional powers and communities.</p></div></article>
        </div>
        <div className="heritage-note">Historical dates are conventional reference points. For deeper study, compare reputable academic histories and primary sources; political borders, dynastic labels and the dating of some events can be debated.</div>
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

      <section className="heritage-history-section" id="foundations">
        <div className="heritage-section-heading"><span className="eyebrow">The foundations of faith</span><h2>Understand the essentials of Islam</h2><p>A beginner-friendly overview of core beliefs and acts of worship. Detailed rulings can differ among recognised schools of Islamic law, so learners should consult qualified teachers for personal religious guidance.</p></div>
        <div className="heritage-topic-grid">
          <article><span>THE FIVE PILLARS</span><h3>Shahadah · Declaration of faith</h3><p>To testify that none is worthy of worship except Allah and that Muhammad ﷺ is the Messenger of Allah. This testimony is the foundation of Muslim belief.</p></article>
          <article><span>THE FIVE PILLARS</span><h3>Salah · Daily prayer</h3><p>Muslims perform five obligatory prayers each day at appointed times, turning toward the Kaaba in Makkah. Prayer joins remembrance, humility and disciplined worship.</p></article>
          <article><span>THE FIVE PILLARS</span><h3>Zakah · Obligatory giving</h3><p>Zakah is a defined act of worship and social responsibility for Muslims who meet its conditions. Its rules depend on the type of wealth and other details.</p></article>
          <article><span>THE FIVE PILLARS</span><h3>Sawm · Fasting in Ramadan</h3><p>Adult Muslims who are able are generally required to fast from dawn to sunset during Ramadan, with recognised exemptions and make-up rules.</p></article>
          <article><span>THE FIVE PILLARS</span><h3>Hajj · Pilgrimage to Makkah</h3><p>Hajj is obligatory once in a lifetime for Muslims who are physically and financially able and meet its conditions.</p></article>
          <article><span>THE ARTICLES OF FAITH</span><h3>Six foundations of Iman</h3><p>Belief in Allah, His angels, His revealed books, His messengers, the Last Day, and divine decree (Qadar). These are described in the Hadith of Jibril, recorded in Sahih Muslim.</p></article>
        </div>
        <div className="heritage-note">Reference points: Qur’an 2:43 (prayer and zakah), 2:183 (fasting), 3:97 (Hajj), and the Hadith of Jibril in Sahih Muslim 8a. The Five Pillars are also set out in Sahih al-Bukhari 8 and Sahih Muslim 16.</div>
      </section>

      <section className="heritage-history-section" id="seerah">
        <div className="heritage-section-heading"><span className="eyebrow">The Prophetic biography</span><h2>Seerah: the life of Prophet Muhammad ﷺ</h2><p>Study the Prophet’s life through the Qur’an and reliable Seerah and Hadith scholarship. Dates before the Hijrah are approximate, and reports may differ in detail.</p></div>
        <div className="heritage-timeline">
          <article><span className="heritage-date">c. 570 CE</span><div><h3>Birth in Makkah</h3><p>Muhammad ﷺ was born in Makkah in the Year of the Elephant, according to the commonly cited traditional chronology. He belonged to the Quraysh tribe.</p></div></article>
          <article><span className="heritage-date">610 CE</span><div><h3>The first revelation</h3><p>At the age of about forty, the first verses of Surah Al-‘Alaq were revealed to him in the Cave of Hira. The message called people to worship Allah alone and live with justice and accountability.</p></div></article>
          <article><span className="heritage-date">Makkah period</span><div><h3>Patience and the early Muslim community</h3><p>The first Muslims faced opposition. The Prophet ﷺ taught belief in one God, prayer, care for the vulnerable, honesty and steadfastness.</p></div></article>
          <article><span className="heritage-date">622 CE</span><div><h3>The Hijrah to Madinah</h3><p>The migration marked a new chapter. In Madinah, the Muslim community developed institutions of worship, mutual responsibility and public life.</p></div></article>
          <article><span className="heritage-date">630 CE</span><div><h3>The return to Makkah</h3><p>In the commonly accepted chronology, the Muslims entered Makkah and the Kaaba was restored to the worship of Allah alone. Study the event alongside its historical context and Prophetic teachings on mercy.</p></div></article>
          <article><span className="heritage-date">632 CE</span><div><h3>The Prophet’s final years</h3><p>After the Farewell Pilgrimage, Prophet Muhammad ﷺ passed away in Madinah. Muslims continue to learn from the Qur’an he conveyed and the Sunnah preserved through Hadith scholarship.</p></div></article>
        </div>
        <div className="heritage-note">Qur’anic study references include Surah Al-‘Alaq 96:1–5, Al-Isra 17:1, Al-Ahzab 33:21 and Al-Ma’idah 5:3. Read the verses in context with a trusted translation and tafsir.</div>
      </section>

      <section className="heritage-history-section" id="prophets">
        <div className="heritage-section-heading"><span className="eyebrow">Messengers and examples</span><h2>Prophets mentioned in Islam</h2><p>The Qur’an names many prophets and teaches that Allah sent messengers to guide people. These short introductions are starting points for reading their stories directly in the Qur’an.</p></div>
        <div className="heritage-scholar-grid">
          <article><h3>Adam عليه السلام</h3><span>Creation and repentance</span><p>The first human and a prophet. His story teaches human dignity, responsibility and turning back to Allah. Qur’an 2:30–39.</p></article>
          <article><h3>Nuh عليه السلام</h3><span>Perseverance and trust</span><p>Called his people to worship Allah with patience over a long period. His account is told in Surah Nuh and elsewhere.</p></article>
          <article><h3>Ibrahim عليه السلام</h3><span>Tawhid and devotion</span><p>A central model of sincere faith; Islamic tradition connects him and Isma‘il عليهما السلام with the foundations of the Kaaba. Qur’an 2:124–129.</p></article>
          <article><h3>Musa عليه السلام</h3><span>Courage and deliverance</span><p>His story includes confronting Pharaoh, receiving revelation and leading the Children of Israel. Qur’an 20 and 28.</p></article>
          <article><h3>‘Isa عليه السلام</h3><span>Signs and mercy</span><p>Jesus is honoured in Islam as the Messiah and a messenger of Allah, born miraculously to Maryam. Qur’an 3:45–51 and 19.</p></article>
          <article><h3>Muhammad ﷺ</h3><span>The final messenger</span><p>The Qur’an describes him as the Messenger of Allah and the Seal of the Prophets. Muslims follow his Sunnah. Qur’an 33:40.</p></article>
        </div>
      </section>

      <section className="heritage-history-section" id="companions">
        <div className="heritage-note"><strong>Explore the Sahabah in depth:</strong> Open the dedicated Companion library for searchable biographies, their connection with Prophet Muhammad ﷺ, their roles, contributions and source references. <Link href="/sahaba">Explore Sahabah biographies →</Link></div>
        <div className="heritage-section-heading"><span className="eyebrow">The first Muslim generations</span><h2>Companions and exemplary Muslim figures</h2><p>Learn about the Sahabah with respect and historical care. Muslims across traditions may differ in how particular events and personalities are interpreted.</p></div>
        <div className="heritage-scholar-grid">
          <article><h3>Khadijah bint Khuwaylid رضي الله عنها</h3><span>Faith and steadfast support</span><p>The Prophet’s first wife and the first person to believe in his message. Remembered for her generosity, wisdom and support.</p></article>
          <article><h3>Abu Bakr al-Siddiq رضي الله عنه</h3><span>Companionship and leadership</span><p>A close companion of the Prophet ﷺ and the first caliph after his passing.</p></article>
          <article><h3>Umar ibn al-Khattab رضي الله عنه</h3><span>Justice and administration</span><p>The second caliph, associated with major developments in the administration of the early Muslim community.</p></article>
          <article><h3>Uthman ibn Affan رضي الله عنه</h3><span>Generosity and Qur’an manuscripts</span><p>The third caliph; the standardisation and distribution of the Qur’anic codex is associated with his caliphate.</p></article>
          <article><h3>Ali ibn Abi Talib رضي الله عنه</h3><span>Knowledge and courage</span><p>The Prophet’s cousin and son-in-law, the fourth caliph in the Sunni sequence and a central figure in Islamic history.</p></article>
          <article><h3>Bilal ibn Rabah رضي الله عنه</h3><span>Faith and the call to prayer</span><p>Among the earliest Muslims, remembered for steadfast faith and for serving as a muezzin in the Prophet’s community.</p></article>
        </div>
      </section>

      <section className="heritage-history-section" id="character">
        <div className="heritage-section-heading"><span className="eyebrow">Faith in everyday life</span><h2>Islamic character, worship and good conduct</h2><p>Islamic learning is not only information: it should nurture worship, mercy, honesty, responsibility and good treatment of others.</p></div>
        <div className="heritage-topic-grid">
          <article><span>WORSHIP</span><h3>Purification and prayer</h3><p>Learn the principles of Wudu, Ghusl, cleanliness, prayer times, Salah and congregational worship. Check detailed rulings with a qualified teacher.</p></article>
          <article><span>CHARACTER</span><h3>Truthfulness and trust</h3><p>Practise honesty, keeping promises, fulfilling trusts, speaking kindly and avoiding slander and deception.</p></article>
          <article><span>FAMILY & COMMUNITY</span><h3>Mercy and good relationships</h3><p>Explore kindness to parents, care for relatives, neighbours and guests, and fairness toward people of every background.</p></article>
          <article><span>KNOWLEDGE</span><h3>Learning with humility</h3><p>Ask questions, verify quotations, distinguish strong evidence from uncertain reports and acknowledge when you do not know.</p></article>
          <article><span>CHARITY</span><h3>Service and generosity</h3><p>Support people in need through lawful, dignified and transparent acts of charity and community service.</p></article>
          <article><span>ENVIRONMENT</span><h3>Care for creation</h3><p>Avoid waste, treat animals with compassion, protect shared resources and act responsibly toward the natural world.</p></article>
        </div>
        <div className="heritage-note">For further reading: Qur’an 16:90 (justice and excellence), 17:23–39 (ethical guidance), 49:11–13 (respect and human dignity), and Sahih Muslim 2592c (gentleness).</div>
      </section>

      <section className="heritage-history-section" id="islamic-sciences">
        <div className="heritage-section-heading"><span className="eyebrow">How Muslims study their faith</span><h2>Explore the Islamic sciences</h2><p>Each discipline has its own methods, terminology and scholarly tradition. These brief descriptions are educational signposts, not substitutes for a full course.</p></div>
        <div className="heritage-art-grid">
          <article><div className="heritage-art-symbol">۞</div><h3>Tajwid</h3><p>Rules and practice for reciting the Qur’an carefully, including articulation points and characteristics of Arabic letters.</p></article>
          <article><div className="heritage-art-symbol" lang="ar">تفسير</div><h3>Tafsir</h3><p>Scholarly explanation of Qur’anic verses, considering language, context, transmitted reports and recognised methods.</p></article>
          <article><div className="heritage-art-symbol" lang="ar">حديث</div><h3>Hadith studies</h3><p>Study of Prophetic reports, their chains of transmission, wording, grading and interpretation.</p></article>
          <article><div className="heritage-art-symbol" lang="ar">فقه</div><h3>Fiqh</h3><p>Human scholarly understanding of practical rulings from the sources, developed through recognised legal methodologies.</p></article>
          <article><div className="heritage-art-symbol" lang="ar">عقيدة</div><h3>‘Aqidah</h3><p>Study of Islamic beliefs and theological questions, with recognised schools and scholarly approaches.</p></article>
          <article><div className="heritage-art-symbol" lang="ar">لغة</div><h3>Arabic language</h3><p>Grammar, vocabulary, morphology and rhetoric help learners understand Qur’anic Arabic and classical texts.</p></article>
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
    <footer className="quran-footer">© {new Date().getFullYear()} RHM Islam 360 · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
  </main>;
}
