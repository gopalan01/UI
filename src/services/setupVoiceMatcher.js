/**
 * THAMILI Audio Generator - Setup Voice Matcher Service
 * Centralized normalization, phonetic alias matching, and multilingual voice recognition.
 * Supports Tamil, English, Malayalam, Hindi, Telugu, Kannada, Bengali, Marathi, Gujarati, etc.
 */

/**
 * Clean and normalize spoken transcript text:
 * 1. Convert to lowercase
 * 2. Trim whitespace
 * 3. Remove unnecessary punctuation & symbols
 * 4. Normalize multiple spaces
 * 5. Handle unicode text properly
 */
export function normalizeVoiceInput(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’‘]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const normalizeSpeechText = normalizeVoiceInput;

// ============================================================================
// CENTRALIZED STT LANGUAGE CODE MAP (ISO-639-1)
// Used to constrain STT transcription to the selected language after Step 1
// ============================================================================
export const STT_LANGUAGE_CODES = {
  tamil: 'ta',
  english: 'en',
  malayalam: 'ml',
  hindi: 'hi',
  telugu: 'te',
  kannada: 'kn',
  bengali: 'bn',
  marathi: 'mr',
  gujarati: 'gu',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  japanese: 'ja',
  arabic: 'ar'
};

// ============================================================================
// 1. LANGUAGE ALIASES
// ============================================================================
const LANGUAGE_ALIASES = {
  tamil: [
    'tamil', 'thamizh', 'tamizh', 'thamil', 'tamizha', 'tamizhan',
    'தமிழ்', 'தமிழு', 'தமீழ்', 'தமிள்', 'தமிழ் மொழி', 'தமிழ் பேசு', 'தமிழ் செலக்ட்', 'தமிழ் வேண்டும்', 'தமிழ் வேணும்',
    'தமிழ்ல', 'தமிழ்ல பேசணும்', 'தமிழில் பேசணும்', 'தமிழில் பேசு', 'தமில', 'தமில்', 'tamil language', 'tamil please', 'i want tamil'
  ],
  english: [
    'english', 'inglish', 'engleesh', 'angrezi', 'angreji', 'english language', 'english please', 'i want english',
    'இங்கிலிஷ்', 'ஆங்கிலம்', 'ஆங்கில மொழி', 'இங்லீஷ்', 'இங்கிலீஷ்', 'இங்கிலிசு', 'இங்கிலிஷ்ல பேசணும்', 'இங்கிலீஷ்ல பேசணும்',
    'ஆங்கிலத்தில் பேசணும்', 'ஆங்கிலத்தில் பேசு', 'english venum', 'english வேண்டும்', 'english வேணும்',
    'ഇംഗ്ലീഷ്', 'अंग्रेजी', 'ఇంగ్లీష్', 'ಇಂಗ್ಲಿಷ್', 'ইংরেজি'
  ],
  malayalam: [
    'malayalam', 'malyalam', 'malealam', 'mallealam', 'malayalam language', 'i want malayalam',
    'മലയാളം', 'മലയാള', 'മലയാള ഭാഷ', 'മലയാളത്തിൽ സംസാരിക്കൂ', 'മലയാളം വേണം',
    'மலையாளம்', 'மலையாள', 'மலயாளம்', 'மலையாளம் வேணும்', 'மலையாளத்துல பேசணும்', 'மலையாளத்தில் பேச வேண்டும்',
    'मलयालम', 'మలయాళం', 'ಮಲಯಾಳಂ'
  ],
  hindi: [
    'hindi', 'hindhi', 'hindi language', 'i want hindi',
    'हिंदी', 'हिन्दी', 'हिन्दी भाषा', 'हिंदी में बोलो',
    'இந்தி', 'ஹிந்தி', 'ஹிந்தி மொழி', 'இந்தில பேசணும்', 'ஹிந்தில பேசணும்',
    'ഹിന്ദി', 'హిందీ', 'ಹಿಂದಿ', 'হিন্দি'
  ],
  telugu: [
    'telugu', 'thelugu', 'telungu', 'telugu language', 'i want telugu',
    'తెలుగు', 'తెలుగు భాష', 'తెలుగులో మాట్లాడు',
    'தெலுங்கு', 'தெலுகு', 'தெலுங்கு மொழி', 'தெலுங்குல பேசணும்', 'தெலுங்கு வேண்டும்',
    'തെലുങ്ക്', 'तेलुगु', 'ತೆಲುಗು', 'తేలుగు'
  ],
  kannada: [
    'kannada', 'canarese', 'kannada language',
    'ಕನ್ನಡ', 'ಕನ್ನಡ ಭಾಷೆ', 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ',
    'கன்னடம்', 'கன்னட', 'கன்னடத்துல பேசணும்',
    'കന്നഡ', 'कन्नड़'
  ],
  bengali: [
    'bengali', 'bangla', 'bengali language',
    'বাংলা', 'বাংলা ভাষা', 'বাংলায় বলুন',
    'வங்காளம்', 'வங்காள', 'பெங்காலில பேசு',
    'बंगाली'
  ],
  marathi: [
    'marathi', 'marathi language',
    'मराठी', 'मराठी भाषा', 'मराठीत बोला', 'மராத்தி', 'மராத்தில பேசு'
  ],
  gujarati: [
    'gujarati', 'gujrati',
    'ગુજરાતી', 'ગુજરાતી ભાષા', 'ગુજરાતીમાં બોલો', 'குஜராத்தி', 'குஜராத்தில பேசு', 'गुजराती'
  ],
  spanish: ['spanish', 'español', 'habla en español', 'ஸ்பானிஷ்'],
  french: ['french', 'français', 'parle en français', 'பிரெஞ்சு'],
  german: ['german', 'deutsch', 'sprich deutsch', 'ஜெர்மன்'],
  japanese: ['japanese', '日本語', 'nihongo', '日本語で話して', 'ஜப்பானிய'],
  arabic: ['arabic', 'العربية', 'تحدث بالعربية', 'அரபு']
};

