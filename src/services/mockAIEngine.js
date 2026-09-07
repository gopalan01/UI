// THAMILI AI AUDIO PLATFORM - MULTILINGUAL & SLANG REASONING ENGINE
// Supports 14 Languages: Tamil, English, Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Spanish, French, German, Japanese, Arabic

import { 
  INTENT_DEFINITIONS, 
  BASE_RESPONSES, 
  SLANG_TRANSFORMERS, 
  generateDynamicQueryResponse 
} from '../constants/mockKnowledge.js';

// 1. Detect User Intent (Longest/Most specific pattern match wins)
export function detectIntent(text = '') {
  const normalized = text.toLowerCase().trim();
  let bestMatch = null;
  let maxPatternLength = 0;

  for (const intent of INTENT_DEFINITIONS) {
    for (const pattern of intent.patterns) {
      const p = pattern.toLowerCase();
      if (normalized.includes(p) && p.length > maxPatternLength) {
        maxPatternLength = p.length;
        bestMatch = intent.id;
      }
    }
  }
  return bestMatch;
}

// 2. Apply Slang and Regional Style
export function applySlangStyle(baseResponse, language = 'tamil', _region = 'tamil_nadu', slang = 'standard_tamil', intent = 'general_inquiry') {
  const langTransformers = SLANG_TRANSFORMERS[language];
  if (langTransformers && typeof langTransformers[slang] === 'function') {
    return langTransformers[slang](baseResponse, intent);
  }
  return baseResponse;
}

