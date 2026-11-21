"use client";

import { useEffect, useMemo, useState } from "react";

type Dua = {
  id: string;
  title: string;
  category: "Qur'anic duas" | "Prophetic Sunnah" | "Ramadan & special occasions" | "Daily Azkar";
  sourceType: string;
  narrator?: string;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  reference: string;
  url: string;
  occasion: string;
  repetition?: string;
  scholarNote?: string;
};

const duas: Dua[] = [
  {
    id: "adam",
    title: "Dua for forgiveness — Prophet Adam عليه السلام",
    category: "Qur'anic duas",
    sourceType: "Words recorded in the Qur'an",
    narrator: "Prophet Adam and his wife عليهما السلام",
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal-khasirin.",
    english: "Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us, we will surely be among the losers.",
    urdu: "اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اور اگر تو ہمیں نہ بخشے اور ہم پر رحم نہ فرمائے تو ہم ضرور نقصان اٹھانے والوں میں سے ہو جائیں گے۔",
    reference: "Qur'an 7:23 — Surah al-A'raf",
    url: "https://quran.com/7/23",
    occasion: "For repentance and seeking Allah's forgiveness."
  },
  {
    id: "musa",
    title: "Dua for ease and clear speech — Prophet Musa عليه السلام",
    category: "Qur'anic duas",
    sourceType: "Words recorded in the Qur'an",
    narrator: "Prophet Musa عليه السلام",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي ۝ يَفْقَهُوا قَوْلِي",
    transliteration: "Rabbi ishrah li sadri, wa yassir li amri, wahlul 'uqdatan min lisani, yafqahu qawli.",
    english: "My Lord, expand for me my chest, ease my task for me, and untie the knot from my tongue so that they may understand my speech.",
    urdu: "اے میرے رب! میرا سینہ کھول دے، میرا کام آسان فرما، اور میری زبان کی گرہ کھول دے تاکہ لوگ میری بات سمجھ سکیں۔",
    reference: "Qur'an 20:25–28 — Surah Ta-Ha",
    url: "https://quran.com/20/25-28",
    occasion: "A Qur'anic supplication for asking Allah for ease and clarity."
  },
  {
    id: "yunus",
    title: "Dua in distress — Prophet Yunus عليه السلام",
    category: "Qur'anic duas",
    sourceType: "Words recorded in the Qur'an",
    narrator: "Prophet Yunus عليه السلام",
    arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta, subhanaka, inni kuntu minaz-zalimin.",
    english: "There is no deity except You; exalted are You. Indeed, I have been among the wrongdoers.",
    urdu: "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔",
    reference: "Qur'an 21:87 — Surah al-Anbiya",
    url: "https://quran.com/21/87",
    occasion: "The Qur'an records this call of Prophet Yunus in the darkness."
  },
  {
    id: "wake",
    title: "When waking up",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Hudhaifa ibn al-Yaman رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
    english: "All praise is for Allah who gave us life after causing us to die, and to Him is the resurrection.",
    urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت جیسی نیند کے بعد زندگی عطا فرمائی، اور اسی کی طرف دوبارہ اٹھ کر جانا ہے۔",
    reference: "Sahih al-Bukhari 6312",
    url: "https://sunnah.com/bukhari:6312",
    occasion: "Upon waking from sleep."
  },
  {
    id: "sleep",
    title: "Before going to sleep",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Hudhaifa ibn al-Yaman رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika amutu wa ahya.",
    english: "In Your name, I die and I live.",
    urdu: "اے اللہ! تیرے ہی نام کے ساتھ میں مرتا اور جیتا ہوں۔",
    reference: "Sahih al-Bukhari 6312",
    url: "https://sunnah.com/bukhari:6312",
    occasion: "When going to bed."
  },
  {
    id: "leaving",
    title: "When leaving home",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Anas ibn Malik رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillahi, tawakkaltu 'alallah, la hawla wa la quwwata illa billah.",
    english: "In the name of Allah; I place my trust in Allah. There is no might and no power except through Allah.",
    urdu: "اللہ کے نام سے، میں نے اللہ پر بھروسا کیا۔ اللہ کے سوا نہ کوئی طاقت ہے اور نہ قوت۔",
    reference: "Sunan Abi Dawud 5095",
    url: "https://sunnah.com/abudawud:5095",
    occasion: "When stepping out of the home."
  },
  {
    id: "morning",
    title: "Morning and evening remembrance",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Uthman ibn Affan رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim.",
    english: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm. He is the All-Hearing, the All-Knowing.",
    urdu: "اللہ کے نام کے ساتھ، جس کے نام کی برکت سے زمین و آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا، خوب جاننے والا ہے۔",
    reference: "Sunan Abi Dawud 5088",
    url: "https://sunnah.com/abudawud:5088",
    occasion: "The narration mentions saying it three times in the morning and three times in the evening.",
    repetition: "3 times in the morning and 3 times in the evening.",
    scholarNote: "The Sunnah.com entry records the grading as Sahih by Al-Albani. Grades and numbering can differ between editions."
  }
];