/**
 * Match a spoken transcript to a supported language.
 * Checks normalized transcript against all script aliases and common variations.
 */
export function matchLanguage(userText) {
  if (!userText) return null;
  const normalized = normalizeVoiceInput(userText);
  if (!normalized) return null;

  for (const [langId, aliases] of Object.entries(LANGUAGE_ALIASES)) {
    for (const alias of aliases) {
      const cleanAlias = normalizeVoiceInput(alias);
      if (
        normalized === cleanAlias ||
        normalized.startsWith(cleanAlias + ' ') ||
        normalized.endsWith(' ' + cleanAlias) ||
        normalized.includes(' ' + cleanAlias + ' ') ||
        normalized.includes(cleanAlias)
      ) {
        return langId;
      }
    }
  }

  return null;
}

export const matchLanguageAlias = matchLanguage;

// ============================================================================
// 2. VOICE TYPE ALIASES (Male, Female, Own Voice)
// ============================================================================

// OWN VOICE aliases
const OWN_VOICE_ALIASES = [
  'own', 'own voice', 'user voice', 'my voice', 'custom voice', 'my own voice', 'clone voice',
  'சொந்த குரல்', 'சொந்த வாய்ஸ்', 'என் குரல்', 'எனது குரல்', 'சொந்த குரல் வேண்டும்', 'சொந்த',
  'സ്വന്തം ശബ്ദം', 'എന്റെ ശബ്ദം', 'സ്വന്തം',
  'खुद की आवाज़', 'मेरी आवाज़', 'स्वयं की आवाज़', 'खुद की',
  'సొంత స్వరం', 'నా స్వరం', 'నా వాయిస్', 'సొంత వాయిస్',
  'ಸ್ವಂತ ಧ್ವನಿ', 'ನನ್ನ ಧ್ವನಿ',
  'নিজের কণ্ঠ'
];