// 3. Intelligent Multi-Language & Slang Auto-Detector from Voice Speech
export function autoDetectLanguageAndSlang(speechText = '', currentConfig = { language: 'tamil', slang: 'kongu_tamil' }) {
  if (!speechText || !speechText.trim()) return null;
  const text = speechText.toLowerCase().trim();

  // A. Tamil Unicode / Tanglish
  if (/[\u0B80-\u0BFF]/.test(speechText) || ['vanakkam', 'epdi', 'eppadi', 'irukke', 'solla', 'sollunga', 'enna', 'nalla', 'saaptiya', 'saptingala'].some((w) => text.includes(w))) {
    if (text.includes('ங்கண்ணா') || text.includes('ண்ணா') || text.includes('கோவை') || text.includes('ஈரோடு') || text.includes('கொங்கு')) {
      return { language: 'tamil', region: 'tamil_nadu', slang: 'kongu_tamil', confidence: 0.98 };
    }
    if (text.includes('பா') || text.includes('மெட்ராஸ்') || text.includes('செம்ம') || text.includes('கெத்து') || text.includes('சென்னை')) {
      return { language: 'tamil', region: 'tamil_nadu', slang: 'chennai_tamil', confidence: 0.98 };
    }
    if (text.includes('யா') || text.includes('மதுரை') || text.includes('மல்லி') || text.includes('பாத்துக்கலாம்')) {
      return { language: 'tamil', region: 'tamil_nadu', slang: 'madurai_tamil', confidence: 0.98 };
    }
    if (text.includes('ஏலே') || text.includes('நெல்லை') || text.includes('அல்வா') || text.includes('திருநெல்வேலி')) {
      return { language: 'tamil', region: 'tamil_nadu', slang: 'nellai_tamil', confidence: 0.98 };
    }
    return { language: 'tamil', region: 'tamil_nadu', slang: currentConfig.language === 'tamil' ? currentConfig.slang : 'standard_tamil', confidence: 0.9 };
  }

  // B. Malayalam Unicode / Manglish
  if (/[\u0D00-\u0D7F]/.test(speechText) || ['namaskaram', 'sukhamano', 'enthokkeyundu', 'adipoli', 'changayi'].some((w) => text.includes(w))) {
    if (text.includes('ചങ്ങായി') || text.includes('കോഴിക്കോട്') || text.includes('മലബാർ')) {
      return { language: 'malayalam', region: 'malabar', slang: 'malabar_malayalam', confidence: 0.98 };
    }
    if (text.includes('അളിയാ') || text.includes('തിരുവനന്തപുരം')) {
      return { language: 'malayalam', region: 'travancore', slang: 'travancore_malayalam', confidence: 0.98 };
    }
    if (text.includes('ട്ടോ') || text.includes('വള്ളുവനാടൻ') || text.includes('പാലക്കാട്')) {
      return { language: 'malayalam', region: 'kerala', slang: 'valluvanadan_malayalam', confidence: 0.98 };
    }
    return { language: 'malayalam', region: 'kerala', slang: 'standard_malayalam', confidence: 0.9 };
  }

  // C. Kannada Unicode / Kanglish
  if (/[\u0C80-\u0CFF]/.test(speechText) || ['namaskara', 'hegidira', 'aramagidira', 'oota aaytha', 'bengaluru'].some((w) => text.includes(w))) {
    if (text.includes('ಗುರು') || text.includes('ಬೆಂಗಳೂರು')) {
      return { language: 'kannada', region: 'bengaluru', slang: 'bengaluru_kannada', confidence: 0.98 };
    }
    if (text.includes('ರೀ') || text.includes('ಮೈಸೂರು')) {
      return { language: 'kannada', region: 'mysuru', slang: 'mysuru_kannada', confidence: 0.98 };
    }
    if (text.includes('ಮಾರಾಯ್ರೆ') || text.includes('ಮಂಗಳೂರು')) {
      return { language: 'kannada', region: 'coastal_karnataka', slang: 'coastal_kannada', confidence: 0.98 };
    }
    return { language: 'kannada', region: 'bengaluru', slang: 'standard_kannada', confidence: 0.9 };
  }

  // D. Telugu Unicode / Teluglish
  if (/[\u0C00-\u0C7F]/.test(speechText) || ['ela unnaru', 'namaskaram', 'bagunnara', 'cheppandi'].some((w) => text.includes(w))) {
    if (text.includes('మామ') || text.includes('కిరాక్') || text.includes('హైదరాబాద్')) {
      return { language: 'telugu', region: 'hyderabad', slang: 'hyderabad_telugu', confidence: 0.98 };
    }
    if (text.includes('తెలంగాణ') || text.includes('ఏంది')) {
      return { language: 'telugu', region: 'telangana', slang: 'telangana_telugu', confidence: 0.98 };
    }
    if (text.includes('ఆంధ్ర') || text.includes('బాగున్నానండి')) {
      return { language: 'telugu', region: 'andhra_pradesh', slang: 'andhra_telugu', confidence: 0.98 };
    }
    return { language: 'telugu', region: 'telangana', slang: 'standard_telugu', confidence: 0.9 };
  }

  // E. Bengali Unicode
  if (/[\u0980-\u09FF]/.test(speechText)) {
    if (text.includes('দাদা') || text.includes('কলকাতা') || text.includes('ফাটাফাটি')) {
      return { language: 'bengali', region: 'kolkata', slang: 'kolkata_bengali', confidence: 0.98 };
    }
    if (text.includes('মামা') || text.includes('ঢাকা') || text.includes('অস্থির')) {
      return { language: 'bengali', region: 'dhaka', slang: 'dhakaiya_bengali', confidence: 0.98 };
    }
    return { language: 'bengali', region: 'kolkata', slang: 'standard_bengali', confidence: 0.9 };
  }

  // F. Gujarati Unicode
  if (/[\u0A80-\u0AFF]/.test(speechText)) {
    if (text.includes('અમદાવાદ') || text.includes('મજામા')) {
      return { language: 'gujarati', region: 'ahmedabad', slang: 'amdavad_gujarati', confidence: 0.98 };
    }
    if (text.includes('કાઠિયાવાડ') || text.includes('બાપુ') || text.includes('મોજ')) {
      return { language: 'gujarati', region: 'saurashtra', slang: 'kathiyawadi_gujarati', confidence: 0.98 };
    }
    return { language: 'gujarati', region: 'ahmedabad', slang: 'standard_gujarati', confidence: 0.9 };
  }

  // G. Hindi / Marathi Devanagari Unicode
  if (/[\u0900-\u097F]/.test(speechText)) {
    // Check Marathi specific words
    if (text.includes('कसे आहात') || text.includes('काय चाललंय') || text.includes('मराठी') || text.includes('पुणे') || text.includes('भावा') || text.includes('नादखुळा')) {
      if (text.includes('पुणे')) return { language: 'marathi', region: 'pune', slang: 'puneri_marathi', confidence: 0.98 };
      if (text.includes('मुंबई') || text.includes('भावा')) return { language: 'marathi', region: 'mumbai', slang: 'mumbai_marathi', confidence: 0.98 };
      if (text.includes('कोल्हापूर') || text.includes('नादखुळा')) return { language: 'marathi', region: 'kolhapur', slang: 'kolhapuri_marathi', confidence: 0.98 };
      return { language: 'marathi', region: 'pune', slang: 'standard_marathi', confidence: 0.9 };
    }

    // Otherwise Hindi
    if (text.includes('भाई') || text.includes('scene') || text.includes('दिल्ली')) {
      return { language: 'hindi', region: 'delhi', slang: 'delhi_hindi', confidence: 0.98 };
    }
    if (text.includes('बॉस') || text.includes('अपुन') || text.includes('बिंदास') || text.includes('मुंबई')) {
      return { language: 'hindi', region: 'mumbai', slang: 'mumbai_hindi', confidence: 0.98 };
    }
    if (text.includes('भइया') || text.includes('यूपी') || text.includes('प्रणाम')) {
      return { language: 'hindi', region: 'uttar_pradesh', slang: 'up_hindi', confidence: 0.98 };
    }
    if (text.includes('बा') || text.includes('का हाल बा') || text.includes('बिहार')) {
      return { language: 'hindi', region: 'bihar', slang: 'bihar_hindi', confidence: 0.98 };
    }
    return { language: 'hindi', region: 'delhi', slang: 'standard_hindi', confidence: 0.9 };
  }

  // H. Arabic Unicode
  if (/[\u0600-\u06FF]/.test(speechText)) {
    if (text.includes('هلا والله') || text.includes('طال عمرك') || text.includes('الخليج')) {
      return { language: 'arabic', region: 'saudi_arabia', slang: 'gulf_arabic', confidence: 0.98 };
    }
    if (text.includes('يا باشا') || text.includes('ازيك') || text.includes('مصر')) {
      return { language: 'arabic', region: 'egypt', slang: 'egyptian_arabic', confidence: 0.98 };
    }
    return { language: 'arabic', region: 'saudi_arabia', slang: 'standard_arabic', confidence: 0.9 };
  }

  // I. Japanese Unicode
  if (/[\u3040-\u30FF\u4E00-\u9FAF]/.test(speechText)) {
    if (text.includes('まいど') || text.includes('めっちゃ') || text.includes('関西')) {
      return { language: 'japanese', region: 'kansai', slang: 'kansai_japanese', confidence: 0.98 };
    }
    return { language: 'japanese', region: 'japan', slang: 'standard_japanese', confidence: 0.9 };
  }

  // J. Spanish specific keywords
  if (text.includes('hola') || text.includes('cómo estás') || text.includes('gracias') || text.includes('buenos días') || text.includes('por favor')) {
    if (text.includes('qué onda') || text.includes('chido') || text.includes('órale') || text.includes('méxico')) {
      return { language: 'spanish', region: 'mexico', slang: 'mexican_spanish', confidence: 0.95 };
    }
    if (text.includes('vale') || text.includes('genial') || text.includes('españa')) {
      return { language: 'spanish', region: 'spain', slang: 'castilian_spanish', confidence: 0.95 };
    }
    return { language: 'spanish', region: 'spain', slang: 'standard_spanish', confidence: 0.9 };
  }

  // K. French specific keywords
  if (text.includes('bonjour') || text.includes('salut') || text.includes('merci') || text.includes('comment allez-vous') || text.includes('s’il vous plaît')) {
    if (text.includes('ça roule') || text.includes('super')) {
      return { language: 'french', region: 'france', slang: 'casual_french', confidence: 0.95 };
    }
    if (text.includes('québec') || text.includes('tiguidou')) {
      return { language: 'french', region: 'canada_fr', slang: 'quebec_french', confidence: 0.95 };
    }
    return { language: 'french', region: 'france', slang: 'parisian_french', confidence: 0.9 };
  }

  // L. German specific keywords
  if (text.includes('hallo') || text.includes('guten tag') || text.includes('danke') || text.includes('wie gehts') || text.includes('auf wiedersehen')) {
    return { language: 'german', region: 'germany', slang: 'standard_german', confidence: 0.9 };
  }

  // Default: Keep user's active configuration if no strong trigger
  return null;
}

