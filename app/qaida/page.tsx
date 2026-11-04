"use client";

import { useState } from "react";

type Language = "en" | "ur" | "ar";

const copy = {
  en: {
    eyebrow: "A worldwide beginner-to-reader pathway",
    title: "Learn Arabic reading step by step",
    intro: "A guided introduction to recognising Arabic letters, joining them, reading vowelled words and building the foundations for Qur’an recitation. Choose a lesson and study at your own pace.",
    language: "Lesson language",
    english: "English",
    urdu: "Urdu",
    arabic: "Fusha Arabic",
    note: "About this course",
    noteText: "Qaida is a teaching approach used in many communities, not one single worldwide textbook. Lesson order and terminology can differ between teachers and regions. This course presents common foundations and should be studied with a qualified teacher.",
    quranic: "Qur’anic reading and Fusha Arabic",
    quranicText: "Fusha (الفصحى) is formal Arabic used in books, education and formal communication. Qur’anic recitation has its own precise rules of Tajweed. Learning Fusha supports Arabic understanding, but speaking Fusha alone does not teach the correct rules of Qur’an recitation.",
    teacher: "Listen, repeat and receive correction",
    teacherText: "Arabic sounds are not always accurately represented by English or Urdu letters. Learn each letter’s makhraj (place of articulation) and sifat (qualities) from a qualified teacher. Do not rely on transliteration alone.",
    practice: "A simple daily routine",
    practiceText: "Practise for 10–15 minutes: revise old letters, learn one small new point, read examples aloud, then listen to a teacher and correct your pronunciation.",
    openQuran: "Open the Qur’an reader",
    hadith: "Open Hadith Library",
    home: "Back to home",
    lesson: "Lesson",
    example: "Reading examples",
    explanation: "What to learn",
    caution: "Teacher note",
    footer: "Original learning notes for study with a qualified teacher. Not a substitute for a complete Qaida book or supervised recitation."
  },
  ur: {
    eyebrow: "دنیا بھر کے مبتدی طلبہ کے لیے مرحلہ وار رہنمائی",
    title: "عربی پڑھنا مرحلہ وار سیکھیں",
    intro: "عربی حروف کی پہچان، حروف کو ملانا، حرکات کے ساتھ الفاظ پڑھنا اور قرآنِ کریم کی تلاوت کی بنیادی تیاری۔ سبق منتخب کریں اور اپنی رفتار سے سیکھیں۔",
    language: "سبق کی زبان",
    english: "انگریزی",
    urdu: "اردو",
    arabic: "فصحیٰ عربی",
    note: "اس کورس کے بارے میں",
    noteText: "قاعدہ سکھانے کا ایک طریقہ ہے، دنیا بھر میں اس کی صرف ایک ہی کتاب یا ترتیب نہیں۔ مختلف علاقوں اور اساتذہ کے ہاں اسباق کی ترتیب اور اصطلاحات مختلف ہو سکتی ہیں۔ یہاں عام بنیادی اصول پیش کیے گئے ہیں؛ مستند استاد سے ضرور پڑھیں۔",
    quranic: "قرآنی قراءت اور فصحیٰ عربی",
    quranicText: "فصحیٰ عربی رسمی اور معیاری عربی ہے جو کتابوں، تعلیم اور رسمی گفتگو میں استعمال ہوتی ہے۔ قرآنِ کریم کی تلاوت کے اپنے مخصوص اور دقیق تجویدی قواعد ہیں۔ فصحیٰ سیکھنا عربی سمجھنے میں مدد دیتا ہے، لیکن صرف فصحیٰ بولنا درست تجوید نہیں سکھاتا۔",
    teacher: "سنیں، دہرائیں اور اصلاح کروائیں",
    teacherText: "عربی کی بعض آوازیں اردو یا انگریزی حروف سے پوری طرح ادا نہیں ہو سکتیں۔ ہر حرف کا مخرج اور صفات مستند استاد سے سیکھیں۔ صرف رومن تلفظ پر انحصار نہ کریں۔",
    practice: "روزانہ کی آسان مشق",
    practiceText: "روزانہ 10 سے 15 منٹ مشق کریں: پرانے حروف دہرائیں، ایک نیا مختصر سبق سیکھیں، مثالیں بلند آواز سے پڑھیں، پھر استاد سے سن کر تلفظ درست کروائیں۔",
    openQuran: "قرآن ریڈر کھولیں",
    hadith: "حدیث لائبریری کھولیں",
    home: "ہوم پیج پر واپس جائیں",
    lesson: "سبق",
    example: "پڑھنے کی مثالیں",
    explanation: "کیا سیکھنا ہے",
    caution: "استاد کے لیے نوٹ",
    footer: "یہ ابتدائی تعلیمی نوٹس مستند استاد کی رہنمائی کے ساتھ پڑھنے کے لیے ہیں۔ یہ مکمل قاعدے یا استاد کی نگرانی میں تلاوت کا متبادل نہیں۔"
  },
  ar: {
    eyebrow: "مسار تعليمي للمبتدئين والقراء في أنحاء العالم",
    title: "تعلّم قراءة العربية خطوةً خطوة",
    intro: "مقدمة منظّمة للتعرّف إلى الحروف العربية، وأشكالها، وكيفية وصلها، وقراءة الكلمات بالحركات، والاستعداد لتلاوة القرآن الكريم. اختر درساً وتعلّم وفق سرعتك.",
    language: "لغة الشرح",
    english: "الإنجليزية",
    urdu: "الأردية",
    arabic: "العربية الفصحى",
    note: "عن هذا المسار",
    noteText: "القاعدة منهج تعليمي يُستخدم في مجتمعات كثيرة، وليست كتاباً عالمياً واحداً بترتيب موحّد. قد تختلف أسماء الدروس وترتيبها بين المعلمين والبلدان. تعرض هذه الصفحة أصولاً شائعة، وينبغي دراستها مع معلّم مؤهّل.",
    quranic: "القراءة القرآنية والعربية الفصحى",
    quranicText: "الفصحى هي العربية المعيارية المستخدمة في الكتب والتعليم والتواصل الرسمي. ولتلاوة القرآن الكريم أحكام دقيقة في التجويد. تساعد الفصحى على فهم اللغة، لكن التحدث بها وحده لا يعلّم أحكام التلاوة الصحيحة.",
    teacher: "استمع وكرّر وتلقَّ التصحيح",
    teacherText: "لا يمكن تمثيل جميع الأصوات العربية تمثيلاً دقيقاً بحروف اللغات الأخرى. تعلّم مخرج كل حرف وصفاته من معلّم مؤهّل، ولا تعتمد على الكتابة الصوتية وحدها.",
    practice: "برنامج يومي مبسّط",
    practiceText: "خصّص من عشر إلى خمس عشرة دقيقة: راجع الحروف السابقة، وتعلّم نقطة جديدة صغيرة، واقرأ الأمثلة بصوت مسموع، ثم استمع إلى المعلّم وصحّح نطقك.",
    openQuran: "افتح قارئ القرآن",
    hadith: "افتح مكتبة الحديث",
    home: "العودة إلى الصفحة الرئيسية",
    lesson: "الدرس",
    example: "أمثلة للقراءة",
    explanation: "أهداف التعلّم",
    caution: "تنبيه للمتعلّم",
    footer: "هذه ملاحظات تعليمية أصلية للدراسة مع معلّم مؤهّل، وليست بديلاً عن كتاب قاعدة متكامل أو التلاوة بإشراف معلّم."
  }
};