// FEMALE VOICE aliases (Must be checked BEFORE Male because "female" contains "male")
const FEMALE_ALIASES = [
  // English
  'female',
  'female voice',
  'woman voice',
  'woman',
  'girl voice',
  'girl',
  'lady voice',
  'lady',
  'select female',
  'choose female',
  'female audio',
  'female sound',

  // Tamil
  'ஃபீமேல் வாய்ஸ்',
  'female voice',
  'பீமேல் வாய்ஸ்',
  'பெண் குரல்',
  'பெண் வாய்ஸ்',
  'பெண் குரல் வேண்டும்',
  'பெண் வாய்ஸ் வேண்டும்',
  'பெண் குரல் வேணும்',
  'பெண் வாய்ஸ் வேணும்',
  'பெண்',
  'பெண்குரல்',
  'பீமேல் வாய்ஸ',
  'ஃபீமேல்',
  'பீமேல்',
  'பீமெயில்',
  'ஃபீமெயில்',

  // Malayalam
  'സ്ത്രീ ശബ്ദം',
  'സ്ത്രീ സ്വരം',
  'female voice',
  'സ്ത്രീ',
  'സ്ത്രീ ശബ്ദം വേണം',
  'സ്ത്രീ സ്വരം വേണം',
  'ഫീമെയിൽ വോയ്സ്',
  'ഫീമെയിൽ',
  'പെൺ ശബ്ദം',
  'പെൺ സ്വരം',

  // Hindi
  'महिला आवाज़',
  'महिला स्वर',
  'महिला आवाज',
  'महिला',
  'फीमेल आवाज़',
  'फीमेल स्वर',
  'फीमेल वॉयस',
  'फीमेल वॉइस',
  'फीमेल',
  'female voice',
  'औरत की आवाज़',
  'स्त्री आवाज़',

  // Telugu
  'మహిళా స్వరం',
  'మహిళ స్వరం',
  'ఫీమేల్ వాయిస్',
  'female voice',
  'మహిళా వాయిస్',
  'మహిళ',
  'ఆడవారి స్వరం',
  'స్త్రీ స్వరం',
  'ఫీమేల్',

  // Kannada
  'ಮಹಿಳಾ ಧ್ವನಿ', 'ಹೆಣ್ಣು ಧ್ವನಿ', 'ಮಹಿಳೆ', 'ಫೀಮೇಲ್ ವಾಯ್ಸ್',
  // Bengali
  'নারী কণ্ঠ', 'মেয়েদের কণ্ঠ', 'নারী স্বর', 'নারী', 'ফিমেল ভয়েস',
  // Marathi
  'स्त्री आवाज', 'महिला आवाज', 'स्त्री स्वर',
  // Gujarati
  'સ્ત્રી અવાજ', 'મહિલા અવાજ'
];

// MALE VOICE aliases
const MALE_ALIASES = [
  // English
  'male',
  'male voice',
  'mail',
  'mail voice',
  'man voice',
  'man',
  'boy voice',
  'boy',
  'masculine voice',
  'select male',
  'choose male',
  'gentleman',
  'male audio',
  'male sound',

  // Tamil
  'மேல் வாய்ஸ்',
  'மேல் voice',
  'male வாய்ஸ்',
  'male voice வேண்டும்',
  'ஆண் குரல்',
  'ஆண் வாய்ஸ்',
  'ஆண் குரல் வேண்டும்',
  'ஆண் voice வேண்டும்',
  'ஆம்பள குரல்',
  'ஆண் குரல் வேணும்',
  'ஆண் வாய்ஸ் வேண்டும்',
  'ஆண் வாய்ஸ் வேணும்',
  'ஆண்',
  'ஆண்குரல்',
  'ஆன் குரல்',
  'ஆன் வாய்ஸ்',
  'மேல் வாய்ஸ',
  'மேல் வாய்ஸ் வேணும்',
  'மேல் வாய்ஸ் வேண்டும்',
  'மேல் வாய்ஸ் போடு',
  'மேல்',
  'மெயில் வாய்ஸ்',
  'மெயில் voice',

  // Malayalam
  'പുരുഷ ശബ്ദം',
  'പുരുഷ സ്വരം',
  'male voice',
  'പുരുഷൻ',
  'പുരുഷ ശബ്ദം വേണം',
  'പുരുഷ സ്വരം വേണം',
  'മേൽ വോയ്സ്',
  'മേൽ ശബ്ദം',
  'മേൽ',
  'ആൺ ശബ്ദം',
  'ആൺ സ്വരം',
  'പുരുഷ',
  'புருഷ ശബ്ദം',
  'புருഷ സ്വരം',
  'புருഷ',

  // Hindi
  'पुरुष आवाज़',
  'पुरुष स्वर',
  'पुरुष आवाज',
  'पुरुष',
  'मेल आवाज़',
  'मेल स्वर',
  'मेल वॉयस',
  'मेल वॉइस',
  'मेल',
  'male voice',
  'आदमी की आवाज़',
  'पुरुष की आवाज़',

  // Telugu
  'పురుష స్వరం',
  'పురుషుల స్వరం',
  'మగ వాయిస్',
  'మగవారి స్వరం',
  'మేల్ వాయిస్',
  'పురుష వాయిస్',
  'పురుష',
  'మేల్',
  'male voice',

  // Kannada
  'ಪುರುಷ ಧ್ವನಿ', 'ಗಂಡು ಧ್ವನಿ', 'ಪುರುಷ', 'ಮೇಲ್ ವಾಯ್ಸ್',
  // Bengali
  'পুরুষ কণ্ঠ', 'পুরুষ স্বর', 'পুরুষ', 'মেল ভয়েস',
  // Marathi
  'पुरुष आवाज', 'पुरुष स्वर',
  // Gujarati
  'પુરુષ અવાજ'
];