// 4. Apply Emotion and Tone Stylization
export function applyEmotionStyle(text, emotion = 'default', _language = 'tamil') {
  if (!emotion || emotion === 'default' || !text) return text;
  
  if (emotion === 'happy') return `😊 ${text}`;
  if (emotion === 'sad') return `🥺 ${text}`;
  if (emotion === 'husky') return `🎙️ ${text}`;
  if (emotion === 'excitement') return `🤩 ${text} ✨`;
  if (emotion === 'calm') return `🧘 ${text}`;
  if (emotion === 'romantic') return `💖 ${text}`;
  if (emotion === 'bold') return `🔥 ${text}`;
  return text;
}

// 5. Generate AI Response strictly in the Chosen or Auto-Detected Language, Dialect & Emotion
export function getMockAIResponse({ text, language = 'tamil', region = 'tamil_nadu', slang = 'standard_tamil', emotion = 'default' }) {
  const effectiveLang = BASE_RESPONSES[language] ? language : 'tamil';
  const langResponses = BASE_RESPONSES[effectiveLang] || BASE_RESPONSES.tamil;
  const detectedIntent = detectIntent(text);
  
  if (detectedIntent && langResponses[detectedIntent]) {
    const baseResponse = langResponses[detectedIntent];
    const stylizedResponse = applySlangStyle(baseResponse, effectiveLang, region, slang, detectedIntent);
    const emotionalResponse = applyEmotionStyle(stylizedResponse, emotion, effectiveLang);
    
    return {
      intent: detectedIntent,
      baseResponse,
      finalResponse: emotionalResponse,
      language: effectiveLang,
      emotion
    };
  }

  // Dynamic context-aware query response formulated strictly in the specific language and slang
  const dynamicResponse = generateDynamicQueryResponse(text, effectiveLang, slang);
  const emotionalResponse = applyEmotionStyle(dynamicResponse, emotion, effectiveLang);
  return {
    intent: 'custom_question',
    baseResponse: dynamicResponse,
    finalResponse: emotionalResponse,
    language: effectiveLang,
    emotion
  };
}