const lessons = [
  {
    title: { en: "Arabic alphabet and letter names", ur: "عربی حروف اور ان کے نام", ar: "الحروف العربية وأسماؤها" },
    examples: "ا  ب  ت  ث  ج  ح  خ  د  ذ  ر  ز  س  ش  ص  ض  ط  ظ  ع  غ  ف  ق  ك  ل  م  ن  ه  و  ي",
    text: {
      en: "Recognise the 28 commonly taught Arabic letters, their names and their distinguishing dots. Learn the sounds carefully, especially letters that do not have an exact equivalent in English.",
      ur: "عام طور پر سکھائے جانے والے 28 عربی حروف، ان کے نام اور امتیازی نقطوں کو پہچانیں۔ حروف کی آوازیں احتیاط سے سیکھیں، خصوصاً وہ آوازیں جن کا اردو یا انگریزی میں مکمل متبادل نہیں۔",
      ar: "تعرّف إلى الحروف العربية الثمانية والعشرين الشائعة وأسمائها ونقاطها المميّزة. تعلّم أصواتها بعناية، ولا سيما الأصوات التي لا مقابل دقيقاً لها في اللغات الأخرى."
    },
    note: {
      en: "Letter names and letter sounds are different. Practise the sound of the letter in a word, not only its name.",
      ur: "حرف کا نام اور اس کی آواز الگ چیزیں ہیں۔ صرف نام نہیں بلکہ لفظ میں حرف کی آواز بھی سیکھیں۔",
      ar: "اسم الحرف يختلف عن صوته. تدرّب على صوت الحرف داخل الكلمة، لا على اسمه فقط."
    }
  },
  {
    title: { en: "Letter shapes and joining", ur: "حروف کی شکلیں اور جوڑ", ar: "أشكال الحروف واتصالها" },
    examples: "بـ  ـبـ  ـب  |  بـيـت  |  كِتَاب",
    text: {
      en: "Many Arabic letters change shape depending on whether they appear at the beginning, middle or end of a word. Six letters—ا، د، ذ، ر، ز، و—do not connect to the letter that follows them.",
      ur: "بہت سے عربی حروف لفظ کے شروع، درمیان یا آخر میں آنے کے مطابق شکل بدلتے ہیں۔ چھ حروف—ا، د، ذ، ر، ز، و—اپنے بعد آنے والے حرف سے نہیں جڑتے۔",
      ar: "تتغيّر أشكال كثير من الحروف بحسب موقعها في أول الكلمة أو وسطها أو آخرها. وهناك ستة أحرف لا تتصل بما بعدها: ا، د، ذ، ر، ز، و."
    },
    note: {
      en: "The examples show joining patterns, not a complete handwriting course. Some letters have more than one contextual form.",
      ur: "یہ مثالیں حروف کے جوڑ کو دکھاتی ہیں، مکمل خوش خطی کا کورس نہیں۔ بعض حروف کی موقع کے لحاظ سے مختلف شکلیں ہوتی ہیں۔",
      ar: "توضّح الأمثلة صور الاتصال، وليست درساً كاملاً في الخط. لبعض الحروف صور سياقية متعددة."
    }
  },
  {
    title: { en: "Short vowels (Harakat)", ur: "مختصر حرکات", ar: "الحركات القصيرة" },
    examples: "بَ  بِ  بُ",
    text: {
      en: "Fathah (َ) gives a short vowel commonly approximated as a; kasrah (ِ) as i; dammah (ُ) as u. The vowel is read with the consonant.",
      ur: "زبر (َ) مختصر a، زیر (ِ) مختصر i اور پیش (ُ) مختصر u کی آواز دیتا ہے۔ حرکت حرف کے ساتھ پڑھی جاتی ہے۔",
      ar: "الفتحة (َ) صوت قصير، والكسرة (ِ) صوت قصير، والضمة (ُ) صوت قصير. تُنطق الحركة مع الحرف."
    },
    note: {
      en: "These are learning approximations. Arabic vowel quality should be heard from a teacher and not forced into English vowel sounds.",
      ur: "یہ صرف ابتدائی سمجھانے کے لیے قریب ترین آوازیں ہیں۔ عربی حرکات کا درست تلفظ استاد سے سن کر سیکھیں۔",
      ar: "هذه أوصاف تقريبية للتعلّم. ينبغي سماع جودة الحركة العربية من معلّم، لا حصرها في أصوات لغات أخرى."
    }
  },
  {
    title: { en: "Tanween", ur: "تنوین", ar: "التنوين" },
    examples: "بً  بٍ  بٌ",
    text: {
      en: "Tanween is written as two vowel marks and generally adds an n-sound at the end of an indefinite noun: ـً، ـٍ، ـٌ. Its pronunciation changes in connected recitation according to Tajweed rules.",
      ur: "تنوین دوہری حرکت ہے جو عموماً غیر معین اسم کے آخر میں ن کی آواز پیدا کرتی ہے: ـً، ـٍ، ـٌ۔ ملا کر تلاوت کرتے وقت اس کے احکام تجوید کے مطابق بدلتے ہیں۔",
      ar: "التنوين علامتان من علامات الحركات، ويأتي غالباً في آخر الاسم النكرة بصوت نون: ـً، ـٍ، ـٌ. وتتغيّر أحكام نطقه عند الوصل وفق أحكام التجويد."
    },
    note: {
      en: "Do not add a written ن after the tanween. Learn the connected-reading rules later with a teacher.",
      ur: "تنوین کے بعد اپنی طرف سے نون نہ لکھیں۔ وصل کے احکام استاد سے الگ سیکھیں۔",
      ar: "لا تضف حرف النون كتابةً بعد التنوين. تعلّم أحكام الوصل لاحقاً مع المعلّم."
    }
  },
  {
    title: { en: "Sukoon and consonant closure", ur: "سکون اور حرف کو ساکن پڑھنا", ar: "السكون وإسكان الحرف" },
    examples: "أَبْ  مِنْ  هَلْ",
    text: {
      en: "Sukoon (ْ) indicates that a consonant has no vowel immediately after it. Read the consonant clearly and connect it correctly to the next sound.",
      ur: "سکون (ْ) بتاتا ہے کہ حرف کے بعد فوراً کوئی حرکت نہیں۔ حرف کو واضح ادا کریں اور اگلی آواز کے ساتھ درست طور پر ملائیں۔",
      ar: "يدلّ السكون (ْ) على أن الحرف لا حركة عليه. انطق الحرف بوضوح وصِلْه بالصوت الذي يليه على الوجه الصحيح."
    },
    note: {
      en: "Avoid inserting an extra vowel after a sakin letter. Some recitation contexts require specific rules.",
      ur: "ساکن حرف کے بعد اضافی حرکت نہ لگائیں۔ بعض قرآنی مقامات پر مخصوص تجویدی احکام ہوتے ہیں۔",
      ar: "تجنّب إضافة حركة زائدة بعد الحرف الساكن. لبعض مواضع التلاوة أحكام مخصوصة."
    }
  },
  {
    title: { en: "Long vowels (Madd)", ur: "مد اور لمبی آوازیں", ar: "المدّ والحروف المدّية" },
    examples: "بَا  بِي  بُو",
    text: {
      en: "The basic madd letters are ا، و، ي when their conditions are met: alif after fathah, sakin waw after dammah, and sakin ya after kasrah. Qur’anic madd durations vary by rule and context.",
      ur: "مد کے بنیادی حروف ا، و، ي ہیں، جب ان کی شرائط پوری ہوں: زبر کے بعد الف، پیش کے بعد ساکن واو، اور زیر کے بعد ساکن یا۔ قرآن میں مد کی مقدار قاعدے اور موقع کے مطابق ہوتی ہے۔",
      ar: "حروف المدّ الأساسية هي ا، و، ي عند تحقق شروطها: ألف بعد فتحة، وواو ساكنة بعد ضمة، وياء ساكنة بعد كسرة. وتختلف مقادير المدّ في التلاوة بحسب الحكم والسياق."
    },
    note: {
      en: "Do not assume every long sound is held for the same duration. Learn the categories of madd in Tajweed.",
      ur: "ہر لمبی آواز کو ایک ہی مقدار سے نہ کھینچیں۔ تجوید میں مد کی اقسام سیکھیں۔",
      ar: "لا تفترض أن كل مدّ له المقدار نفسه. تعلّم أنواع المدّ في علم التجويد."
    }
  },
  {
    title: { en: "Shaddah (doubling)", ur: "تشدید", ar: "الشّدّة" },
    examples: "رَبَّ  إِنَّ  ثُمَّ",
    text: {
      en: "Shaddah (ّ) indicates a doubled consonant. The letter is treated as two parts: the first sakin and the second vowelled. Give it its proper emphasis without exaggeration.",
      ur: "تشدید (ّ) حرف کو مشدد یعنی دوہرا ظاہر کرتی ہے۔ اسے دو حصوں کی طرح پڑھا جاتا ہے: پہلا ساکن اور دوسرا متحرک۔ درست ادائیگی کریں، غیر ضروری کھینچاؤ نہیں۔",
      ar: "تدلّ الشدّة (ّ) على تضعيف الحرف. ويُعامل الحرف كأنه حرفان: الأول ساكن والثاني متحرك. أعطه حقه من غير مبالغة."
    },
    note: {
      en: "When the doubled letter is نّ or مّ, additional Tajweed rules apply, including ghunnah.",
      ur: "جب مشدد حرف نّ یا مّ ہو تو غنہ سمیت مزید تجویدی احکام لاگو ہوتے ہیں۔",
      ar: "إذا كان الحرف المشدّد نّ أو مّ فتُراعى أحكام إضافية، ومنها الغنّة."
    }
  },
  {
    title: { en: "Hamzah, alif and special letters", ur: "ہمزہ، الف اور خاص حروف", ar: "الهمزة والألف والحروف الخاصة" },
    examples: "أ  إ  ؤ  ئ  ء  ة  ى",
    text: {
      en: "Learn to distinguish hamzah (ء) from alif (ا). Notice hamzah seats (أ، إ، ؤ، ئ), tāʾ marbūṭah (ة) at word endings, and alif maqṣūrah (ى). Their spelling and pronunciation depend on the word.",
      ur: "ہمزہ (ء) اور الف (ا) میں فرق سیکھیں۔ ہمزہ کی نشستیں (أ، إ، ؤ، ئ)، آخر میں تائے مربوطہ (ة) اور الف مقصورہ (ى) پہچانیں۔ ان کا املا اور تلفظ لفظ کے مطابق ہوتا ہے۔",
      ar: "تعلّم التمييز بين الهمزة (ء) والألف (ا)، وانتبه إلى صور الهمزة (أ، إ، ؤ، ئ)، والتاء المربوطة (ة) في أواخر الكلمات، والألف المقصورة (ى). ويعتمد رسمها ونطقها على الكلمة."
    },
    note: {
      en: "These forms are not interchangeable. Learn them through correctly written words and examples.",
      ur: "یہ شکلیں ایک دوسرے کی جگہ استعمال نہیں ہوتیں۔ درست الفاظ اور مثالوں کے ذریعے سیکھیں۔",
      ar: "هذه الصور ليست متبادلة في الاستعمال. تعلّمها من خلال كلمات مكتوبة كتابة صحيحة."
    }
  },
  {
    title: { en: "Sun and moon letters (Alif-Lam)", ur: "حروفِ شمسی اور قمری", ar: "الحروف الشمسية والقمرية" },
    examples: "الشَّمْسُ  |  الْقَمَرُ",
    text: {
      en: "With sun letters, the ل of ال is not pronounced and the following letter is doubled in pronunciation. With moon letters, the ل is pronounced clearly. This is a reading rule for the definite article.",
      ur: "حروفِ شمسی کے ساتھ ال کا لام ادا نہیں ہوتا اور اگلا حرف مشدد پڑھا جاتا ہے۔ حروفِ قمری کے ساتھ لام واضح پڑھا جاتا ہے۔ یہ معرفہ بنانے والے ال کا قاعدہ ہے۔",
      ar: "مع الحروف الشمسية لا يُنطق لام (الـ) وتُشدّد الحرف الذي بعده في النطق. ومع الحروف القمرية يُنطق اللام واضحاً. وهذا حكم في قراءة أداة التعريف."
    },
    note: {
      en: "The written form ال remains present in both cases; the difference is in pronunciation.",
      ur: "دونوں صورتوں میں ال لکھا رہتا ہے؛ فرق صرف تلفظ میں ہے۔",
      ar: "تبقى (الـ) مكتوبة في الحالتين، والاختلاف في النطق."
    }
  },
  {
    title: { en: "Introductory Tajweed: Noon and Meem", ur: "ابتدائی تجوید: نون اور میم", ar: "مدخل إلى التجويد: النون والميم" },
    examples: "مِنْ هَادٍ  |  مِنْ رَبِّهِمْ  |  ثُمَّ",
    text: {
      en: "After learning basic reading, study the rules of nūn sākinah and tanween: iẓhār, idghām, iqlāb and ikhfāʾ. Learn also the rules of mīm sākinah and the ghunnah of نّ and مّ.",
      ur: "بنیادی پڑھائی کے بعد نون ساکن اور تنوین کے احکام سیکھیں: اظہار، ادغام، اقلاب اور اخفاء۔ میم ساکن کے احکام اور نّ، مّ کے غنہ کو بھی استاد سے سیکھیں۔",
      ar: "بعد إتقان القراءة الأساسية، تعلّم أحكام النون الساكنة والتنوين: الإظهار والإدغام والإقلاب والإخفاء. وتعلّم أحكام الميم الساكنة والغنّة في النون والميم المشددتين."
    },
    note: {
      en: "These are names of rule categories, not a complete Tajweed lesson. Each rule has conditions and exceptions that need guided examples.",
      ur: "یہ قواعد کے نام ہیں، مکمل تجوید کا سبق نہیں۔ ہر قاعدے کی شرائط اور تفصیلات استاد کی مثالوں سے سیکھیں۔",
      ar: "هذه أسماء لأبواب الأحكام وليست درساً كاملاً في التجويد. لكل حكم شروط وتفاصيل تُتعلّم بالأمثلة مع المعلّم."
    }
  },
  {
    title: { en: "Qalqalah and stopping (Waqf)", ur: "قلقلہ اور وقف", ar: "القلقلة والوقف" },
    examples: "قْ  طْ  بْ  جْ  دْ  |  عَلِيمٌ ۝",
    text: {
      en: "Qalqalah is a controlled echoing quality on ق، ط، ب، ج، د when they are sakin, according to their position. Waqf means stopping at an appropriate place while observing the signs and rules of recitation.",
      ur: "قلقلہ حروف ق، ط، ب، ج، د کے ساکن ہونے پر مخصوص انداز سے آواز کی بازگشت ہے، جو مقام کے مطابق ہوتی ہے۔ وقف کا مطلب تلاوت کے قواعد اور علامات کا لحاظ رکھتے ہوئے مناسب جگہ رکنا ہے۔",
      ar: "القلقلة صفة صوتية في حروف ق، ط، ب، ج، د عند سكونها، وتُراعى درجتها بحسب الموضع. والوقف هو قطع الصوت على موضع مناسب مع مراعاة علامات الوقف وأحكام التلاوة."
    },
    note: {
      en: "Do not turn qalqalah into an added vowel. Correct stopping places should be learnt from a teacher and a reliable mushaf.",
      ur: "قلقلہ میں اضافی حرکت پیدا نہ کریں۔ وقف کی درست جگہیں استاد اور مستند مصحف سے سیکھیں۔",
      ar: "لا تجعل القلقلة حركةً زائدة. تعلّم مواضع الوقف الصحيحة من معلّم ومصحف موثوق."
    }
  }
];