/**
 * Check if the normalized string contains the alias as a whole token or exact match,
 * or as a substring if it's a non-Latin / multi-word phrase.
 */
function textMatchesAlias(normalizedText, alias) {
  const cleanAlias = normalizeSpeechText(alias);
  if (!cleanAlias) return false;

  // Exact equality
  if (normalizedText === cleanAlias) return true;

  // Multi-word exact containment or edge boundary
  if (
    normalizedText.startsWith(cleanAlias + ' ') ||
    normalizedText.endsWith(' ' + cleanAlias) ||
    normalizedText.includes(' ' + cleanAlias + ' ')
  ) {
    return true;
  }

  // Non-ASCII scripts (Tamil, Malayalam, Hindi, Telugu, etc.)
  const isNonLatin = /[^\u0000-\u007F]/.test(cleanAlias);
  if (isNonLatin && normalizedText.includes(cleanAlias)) {
    return true;
  }

  // If alias has multiple words in Latin
  if (cleanAlias.includes(' ') && normalizedText.includes(cleanAlias)) {
    return true;
  }

  return false;
}

/**
 * Centralized and reliable voice type matcher.
 * Normalizes speech text before matching.
 * Checks Female aliases BEFORE Male aliases (since "female" contains "male").
 *
 * Returns exactly: "female" | "male" | "own" | null
 */
export function matchVoiceType(text) {
  if (!text) return null;

  // 1. Normalize speech text:
  // Convert to lowercase, trim spaces, remove punctuation, normalize spaces
  const normalizedText = text
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ");

  if (!normalizedText) return null;

  // 2. Check Own / Custom Voice
  for (const alias of OWN_VOICE_ALIASES) {
    if (textMatchesAlias(normalizedText, alias)) {
      return 'own';
    }
  }

  // 3. Check FEMALE aliases FIRST (crucial: "female voice" contains "male")
  for (const alias of FEMALE_ALIASES) {
    if (textMatchesAlias(normalizedText, alias)) {
      return 'female';
    }
  }

  // 4. Check MALE aliases SECOND
  for (const alias of MALE_ALIASES) {
    if (textMatchesAlias(normalizedText, alias)) {
      return 'male';
    }
  }

  return null;
}

/**
 * Backward compatibility alias for existing callers
 */
export function matchVoiceAlias(userText) {
  const res = matchVoiceType(userText);
  if (res === 'own') return 'user';
  return res;
}