// 6. Explicit Language Switch Commands for all 14 Languages
export function checkExplicitLanguageSwitch(speechText = '') {
  const text = speechText.toLowerCase().trim();

  // Tamil
  if (text.includes('speak in tamil') || text.includes('switch to tamil') || text.includes('change language to tamil') || text.includes('தமிழ்ல பேசு') || text.includes('தமிழில் பேசு')) {
    return { language: 'tamil', region: 'tamil_nadu', slang: 'kongu_tamil', confirmation: "தமிழுக்கு மாற்றப்பட்டதுங்கண்ணா! இனிமேல் நான் உங்களிடம் தமிழில் பேசுவேன்." };
  }

  // English
  if (text.includes('speak in english') || text.includes('switch to english') || text.includes('change language to english') || text.includes('இங்கிலீஷ்ல பேசு') || text.includes('अंग्रेजी में बोलो')) {
    return { language: 'english', region: 'united_states', slang: 'american_standard', confirmation: "Switched to English. I am now ready to assist you in English!" };
  }

  // Hindi
  if (text.includes('speak in hindi') || text.includes('switch to hindi') || text.includes('change language to hindi') || text.includes('हिंदी में बोलो') || text.includes('ஹிந்தில பேசு')) {
    return { language: 'hindi', region: 'delhi', slang: 'standard_hindi', confirmation: "हिन्दी भाषा में बदला गया। अब मैं आपसे हिन्दी में बात करूँगा।" };
  }

  // Telugu
  if (text.includes('speak in telugu') || text.includes('switch to telugu') || text.includes('change language to telugu') || text.includes('తెలుగులో మాట్లాడు') || text.includes('தெலுங்குல பேசு')) {
    return { language: 'telugu', region: 'telangana', slang: 'standard_telugu', confirmation: "తెలుగు భాషకు మార్చబడింది. ఇకనుంచి నేను మీతో తెలుగులో మాట్లాడతాను." };
  }

  // Malayalam
  if (text.includes('speak in malayalam') || text.includes('switch to malayalam') || text.includes('മലയാളത്തിൽ സംസാരിക്കൂ') || text.includes('മലയാളം') || text.includes('மலையாளத்துல பேசு')) {
    return { language: 'malayalam', region: 'kerala', slang: 'standard_malayalam', confirmation: "മലയാളത്തിലേക്ക് മാറ്റി. ഇനിമുതൽ ഞാൻ താങ്കളോട് മലയാളത്തിൽ സംസാരിക്കും." };
  }

  // Kannada
  if (text.includes('speak in kannada') || text.includes('switch to kannada') || text.includes('ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ') || text.includes('ಕನ್ನಡ') || text.includes('கன்னடத்துல பேசு')) {
    return { language: 'kannada', region: 'bengaluru', slang: 'standard_kannada', confirmation: "ಕನ್ನಡ ಭಾಷೆಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ. ಇನ್ಮುಂದೆ ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ." };
  }

  // Bengali
  if (text.includes('speak in bengali') || text.includes('switch to bengali') || text.includes('বাংলায় বলুন') || text.includes('বাংলা') || text.includes('பெங்காலில பேசு')) {
    return { language: 'bengali', region: 'kolkata', slang: 'standard_bengali', confirmation: "বাংলা ভাষায় পরিবর্তন করা হয়েছে। এখন থেকে আমি বাংলায় কথা বলব।" };
  }

  // Marathi
  if (text.includes('speak in marathi') || text.includes('switch to marathi') || text.includes('मराठीत बोला') || text.includes('मराठी') || text.includes('மராத்தில பேசு')) {
    return { language: 'marathi', region: 'pune', slang: 'standard_marathi', confirmation: "मराठी भाषेत बदल केला आहे. आता मी आपल्याशी मराठीत बोलेन." };
  }

  // Gujarati
  if (text.includes('speak in gujarati') || text.includes('switch to gujarati') || text.includes('ગુજરાતીમાં બોલો') || text.includes('ગુજરાતી') || text.includes('குஜராத்தில பேசு')) {
    return { language: 'gujarati', region: 'ahmedabad', slang: 'standard_gujarati', confirmation: "ગુજરાતી ભાષા પસંદ થઈ ગઈ છે. હવે હું તમારી સાથે ગુજરાતીમાં વાત કરીશ." };
  }

  // Spanish
  if (text.includes('speak in spanish') || text.includes('switch to spanish') || text.includes('habla en español') || text.includes('hable en español')) {
    return { language: 'spanish', region: 'spain', slang: 'standard_spanish', confirmation: "Cambiado a español. ¡Ahora nos comunicaremos en español!" };
  }

  // French
  if (text.includes('speak in french') || text.includes('switch to french') || text.includes('parle en français') || text.includes('parlez en français')) {
    return { language: 'french', region: 'france', slang: 'parisian_french', confirmation: "Passé en français. Nous communiquerons désormais en français !" };
  }

  // German
  if (text.includes('speak in german') || text.includes('switch to german') || text.includes('sprich deutsch') || text.includes('sprechen sie deutsch')) {
    return { language: 'german', region: 'germany', slang: 'standard_german', confirmation: "Auf Deutsch umgestellt. Ich spreche ab jetzt auf Deutsch mit Ihnen!" };
  }

  // Japanese
  if (text.includes('speak in japanese') || text.includes('switch to japanese') || text.includes('日本語で話して') || text.includes('日本語')) {
    return { language: 'japanese', region: 'japan', slang: 'standard_japanese', confirmation: "日本語に切り替えました。これからは日本語でお話しします！" };
  }

  // Arabic
  if (text.includes('speak in arabic') || text.includes('switch to arabic') || text.includes('تحدث بالعربية') || text.includes('تكلم عربي')) {
    return { language: 'arabic', region: 'saudi_arabia', slang: 'standard_arabic', confirmation: "تم التبديل إلى اللغة العربية. سأتحدث معك باللغة العربية الآن!" };
  }

  return null;
}