const quranAndAzkar: Dua[] = [
 {id:"good-world",title:"Good in this world and the Hereafter",category:"Qur'anic duas",sourceType:"Qur'anic supplication",arabic:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",transliteration:"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",english:"Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",urdu:"اے ہمارے رب! ہمیں دنیا اور آخرت میں بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔",reference:"Qur'an 2:201",url:"https://quran.com/2/201",occasion:"A comprehensive prayer for good in both lives."},
 {id:"accept-deeds",title:"Asking Allah to accept our deeds",category:"Qur'anic duas",sourceType:"Qur'anic supplication",narrator:"Prophet Ibrahim and Prophet Isma'il عليهما السلام",arabic:"رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",transliteration:"Rabbana taqabbal minna innaka Antas-Sami'ul-'Alim.",english:"Our Lord, accept this from us. You are the All-Hearing, the All-Knowing.",urdu:"اے ہمارے رب! ہم سے قبول فرما، بے شک تو خوب سننے والا، خوب جاننے والا ہے۔",reference:"Qur'an 2:127",url:"https://quran.com/2/127",occasion:"The prayer of Ibrahim and Isma'il while raising the foundations of the Ka'bah."},
 {id:"patience",title:"For patience and firm steps",category:"Qur'anic duas",sourceType:"Qur'anic supplication",arabic:"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",transliteration:"Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin.",english:"Our Lord, pour upon us patience, make our feet firm, and grant us help.",urdu:"اے ہمارے رب! ہم پر صبر انڈیل دے، ہمارے قدم جما دے اور ہماری مدد فرما۔",reference:"Qur'an 2:250",url:"https://quran.com/2/250",occasion:"For patience and steadfastness in a difficult test."},
 {id:"guided-heart",title:"For a heart that remains guided",category:"Qur'anic duas",sourceType:"Qur'anic supplication",arabic:"رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",transliteration:"Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmah, innaka Antal-Wahhab.",english:"Our Lord, do not let our hearts deviate after You have guided us. Grant us mercy from Yourself; You are the Bestower.",urdu:"اے ہمارے رب! ہدایت دینے کے بعد ہمارے دلوں کو ٹیڑھا نہ ہونے دے اور ہمیں اپنی رحمت عطا فرما۔",reference:"Qur'an 3:8",url:"https://quran.com/3/8",occasion:"For steadfastness in faith and continued guidance."},
 {id:"family-prayer",title:"For establishing prayer in the family",category:"Qur'anic duas",sourceType:"Qur'anic supplication",narrator:"Prophet Ibrahim عليه السلام",arabic:"رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",transliteration:"Rabbij'alni muqimas-salati wa min dhurriyyati rabbana wa taqabbal du'a'.",english:"My Lord, make me one who establishes prayer, and also from my descendants. Our Lord, accept my supplication.",urdu:"اے میرے رب! مجھے اور میری اولاد میں سے بھی نماز قائم کرنے والا بنا، اور میری دعا قبول فرما۔",reference:"Qur'an 14:40",url:"https://quran.com/14/40",occasion:"For oneself and one's family to establish Salah."},
 {id:"parents",title:"For parents and all believers",category:"Qur'anic duas",sourceType:"Qur'anic supplication",narrator:"Prophet Ibrahim عليه السلام",arabic:"رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",transliteration:"Rabbanaghfir li wa liwalidayya wa lil-mu'minina yawma yaqumul-hisab.",english:"Our Lord, forgive me, my parents, and the believers on the Day the account is established.",urdu:"اے ہمارے رب! مجھے، میرے والدین کو اور تمام مومنوں کو حساب کے دن بخش دینا۔",reference:"Qur'an 14:41",url:"https://quran.com/14/41",occasion:"For forgiveness for oneself, parents and believers."},
 {id:"cave-mercy",title:"For mercy and right guidance",category:"Qur'anic duas",sourceType:"Qur'anic supplication",narrator:"The young men of the Cave",arabic:"رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",transliteration:"Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada.",english:"Our Lord, grant us mercy from Yourself and guide us to a sound course in our affair.",urdu:"اے ہمارے رب! ہمیں اپنی طرف سے رحمت عطا فرما اور ہمارے معاملے میں درست رہنمائی مہیا فرما۔",reference:"Qur'an 18:10",url:"https://quran.com/18/10",occasion:"For mercy and wise direction in a difficult situation."},
 {id:"knowledge",title:"For increase in knowledge",category:"Qur'anic duas",sourceType:"Qur'anic supplication",arabic:"رَبِّ زِدْنِي عِلْمًا",transliteration:"Rabbi zidni 'ilma.",english:"My Lord, increase me in knowledge.",urdu:"اے میرے رب! میرے علم میں اضافہ فرما۔",reference:"Qur'an 20:114",url:"https://quran.com/20/114",occasion:"A concise prayer when seeking beneficial knowledge."},
 {id:"ayyub",title:"A prayer during illness and hardship",category:"Qur'anic duas",sourceType:"Qur'anic supplication",narrator:"Prophet Ayyub عليه السلام",arabic:"أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ",transliteration:"Anni massaniyad-durru wa Anta arhamur-rahimin.",english:"Adversity has touched me, and You are the Most Merciful of the merciful.",urdu:"بے شک مجھے تکلیف پہنچی ہے اور تو سب رحم کرنے والوں سے بڑھ کر رحم فرمانے والا ہے۔",reference:"Qur'an 21:83",url:"https://quran.com/21/83",occasion:"The Qur'an records Prophet Ayyub's prayer during affliction."},
 {id:"forgive-mercy",title:"For forgiveness and mercy",category:"Qur'anic duas",sourceType:"Qur'anic supplication",arabic:"رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ",transliteration:"Rabbighfir warham wa Anta khayrur-rahimin.",english:"My Lord, forgive and have mercy; You are the best of those who show mercy.",urdu:"اے میرے رب! بخش دے اور رحم فرما، اور تو سب رحم کرنے والوں سے بہتر ہے۔",reference:"Qur'an 23:118",url:"https://quran.com/23/118",occasion:"A short prayer for forgiveness and mercy."},
 {id:"righteous-family",title:"For a righteous family",category:"Qur'anic duas",sourceType:"Qur'anic supplication",arabic:"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",transliteration:"Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.",english:"Our Lord, grant us comfort in our spouses and children, and make us examples for the mindful.",urdu:"اے ہمارے رب! ہمیں ہمارے اہل و عیال سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا۔",reference:"Qur'an 25:74",url:"https://quran.com/25/74",occasion:"For a righteous family and becoming an example in goodness."},
 {id:"gratitude",title:"For gratitude and righteous deeds",category:"Qur'anic duas",sourceType:"Qur'anic supplication",narrator:"Prophet Sulayman عليه السلام",arabic:"رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",transliteration:"Rabbi awzi'ni an ashkura ni'mataka allati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardah.",english:"My Lord, inspire me to be grateful for Your favour upon me and my parents, and to do righteous deeds that please You.",urdu:"اے میرے رب! مجھے توفیق دے کہ میں تیری نعمت کا شکر ادا کروں اور ایسے نیک اعمال کروں جن سے تو راضی ہو۔",reference:"Qur'an 27:19",url:"https://quran.com/27/19",occasion:"For gratitude and the ability to do deeds pleasing to Allah."},
 {id:"need-provision",title:"When in need of Allah's provision",category:"Qur'anic duas",sourceType:"Qur'anic supplication",narrator:"Prophet Musa عليه السلام",arabic:"رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",transliteration:"Rabbi inni lima anzalta ilayya min khayrin faqir.",english:"My Lord, I am truly in need of whatever good You may send down to me.",urdu:"اے میرے رب! جو بھلائی بھی تو میری طرف نازل فرمائے، میں اس کا محتاج ہوں۔",reference:"Qur'an 28:24",url:"https://quran.com/28/24",occasion:"A prayer of Prophet Musa when he was in need."},
 {id:"laylat-qadr",title:"The dua for Laylat al-Qadr",category:"Ramadan & special occasions",sourceType:"Prophetic supplication",narrator:"Aishah رضي الله عنها asked the Prophet ﷺ",arabic:"اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",transliteration:"Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni.",english:"O Allah, You are Pardoning and love to pardon, so pardon me.",urdu:"اے اللہ! بے شک تو بہت معاف فرمانے والا ہے، معافی کو پسند فرماتا ہے، پس مجھے معاف فرما دے۔",reference:"Jami' at-Tirmidhi 3513; Sunan Ibn Majah 3850",url:"https://sunnah.com/ibnmajah:3850",occasion:"Aishah رضي الله عنها asked what to say if she encountered Laylat al-Qadr. No fixed date or number of repetitions is specified.",scholarNote:"Sunnah.com records the Ibn Majah report as Sahih (Darussalam); Tirmidhi's report is also cited as Hasan Sahih."},
 {id:"mosque-enter",title:"When entering the mosque",category:"Prophetic Sunnah",sourceType:"Prophetic supplication",arabic:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",transliteration:"Allahumma-ftah li abwaba rahmatik.",english:"O Allah, open for me the gates of Your mercy.",urdu:"اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",reference:"Sahih Muslim 713a",url:"https://sunnah.com/muslim:713a",occasion:"When entering the mosque."},
 {id:"mosque-leave",title:"When leaving the mosque",category:"Prophetic Sunnah",sourceType:"Prophetic supplication",arabic:"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",transliteration:"Allahumma inni as'aluka min fadlik.",english:"O Allah, I ask You for Your favour.",urdu:"اے اللہ! میں تجھ سے تیرا فضل مانگتا ہوں۔",reference:"Sahih Muslim 713a",url:"https://sunnah.com/muslim:713a",occasion:"When leaving the mosque."},
 {id:"after-wudu",title:"After completing wudu",category:"Prophetic Sunnah",sourceType:"Prophetic supplication",narrator:"Umar ibn al-Khattab رضي الله عنه",arabic:"أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",transliteration:"Ashhadu an la ilaha illallah wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",english:"I bear witness that none has the right to be worshipped but Allah alone, with no partner, and that Muhammad is His servant and Messenger.",urdu:"میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود برحق نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور محمد ﷺ اس کے بندے اور رسول ہیں۔",reference:"Sahih Muslim 234",url:"https://sunnah.com/muslim:234",occasion:"After completing ablution."},
 {id:"rain",title:"When rain falls",category:"Prophetic Sunnah",sourceType:"Prophetic supplication",narrator:"Aishah رضي الله عنها",arabic:"اللَّهُمَّ صَيِّبًا نَافِعًا",transliteration:"Allahumma sayyiban nafi'an.",english:"O Allah, make it beneficial rain.",urdu:"اے اللہ! اسے نفع دینے والی بارش بنا۔",reference:"Sahih al-Bukhari 1032",url:"https://sunnah.com/bukhari:1032",occasion:"When rain is seen."},
 {id:"sayyid-istighfar",title:"The chief supplication for forgiveness",category:"Daily Azkar",sourceType:"Prophetic remembrance",narrator:"Shaddad ibn Aws رضي الله عنه",arabic:"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",transliteration:"Allahumma anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya wa abu'u bidhanbi faghfir li fa-innahu la yaghfirudh-dhunuba illa Anta.",english:"O Allah, You are my Lord; there is no deity except You. You created me and I am Your servant. I seek refuge in You from the evil I have done, acknowledge Your favour and my sin, so forgive me; none forgives sins except You.",urdu:"اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ میں تیری نعمت کا اقرار کرتا ہوں اور اپنے گناہ کا بھی اعتراف کرتا ہوں، پس مجھے بخش دے؛ تیرے سوا کوئی گناہ نہیں بخشتا۔",reference:"Sahih al-Bukhari 6306",url:"https://sunnah.com/bukhari:6306",occasion:"Morning and evening remembrance as described in the hadith."},
 {id:"post-salah-dhikr",title:"Remembrance after obligatory prayer",category:"Daily Azkar",sourceType:"Prophetic remembrance",arabic:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ",transliteration:"SubhanAllah, Alhamdulillah, Allahu Akbar.",english:"Glory be to Allah; all praise is for Allah; Allah is the Greatest.",urdu:"اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اور اللہ سب سے بڑا ہے۔",reference:"Sahih Muslim 597",url:"https://sunnah.com/muslim:597",occasion:"A form of remembrance after prescribed prayers.",repetition:"The cited narration describes 33 SubhanAllah, 33 Alhamdulillah and 33 Allahu Akbar, then completes the count with the tahlil wording in the hadith."},
 {id:"bedtime-dhikr",title:"Tasbeeh before sleeping",category:"Daily Azkar",sourceType:"Prophetic remembrance",narrator:"Ali ibn Abi Talib رضي الله عنه",arabic:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ",transliteration:"SubhanAllah, Alhamdulillah, Allahu Akbar.",english:"Glory be to Allah; all praise is for Allah; Allah is the Greatest.",urdu:"اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اور اللہ سب سے بڑا ہے۔",reference:"Sahih al-Bukhari 5362; Sahih Muslim 2727",url:"https://sunnah.com/bukhari:5362",occasion:"A remembrance taught to Fatimah and Ali رضي الله عنهما for bedtime.",repetition:"33 SubhanAllah, 33 Alhamdulillah and 34 Allahu Akbar."},
  {
    id: "iftar-after-breaking", title: "At iftar, after beginning to break the fast", category: "Ramadan & special occasions",
    sourceType: "Prophetic supplication", narrator: "Ibn Umar رضي الله عنه reported the Prophet ﷺ",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahabaz-zama'u wabtallatil-'uruqu wa thabatal-ajru in sha' Allah.",
    english: "The thirst has gone, the veins are moistened, and the reward is assured, if Allah wills.",
    urdu: "پیاس ختم ہو گئی، رگیں تر ہو گئیں اور ان شاء اللہ اجر ثابت ہو گیا۔",
    reference: "Sunan Abi Dawud 2357 — Hasan (Al-Albani)", url: "https://sunnah.com/abudawud:2357",
    occasion: "Reported at the time of breaking the fast. The wording describes thirst being relieved; the report does not establish a separate fixed dua for suhoor."
  },
];
const allDuas = [...duas, ...quranAndAzkar];

export default function DailyDuasPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState<"both" | "en" | "ur">("both");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      const saved = window.localStorage.getItem("rhm-site-theme") ?? window.localStorage.getItem("rhm-quran-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
      setThemeReady(true);
    };
    syncTheme();
    window.addEventListener("rhm-theme-change", syncTheme);
    return () => window.removeEventListener("rhm-theme-change", syncTheme);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.siteTheme = theme;
    document.documentElement.dataset.quranTheme = theme;
    window.localStorage.setItem("rhm-site-theme", theme);
    window.localStorage.setItem("rhm-quran-theme", theme);
    window.dispatchEvent(new CustomEvent("rhm-theme-change", { detail: theme }));
  }, [theme, themeReady]);
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return allDuas.filter((dua: Dua) => {
      const categoryMatch = category === "All" || dua.category === category;
      const textMatch = !q || [dua.title, dua.arabic, dua.transliteration, dua.english, dua.urdu, dua.reference, dua.narrator ?? ""].some((part) => part.toLocaleLowerCase().includes(q));
      return categoryMatch && textMatch;
    });
  }, [query, category]);

  return (
    <main className="quran-page duas-page" data-theme={theme}>
      <header className="quran-topbar">
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islam 360</a>
        <div className="quran-top-actions"><a className="quran-home-link" href="/hadith">Hadith library</a><a className="quran-home-link" href="/">Home</a></div>
      </header>
      <section className="quran-heading">
        <div className="eyebrow">Daily remembrance & supplications</div>
        <h1>Daily Duas</h1>
        <p>Study supplications from the Qur'an and Prophetic Sunnah, with Arabic, transliteration, Urdu and English meanings, narrators and source references.</p>
      </section>
      <nav className="learning-space-nav" aria-label="Explore learning spaces"><a href="/quran">Qur’an</a><a href="/hadith">Hadith</a><a href="/qaida">Qaida</a><a href="/duas" aria-current="page">Daily Duas</a><a href="/learn">Discover Islam</a><a href="/daily-life">Daily Life</a></nav>
      <section className="quran-reader duas-reader">
        <div className="duas-intro"><strong>Learn one dua at a time.</strong><p>Use the search to find a dua, daily dhikr or Ramadan supplication by occasion, Prophet's name, narrator, words or exact reference.</p></div>
        <div className="duas-controls">
          <label htmlFor="duas-search">Search duas or references</label>
          <input id="duas-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: sleep, Musa, 6312, forgiveness…" />
          <label htmlFor="duas-category">Browse by source</label>
          <select id="duas-category" value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option><option>Qur'anic duas</option><option>Prophetic Sunnah</option><option>Ramadan &amp; special occasions</option><option>Daily Azkar</option></select>
          <label htmlFor="duas-language">Meaning language</label>
          <select id="duas-language" value={language} onChange={(event) => { const value = event.target.value; if (value === "both" || value === "en" || value === "ur") setLanguage(value); }}><option value="both">Urdu + English</option><option value="ur">Urdu</option><option value="en">English</option></select>
        </div>
        <p className="duas-count" aria-live="polite">{filtered.length} supplications and remembrances found</p><div className="duas-intro"><strong>More remembrance tools</strong><p>For a digital Tasbeeh counter and worship tools, open the <a href="/companion">RHM Muslim Companion</a>. Repetition counts are shown only where the cited narration specifies them.</p></div>
        {filtered.map((dua) => <article className="dua-card" key={dua.id}>
          <div className="dua-card-top"><span className="dua-category">{dua.category}</span><span className="dua-origin">{dua.sourceType}</span></div>
          <h2>{dua.title}</h2>
          <p className="dua-arabic" lang="ar" dir="rtl">{dua.arabic}</p>
          <p className="dua-transliteration">{dua.transliteration}</p>
          {(language === "both" || language === "en") && <p className="dua-meaning"><strong>Meaning (English)</strong>{dua.english}</p>}
          {(language === "both" || language === "ur") && <p className="dua-meaning dua-meaning-ur" lang="ur" dir="rtl"><strong>مفہوم (اردو)</strong>{dua.urdu}</p>}
          <div className="dua-meta"><span>{dua.narrator ?? dua.sourceType}</span><span>{dua.reference}</span></div>
          {dua.repetition && <p className="dua-repetition">{dua.repetition}</p>}
          <p className="dua-occasion">{dua.occasion}</p>
          {dua.scholarNote && <p className="dua-scholar-note">Scholarly grading note: {dua.scholarNote}</p>}
          <a className="dua-source-link" href={dua.url} target="_blank" rel="noreferrer">Open source reference ↗</a>
        </article>)}
        {filtered.length === 0 && <p className="quran-status">No duas matched. Try a shorter search or choose All sources.</p>}
      </section>
      <section className="duas-editorial-note">
        <h2>How references are presented</h2>
        <p><strong>Prophets:</strong> Qur'anic supplications are identified by the Prophet named in the passage and the exact Surah and ayah range.</p>
        <p><strong>Companions:</strong> When a Companion narrates a Prophetic dua, the Companion is labelled as the narrator. The wording is not incorrectly attributed to the Companion as its author.</p>
        <p><strong>Scholars:</strong> Scholars are cited for grading or explanation where a source records their view. A scholar's personal wording is not labelled as Prophetic Sunnah. Future scholar quotations should include the original book and page or a verifiable edition.</p>
        <p className="duas-caution">Translations are meanings to help learning; the Arabic Qur'anic and Hadith wording is the source text. Hadith grading can vary by scholar and edition. This page is educational, not a fatwa.</p>
      </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islam 360 · Learn, verify and practise with care.</footer>
    </main>
  );
}