// ============================================================================
// 3. COUNTRY / REGION ALIASES
// ============================================================================
export function matchCountry(userText, currentLangObj) {
  if (!userText) return null;
  const normalized = normalizeVoiceInput(userText);
  if (!normalized) return null;

  const regions = currentLangObj?.regions || [];

  // 1. Check current language regions by ID, name, nativeName
  for (const reg of regions) {
    const regId = reg.id.toLowerCase();
    const regName = normalizeVoiceInput(reg.name);
    const regNative = reg.nativeName ? normalizeVoiceInput(reg.nativeName) : '';

    if (
      normalized === regId ||
      normalized.includes(regId) ||
      normalized === regName ||
      normalized.includes(regName) ||
      (regNative && normalized.includes(regNative))
    ) {
      return reg.id;
    }
  }

  // 2. Common cross-lingual country phrases (India, US, UK, Malaysia, Singapore, Sri Lanka, UAE, etc.)
  if (
    normalized.includes('india') ||
    normalized.includes('இந்தியா') ||
    normalized.includes('இந்தியாவ') ||
    normalized.includes('இந்தியா வேணும்') ||
    normalized.includes('இந்திய நாடு') ||
    normalized.includes('தமிழ்நாடு') ||
    normalized.includes('tamil nadu') ||
    normalized.includes('bharat') ||
    normalized.includes('भारत') ||
    normalized.includes('ഭാരതം') ||
    normalized.includes('ഇന്ത്യ') ||
    normalized.includes('इंडिया') ||
    normalized.includes('భారతదేశం') ||
    normalized.includes('భారత్') ||
    normalized.includes('ఇండియా') ||
    normalized.includes('കേരളം') ||
    normalized.includes('kerala')
  ) {
    return regions.find((r) => r.id === 'india' || r.id === 'tamil_nadu')?.id || currentLangObj?.defaultRegion || regions[0]?.id || 'india';
  }

  if (
    normalized.includes('united states') ||
    normalized.includes('america') ||
    normalized.includes('american') ||
    normalized.includes('usa') ||
    normalized.includes('us') ||
    normalized.includes('அமெரிக்கா') ||
    normalized.includes('அமெரிக்கா வேணும்') ||
    normalized.includes('അമേരിക്ക') ||
    normalized.includes('अमेरिका')
  ) {
    return regions.find((r) => r.id === 'united_states')?.id || regions[0]?.id;
  }

  if (
    normalized.includes('united kingdom') ||
    normalized.includes('uk') ||
    normalized.includes('britain') ||
    normalized.includes('england') ||
    normalized.includes('london') ||
    normalized.includes('இங்கிலாந்து') ||
    normalized.includes('യുകെ') ||
    normalized.includes('ब्रिटेन')
  ) {
    return regions.find((r) => r.id === 'united_kingdom')?.id || regions[0]?.id;
  }

  if (
    normalized.includes('malaysia') ||
    normalized.includes('மலேசியா') ||
    normalized.includes('மலேசியா வேணும்') ||
    normalized.includes('മലേഷ്യ') ||
    normalized.includes('मलेशिया')
  ) {
    return regions.find((r) => r.id === 'malaysia')?.id || regions[0]?.id;
  }

  if (
    normalized.includes('singapore') ||
    normalized.includes('சிங்கப்பூர்') ||
    normalized.includes('சிங்கப்பூர் வேணும்') ||
    normalized.includes('സിംഗപ്പൂർ') ||
    normalized.includes('सिंगापुर')
  ) {
    return regions.find((r) => r.id === 'singapore')?.id || regions[0]?.id;
  }

  if (
    normalized.includes('sri lanka') ||
    normalized.includes('ceylon') ||
    normalized.includes('இலங்கை') ||
    normalized.includes('ശ്രീലങ്ക') ||
    normalized.includes('श्रीलंका')
  ) {
    return regions.find((r) => r.id === 'sri_lanka')?.id || regions[0]?.id;
  }

  if (
    normalized.includes('uae') ||
    normalized.includes('dubai') ||
    normalized.includes('emirates') ||
    normalized.includes('துபாய்')
  ) {
    return regions.find((r) => r.id.includes('uae'))?.id || regions[0]?.id;
  }

  return null;
}

export const matchRegionAlias = matchCountry;

// ============================================================================
// 4. SLANG / DIALECT ALIASES
// ============================================================================

// Detect negation keywords across languages (Tamil, English, Malayalam, Hindi, Telugu)
const NEGATIVE_PHRASES = [
  'வேண்டாம்', 'வேண்டா', 'வேணாம்', 'not', "don't want", 'dont want', 'no',
  'വേണ്ട', 'नहीं चाहिए', 'వద్దు'
];

// Detect desired / preference keywords across languages
const DESIRED_PHRASES = [
  'வேண்டும்', 'வேணும்', 'வேண்டும் எனக்கு', 'எனக்கு வேண்டும்', 'want', 'i want', 'use',
  'വേണം', 'चाहिए', 'కావాలి', 'పోடு'
];