export default function QaidaPage() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];
  return (
    <main className="quran-page qaida-page" lang={language === "ar" ? "ar" : language === "ur" ? "ur" : "en"} dir={language === "ar" || language === "ur" ? "rtl" : "ltr"}>
      <header className="quran-topbar">
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</a>
        <div className="quran-top-actions">
          <a className="quran-home-link" href="/hadith">{t.hadith}</a>
          <a className="quran-home-link" href="/">{t.home}</a>
        </div>
      </header>

      <section className="quran-heading">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <div className="qaida-language-picker">
          <label htmlFor="qaida-language">{t.language}</label>
          <select id="qaida-language" value={language} onChange={e => setLanguage(e.target.value as Language)}>
            <option value="en">{t.english}</option>
            <option value="ur">{t.urdu}</option>
            <option value="ar">{t.arabic}</option>
          </select>
        </div>
      </section>

      <section className="qaida-section" id="qaida-lessons" aria-label="Arabic Qaida learning lessons">
        <div className="qaida-lesson-grid">
          {lessons.map((item, index) => (
            <article className="qaida-lesson" key={item.title.en}>
              <span className="qaida-step">{t.lesson} {String(index + 1).padStart(2, "0")}</span>
              <h2>{item.title[language]}</h2>
              <div className="qaida-arabic" lang="ar" dir="rtl">{item.examples}</div>
              <h3>{t.explanation}</h3>
              <p>{item.text[language]}</p>
              <h3>{t.caution}</h3>
              <p>{item.note[language]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="qaida-section qaida-guidance">
        <div className="qaida-heading"><span className="eyebrow">العربية الفصحى · Fusha Arabic</span><h2>{t.quranic}</h2><p>{t.quranicText}</p></div>
        <div className="qaida-lesson-grid">
          <article className="qaida-lesson"><h3>{t.note}</h3><p>{t.noteText}</p></article>
          <article className="qaida-lesson"><h3>{t.teacher}</h3><p>{t.teacherText}</p></article>
          <article className="qaida-lesson"><h3>{t.practice}</h3><p>{t.practiceText}</p></article>
        </div>
        <div className="qaida-practice"><div><strong>{t.practice}</strong><p>{t.practiceText}</p></div><a href="/quran#quran-reader">{t.openQuran} →</a></div>
        <p className="qaida-disclaimer">{t.footer}</p>
      </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