function checkSlangMatch(segment, slangs) {
  for (const sl of slangs) {
    const sId = sl.id.toLowerCase();
    const sName = normalizeVoiceInput(sl.name);
    const sNative = sl.nativeName ? normalizeVoiceInput(sl.nativeName) : '';

    if (
      segment === sId ||
      segment.includes(sId) ||
      segment === sName ||
      segment.includes(sName) ||
      (sNative && segment.includes(sNative))
    ) {
      return sl.id;
    }
  }

  // Tamil specific slang keywords
  if (segment.includes('kongu') || segment.includes('கொங்கு') || segment.includes('coimbatore') || segment.includes('கோவை') || segment.includes('ஈரோடு') || segment.includes('ங்கண்ணா')) {
    return 'kongu_tamil';
  }
  if (segment.includes('chennai') || segment.includes('சென்னை') || segment.includes('madras') || segment.includes('மெட்ராஸ்') || segment.includes('பாஷை')) {
    return 'chennai_tamil';
  }
  if (segment.includes('madurai') || segment.includes('மதுரை') || segment.includes('தென் பாஷை')) {
    return 'madurai_tamil';
  }
  if (segment.includes('nellai') || segment.includes('நெல்லை') || segment.includes('tirunelveli') || segment.includes('திருநெல்வேலி') || segment.includes('அல்வா')) {
    return 'nellai_tamil';
  }
  if (segment.includes('standard tamil') || segment.includes('ஸ்டாண்டர்ட்') || segment.includes('செந்தமிழ்') || segment.includes('பொதுத் தமிழ்') || segment.includes('பொது தமிழ்') || segment.includes('சாதாரண தமிழ்') || segment.includes('நல்ல தமிழ்')) {
    return 'standard_tamil';
  }
  if (segment.includes('jaffna') || segment.includes('ஈழம்') || segment.includes('யாழ்ப்பாணம்')) {
    return 'jaffna_tamil';
  }

  // Malayalam specific slang keywords
  if (segment.includes('valluvanadan') || segment.includes('വള്ളുവനാടൻ') || segment.includes('valluvanadu')) {
    return 'valluvanadan_malayalam';
  }
  if (segment.includes('malabar') || segment.includes('മലബാർ') || segment.includes('kozhikode') || segment.includes('കോഴിക്കോട്')) {
    return 'malabar_malayalam';
  }
  if (segment.includes('travancore') || segment.includes('തിരുവിതാംകൂർ') || segment.includes('thiruvananthapuram')) {
    return 'travancore_malayalam';
  }

  // Hindi specific slang keywords
  if (segment.includes('delhi') || segment.includes('दिल्ली')) {
    return 'delhi_hindi';
  }
  if (segment.includes('mumbai') || segment.includes('मुंबई') || segment.includes('bambaiya')) {
    return slangs.find((s) => s.id.includes('mumbai'))?.id || 'delhi_hindi';
  }

  // Telugu specific slang keywords
  if (segment.includes('telangana') || segment.includes('తెలంగాణ') || segment.includes('hyderabad')) {
    return 'telangana_telugu';
  }
  if (segment.includes('andhra') || segment.includes('ఆంధ్ర') || segment.includes('coastal')) {
    return 'andhra_telugu';
  }

  // English specific slang keywords
  if (segment.includes('american') || segment.includes('casual')) {
    return slangs.find((s) => s.id.includes('american') || s.id.includes('casual'))?.id;
  }
  if (segment.includes('british') || segment.includes('rp')) {
    return slangs.find((s) => s.id.includes('british') || s.id.includes('rp'))?.id;
  }
  if (segment.includes('indian')) {
    return slangs.find((s) => s.id.includes('indian'))?.id;
  }

  return null;
}

export function matchSlang(userText, currentLangObj) {
  if (!userText) return null;
  const normalized = normalizeVoiceInput(userText);
  if (!normalized) return null;

  const slangs = currentLangObj?.slangs || [];

  // Preference logic for sentences with negation and desired target:
  // e.g. "எனக்கு கொங்கு தமிழ் வேண்டாம் மதுரை தமிழ் வேண்டும்" -> Madurai Tamil
  // If the sentence contains multiple slang mentions or negation words, split into segments
  // by punctuation, conjunctions, or right after negative words.
  const splitRegex = /[,;.\n]+|\s+(?:ஆனால்|ஆனா|but|and|மற்றும்)\s+|(?<=\b(?:வேண்டாம்|வேண்டா|வேணாம்|not|dont want|don't want|வേണ്ട|नहीं चाहिए|వద్దు))\s+/i;
  let clauses = normalized.split(splitRegex);
  if (clauses.length === 1) {
    // Also try splitting manually if negative words appear in the text
    for (const neg of NEGATIVE_PHRASES) {
      if (normalized.includes(neg)) {
        const idx = normalized.indexOf(neg) + neg.length;
        clauses = [normalized.slice(0, idx), normalized.slice(idx)];
        break;
      }
    }
  }

  let negatedSlangs = new Set();
  let desiredSlangs = [];

  // Analyze segmented clauses
  for (const clause of clauses) {
    const matched = checkSlangMatch(clause, slangs);
    if (matched) {
      const hasNegation = NEGATIVE_PHRASES.some((neg) => clause.includes(neg));
      const hasDesired = DESIRED_PHRASES.some((des) => clause.includes(des));

      if (hasNegation && !hasDesired) {
        negatedSlangs.add(matched);
      } else {
        desiredSlangs.push(matched);
      }
    }
  }

  // Pick the last desired slang that is not negated
  for (let i = desiredSlangs.length - 1; i >= 0; i--) {
    if (!negatedSlangs.has(desiredSlangs[i])) {
      return desiredSlangs[i];
    }
  }

  // If entire string has a matched slang that is not negated
  const directMatch = checkSlangMatch(normalized, slangs);
  if (directMatch && !negatedSlangs.has(directMatch)) {
    return directMatch;
  }

  // Common fallbacks
  if (
    normalized.includes('formal') ||
    normalized.includes('general') ||
    normalized.includes('பொது') ||
    normalized.includes('സാധാരണ') ||
    normalized.includes('शुद्ध') ||
    normalized.includes('ప్రామాణిక')
  ) {
    return slangs.find((s) => s.id.includes('standard'))?.id || slangs[0]?.id;
  }

  return null;
}

export const matchSlangAlias = matchSlang;

// ============================================================================
// 5. TONE / EMOTION ALIASES
// ============================================================================
export function matchTone(userText) {
  if (!userText) return null;
  const normalized = normalizeVoiceInput(userText);
  if (!normalized) return null;

  // HAPPY
  if (
    normalized.includes('happy') ||
    normalized.includes('ஹேப்பி') ||
    normalized.includes('மகிழ்ச்சி') ||
    normalized.includes('சந்தோஷம்') ||
    normalized.includes('சந்தோஷ') ||
    normalized.includes('happy tone') ||
    normalized.includes('happy voice') ||
    normalized.includes('khush') ||
    normalized.includes('खुश') ||
    normalized.includes('आनंद') ||
    normalized.includes('സന്തോഷം') ||
    normalized.includes('സന്തോഷ') ||
    normalized.includes('సంతోషం') ||
    normalized.includes('సంతోషంగా')
  ) {
    return 'happy';
  }

  // CALM
  if (
    normalized.includes('calm') ||
    normalized.includes('calm tone') ||
    normalized.includes('calm voice') ||
    normalized.includes('அமைதி') ||
    normalized.includes('அமைதியான') ||
    normalized.includes('சாந்தமான') ||
    normalized.includes('சாந்தம்') ||
    normalized.includes('shant') ||
    normalized.includes('शांत') ||
    normalized.includes('ശാന്തം') ||
    normalized.includes('ശാന്തമായ') ||
    normalized.includes('శాంతం') ||
    normalized.includes('ప్రశాంతం') ||
    normalized.includes('peaceful') ||
    normalized.includes('soothing')
  ) {
    return 'calm';
  }

  // FRIENDLY
  if (
    normalized.includes('friendly') ||
    normalized.includes('friendly tone') ||
    normalized.includes('friendly voice') ||
    normalized.includes('பிரண்ட்லி') ||
    normalized.includes('நட்பாக') ||
    normalized.includes('நட்பு') ||
    normalized.includes('நண்பன் மாதிரி') ||
    normalized.includes('தோழமை') ||
    normalized.includes('दोस्ताना') ||
    normalized.includes('सखा') ||
    normalized.includes('സൗഹൃദപരമായ') ||
    normalized.includes('സൗഹൃദം') ||
    normalized.includes('స్నేహపూర్వకంగా') ||
    normalized.includes('స్నేహపూర్వక')
  ) {
    return 'friendly';
  }

  // HUSKY / DEEP
  if (
    normalized.includes('husky') ||
    normalized.includes('husky voice') ||
    normalized.includes('ஹஸ்கி') ||
    normalized.includes('கரகரப்பான குரல்') ||
    normalized.includes('கரகரப்பான') ||
    normalized.includes('ஆழமான குரல்') ||
    normalized.includes('ஆழமான') ||
    normalized.includes('கம்பீரம்') ||
    normalized.includes('கம்பீரமான') ||
    normalized.includes('deep voice') ||
    normalized.includes('deep') ||
    normalized.includes('bold') ||
    normalized.includes('heavy voice') ||
    normalized.includes('भारी आवाज़') ||
    normalized.includes('गंभीर') ||
    normalized.includes('ഗംഭീര ശബ്ദം') ||
    normalized.includes('ഗംഭീരം') ||
    normalized.includes('లోతైన గొంతు') ||
    normalized.includes('గంభీరం')
  ) {
    return 'husky';
  }

  // DEFAULT / NORMAL
  if (
    normalized.includes('default') ||
    normalized.includes('normal') ||
    normalized.includes('இயல்பு') ||
    normalized.includes('இயல்பான') ||
    normalized.includes('சாதாரண') ||
    normalized.includes('सामान्य') ||
    normalized.includes('സാധാരണ') ||
    normalized.includes('సాధారణ')
  ) {
    return 'calm';
  }

  return null;
}

export const matchEmotionAlias = matchTone;

// ============================================================================
// 6. SPEECH SPEED ALIASES
// ============================================================================
export function matchSpeechSpeed(userText) {
  if (!userText) return null;
  const normalized = normalizeVoiceInput(userText);
  if (!normalized) return null;

  // SLOW
  if (
    normalized.includes('slow') ||
    normalized.includes('slow speed') ||
    normalized.includes('slow-ah') ||
    normalized.includes('slow ah') ||
    normalized.includes('மெதுவாக') ||
    normalized.includes('மெதுவா') ||
    normalized.includes('மெதுவா பேசு') ||
    normalized.includes('பொறுமையாக') ||
    normalized.includes('dheere') ||
    normalized.includes('धीमे') ||
    normalized.includes('धीरे') ||
    normalized.includes('धीमी') ||
    normalized.includes('പതുക്കെ') ||
    normalized.includes('నెమ్మదిగా')
  ) {
    return 'slow';
  }

  // FAST
  if (
    normalized.includes('fast') ||
    normalized.includes('fast speed') ||
    normalized.includes('quick') ||
    normalized.includes('speed') ||
    normalized.includes('வேகமாக') ||
    normalized.includes('வேகமா') ||
    normalized.includes('வேகமா பேசு') ||
    normalized.includes('சீக்கிரம்') ||
    normalized.includes('ஸ்பீடு') ||
    normalized.includes('ஸ்பீடா') ||
    normalized.includes('tez') ||
    normalized.includes('तेज़') ||
    normalized.includes('വേഗത്തിൽ') ||
    normalized.includes('వేగంగా')
  ) {
    return 'fast';
  }

  // NORMAL
  if (
    normalized.includes('normal') ||
    normalized.includes('normal speed') ||
    normalized.includes('medium') ||
    normalized.includes('standard') ||
    normalized.includes('நார்மல்') ||
    normalized.includes('நார்மல் ஸ்பீட்') ||
    normalized.includes('இயல்பு') ||
    normalized.includes('இயல்பாக') ||
    normalized.includes('சாதாரண வேகம்') ||
    normalized.includes('சாதாரண') ||
    normalized.includes('सामान्य') ||
    normalized.includes('samanya') ||
    normalized.includes('സാധാരണ') ||
    normalized.includes('సాధారణ') ||
    normalized.includes('సాధారణంగా')
  ) {
    return 'normal';
  }

  return null;
}

export const matchSpeedAlias = matchSpeechSpeed;
