export const ALL_SUPPORTED_LANGUAGES = [
  // --- 1. TAMIL ---
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'tamil_nadu',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'ஆண் குரல் (Male Voice)',
        nativeName: 'தமிழ் ஆண் குரல்',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.84,
        rate: 1.0,
        description: 'கம்பீரமான, இயல்பான தமிழ் ஆண் குரல்'
      },
      {
        id: 'female',
        name: 'பெண் குரல் (Female Voice)',
        nativeName: 'தமிழ் பெண் குரல்',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.14,
        rate: 1.0,
        description: 'இனிமையான, தெளிவான தமிழ் பெண் குரல்'
      },
      {
        id: 'user',
        name: 'சொந்த குரல் (Own Voice)',
        nativeName: 'க்ளோன் செய்யப்பட்ட சொந்த குரல்',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'பதிவேற்றப்பட்ட ஆடியோ மூலம் தனிப்பயனாக்கப்பட்ட சொந்த குரல்'
      }
    ],
    regions: [
      { id: 'tamil_nadu', name: 'Tamil Nadu (தமிழ்நாடு)', bcp47: 'ta-IN' },
      { id: 'india_general', name: 'India (இந்தியா)', bcp47: 'ta-IN' },
      { id: 'sri_lanka', name: 'Sri Lanka (இலங்கை)', bcp47: 'ta-LK' },
      { id: 'singapore', name: 'Singapore (சிங்கப்பூர்)', bcp47: 'ta-SG' },
      { id: 'malaysia', name: 'Malaysia (மலேசியா)', bcp47: 'ta-MY' }
    ],
    slangs: [
      {
        id: 'kongu_tamil',
        name: 'Kongu Tamil',
        nativeName: 'கொங்கு தமிழ் (கோவை / ஈரோடு)',
        badge: 'ங்கண்ணா',
        description: 'Respectful, warm, featuring -nga, -nna suffixes',
        sampleGreeting: 'நல்லா இருக்கேங்கண்ணா! உங்களுக்கு என்ன உதவி வேணுமுங்கண்ணா?',
        confirmation: 'சரிங்கண்ணா, இனிமேல் நான் உங்களிடம் கொங்கு தமிழ் ஸ்டைலில் பேசுவேங்கண்ணா.'
      },
      {
        id: 'chennai_tamil',
        name: 'Chennai Tamil (Madras Bashai)',
        nativeName: 'சென்னை தமிழ் (மெட்ராஸ் பாஷை)',
        badge: 'பா / கெத்து',
        description: 'Energetic, urban Madras slang with pa, ba, da, semma',
        sampleGreeting: 'நல்லா இருக்கேன் பா! என்ன வேணும் சொல்லுங்க பாப்போம்.',
        confirmation: 'சூப்பர் பா! இனிமே நான் மெட்ராஸ் சென்னை தமிழ்ல கெத்தா பேசுறேன்.'
      },
      {
        id: 'madurai_tamil',
        name: 'Madurai Tamil',
        nativeName: 'மதுரை தமிழ் (தென் பாஷை)',
        badge: 'யா / கம்பீரம்',
        description: 'Bold, hospitable, traditional Madurai dialect with le, ya',
        sampleGreeting: 'நல்லா இருக்கேன்யா! என்ன உதவி வேணும்னு சொல்லுங்க, பாத்துக்கலாம்.',
        confirmation: 'சரிங்க! இனிமே மதுரை தமிழ் ஸ்டைல்ல நச்சுன்னு பேசுறேன்.'
      },
      {
        id: 'nellai_tamil',
        name: 'Nellai Tamil',
        nativeName: 'நெல்லை தமிழ் (திருநெல்வேலி)',
        badge: 'ஏலே / அல்வா',
        description: 'Affectionate, sweet, classic Tirunelveli style with yeley, ava',
        sampleGreeting: 'ஏலே நல்லா இருக்கேன்பா! என்ன விஷயம்னு சொல்லுங்க.',
        confirmation: 'அடடே சூப்பரு! இனிமே நெல்லை தமிழ் ஸ்டைல்ல பேசுறேன்.'
      },
      {
        id: 'standard_tamil',
        name: 'Standard Tamil',
        nativeName: 'செந்தமிழ் / பொதுத் தமிழ்',
        badge: 'பொதுத் தமிழ்',
        description: 'Formal, polite, standard grammatical Tamil',
        sampleGreeting: 'வணக்கம்! நான் நன்றாக இருக்கிறேன். உங்களுக்கு என்ன உதவி வேண்டும்?',
        confirmation: 'சரி, இனிமேல் நான் உங்களிடம் பொதுத் தமிழ் ஸ்டைலில் பேசுகிறேன்.'
      }
    ]
  },

  // --- 2. ENGLISH ---
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    flag: '🌐',
    category: 'global',
    defaultRegion: 'united_states',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'Male Voice',
        nativeName: 'Studio Male AI',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 1.0,
        description: 'Deep, clear studio English male voice'
      },
      {
        id: 'female',
        name: 'Female Voice',
        nativeName: 'Studio Female AI',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 1.0,
        description: 'Smooth, natural studio English female voice'
      },
      {
        id: 'user',
        name: 'Own Voice',
        nativeName: 'Custom Cloned Persona',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'Personalized cloned AI voice from your audio sample'
      }
    ],
    regions: [
      { id: 'united_states', name: 'United States', bcp47: 'en-US' },
      { id: 'united_kingdom', name: 'United Kingdom', bcp47: 'en-GB' },
      { id: 'india', name: 'India', bcp47: 'en-IN' },
      { id: 'australia', name: 'Australia', bcp47: 'en-AU' },
      { id: 'canada', name: 'Canada', bcp47: 'en-CA' }
    ],
    slangs: [
      {
        id: 'american_casual',
        name: 'Casual American English',
        nativeName: 'Casual US / West Coast',
        badge: 'Hey / Vibes',
        description: 'Relaxed, friendly American slang with hey, awesome, vibes',
        sampleGreeting: "Hey! I'm doing great. What's up?",
        confirmation: "Awesome! I'll keep things casual in American English for you."
      },
      {
        id: 'american_standard',
        name: 'American Standard',
        nativeName: 'Standard American English',
        badge: 'US Standard',
        description: 'Clear, modern professional US English',
        sampleGreeting: "Hello! I'm doing great. How can I assist you today?",
        confirmation: 'Great! I will now communicate using Standard American English.'
      },
      {
        id: 'british_casual',
        name: 'Casual British Style',
        nativeName: 'Casual UK / London Mate',
        badge: 'Mate / Cheers',
        description: 'Friendly UK colloquial with mate, cheers, brilliant, sorted',
        sampleGreeting: "I'm doing well, mate. How can I help you?",
        confirmation: 'Cheers mate! I will now communicate using Casual British style.'
      },
      {
        id: 'british_standard',
        name: 'British English',
        nativeName: 'Standard British (RP)',
        badge: 'UK Standard',
        description: 'Refined, articulate UK English',
        sampleGreeting: 'Good day! I am doing very well. How may I be of assistance?',
        confirmation: 'Brilliant! I will now communicate in Standard British English.'
      },
      {
        id: 'indian_english',
        name: 'Indian English',
        nativeName: 'Indian English (Desi Style)',
        badge: 'Desi Style',
        description: 'Polite, expressive Indian colloquial English',
        sampleGreeting: 'Hey! Doing absolutely fine. Tell me, how can I help you today?',
        confirmation: 'Done! I will now communicate in Indian English style.'
      },
      {
        id: 'australian_casual',
        name: 'Australian English',
        nativeName: 'Aussie / Down Under',
        badge: "G'day / Mate",
        description: "Laid-back Aussie slang with g'day, mate, no worries",
        sampleGreeting: "G'day! Doing good, mate. How can I help you?",
        confirmation: "No worries mate! I'll chat with you in Aussie style from now on."
      }
    ]
  },

  // --- 3. HINDI ---
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'delhi',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'पुरुष स्वर (Male Voice)',
        nativeName: 'हिन्दी पुरुष स्वर',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.96,
        description: 'आत्मविश्वास से भरपूर प्राकृतिक हिन्दी पुरुष आवाज़'
      },
      {
        id: 'female',
        name: 'महिला स्वर (Female Voice)',
        nativeName: 'हिन्दी महिला स्वर',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.96,
        description: 'मधुर और स्पष्ट प्राकृतिक हिन्दी महिला आवाज़'
      },
      {
        id: 'user',
        name: 'अपनी आवाज़ (Own Voice)',
        nativeName: 'क्लोन की गई आवाज़',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'आपके ऑडियो सैंपल से बनाई गई व्यक्तिगत आवाज़'
      }
    ],
    regions: [
      { id: 'delhi', name: 'Delhi NCR (दिल्ली)', bcp47: 'hi-IN' },
      { id: 'mumbai', name: 'Mumbai / Maharashtra (मुंबई)', bcp47: 'hi-IN' },
      { id: 'uttar_pradesh', name: 'Uttar Pradesh (उत्तर प्रदेश)', bcp47: 'hi-IN' },
      { id: 'bihar', name: 'Bihar (बिहार)', bcp47: 'hi-IN' },
      { id: 'india_general', name: 'Standard India (भारत)', bcp47: 'hi-IN' }
    ],
    slangs: [
      {
        id: 'delhi_hindi',
        name: 'Delhi Hindi',
        nativeName: 'दिल्ली हिन्दी (Delhi Style)',
        badge: 'भाई / Scene',
        description: 'Modern, high-energy Delhi slang with bhai, scene, batao',
        sampleGreeting: 'बढ़िया हूँ भाई, बताओ क्या मदद चाहिए?',
        confirmation: 'बढ़िया भाई! अब मैं आपसे Delhi Hindi communication style में बात करूँगा।'
      },
      {
        id: 'mumbai_hindi',
        name: 'Mumbai Hindi (Bambaiya)',
        nativeName: 'मुंबईया हिन्दी (Bambaiya Style)',
        badge: 'बिंदास / बॉस',
        description: 'Iconic Mumbai slang with bindass, kya bolte, boss, apun',
        sampleGreeting: 'एकदम मस्त! बोलो बॉस, क्या चाहिए?',
        confirmation: 'अपुन रेडी है बॉस! अब एकदम बिंदास मुंबईया स्टाइल में बात होगी।'
      },
      {
        id: 'up_hindi',
        name: 'Uttar Pradesh Hindi',
        nativeName: 'यूपी स्टाइल हिन्दी (अवधी / कनपुरिया)',
        badge: 'भइया / प्रणाम',
        description: 'Respectful, charismatic UP dialect with bhaiya, bataiye',
        sampleGreeting: 'प्रणाम भइया! हम एकदम मजे में हैं। बताइए क्या सेवा करें?',
        confirmation: 'बिल्कुल सही! अब हम आपसे यूपी स्टाइल हिन्दी में बतियाएंगे।'
      },
      {
        id: 'bihar_hindi',
        name: 'Bhojpuri-Influenced Hindi',
        nativeName: 'बिहारी / भोजपुरी हिन्दी',
        badge: 'का हाल बा',
        description: 'Warm, rhythmic regional style with raua, kaheen, theek ba',
        sampleGreeting: 'सब ठीक बा हो! कहिए का हाल बा, का मदद चाही?',
        confirmation: 'बहुत बढ़िया! अब हम आपसे इसी अंदाज में बात करेंगे।'
      },
      {
        id: 'standard_hindi',
        name: 'Standard Hindi',
        nativeName: 'मानक हिन्दी (शुद्ध हिन्दी)',
        badge: 'मानक हिन्दी',
        description: 'Formal, polite, standard conversational Hindi',
        sampleGreeting: 'नमस्ते! मैं बिल्कुल ठीक हूँ। मैं आपकी क्या मदद कर सकता हूँ?',
        confirmation: 'उत्तम! अब मैं आपसे मानक हिन्दी में बात करूँगा।'
      }
    ]
  },

  // --- 4. TELUGU ---
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'telangana',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'పురుష స్వరం (Male Voice)',
        nativeName: 'తెలుగు పురుష వాయిస్',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.96,
        description: 'స్పష్టమైన, సహజమైన తెలుగు పురుష స్వరం'
      },
      {
        id: 'female',
        name: 'స్త్రీ స్వరం (Female Voice)',
        nativeName: 'తెలుగు స్త్రీ వాయిస్',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.96,
        description: 'మధురమైన మరియు స్పష్టమైన తెలుగు స్త్రీ స్వరం'
      },
      {
        id: 'user',
        name: 'స్వంత వాయిస్ (Own Voice)',
        nativeName: 'క్లోన్ చేయబడిన స్వరం',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'మీ ఆడియో నమూనాతో వ్యక్తిగతీకరించిన స్వరం'
      }
    ],
    regions: [
      { id: 'telangana', name: 'Telangana (తెలంగాణ)', bcp47: 'te-IN' },
      { id: 'andhra_pradesh', name: 'Andhra Pradesh (ఆంధ్రప్రదేశ్)', bcp47: 'te-IN' },
      { id: 'hyderabad', name: 'Hyderabad (హైదరాబాద్)', bcp47: 'te-IN' },
      { id: 'rayalaseema', name: 'Rayalaseema (రాయలసీమ)', bcp47: 'te-IN' }
    ],
    slangs: [
      {
        id: 'telangana_telugu',
        name: 'Telangana Telugu',
        nativeName: 'తెలంగాణ తెలుగు (Telangana Style)',
        badge: 'ఏంది / చెప్పండి',
        description: 'Authentic, vibrant Telangana dialect with endi, cheppandi',
        sampleGreeting: 'నేను బాగున్నాను. మీకు ఏం కావాలో చెప్పండి.',
        confirmation: 'ఇప్పుడు నేను Telangana Telugu style లో మీతో మాట్లాడతాను.'
      },
      {
        id: 'hyderabad_telugu',
        name: 'Hyderabad Telugu Style',
        nativeName: 'హైదరాబాదీ తెలుగు (City Blend)',
        badge: 'మస్తు / మామ',
        description: 'Fast, cosmopolitan Hyderabad mix with mama, mastu, cheppu',
        sampleGreeting: 'మస్తుగున్న మామ! చెప్పు, ఏం హెల్ప్ కావాలి?',
        confirmation: 'మస్తు! ఇకనుంచి హైదరాబాదీ స్టైల్ లో ముచ్చట్లు పెడదాం.'
      },
      {
        id: 'andhra_telugu',
        name: 'Andhra Telugu (Coastal)',
        nativeName: 'ఆంధ్ర తెలుగు (కోస్తా ఆంధ్ర)',
        badge: 'బాగున్నానండి',
        description: 'Melodious, expressive Coastal Andhra dialect with andi, babu',
        sampleGreeting: 'బాగున్నానండి. మీకు ఏమైనా సహాయం కావాలా చెప్పండి?',
        confirmation: 'సరేనండి! ఇకనుంచి ఆంధ్ర తెలుగు శైలిలో మీతో మాట్లాడతాను.'
      },
      {
        id: 'standard_telugu',
        name: 'Standard Telugu',
        nativeName: 'ప్రామాణిక తెలుగు (Standard)',
        badge: 'ప్రామాణికం',
        description: 'Refined, grammatical, standard Telugu',
        sampleGreeting: 'నమస్కారం! నేను బాగున్నాను. మీకు ఎలా సహాయం చేయగలను?',
        confirmation: 'చాలా మంచిది! ఇకపై నేను ప్రామాణిక తెలుగులో మాట్లాడతాను.'
      }
    ]
  },

  // --- 5. MALAYALAM ---
  {
    id: 'malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'kerala',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'പുരുഷ സ്വരം (Male Voice)',
        nativeName: 'മലയാളം പുരുഷ സ്വരം',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.95,
        description: 'ഗംഭീരവും സ്വാഭാവികവുമായ മലയാളം പുരുഷ ശബ്ദം'
      },
      {
        id: 'female',
        name: 'സ്ത്രീ സ്വരം (Female Voice)',
        nativeName: 'മലയാളം സ്ത്രീ സ്വരം',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.95,
        description: 'മധുരവും വ്യക്തവുമായ മലയാളം സ്ത്രീ ശബ്ദം'
      },
      {
        id: 'user',
        name: 'സ്വന്തം ശബ്ദം (Own Voice)',
        nativeName: 'ക്ലോൺ ചെയ്ത ശബ്ദം',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'നിങ്ങളുടെ ഓഡിയോ സാമ്പിൾ അടിസ്ഥാനമാക്കിയുള്ള വ്യക്തിഗത ശബ്ദം'
      }
    ],
    regions: [
      { id: 'kerala', name: 'Kerala (കേരളം)', bcp47: 'ml-IN' },
      { id: 'malabar', name: 'Malabar / Kozhikode (മലബാർ)', bcp47: 'ml-IN' },
      { id: 'travancore', name: 'Travancore / Trivandrum (തിരുവിതാംകൂർ)', bcp47: 'ml-IN' },
      { id: 'kochi', name: 'Kochi / Central (കൊച്ചി)', bcp47: 'ml-IN' }
    ],
    slangs: [
      {
        id: 'valluvanadan_malayalam',
        name: 'Valluvanadan Malayalam',
        nativeName: 'വള്ളുവനാടൻ മലയാളം (പാലക്കാട് / ഷൊർണ്ണൂർ)',
        badge: 'എന്തൂട്ടാ / സ്നേഹം',
        description: 'Sweet, traditional, poetic central Kerala dialect',
        sampleGreeting: 'സുഖമായിരിക്കുന്നു ട്ടോ! എന്താണ് അറിയേണ്ടത് എന്ന് പറയൂ.',
        confirmation: 'ശരി ട്ടോ! ഇനി ഞാൻ നിങ്ങളോട് വള്ളുവനാടൻ ശൈലിയിൽ സംസാരിക്കാം.'
      },
      {
        id: 'malabar_malayalam',
        name: 'Malabar Malayalam',
        nativeName: 'കോഴിക്കോടൻ / മലബാർ ശൈലി',
        badge: 'ചങ്ങായി / അടിപൊളി',
        description: 'Warm, hospitable Kozhikode Malabar dialect with changayi, adipoli',
        sampleGreeting: 'എന്തൊക്കെയുണ്ട് വിശേഷം ചങ്ങായീ? ഞാൻ റെഡിയാണ്!',
        confirmation: 'അടിപൊളി! ഇനി നമ്മൾ മലബാർ ശൈലിയിൽ കൊഞ്ചാം.'
      },
      {
        id: 'travancore_malayalam',
        name: 'Travancore Malayalam',
        nativeName: 'തെക്കൻ തിരുവിതാംകൂർ ശൈലി',
        badge: 'അളിയാ / സുഖം',
        description: 'Energetic southern Trivandrum dialect with aliya, parayeda',
        sampleGreeting: 'സുഖമാണളിയാ! എന്താ കാര്യം എന്ന് പെട്ടെന്ന് പറ.',
        confirmation: 'ശരി അളിയാ! ഇനിമുതൽ തിരുവിതാംകൂർ ശൈലിയിൽ പൊളിക്കാം.'
      },
      {
        id: 'standard_malayalam',
        name: 'Standard Malayalam',
        nativeName: 'ശുദ്ധ മലയാളം (Standard)',
        badge: 'ശുദ്ധ മലയാളം',
        description: 'Clear, formal, grammatical standard Malayalam',
        sampleGreeting: 'നമസ്കാരം! ഞാൻ സുഖമായിരിക്കുന്നു. താങ്കൾക്ക് എന്ത് സഹായമാണ് വേണ്ടത്?',
        confirmation: 'ശരി, ഇനിമുതൽ ഞാൻ നിങ്ങളോട് ശുദ്ധ മലയാളത്തിൽ സംസാരിക്കുന്നതാണ്.'
      }
    ]
  },

  // --- 6. KANNADA ---
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'bengaluru',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'ಪುರುಷ ಧ್ವನಿ (Male Voice)',
        nativeName: 'ಕನ್ನಡ ಪುರುಷ ಧ್ವನಿ',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.95,
        description: 'ಗಂಭೀರವಾದ ಮತ್ತು ನೈಸರ್ಗಿಕ ಕನ್ನಡ ಪುರುಷ ಧ್ವನಿ'
      },
      {
        id: 'female',
        name: 'ಮಹಿಳಾ ಧ್ವನಿ (Female Voice)',
        nativeName: 'ಕನ್ನಡ ಮಹಿಳಾ ಧ್ವನಿ',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.95,
        description: 'ಮಧುರವಾದ ಮತ್ತು ಸ್ಪಷ್ಟವಾದ ಕನ್ನಡ ಮಹಿಳಾ ಧ್ವನಿ'
      },
      {
        id: 'user',
        name: 'ಸ್ವಂತ ಧ್ವನಿ (Own Voice)',
        nativeName: 'ಕ್ಲೋನ್ ಮಾಡಿದ ಧ್ವನಿ',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'ನಿಮ್ಮ ಆಡಿಯೋ ಮಾದರಿಯೊಂದಿಗೆ ಕಸ್ಟಮ್ ಧ್ವನಿ'
      }
    ],
    regions: [
      { id: 'bengaluru', name: 'Bengaluru (ಬೆಂಗಳೂರು)', bcp47: 'kn-IN' },
      { id: 'mysuru', name: 'Mysuru (ಮೈಸೂರು)', bcp47: 'kn-IN' },
      { id: 'coastal_karnataka', name: 'Coastal / Mangaluru (ಕರಾವಳಿ)', bcp47: 'kn-IN' },
      { id: 'north_karnataka', name: 'North Karnataka / Hubballi (ಉತ್ತರ ಕರ್ನಾಟಕ)', bcp47: 'kn-IN' }
    ],
    slangs: [
      {
        id: 'bengaluru_kannada',
        name: 'Bengaluru Kannada',
        nativeName: 'ಬೆಂಗಳೂರು ಕನ್ನಡ (City Style)',
        badge: 'ಗುರು / ಸೂಪರ್',
        description: 'Modern, high-energy Bengaluru urban Kannada with guru, macha',
        sampleGreeting: 'ಚೆನ್ನಾಗಿದ್ದೀನಿ ಗುರು! ಏನ್ ಸಮಾಚಾರ, ಏನ್ ಹೆಲ್ಪ್ ಬೇಕು?',
        confirmation: 'ಸೂಪರ್ ಗುರು! ಇನ್ಮೇಲೆ ಬೆಂಗಳೂರು ಸ್ಟೈಲ್‌ನಲ್ಲೇ ಮಾತಾಡೋಣ.'
      },
      {
        id: 'mysuru_kannada',
        name: 'Mysuru Kannada',
        nativeName: 'ಮೈಸೂರು ರಾಜಮನೆತನ ಶೈಲಿ',
        badge: 'ರೀ / ನಮಸ್ಕಾರ',
        description: 'Polite, sweet, cultured royal Mysuru dialect',
        sampleGreeting: 'ನಮಸ್ಕಾರ ರೀ, ಚೆನ್ನಾಗಿದ್ದೀನಿ. ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು ಹೇಳಿ?',
        confirmation: 'ತುಂಬಾ ಸಂತೋಷ ರೀ! ಇನ್ಮುಂದೆ ಮೈಸೂರು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ.'
      },
      {
        id: 'coastal_kannada',
        name: 'Coastal Kannada (Mangaluru)',
        nativeName: 'ಕರಾವಳಿ / ಮಂಗಳೂರು ಕನ್ನಡ',
        badge: 'ಮಾರಾಯ್ರೆ / ಖಂಡಿತ',
        description: 'Melodious, expressive coastal Karnataka dialect',
        sampleGreeting: 'ಆರಾಮಾಗಿದ್ದೀನಿ ಮಾರಾಯ್ರೆ! ಏನ್ ವಿಷ್ಯಾ ಹೇಳಿ?',
        confirmation: 'ಖಂಡಿತ ಮಾರಾಯ್ರೆ! ಇನ್ಮೇಲೆ ಕರಾವಳಿ ಶೈಲಿಯಲ್ಲಿ ಮಾತಾಡ್ತೇನೆ.'
      },
      {
        id: 'standard_kannada',
        name: 'Standard Kannada',
        nativeName: 'ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡ (Standard)',
        badge: 'ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡ',
        description: 'Formal, polite, standard grammatical Kannada',
        sampleGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ಕ್ಷೇಮವಾಗಿದ್ದೇನೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
        confirmation: 'ಉತ್ತಮ! ಇನ್ಮುಂದೆ ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ.'
      }
    ]
  },

  // --- 7. BENGALI ---
  {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'kolkata',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'পুরুষ কণ্ঠ (Male Voice)',
        nativeName: 'বাংলা পুরুষ কণ্ঠ',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.95,
        description: 'গম্ভীর ও প্রাঞ্জল বাংলা পুরুষ কণ্ঠস্বর'
      },
      {
        id: 'female',
        name: 'নারী কণ্ঠ (Female Voice)',
        nativeName: 'বাংলা নারী কণ্ঠ',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.95,
        description: 'মিষ্টি ও স্পষ্ট বাংলা নারী কণ্ঠস্বর'
      },
      {
        id: 'user',
        name: 'নিজের কণ্ঠ (Own Voice)',
        nativeName: 'ক্লোন করা কণ্ঠ',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'আপনার অডিও স্যাম্পল দিয়ে তৈরি ক্লোন ভয়েস'
      }
    ],
    regions: [
      { id: 'kolkata', name: 'Kolkata / West Bengal (কলকাতা)', bcp47: 'bn-IN' },
      { id: 'dhaka', name: 'Dhaka / Bangladesh (ঢাকা)', bcp47: 'bn-BD' },
      { id: 'siliguri', name: 'North Bengal (উত্তরবঙ্গ)', bcp47: 'bn-IN' }
    ],
    slangs: [
      {
        id: 'kolkata_bengali',
        name: 'Kolkata Bengali',
        nativeName: 'কলকাতা বাংলা (কলকাত্তাইয়া)',
        badge: 'দাদা / ফাটাফাটি',
        description: 'Sweet, sophisticated Kolkata cultural dialect with dada, ki khobor',
        sampleGreeting: 'খুব ভালো আছি দাদা! কি খবর বলুন, কি সাহায্য করতে পারি?',
        confirmation: 'দারুণ দাদা! এবার থেকে আমি আপনার সাথে খাঁটি কলকাতা বাংলায় কথা বলব।'
      },
      {
        id: 'dhakaiya_bengali',
        name: 'Dhakaiya Bengali',
        nativeName: 'ঢাকাইয়া বাংলা',
        badge: 'মামা / অস্থির',
        description: 'Rhythmic, lively Dhaka urban dialect with mama, kemon achen',
        sampleGreeting: 'মামা একদম অস্থির আছি! কন কি সাহায্য লাগব?',
        confirmation: 'অস্থির মামা! এহন থাইকা ঢাকাইয়া স্টাইলে কথা হইব।'
      },
      {
        id: 'standard_bengali',
        name: 'Standard Bengali',
        nativeName: 'প্রমিত বাংলা (Standard)',
        badge: 'প্রমিত বাংলা',
        description: 'Formal, polite, standard grammatical Bengali',
        sampleGreeting: 'নমস্কার! আমি ভালো আছি। আপনাকে কীভাবে সাহায্য করতে পারি?',
        confirmation: 'অসংখ্য ধন্যবাদ! এখন থেকে আমি প্রমিত বাংলায় আপনার সাথে কথা বলব।'
      }
    ]
  },

  // --- 8. MARATHI ---
  {
    id: 'marathi',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'pune',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'पुरुष आवाज (Male Voice)',
        nativeName: 'मराठी पुरुष आवाज',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.95,
        description: 'खर्जातला आणि स्पष्ट मराठी पुरुष आवाज'
      },
      {
        id: 'female',
        name: 'स्त्री आवाज (Female Voice)',
        nativeName: 'मराठी स्त्री आवाज',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.95,
        description: 'मधुर आणि सुस्पष्ट मराठी स्त्री आवाज'
      },
      {
        id: 'user',
        name: 'स्वतःचा आवाज (Own Voice)',
        nativeName: 'क्लोन केलेला आवाज',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'तुमच्या ऑडिओ नमुन्यावरून तयार केलेला आवाज'
      }
    ],
    regions: [
      { id: 'pune', name: 'Pune (पुणे)', bcp47: 'mr-IN' },
      { id: 'mumbai', name: 'Mumbai (मुंबई)', bcp47: 'mr-IN' },
      { id: 'nagpur', name: 'Nagpur / Vidarbha (विदर्भ)', bcp47: 'mr-IN' },
      { id: 'kolhapur', name: 'Kolhapur (कोल्हापूर)', bcp47: 'mr-IN' }
    ],
    slangs: [
      {
        id: 'puneri_marathi',
        name: 'Puneri Marathi',
        nativeName: 'पुणेरी मराठी (शुद्ध व चोख)',
        badge: 'काका / भारी',
        description: 'Refined, witty, culturally rich Puneri dialect',
        sampleGreeting: 'मी मजेत आहे! बोला, काय मदत करू?',
        confirmation: 'उत्तम! आता आपण अस्सल पुणेरी मराठीत संवाद साधू.'
      },
      {
        id: 'mumbai_marathi',
        name: 'Mumbai Marathi',
        nativeName: 'मुंबई मराठी (फास्ट व बिंधास्त)',
        badge: 'भावा / रापचिक',
        description: 'Dynamic, fast-paced Mumbai colloquial Marathi',
        sampleGreeting: 'एकदम मस्त भावा! बोल काय सीन आहे?',
        confirmation: 'भारी भावा! आता मुंबई मराठी स्टाईलमध्ये गप्पा मारू.'
      },
      {
        id: 'kolhapuri_marathi',
        name: 'Kolhapuri Marathi',
        nativeName: 'कोल्हापुरी मराठी (रांगडी)',
        badge: 'गड्या / नादखुळा',
        description: 'Bold, hospitable, earthy Kolhapuri style',
        sampleGreeting: 'लय भारी हाय गड्या! सांग काय काम काढलंस?',
        confirmation: 'नादखुळा! आता कोल्हापुरी ठसक्यात बोलू.'
      },
      {
        id: 'standard_marathi',
        name: 'Standard Marathi',
        nativeName: 'प्रमाण मराठी (Standard)',
        badge: 'प्रमाण मराठी',
        description: 'Formal, polite, standard grammatical Marathi',
        sampleGreeting: 'नमस्कार! मी अगदी ठीक आहे. मी आपली काय मदत करू शकतो?',
        confirmation: 'छान! आता मी आपल्याशी प्रमाण मराठीत संवाद साधेन.'
      }
    ]
  },

  // --- 9. GUJARATI ---
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    category: 'indian',
    defaultRegion: 'ahmedabad',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'પુરુષ અવાજ (Male Voice)',
        nativeName: 'ગુજરાતી પુરુષ અવાજ',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.95,
        description: 'સ્પષ્ટ અને મધુર ગુજરાતી પુરુષ અવાજ'
      },
      {
        id: 'female',
        name: 'સ્ત્રી અવાજ (Female Voice)',
        nativeName: 'ગુજરાતી સ્ત્રી અવાજ',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.95,
        description: 'મીઠો અને સ્પષ્ટ ગુજરાતી સ્ત્રી અવાજ'
      },
      {
        id: 'user',
        name: 'પોતાનો અવાજ (Own Voice)',
        nativeName: 'ક્લોન કરેલો અવાજ',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'તમારા ઓડિયો સેમ્પલથી બનાવેલો કસ્ટમ અવાજ'
      }
    ],
    regions: [
      { id: 'ahmedabad', name: 'Ahmedabad (અમદાવાદ)', bcp47: 'gu-IN' },
      { id: 'surat', name: 'Surat (સુરત)', bcp47: 'gu-IN' },
      { id: 'saurashtra', name: 'Saurashtra / Rajkot (સૌરાષ્ટ્ર)', bcp47: 'gu-IN' },
      { id: 'vadodara', name: 'Vadodara (વડોદરા)', bcp47: 'gu-IN' }
    ],
    slangs: [
      {
        id: 'amdavad_gujarati',
        name: 'Amdavadi Gujarati',
        nativeName: 'અમદાવાદી ગુજરાતી',
        badge: 'ભાઈ / મજામા',
        description: 'Fast, friendly commercial Amdavadi style with majama, bhailu',
        sampleGreeting: 'એકદમ મજામાં ભાઈ! બોલો શું સેવા કરીએ?',
        confirmation: 'સરસ ભાઈ! હવે આપણે અમદાવાદી ગુજરાતીમાં વાત કરીશું.'
      },
      {
        id: 'kathiyawadi_gujarati',
        name: 'Kathiyawadi Gujarati',
        nativeName: 'કાઠિયાવાડી / રંગીલું સૌરાષ્ટ્ર',
        badge: 'બાપુ / મોજ',
        description: 'Warm, hospitable, culturally rich Kathiyawadi dialect',
        sampleGreeting: 'મોજમાં હો બાપુ! કહો શું મદદ જોઈએ છે?',
        confirmation: 'રંગીલું કાઠિયાવાડ! હવે આપણે કાઠિયાવાડી લહેકામાં વાતો કરીશું.'
      },
      {
        id: 'surati_gujarati',
        name: 'Surati Gujarati',
        nativeName: 'સુરતી લહેકો',
        badge: 'લોચા / જલસો',
        description: 'Sweet, humorous, food-loving Surati dialect',
        sampleGreeting: 'જલસા છે હો! બોલો શું જોઈએ છે?',
        confirmation: 'વાહ ભાઈ વાહ! હવે સુરતી અંદાજમાં ચર્ચા થશે.'
      },
      {
        id: 'standard_gujarati',
        name: 'Standard Gujarati',
        nativeName: 'માન્ય ગુજરાતી (Standard)',
        badge: 'માન્ય ગુજરાતી',
        description: 'Formal, polite, standard grammatical Gujarati',
        sampleGreeting: 'નમસ્તે! હું એકદમ મજામાં છું. હું તમારી શું મદદ કરી શકું?',
        confirmation: 'બહુ સરસ! હવે હું તમારી સાથે પ્રમાણિત ગુજરાતીમાં વાત કરીશ.'
      }
    ]
  },

  // --- 10. SPANISH ---
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    category: 'global',
    defaultRegion: 'spain',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'Voz Masculina',
        nativeName: 'Voz de Estudio Masculina',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 1.0,
        description: 'Voz masculina en español natural y profunda'
      },
      {
        id: 'female',
        name: 'Voz Femenina',
        nativeName: 'Voz de Estudio Femenina',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 1.0,
        description: 'Voz femenina en español clara y melodiosa'
      },
      {
        id: 'user',
        name: 'Voz Propia',
        nativeName: 'Voz Clonada Personal',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'Perfil de voz personalizado a partir de tu audio'
      }
    ],
    regions: [
      { id: 'spain', name: 'Spain (España)', bcp47: 'es-ES' },
      { id: 'mexico', name: 'Mexico (México)', bcp47: 'es-MX' },
      { id: 'latin_america', name: 'Latin America', bcp47: 'es-419' },
      { id: 'united_states_es', name: 'USA (Hispano)', bcp47: 'es-US' }
    ],
    slangs: [
      {
        id: 'castilian_spanish',
        name: 'Castilian Spanish (España)',
        nativeName: 'Español Castellano (España)',
        badge: 'Genial / Vale',
        description: 'European Spanish with vale, genial, estupendo',
        sampleGreeting: '¡Hola! Estoy fenomenal. ¿En qué te puedo ayudar hoy?',
        confirmation: '¡Estupendo! A partir de ahora nos comunicaremos en español castellano.'
      },
      {
        id: 'mexican_spanish',
        name: 'Mexican Spanish',
        nativeName: 'Español Mexicano',
        badge: 'Chido / Órale',
        description: 'Vibrant, warm Mexican slang with qué onda, chido, órale',
        sampleGreeting: '¡Qué onda! Estoy súper bien. ¿En qué te echo la mano?',
        confirmation: '¡Órale, qué chido! Ahora platicaremos en estilo mexicano.'
      },
      {
        id: 'standard_spanish',
        name: 'Standard Spanish',
        nativeName: 'Español Neutro / Estándar',
        badge: 'Neutro',
        description: 'Neutral, professional, international Spanish',
        sampleGreeting: '¡Hola! Me encuentro muy bien. ¿Cómo puedo asistirte hoy?',
        confirmation: 'Perfecto. Ahora me comunicaré en español estándar.'
      }
    ]
  },

  // --- 11. FRENCH ---
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    category: 'global',
    defaultRegion: 'france',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'Voix Masculine',
        nativeName: 'Voix Masculine Studio',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 1.0,
        description: 'Voix française masculine élégante et naturelle'
      },
      {
        id: 'female',
        name: 'Voix Féminine',
        nativeName: 'Voix Féminine Studio',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 1.0,
        description: 'Voix française féminine douce et limpide'
      },
      {
        id: 'user',
        name: 'Voix Personnalisée',
        nativeName: 'Voix Clonée Utilisateur',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'Voix personnalisée clonée à partir de votre échantillon'
      }
    ],
    regions: [
      { id: 'france', name: 'France (Paris)', bcp47: 'fr-FR' },
      { id: 'canada_fr', name: 'Canada (Québec)', bcp47: 'fr-CA' },
      { id: 'belgium_fr', name: 'Belgium (Belgique)', bcp47: 'fr-BE' },
      { id: 'switzerland_fr', name: 'Switzerland (Suisse)', bcp47: 'fr-CH' }
    ],
    slangs: [
      {
        id: 'parisian_french',
        name: 'Parisian French',
        nativeName: 'Français Parisien (Standard)',
        badge: 'Génial / Stylé',
        description: 'Refined, articulate Metropolitan French',
        sampleGreeting: 'Bonjour ! Je vais très bien. Comment puis-je vous aider aujourd’hui ?',
        confirmation: 'C’est parfait ! Nous communiquerons désormais en français parisien.'
      },
      {
        id: 'casual_french',
        name: 'Casual French',
        nativeName: 'Français Familier',
        badge: 'Salut / Super',
        description: 'Friendly, contemporary French with salut, ça roule, top',
        sampleGreeting: 'Salut ! Ça roule super bien. Qu’est-ce qui t’amène ?',
        confirmation: 'Super ! On continue de discuter en français décontracté.'
      },
      {
        id: 'quebec_french',
        name: 'Quebec French',
        nativeName: 'Français Québécois',
        badge: 'Bienvenue / Tiguidou',
        description: 'Warm Canadian French with tiguidou, pas pire',
        sampleGreeting: 'Salut là ! Ça va super bien. Qu’est-ce que j’peux faire pour toi ?',
        confirmation: 'Tiguidou ! On jase en québécois maintenant.'
      }
    ]
  },

  // --- 12. GERMAN ---
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    category: 'global',
    defaultRegion: 'germany',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'Männliche Stimme',
        nativeName: 'Deutsche Männerstimme',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 1.0,
        description: 'Präzise und natürliche deutsche Männerstimme'
      },
      {
        id: 'female',
        name: 'Weibliche Stimme',
        nativeName: 'Deutsche Frauenstimme',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 1.0,
        description: 'Angenehme und deutliche deutsche Frauenstimme'
      },
      {
        id: 'user',
        name: 'Eigene Stimme',
        nativeName: 'Geklonte Benutzerstimme',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'Personalisierte geklonte KI-Stimme'
      }
    ],
    regions: [
      { id: 'germany', name: 'Germany (Deutschland)', bcp47: 'de-DE' },
      { id: 'austria', name: 'Austria (Österreich)', bcp47: 'de-AT' },
      { id: 'switzerland_de', name: 'Switzerland (Schweiz)', bcp47: 'de-CH' }
    ],
    slangs: [
      {
        id: 'standard_german',
        name: 'Standard German (Hochdeutsch)',
        nativeName: 'Standarddeutsch / Hochdeutsch',
        badge: 'Hochdeutsch',
        description: 'Clear, polite, grammatical standard German',
        sampleGreeting: 'Hallo! Mir geht es ausgezeichnet. Wie kann ich Ihnen heute helfen?',
        confirmation: 'Sehr gut! Ich werde nun auf Hochdeutsch mit Ihnen sprechen.'
      },
      {
        id: 'casual_german',
        name: 'Casual German',
        nativeName: 'Umgangssprache (Modern)',
        badge: 'Hi / Super',
        description: 'Relaxed, modern German with alles klar, super, moin',
        sampleGreeting: 'Hi! Alles bestens bei mir. Was kann ich für dich tun?',
        confirmation: 'Alles klar! Ab jetzt unterhalten wir uns ganz entspannt.'
      }
    ]
  },

  // --- 13. JAPANESE ---
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    category: 'global',
    defaultRegion: 'japan',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: '男性音声 (Male Voice)',
        nativeName: 'スタジオ男性音声',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.88,
        rate: 1.0,
        description: '落ち着いた自然な日本語男性音声'
      },
      {
        id: 'female',
        name: '女性音声 (Female Voice)',
        nativeName: 'スタジオ女性音声',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.18,
        rate: 1.0,
        description: '明るくクリアな日本語女性音声'
      },
      {
        id: 'user',
        name: 'カスタム音声 (Own Voice)',
        nativeName: 'クローン音声',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'あなた専用のクローンボイス'
      }
    ],
    regions: [
      { id: 'japan', name: 'Japan (Tokyo / Kanto)', bcp47: 'ja-JP' },
      { id: 'kansai', name: 'Kansai / Osaka (関西)', bcp47: 'ja-JP' }
    ],
    slangs: [
      {
        id: 'standard_japanese',
        name: 'Standard Japanese (標準語)',
        nativeName: '標準語 (Standard)',
        badge: '標準語',
        description: 'Polite, clear standard Japanese (Keigo & Teineigo)',
        sampleGreeting: 'こんにちは！元気にしております。本日はどのようなご用件でしょうか？',
        confirmation: '承知いたしました。これからは標準語でお話しいたします。'
      },
      {
        id: 'kansai_japanese',
        name: 'Kansai Dialect (関西弁)',
        nativeName: '関西弁 (大阪 / 京都)',
        badge: 'めっちゃ / ええで',
        description: 'Energetic, friendly Kansai dialect with meccha, eede, honma',
        sampleGreeting: 'まいど！めっちゃ元気やで。何でも聞いてな！',
        confirmation: 'よっしゃ！これからは関西弁でワイワイ話そか！'
      },
      {
        id: 'casual_japanese',
        name: 'Casual Japanese (日常会話)',
        nativeName: 'カジュアル日常会話',
        badge: 'やっほー / いいね',
        description: 'Friendly, youthful casual conversational Japanese',
        sampleGreeting: 'やっほー！元気いっぱいだよ。何でも言ってね！',
        confirmation: 'オッケー！これからはフレンドリーにお話しするね！'
      }
    ]
  },

  // --- 14. ARABIC ---
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    category: 'global',
    defaultRegion: 'saudi_arabia',
    defaultVoice: 'female',
    voices: [
      {
        id: 'male',
        name: 'صوت رجالي (Male Voice)',
        nativeName: 'صوت ذكوري طبيعي',
        gender: 'male',
        icon: '👨',
        badge: 'Male AI',
        pitch: 0.85,
        rate: 0.95,
        description: 'صوت رجالي عربي وقور وطبيعي'
      },
      {
        id: 'female',
        name: 'صوت نسائي (Female Voice)',
        nativeName: 'صوت أنثوي نقي',
        gender: 'female',
        icon: '👩',
        badge: 'Female AI',
        pitch: 1.15,
        rate: 0.95,
        description: 'صوت أنثوي عربي عذب وواضح'
      },
      {
        id: 'user',
        name: 'صوتك الخاص (Own Voice)',
        nativeName: 'صوت مستنسخ مخصص',
        gender: 'user',
        icon: '🎙️',
        badge: 'Cloned Voice',
        pitch: 1.0,
        rate: 1.0,
        description: 'صوت ذكاء اصطناعي مخصص من عينتك الصوتية'
      }
    ],
    regions: [
      { id: 'saudi_arabia', name: 'Saudi Arabia (المملكة العربية السعودية)', bcp47: 'ar-SA' },
      { id: 'uae', name: 'UAE (الإمارات العربية المتحدة)', bcp47: 'ar-AE' },
      { id: 'egypt', name: 'Egypt (مصر)', bcp47: 'ar-EG' }
    ],
    slangs: [
      {
        id: 'standard_arabic',
        name: 'Modern Standard Arabic',
        nativeName: 'الفصحى المعاصرة (Standard)',
        badge: 'الفصحى',
        description: 'Eloquent, grammatical, universal Modern Standard Arabic',
        sampleGreeting: 'أهلاً وسهلاً! أنا بأفضل حال. كيف يمكنني مساعدتك اليوم؟',
        confirmation: 'ممتاز! سأتحدث معك باللغة العربية الفصحى من الآن فصاعداً.'
      },
      {
        id: 'gulf_arabic',
        name: 'Gulf Arabic (Khaleeji)',
        nativeName: 'اللهجة الخليجية',
        badge: 'هلا والله / هلا بالطيب',
        description: 'Warm, hospitable Arabian Gulf dialect with hala, shlonak',
        sampleGreeting: 'هلا والله! بخير وعافية طال عمرك. آمرني وش بغيت؟',
        confirmation: 'تم يا طويل العمر! الحين نسولف باللهجة الخليجية.'
      },
      {
        id: 'egyptian_arabic',
        name: 'Egyptian Arabic',
        nativeName: 'اللهجة المصرية (أم الدنيا)',
        badge: 'يا باشا / منور',
        description: 'Lively, friendly, world-famous Egyptian dialect with ya basha, ezzayak',
        sampleGreeting: 'أهلاً يا باشا! أنا تمام وزي الفل، قول لي أقدر أساعدك بإيه؟',
        confirmation: 'على راسي يا باشا! من دلوقتي هنتكلم بالمصري الجميل.'
      }
    ]
  }
];

// 6 Core Essential Languages (Tamil, English, Hindi, Telugu, Malayalam, Kannada)
export const SUPPORTED_LANGUAGES = ALL_SUPPORTED_LANGUAGES.filter((l) => 
  ['tamil', 'english', 'hindi', 'telugu', 'malayalam', 'kannada'].includes(l.id)
);

// Helper to get language-specific voice models (Male, Female, Own Voice)
export function getVoicesForLanguage(langId = 'tamil') {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
  return lang.voices || VOICE_PREFERENCES;
}

// Helper to get default voice ID for a language ('female')
export function getDefaultVoiceForLanguage(langId = 'tamil') {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
  return lang.defaultVoice || 'female';
}

// Helper to get matched voice object for any language & voice ID (with full legacy compatibility)
export function getVoicePreference(langId = 'tamil', voiceId = 'female') {
  const voices = getVoicesForLanguage(langId);
  if (!voices || voices.length === 0) return VOICE_PREFERENCES[1];

  // 1. Direct ID match (e.g. 'male', 'female', 'user')
  let match = voices.find((v) => v.id === voiceId);
  if (match) return match;

  // 2. Legacy / Gender generic mapping
  if (['female', 'kavitha', 'nila', 'emma', 'sophia', 'priya', 'ananya', 'lakshmi', 'sravani'].includes(voiceId)) {
    match = voices.find((v) => v.gender === 'female' || v.id === 'female');
    if (match) return match;
  }
  if (['male', 'karthik', 'valluvar', 'alex', 'ryan', 'rohan', 'kabir', 'ramesh', 'krishna'].includes(voiceId)) {
    match = voices.find((v) => v.gender === 'male' || v.id === 'male');
    if (match) return match;
  }
  if (['user', 'own_voice', 'custom'].includes(voiceId)) {
    match = voices.find((v) => v.id === 'user' || v.gender === 'user');
    if (match) return match;
  }

  // 3. Fallback to Female or first voice in language list
  const femaleVoice = voices.find((v) => v.gender === 'female');
  return femaleVoice || voices[0];
}

// Global fallback array
export const VOICE_PREFERENCES = [
  {
    id: 'male',
    name: 'ஆண் குரல் (Male Voice)',
    nativeName: 'தமிழ் ஆண் குரல்',
    gender: 'male',
    icon: '👨',
    badge: 'Male AI',
    pitch: 0.84,
    rate: 0.94,
    description: 'கம்பீரமான, இயல்பான தமிழ் ஆண் குரல்'
  },
  {
    id: 'female',
    name: 'பெண் குரல் (Female Voice)',
    nativeName: 'தமிழ் பெண் குரல்',
    gender: 'female',
    icon: '👩',
    badge: 'Female AI',
    pitch: 1.14,
    rate: 0.94,
    description: 'இனிமையான, தெளிவான தமிழ் பெண் குரல்'
  },
  {
    id: 'user',
    name: 'சொந்த குரல் (Own Voice)',
    nativeName: 'க்ளோன் செய்யப்பட்ட சொந்த குரல்',
    gender: 'user',
    icon: '🎙️',
    badge: 'Cloned Voice',
    pitch: 1.0,
    rate: 1.0,
    description: 'பதிவேற்றப்பட்ட ஆடியோ மூலம் தனிப்பயனாக்கப்பட்ட சொந்த குரல்'
  }
];

export const LOCALIZED_PROMPTS = {
  tamil: {
    welcome: 'தமிழி (THAMILI) ஏஐ ஆடியோ தளத்திற்கு நல்வரவு! உங்கள் விருப்பமான மொழி மற்றும் குரலைத் தேர்ந்தெடுக்கவும்.',
    placeholder: 'கொங்கு தமிழ் அல்லது தமிழில் ஏதாவது கேள்வி கேளுங்க...'
  },
  english: {
    welcome: 'Welcome to THAMILI AI Audio Studio! Please select your preferred language and voice model.',
    placeholder: 'Ask any question in your chosen dialect or language...'
  },
  hindi: {
    welcome: 'தமிழி (THAMILI) एआई ऑडियो में आपका स्वागत है। कृपया अपनी पसंदीदा भाषा और आवाज़ चुनें।',
    placeholder: 'अपनी चुनी हुई बोली में कोई भी सवाल पूछें...'
  },
  telugu: {
    welcome: 'తమిழி (THAMILI) ఏఐ ఆడియో కు స్వాగతం. దయచేసి మీ భాష మరియు వాయిస్ ఎంచుకోండి.',
    placeholder: 'మీరు ఎంచుకున్న శైలిలో ఏదైనా అడగండి...'
  },
  malayalam: {
    welcome: 'தமிழி (THAMILI) എഐ ഓഡിയോ സ്റ്റുഡിയോയിലേക്ക് സ്വാഗതം! നിങ്ങളുടെ ഭാഷയും ശബ്ദവും തിരഞ്ഞെടുക്കുക.',
    placeholder: 'തിരഞ്ഞെടുത്ത ഭാഷയിൽ എന്തെങ്കിലും ചോദിക്കൂ...'
  },
  kannada: {
    welcome: 'தமிழி (THAMILI) ಎಐ ಆಡಿಯೋ ಸ್ಟುಡಿಯೋಗೆ ಸುಸ್ವಾಗತ! ನಿಮ್ಮ ಭಾಷೆ ಮತ್ತು ಧ್ವನಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    placeholder: 'ನಿಮ್ಮ ಆಯ್ಕೆಯ ಭಾಷೆಯಲ್ಲಿ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ...'
  },
  bengali: {
    welcome: 'தமிழி (THAMILI) এআই অডিও স্টুডিওতে স্বাগতম! আপনার পছন্দের ভাষা ও কণ্ঠস্বর নির্বাচন করুন।',
    placeholder: 'আপনার নির্বাচিত ভাষায় যেকোনো প্রশ্ন জিজ্ঞাসা করুন...'
  },
  marathi: {
    welcome: 'தமிழி (THAMILI) एआय ऑडिओ स्टुडिओमध्ये आपले स्वागत आहे! आपली भाषा आणि आवाज निवडा.',
    placeholder: 'आपल्या पसंतीच्या भाषेत काहीही विचारा...'
  },
  gujarati: {
    welcome: 'தமிழி (THAMILI) એઆઈ ઑડિયો સ્ટુડિયોમાં આપનું સ્વાગત છે! તમારી ભાષા અને અવાજ પસંદ કરો.',
    placeholder: 'તમારી પસંદગીની ભાષામાં કોઈપણ પ્રશ્ન પૂછો...'
  },
  spanish: {
    welcome: '¡Bienvenido a THAMILI AI Audio Studio! Por favor selecciona tu idioma y modelo de voz.',
    placeholder: 'Haz cualquier pregunta en tu idioma preferido...'
  },
  french: {
    welcome: 'Bienvenue sur THAMILI AI Audio Studio ! Veuillez choisir votre langue et votre profil vocal.',
    placeholder: 'Posez n’importe quelle question dans votre langue préférée...'
  },
  german: {
    welcome: 'Willkommen im THAMILI AI Audio Studio! Bitte wählen Sie Ihre Sprache und Ihr Sprachmodell.',
    placeholder: 'Stellen Sie eine Frage in Ihrer bevorzugten Sprache...'
  },
  japanese: {
    welcome: 'THAMILI AI オーディオスタジオへようこそ！ご希望の言語と音声モデルを選択してください。',
    placeholder: '選んだ言語でお好きな質問をどうぞ...'
  },
  arabic: {
    welcome: 'مرحباً بكم في استوديو THAMILI للذكاء الاصطناعي الصوتي! يرجى اختيار لغتكم وصوتكم المفضل.',
    placeholder: 'اسأل أي سؤال بلغتك المفضلة...'
  }
};

export const DIALECT_VOICE_PROMPTS = {
  // Tamil
  kongu_tamil: {
    female: 'சரிங்கண்ணா, கொங்கு தமிழ் பெண் குரல் தேர்வு செஞ்சாச்சுங்கண்ணா! என்ன உதவி வேணுமுங்கண்ணா?',
    male: 'சரிங்கண்ணா, கொங்கு தமிழ் ஆண் குரல் தேர்வு செஞ்சாச்சுங்கண்ணா! என்ன கேள்வி வேணாலும் கேளுங்கண்ணா!',
    user: 'கொங்கு தமிழ் பயனர் குரல் அமைப்பு தேர்வு செய்யப்பட்டதுங்கண்ணா! உங்கள் குரல் மாதிரி மூலம் பதில்கள் ஒலிக்கப்படும்.'
  },
  chennai_tamil: {
    female: 'சூப்பர் பா! மெட்ராஸ் தமிழ் பெண் வாய்ஸ் ரெடி. என்ன வேணும் சொல்லு பாப்போம்!',
    male: 'சூப்பர் பா! மெட்ராஸ் தமிழ் ஆண் வாய்ஸ் கெத்தா செட் பண்ணியாச்சு. என்ன டவுட்னாலும் கேளு பாப்போம்!',
    user: 'மெட்ராஸ் தமிழ் பயனர் வாய்ஸ் செட் பண்ணியாச்சு பா! கலக்குவோம்!'
  },
  madurai_tamil: {
    female: 'மதுரை தமிழ் பெண் குரல் ரெடிங்க! என்ன உதவி வேணும்னு சொல்லுங்க, பாத்துக்கலாம்.',
    male: 'மதுரை தமிழ் ஆண் குரல் பக்காவா செட் பண்ணியாச்சுயா! என்ன கேள்வி வேணாலும் கம்பீரமா கேளுங்க!',
    user: 'மதுரை தமிழ் பயனர் குரல் மாதிரி செட் பண்ணியாச்சுயா!'
  },
  nellai_tamil: {
    female: 'நெல்லை தமிழ் பெண் குரல் செட் பண்ணியாச்சுபா! என்ன விஷயம்னு சொல்லுங்க.',
    male: 'நெல்லை தமிழ் ஆண் குரல் செட் பண்ணிட்டோம்பா! அல்வா மாதிரி இனிமையா பேசுறேன், என்ன விஷயம்னு கேளுங்கவே!',
    user: 'நெல்லை தமிழ் பயனர் குரல் அமைப்பு தயாராக உள்ளதுவே!'
  },
  standard_tamil: {
    female: 'பொதுத் தமிழ் பெண் குரல் தேர்ந்தெடுக்கப்பட்டது. உங்களுக்கு என்ன உதவி வேண்டும்?',
    male: 'பொதுத் தமிழ் ஆண் குரல் தேர்ந்தெடுக்கப்பட்டது. தமிழி ஏஐ தயாராக உள்ளது.',
    user: 'பொதுத் தமிழ் பயனர் குரல் மாதிரி வெற்றிகரமாக செயல்படுத்தப்பட்டது.'
  },

  // English
  american_casual: {
    female: "Awesome! American casual female voice is ready. What's on your mind?",
    male: "Awesome! American casual male voice is active. What's on your mind?",
    user: "Custom user voice is connected in American casual style!"
  },
  american_standard: {
    female: "Standard American female voice is now active. How may I assist you today?",
    male: "Standard American male voice is now active. How may I assist you today?",
    user: "Custom user voice is now active in Standard American English."
  },
  british_casual: {
    female: "Cheers mate! Casual British female voice ready. How can I help?",
    male: "Cheers mate! Casual British male voice sorted. What's the plan?",
    user: "Custom user voice active in Casual British style!"
  },
  british_standard: {
    female: "Standard British female voice configured. How may I be of assistance?",
    male: "Standard British male voice configured. How may I be of assistance?",
    user: "Custom user voice active in Standard British English."
  },
  indian_english: {
    female: "Indian English female voice selected! Tell me, how can I help you today?",
    male: "Indian English male voice selected! Tell me, how can I help you today?",
    user: "Indian English user voice is now ready!"
  },
  australian_casual: {
    female: "G'day mate! Aussie female voice is ready. What's up?",
    male: "G'day mate! Aussie male voice is all set. No worries, ask me anything!",
    user: "Aussie style user voice is now active!"
  },

  // Hindi
  delhi_hindi: {
    female: "बढ़िया भाई! दिल्ली हिन्दी फीमेल वॉइस रेडी है। बताओ क्या मदद चाहिए?",
    male: "बढ़िया भाई! दिल्ली हिन्दी मेल वॉइस सेट हो गया। बताओ क्या सीन है?",
    user: "दिल्ली हिन्दी यूजर वॉइस प्रोफाइल एक्टिव हो गया भाई!"
  },
  mumbai_hindi: {
    female: "मुंबईया फीमेल वॉइस एकदम मस्त रेडी है बॉस! क्या हुकुम है?",
    male: "अपुन मुंबईया मेल वॉइस में एकदम बिंदास रेडी है बॉस! बोलो क्या हाल चाल?",
    user: "मुंबईया यूजर वॉइस एकदम सेट है बॉस!"
  },
  up_hindi: {
    female: "प्रणाम भइया! यूपी स्टाइल फीमेल वॉइस तैयार है। बताइए क्या बात है?",
    male: "प्रणाम भइया! यूपी स्टाइल मेल वॉइस सेट हो गया है। बताइए क्या सेवा करें?",
    user: "यूपी स्टाइल यूजर वॉइस सक्रिय हो गया है।"
  },
  bihar_hindi: {
    female: "सब ठीक बा हो! बिहारी भोजपुरी फीमेल आवाज तैयार बा। का मदद चाही?",
    male: "सब ठीक बा हो! बिहारी भोजपुरी मेल आवाज तैयार बा। कहिए का हाल बा?",
    user: "भोजपुरी अंदाज में यूजर वॉइस सेट हो गईल बा।"
  },
  standard_hindi: {
    female: "मानक हिन्दी महिला स्वर सक्रिय किया गया है। मैं आपकी क्या सहायता कर सकती हूँ?",
    male: "मानक हिन्दी पुरुष स्वर सक्रिय किया गया है। मैं आपकी क्या सहायता कर सकता हूँ?",
    user: "मानक हिन्दी में यूजर वॉइस प्रोफाइल सक्रिय है।"
  },

  // Telugu
  telangana_telugu: {
    female: "తెలంగాణ తెలుగు స్త్రీ వాయిస్ రెడీగా ఉంది. ఏం కావాలో చెప్పండి.",
    male: "తెలంగాణ తెలుగు పురుష వాయిస్ సెట్ అయింది. ఏదైనా అడగండి!",
    user: "తెలంగాణ తెలుగు యూజర్ వాయిస్ సెట్ అయింది."
  },
  hyderabad_telugu: {
    female: "మస్తుగున్న మామ! హైదరాబాదీ ఫిమేల్ వాయిస్ రెడీ. ఏం హెల్ప్ కావాలి?",
    male: "మస్తుగున్న మామ! హైదరాబాదీ మేల్ వాయిస్ రెడీ. చెప్పు ఏం సంగతి?",
    user: "హైదరాబాదీ యూజర్ వాయిస్ సెట్ అయింది మామ!"
  },
  andhra_telugu: {
    female: "ఆంధ్ర తెలుగు స్త్రీ వాయిస్ ఎంపికైంది. ఎలా సహాయపడగలను అండి?",
    male: "ఆంధ్ర తెలుగు పురుష వాయిస్ ఎంపికైంది. మీకు ఏమైనా సహాయం కావాలా అండి?",
    user: "ఆంధ్ర తెలుగు యూజర్ వాయిస్ సిద్ధంగా ఉంది."
  },
  standard_telugu: {
    female: "ప్రామాణిక తెలుగు స్త్రీ స్వరం ఎంపికైంది. మీకు ఎలా సహాయం చేయగలను?",
    male: "ప్రామాణిక తెలుగు పురుష స్వరం ఎంపికైంది. మీకు ఎలా సహాయం చేయగలను?",
    user: "ప్రామాణిక తెలుగు యూజర్ వాయిస్ సిద్ధంగా ఉంది."
  },

  // Malayalam
  valluvanadan_malayalam: {
    female: "വള്ളുവനാടൻ സ്ത്രീ സ്വരം തിരഞ്ഞെടുത്തു ട്ടോ! എന്താണ് അറിയേണ്ടത് എന്ന് പറയൂ.",
    male: "വള്ളുവനാടൻ പുരുഷ സ്വരം തയ്യാറാണ് ട്ടോ! എന്താണ് കാര്യം എന്ന് ചോദിക്കൂ.",
    user: "വള്ളുവനാടൻ ശൈലിയിൽ യൂസർ വോയ്സ് സെറ്റ് ചെയ്തു ട്ടോ!"
  },
  malabar_malayalam: {
    female: "കോഴിക്കോടൻ സ്ത്രീ സ്വരം അടിപൊളിയായി റെഡിയാണ് ചങ്ങായീ! എന്ത് സഹായമാണ് വേണ്ടത്?",
    male: "മലബാർ പുരുഷ സ്വരം തയ്യാറാണ് ചങ്ങായീ! ചോദിച്ചോളൂ, പറയാം.",
    user: "മലബാർ ശൈലിയിൽ യൂസർ വോയ്സ് റെഡിയായിട്ടുണ്ട്!"
  },
  travancore_malayalam: {
    female: "തിരുവിതാംകൂർ സ്ത്രീ സ്വരം സെറ്റാണ് അളിയാ! എന്ത് അറിയണം?",
    male: "തിരുവിതാംകൂർ പുരുഷ സ്വരം റെഡിയാണ് അളിയാ! ചോദിച്ചോ.",
    user: "തിരുവിതാംകൂർ ശൈലിയിൽ യൂസർ വോയ്സ് തയ്യാറാണ് അളിയാ!"
  },
  standard_malayalam: {
    female: "ശുദ്ധ മലയാളം സ്ത്രീ സ്വരം തിരഞ്ഞെടുക്കപ്പെട്ടു. ഞാൻ താങ്കൾക്ക് എങ്ങനെ സഹായിക്കണം?",
    male: "ശുദ്ധ മലയാളം പുരുഷ സ്വരം തിരഞ്ഞെടുക്കപ്പെട്ടു. എന്ത് സഹായമാണ് വേണ്ടത്?",
    user: "ശുദ്ധ മലയാളത്തിൽ ഉപയോക്തൃ ശബ്ദ പ്രൊഫൈൽ സജീവമാക്കി."
  },

  // Kannada
  bengaluru_kannada: {
    female: "ಬೆಂಗಳೂರು ಮಹಿಳಾ ಧ್ವನಿ ರೆಡಿಯಾಗಿದೆ ಗುರು! ಏನ್ ಸಹಾಯ ಬೇಕು ಹೇಳಿ.",
    male: "ಬೆಂಗಳೂರು ಪುರುಷ ಧ್ವನಿ ಸೆಟ್ ಆಗಿದೆ ಗುರು! ಏನ್ ಸಮಾಚಾರ ಕೇಳಿ.",
    user: "ಬೆಂಗಳೂರು ಶೈಲಿಯಲ್ಲಿ ಯೂಸರ್ ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ ಗುರು!"
  },
  mysuru_kannada: {
    female: "ಮೈಸೂರು ಮಹಿಳಾ ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ ರೀ. ತಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    male: "ಮೈಸೂರು ಪುರುಷ ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ ರೀ. ಏನು ವಿಷಯ ಹೇಳಿ?",
    user: "ಮೈಸೂರು ಶೈಲಿಯಲ್ಲಿ ಕಸ್ಟಮ್ ಧ್ವನಿ ಸಕ್ರಿಯಗೊಂಡಿದೆ ರೀ."
  },
  coastal_kannada: {
    female: "ಕರಾವಳಿ ಮಹಿಳಾ ಧ್ವನಿ ಆಯ್ಕೆಯಾಗಿದೆ ಮಾರಾಯ್ರೆ! ಏನ್ ವಿಷ್ಯಾ ಕೇಳಿ.",
    male: "ಕರಾವಳಿ ಪುರುಷ ಧ್ವನಿ ರೆಡಿಯಾಗಿದೆ ಮಾರಾಯ್ರೆ! ಏನ್ ಹೆಲ್ಪ್ ಬೇಕು?",
    user: "ಕರಾವಳಿ ಶೈಲಿಯಲ್ಲಿ ಯೂಸರ್ ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ ಮಾರಾಯ್ರೆ!"
  },
  standard_kannada: {
    female: "ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡ ಮಹಿಳಾ ಧ್ವನಿ ಆಯ್ಕೆಯಾಗಿದೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    male: "ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡ ಪುರುಷ ಧ್ವನಿ ಆಯ್ಕೆಯಾಗಿದೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    user: "ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡದಲ್ಲಿ ಬಳಕೆದಾರರ ಧ್ವನಿ ಸಕ್ರಿಯವಾಗಿದೆ."
  },

  // Bengali
  kolkata_bengali: {
    female: "কলকাতা নারী কণ্ঠস্বর রেডি দাদা! কি সাহায্য করতে পারি বলুন?",
    male: "কলকাতা পুরুষ কণ্ঠস্বর প্রস্তুত দাদা! কি বিষয় জানতে চান?",
    user: "কলকাতা স্টাইলে ইউজার ভয়েস সক্রিয় হয়েছে দাদা!"
  },
  dhakaiya_bengali: {
    female: "ঢাকাইয়া নারী কণ্ঠ রেডি মামা! কন কি লাগব?",
    male: "ঢাকাইয়া পুরুষ কণ্ঠ প্রস্তুত মামা! কি বিষয় জিগাবেন কন?",
    user: "ঢাকাইয়া স্টাইলে ইউজার ভয়েস সেট হইছে মামা!"
  },
  standard_bengali: {
    female: "প্রমিত বাংলা নারী কণ্ঠস্বর সক্রিয় করা হয়েছে। আমি কীভাবে সাহায্য করতে পারি?",
    male: "প্রমিত বাংলা পুরুষ কণ্ঠস্বর সক্রিয় করা হয়েছে। আপনার কি সাহায্য লাগবে?",
    user: "প্রমিত বাংলায় ইউজার ভয়েস সফলভাবে সক্রিয় করা হয়েছে।"
  },

  // Marathi
  puneri_marathi: {
    female: "पुणेरी स्त्री आवाज निवडला गेला आहे. बोला, काय मदत करू?",
    male: "पुणेरी पुरुष आवाज तयार आहे. काय प्रश्न आहे विचारा!",
    user: "पुणेरी मराठीत युझर व्हॉइस प्रोफाइल सक्रिय झाली आहे."
  },
  mumbai_marathi: {
    female: "मुंबई मराठी फीमेल व्हॉइस एकदम रेडी आहे भावा! काय मदत हवी आहे बोल?",
    male: "मुंबई मराठी मेल व्हॉइस एकदम सेट आहे भावा! काय सीन आहे बोल?",
    user: "मुंबई स्टाईलमध्ये युझर व्हॉइस तयार आहे भावा!"
  },
  kolhapuri_marathi: {
    female: "कोल्हापुरी स्त्री आवाज नादखुळा सेट झालाय गड्या! सांग काय काम आहे?",
    male: "कोल्हापुरी पुरुष आवाज तयार हाय गड्या! काय बी विचार, सांगतो!",
    user: "कोल्हापुरी ठसक्यात युझर व्हॉइस तयार आहे गड्या!"
  },
  standard_marathi: {
    female: "प्रमाण मराठी स्त्री आवाज निवडला गेला आहे. मी आपली काय मदत करू शकते?",
    male: "प्रमाण मराठी पुरुष आवाज निवडला गेला आहे. मी आपली काय मदत करू शकतो?",
    user: "प्रमाण मराठीत युझर व्हॉइस प्रोफाइल सक्रिय केली आहे."
  },

  // Gujarati
  amdavad_gujarati: {
    female: "અમદાવાદી સ્ત્રી અવાજ સેટ થઈ ગયો ભાઈ! બોલો શું મદદ જોઈએ?",
    male: "અમદાવાદી પુરુષ અવાજ તૈયાર છે ભાઈ! બોલો શું સેવા કરીએ?",
    user: "અમદાવાદી શૈલીમાં યૂઝર વૉઇસ ઍક્ટિવ થઈ ગયો છે ભાઈ!"
  },
  kathiyawadi_gujarati: {
    female: "કાઠિયાવાડી સ્ત્રી અવાજ તૈયાર છે બાપુ! કહો શું મદદ જોઈએ?",
    male: "કાઠિયાવાડી પુરુષ અવાજ મોજમાં તૈયાર છે બાપુ! પૂછો જે પૂછવું હોય!",
    user: "કાઠિયાવાડી લહેકામાં યૂઝર વૉઇસ સેટ થઈ ગયો છે બાપુ!"
  },
  surati_gujarati: {
    female: "સુરતી સ્ત્રી અવાજ જલસા સાથે રેડી છે! બોલો શું જોઈએ?",
    male: "સુરતી પુરુષ અવાજ એકદમ રેડી છે! પૂછો શું જાણવું છે?",
    user: "સુરતી અંદાજમાં યૂઝર વૉઇસ સેટ થઈ ગયો છે!"
  },
  standard_gujarati: {
    female: "પ્રમાણિત ગુજરાતી સ્ત્રી અવાજ પસંદ થયો છે. હું તમારી શું મદદ કરી શકું?",
    male: "પ્રમાણિત ગુજરાતી પુરુષ અવાજ પસંદ થયો છે. હું આપની શું સહાય કરી શકું?",
    user: "પ્રમાણિત ગુજરાતીમાં યૂઝર વૉઇસ સક્રિય થયો છે."
  },

  // Spanish
  castilian_spanish: {
    female: "¡Voz femenina en castellano activada! ¿En qué te puedo ayudar hoy?",
    male: "¡Voz masculina en castellano activada! ¿Qué duda tienes hoy?",
    user: "¡Voz personalizada activada en español castellano!"
  },
  mexican_spanish: {
    female: "¡Voz femenina en español mexicano lista! ¿En qué te echo la mano?",
    male: "¡Voz masculina en estilo mexicano lista! ¿Qué onda, qué necesitas?",
    user: "¡Perfil de voz de usuario activo en estilo mexicano!"
  },
  standard_spanish: {
    female: "Voz femenina en español estándar configurada. ¿Cómo puedo asistirte hoy?",
    male: "Voz masculina en español estándar configurada. ¿En qué puedo ayudarte?",
    user: "Voz de usuario activada en español estándar."
  },

  // French
  parisian_french: {
    female: "Voix féminine en français parisien prête. Comment puis-je vous aider ?",
    male: "Voix masculine en français parisien prête. Comment puis-je vous aider ?",
    user: "Voix personnalisée activée en français parisien."
  },
  casual_french: {
    female: "Voix féminine décontractée prête ! Qu’est-ce qu’on fait aujourd’hui ?",
    male: "Voix masculine décontractée prête ! Dis-moi ce dont tu as besoin.",
    user: "Voix utilisateur connectée en français familier."
  },
  quebec_french: {
    female: "Voix québécoise féminine prête ! Qu’est-ce que j’peux faire pour toi ?",
    male: "Voix québécoise masculine prête ! Qu’est-ce qui s’passe ?",
    user: "Profil vocal personnalisé actif en québécois !"
  },

  // German
  standard_german: {
    female: "Standarddeutsche Frauenstimme aktiviert. Wie kann ich Ihnen helfen?",
    male: "Standarddeutsche Männerstimme aktiviert. Wie kann ich Ihnen behilflich sein?",
    user: "Benutzerstimme im Standarddeutschen aktiviert."
  },
  casual_german: {
    female: "Moderne Frauenstimme bereit! Was gibt’s Neues?",
    male: "Moderne Männerstimme am Start! Was kann ich für dich tun?",
    user: "Eigene Stimme im lockeren Deutsch aktiviert."
  },

  // Japanese
  standard_japanese: {
    female: "標準語の女性音声が設定されました。どのようなご用件でしょうか？",
    male: "標準語の男性音声が設定されました。何でもお申し付けください。",
    user: "標準語でカスタムユーザー音声が有効になりました。"
  },
  kansai_japanese: {
    female: "関西弁の女性音声が準備できたで！何でも聞いてな！",
    male: "関西弁の男性音声が準備できたで！何でも言うてや！",
    user: "関西弁でユーザーボイスが設定されたで！"
  },
  casual_japanese: {
    female: "日常会話の女性音声がセットされたよ！何でも聞いてね！",
    male: "日常会話の男性音声がセットされたよ！何でも話しかけてね！",
    user: "カジュアル日常会話でユーザーボイスが有効になったよ！"
  },

  // Arabic
  standard_arabic: {
    female: "تم تفعيل الصوت النسائي باللغة العربية الفصحى. كيف يمكنني مساعدتك؟",
    male: "تم تفعيل الصوت الرجالي باللغة العربية الفصحى. كيف يمكنني مساعدتك؟",
    user: "تم تفعيل صوت المستخدم باللغة العربية الفصحى."
  },
  gulf_arabic: {
    female: "هلا والله! الصوت النسائي الخليجي جاهز. وش تبي تسأل طال عمرك؟",
    male: "هلا والله! الصوت الرجالي الخليجي جاهز. آمر وش بغيت يا طويل العمر؟",
    user: "صوت المستخدم باللهجة الخليجية صار جاهز!"
  },
  egyptian_arabic: {
    female: "يا هلا! الصوت النسائي المصري جاهز يا باشا، أأمرني تحب نساعدك بإيه؟",
    male: "يا هلا يا باشا! الصوت الرجالي المصري جاهز، قول لي أقدر أساعدك بإيه؟",
    user: "صوت المستخدم باللهجة المصرية شغال وزي الفل!"
  }
};

export function getVoiceConfirmationMessage(slangId, voiceId = 'female', langId = 'tamil') {
  const slangPrompts = DIALECT_VOICE_PROMPTS[slangId] || DIALECT_VOICE_PROMPTS.kongu_tamil;
  
  if (slangPrompts[voiceId]) {
    return slangPrompts[voiceId];
  }

  const voiceObj = getVoicePreference(langId, voiceId);
  if (voiceObj && slangPrompts[voiceObj.id]) {
    return slangPrompts[voiceObj.id];
  }

  if (voiceObj && voiceObj.gender && slangPrompts[voiceObj.gender]) {
    return slangPrompts[voiceObj.gender];
  }

  return slangPrompts.female || "Voice selection updated successfully!";
}

export function getSpeechRecognitionLanguage(langId, regionId) {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
  const region = lang?.regions?.find((r) => r.id === regionId) || lang?.regions?.[0];
  return region?.bcp47 || 'en-US';
}

export const SUPPORTED_EMOTIONS = [
  {
    id: 'default',
    name: 'Default',
    nativeName: 'இயல்பான நிலை (Neutral)',
    icon: '😐',
    badge: 'Natural',
    pitchModifier: 1.0,
    rateModifier: 1.0,
    description: 'Balanced, standard conversational tone'
  },
  {
    id: 'happy',
    name: 'Happy',
    nativeName: 'மகிழ்ச்சி / உற்சாகம் (Joyful)',
    icon: '😊',
    badge: 'Cheerful',
    pitchModifier: 1.16,
    rateModifier: 1.06,
    description: 'Joyful, bright, and cheerful upbeat tone'
  },
  {
    id: 'sad',
    name: 'Sad',
    nativeName: 'வருத்தம் / அமைதி (Gentle)',
    icon: '🥺',
    badge: 'Melancholic',
    pitchModifier: 0.86,
    rateModifier: 0.82,
    description: 'Empathetic, gentle, and soft tone'
  },
  {
    id: 'husky',
    name: 'Husky',
    nativeName: 'ஹஸ்கி / கம்பீரம் (Deep RJ)',
    icon: '🎙️',
    badge: 'Warm & Deep',
    pitchModifier: 0.74,
    rateModifier: 0.88,
    description: 'Warm, deep, husky and expressive RJ vocal timbre'
  },
  {
    id: 'excitement',
    name: 'Excitement',
    nativeName: 'அதி தீவிர உற்சாகம் (Electric)',
    icon: '🤩',
    badge: 'High Energy',
    pitchModifier: 1.24,
    rateModifier: 1.15,
    description: 'Thrilling, high-energy, vibrant excitement'
  },
  {
    id: 'calm',
    name: 'Calm',
    nativeName: 'அமைதி / தியானம் (Peaceful)',
    icon: '🧘',
    badge: 'Relaxed',
    pitchModifier: 0.94,
    rateModifier: 0.85,
    description: 'Soothing, meditative, and peaceful tone'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    nativeName: 'காதல் / மென்மை (Sweet)',
    icon: '💖',
    badge: 'Soft Whisper',
    pitchModifier: 0.96,
    rateModifier: 0.84,
    description: 'Warm, affectionate, soft whispering voice'
  },
  {
    id: 'bold',
    name: 'Bold / Energetic',
    nativeName: 'கம்பீரம் / அதிரடி (Assertive)',
    icon: '🔥',
    badge: 'Assertive',
    pitchModifier: 0.86,
    rateModifier: 1.08,
    description: 'Authoritative, strong, confident cadence'
  }
];

export function getEmotionPreference(emotionId = 'default') {
  return SUPPORTED_EMOTIONS.find((e) => e.id === emotionId) || SUPPORTED_EMOTIONS[0];
}

export const DIALECT_EMOTION_PROMPTS = {
  // Tamil
  kongu_tamil: {
    default: "இயல்பான வாய்ஸ் டோன் தேர்வு செஞ்சாச்சுங்கண்ணா! என்ன விஷயம்னு சொல்லுங்கண்ணா.",
    happy: "மகிழ்ச்சியான (Happy) டோன் செட் பண்ணியாச்சுங்கண்ணா! ரொம்ப சந்தோஷமா பேசுவேங்கண்ணா.",
    sad: "அமைதியான, மென்மையான வருத்த (Sad) டோன் பதிவு செஞ்சாச்சுங்கண்ணா. சொல்லுங்கண்ணா.",
    husky: "சூப்பருங்கண்ணா! ஹஸ்கி (Husky) வாய்ஸ் டோன் கம்பீரமா செட் பண்ணியாச்சுங்கண்ணா! என்ன விஷயம்னு சொல்லுங்கண்ணா?",
    excitement: "வாவ்! வேற லெவல் உற்சாகம் (Excitement) டோன் ஆன் பண்ணியாச்சுங்கண்ணா! தூள் கெளப்பலாமுங்களா?",
    calm: "அமைதியான, ரிலாக்ஸ்டான (Calm) வாய்ஸ் டோன் செட் பண்ணியாச்சுங்கண்ணா.",
    romantic: "மென்மையான காதல் உணர்வு (Romantic) வாய்ஸ் டோன் பதிவு செஞ்சாச்சுங்கண்ணா.",
    bold: "கம்பீரமான, அதிரடி (Bold) வாய்ஸ் டோன் தயார்ங்கண்ணா!"
  },
  chennai_tamil: {
    default: "டீபால்ட் வாய்ஸ் டோன் செட் பா! சொல்லு பாப்போம் என்ன விஷயம்னு.",
    happy: "செம்ம ஹாப்பி (Happy) டோன் பா! கெத்தா சந்தோஷமா பேசுவோம் பா.",
    sad: "ரிலாக்ஸ்டான மென்மையான (Sad) டோன் செட் பா. என்ன விஷயம் பா?",
    husky: "கெத்து பா! ஹஸ்கி (Husky) டோன் நச்சுன்னு செட் பண்ணியாச்சு பா! கலக்குவோம் பா.",
    excitement: "வேற மாரி எக்ஸைட்மென்ட் (Excitement) டோன் பா! தூள் கெளப்பலாம் பா.",
    calm: "கூல் அண்ட் காம் (Calm) வைப் டோன் செட் பா.",
    romantic: "ஸ்வீட்டான ரொமான்டிக் (Romantic) டோன் செட் பா.",
    bold: "தெறிக்கவிடும் போல்ட் (Bold) வாய்ஸ் டோன் ரெடி பா!"
  },
  madurai_tamil: {
    default: "இயல்பான வாய்ஸ் டோன் செட் பண்ணியாச்சுயா! சொல்லுங்க என்ன விஷயம்னு.",
    happy: "ரொம்ப சந்தோஷமான (Happy) டோனோட பேச தயார்யா! கேளுங்க பாத்துக்கலாம்.",
    sad: "அமைதியான மென்மையான (Sad) டோன் செட் பண்ணியாச்சுயா.",
    husky: "கம்பீரமான ஹஸ்கி (Husky) டோன் தயார்யா! மதுரை ஸ்டைல்ல கேளுங்க.",
    excitement: "அடேங்கப்பா! அதி தீவிர உற்சாகம் (Excitement) டோன் வந்தாச்சுயா!",
    calm: "அமைதியான (Calm) வாய்ஸ் டோன் தயார்யா.",
    romantic: "மென்மையான (Romantic) டோன் செட் பண்ணியாச்சுயா.",
    bold: "மதுரையின் கம்பீரமான (Bold) வீரக் குரல் டோன் தயார்யா!"
  },
  nellai_tamil: {
    default: "இயல்பான வாய்ஸ் டோன் பதிவு செஞ்சாச்சுவே! என்ன விபரம்னு சொல்லுங்க.",
    happy: "ஏலே நெல்லை அல்வா மாதிரி இனிமையான ஹாப்பி (Happy) டோன் தயார்வே!",
    sad: "மென்மையான வருத்த (Sad) டோன் பதிவு செஞ்சாச்சுவே.",
    husky: "ஹஸ்கி (Husky) வாய்ஸ் டோன் அருமையா செட் பண்ணியாச்சுவே!",
    excitement: "அடடே சூப்பரு! தீவிர உற்சாகம் (Excitement) டோன் வந்தாச்சுவே!",
    calm: "அமைதியான (Calm) டோன் அமைச்சாச்சுவே.",
    romantic: "நெஞ்சில் நிறையும் மென்மையான (Romantic) டோன் ரெடிவே.",
    bold: "கம்பீரமான அதிரடி (Bold) வாய்ஸ் டோன் தயார்வே!"
  },
  standard_tamil: {
    default: "இயல்பான குரல் டோன் தேர்ந்தெடுக்கப்பட்டது. நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    happy: "மகிழ்ச்சியான (Happy) குரல் டோன் தேர்ந்தெடுக்கப்பட்டது! உங்களோடு உரையாடுவதில் மிக்க மகிழ்ச்சி.",
    sad: "மென்மையான, அமைதியான (Sad) குரல் டோன் பதிவு செய்யப்பட்டது.",
    husky: "ஹஸ்கி (Husky) கம்பீரமான குரல் டோன் அமைக்கப்பட்டது.",
    excitement: "அதி தீவிர உற்சாகத்துடன் (Excitement) பதிலளிக்க நான் தயார்!",
    calm: "அமைதியான மற்றும் இதமான (Calm) குரல் டோன் தேர்ந்தெடுக்கப்பட்டது.",
    romantic: "மென்மையான காதல் உணர்வு (Romantic) குரல் டோன் பதிவு செய்யப்பட்டது.",
    bold: "கம்பீரமான மற்றும் உறுதியான (Bold) குரல் டோன் அமைக்கப்பட்டது."
  },

  // English
  american_standard: {
    default: "Default neutral voice tone activated. How can I assist you today?",
    happy: "Happy and cheerful voice tone set! I'm delighted to chat with you.",
    sad: "Gentle, compassionate voice tone selected. I'm here for you.",
    husky: "Husky, deep vocal timbre activated! Smooth and expressive.",
    excitement: "High-energy excitement tone is ON! Let's make something amazing!",
    calm: "Calm and peaceful voice tone set. Relax and ask away.",
    romantic: "Soft and warm romantic tone activated. How can I assist you?",
    bold: "Bold and authoritative voice tone is ready!"
  },
  american_casual: {
    default: "Default tone locked in! What's up?",
    happy: "Awesome! Happy and cheerful vibes set. What can I do for you?",
    sad: "Got it! Gentle, soft tone activated. What's on your mind?",
    husky: "Super smooth! Deep husky tone ready. Let's do this!",
    excitement: "Whoa, awesome! Excitement mode is fully charged! What's next?",
    calm: "Cool and calm vibes locked in. What do you need?",
    romantic: "Sweet and soft tone activated. How can I help?",
    bold: "Bold and powerful tone set! Let's get down to business."
  },
  british_casual: {
    default: "Default tone sorted, mate! How can I help you?",
    happy: "Brilliant! Happy and cheerful mood set, mate!",
    sad: "Gentle tone activated, mate. I'm right here for you.",
    husky: "Smooth husky tone ready, mate. Sounds brilliant!",
    excitement: "Blimey, excitement mode is buzzing, mate! Let's go!",
    calm: "All calm and sorted, mate. What's on your mind?",
    romantic: "Soft, lovely tone set, mate.",
    bold: "Bold and proper confident tone ready, mate!"
  },

  // Hindi
  standard_hindi: {
    default: "मानक हिन्दी में डिफ़ॉल्ट आवाज़ टोन सक्रिय किया गया है। मैं आपकी क्या सहायता कर सकता हूँ?",
    happy: "प्रसन्नता और उत्साहवर्धक (Happy) आवाज़ टोन सक्रिय हो गया है।",
    sad: "शांत एवं संवेदनशील (Sad) आवाज़ टोन सक्रिय किया गया है।",
    husky: "गंभीर और हस्की (Husky) आवाज़ टोन तैयार है।",
    excitement: "अत्यधिक उत्साहपूर्ण (Excitement) आवाज़ टोन सक्रिय है!",
    calm: "शांत और एकाग्र (Calm) टोन सक्रिय किया गया है।",
    romantic: "मधुर और कोमल (Romantic) टोन सक्रिय किया गया है।",
    bold: "दृढ़ और प्रभावशाली (Bold) आवाज़ टोन तैयार है।"
  },
  delhi_hindi: {
    default: "डिफ़ॉल्ट आवाज़ टोन सेट हो गया भाई! बताओ क्या मदद चाहिए?",
    happy: "एकदम मस्त हैप्पी (Happy) मूड सेट हो गया भाई! बहुत खुशी हुई बात करके.",
    sad: "शांत और सौम्य (Sad) टोन सेट हो गया भाई।",
    husky: "हस्की (Husky) और गंभीर अंदाज़ सेट हो गया भाई! बताओ क्या सीन है?",
    excitement: "फुल ऑन एक्साइटमेंट (Excitement) मोड चालू है भाई! आग लगा देंगे!",
    calm: "एकदम शांत और रिलैक्स्ड (Calm) टोन सेट है भाई।",
    romantic: "प्यारा और सॉफ्ट (Romantic) टोन सेट हो गया भाई।",
    bold: "दमदार और बोल्ड (Bold) आवाज़ तैयार है भाई!"
  },

  // Telugu
  standard_telugu: {
    default: "ప్రామాణిక తెలుగులో డిఫాల్ట్ వాయిస్ టోన్ ఎంపికైంది. మీకు ఎలా సహాయం చేయగలను?",
    happy: "సంతోషకరమైన (Happy) వాయిస్ టోన్ ఎంపికైంది. మీతో మాట్లాడటం చాలా ఆనందంగా ఉంది.",
    sad: "సున్నితమైన (Sad) వాయిస్ టోన్ ఎంపిక చేయబడింది.",
    husky: "హస్కీ (Husky) గంభీర స్వరం ఎంపికైంది.",
    excitement: "అధిక ఉత్సాహభరితమైన (Excitement) వాయిస్ టోన్ సిద్ధంగా ఉంది!",
    calm: "ప్రశాంతమైన (Calm) వాయిస్ టోన్ ఎంపిక చేయబడింది.",
    romantic: "మధురమైన రొమాంటిక్ (Romantic) వాయిస్ టోన్ ఎంపికైంది.",
    bold: "బలమైన బోల్డ్ (Bold) వాయిస్ టోన్ ఎంపికైంది."
  },
  telangana_telugu: {
    default: "డిఫాల్ట్ వాయిస్ టోన్ సెట్ అయింది. ఏదైనా అడగండి!",
    happy: "మంచి ఉల్లాసమైన హ్యాపీ (Happy) మూడ్ సెట్ అయింది! మస్తు మాట్లాడదాం.",
    sad: "శాంతమైన, సున్నితమైన (Sad) టోన్ సెట్ అయింది.",
    husky: "హస్కీ (Husky) గంభీరమైన వాయిస్ సెట్ అయింది మామ!",
    excitement: "కిరాక్ ఎగ్జైట్‌మెంట్ (Excitement) మోడ్ ఆన్ అయింది!",
    calm: "ప్రశాంతమైన (Calm) టోన్ ఎంపికైంది.",
    romantic: "మధురమైన రొమాంటిక్ (Romantic) వాయిస్ సెట్ అయింది.",
    bold: "గట్టి బోల్డ్ (Bold) వాయిస్ సిద్ధంగా ఉంది!"
  },

  // Malayalam
  standard_malayalam: {
    default: "ഡിഫോൾട്ട് ശബ്ദ ശൈലി തിരഞ്ഞെടുത്തു. ഞാൻ എങ്ങനെ സഹായിക്കണം?",
    happy: "സന്തോഷവും ഉന്മേഷവും നിറഞ്ഞ (Happy) മൂഡ് സെറ്റ് ചെയ്തു!",
    sad: "ശാന്തവും സൗമ്യവുമായ (Sad) ടോൺ സജീവമാക്കി.",
    husky: "ഗംഭീരമായ ഹസ്കി (Husky) ശബ്ദം തയ്യാറാണ്.",
    excitement: "ഉത്സാഹം നിറഞ്ഞ (Excitement) മൂഡ് ഓണാണ്!",
    calm: "പ്രശാന്തവും ശാന്തവുമായ (Calm) ശൈലി തിരഞ്ഞെടുത്തു.",
    romantic: "മധുരമായ റൊമാന്റിക് (Romantic) ശൈലി സജീവമാക്കി.",
    bold: "ശക്തവും ആധികാരികവുമായ (Bold) ശബ്ദം തയ്യാറാണ്."
  },
  valluvanadan_malayalam: {
    default: "സ്വാഭാവിക വോയ്സ് ടോൺ സെറ്റ് ചെയ്തു ട്ടോ! എന്താണ് കാര്യം എന്ന് പറയൂ.",
    happy: "സന്തോഷം നിറഞ്ഞ ഹാപ്പി (Happy) മൂഡ് സെറ്റ് ചെയ്തു ട്ടോ!",
    sad: "ശാന്തമായ സൗമ്യ ടോൺ തയ്യാറാണ് ട്ടോ.",
    husky: "ഗംഭീരമായ ഹസ്കി (Husky) ടോൺ തയ്യാറാണ് ട്ടോ!",
    excitement: "അടിപൊളി എക്സൈറ്റ്മെന്റ് (Excitement) ടോൺ ഓൺ ആയി ട്ടോ!",
    calm: "ശാന്തമായ കൂൾ ടോൺ റെഡിയാണ് ട്ടോ.",
    romantic: "മനോഹരമായ റൊമാന്റിക് ടോൺ സെറ്റ് ചെയ്തു ട്ടോ.",
    bold: "ഗംഭീര ബോൾഡ് (Bold) വോയ്സ് തയ്യാറാണ് ട്ടോ!"
  },

  // Kannada
  standard_kannada: {
    default: "ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡ ಧ್ವನಿ ಶೈಲಿ ಸಕ್ರಿಯವಾಗಿದೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    happy: "ಉಲ್ಲಾಸಭರಿತ ಮತ್ತು ಸಂತೋಷದ (Happy) ಮೂಡ್ ಸೆಟ್ ಆಗಿದೆ!",
    sad: "ಶಾಂತ ಮತ್ತು ಮೃದುವಾದ (Sad) ಧ್ವನಿ ಸಕ್ರಿಯವಾಗಿದೆ.",
    husky: "ಗಂಭೀರ ಹಸ್ಕಿ (Husky) ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ.",
    excitement: "ಪೂರ್ಣ ಉತ್ಸಾಹಭರಿತ (Excitement) ಮೋಡ್ ಆನ್ ಆಗಿದೆ!",
    calm: "ಪ್ರಶಾಂತವಾದ (Calm) ಧ್ವನಿ ಆಯ್ಕೆಯಾಗಿದೆ.",
    romantic: "ಮಧುರವಾದ ರೊಮ್ಯಾಂಟಿಕ್ (Romantic) ಧ್ವನಿ ಸಕ್ರಿಯವಾಗಿದೆ.",
    bold: "ಧೈರ್ಯಶಾಲಿ ಮತ್ತು ಗಟ್ಟಿಮುಟ್ಟಾದ (Bold) ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ."
  },
  bengaluru_kannada: {
    default: "ಡಿಫಾಲ್ಟ್ ವಾಯ್ಸ್ ಟೋನ್ ಸೆಟ್ ಆಗಿದೆ ಗುರು! ಏನ್ ಸಮಾಚಾರ?",
    happy: "ಫುಲ್ ಖುಷಿ ಹ್ಯಾಪಿ (Happy) ಮೂಡ್ ಸೆಟ್ ಗುರು!",
    sad: "ಕೂಲ್ ಆಂಡ್ ಸಾಫ್ಟ್ ಟೋನ್ ಸೆಟ್ ಆಗಿದೆ ಗುರು.",
    husky: "ಹಸ್ಕಿ ಗಂಭೀರ ಧ್ವನಿ ರೆಡಿಯಾಗಿದೆ ಗುರು!",
    excitement: "ಸೂಪರ್ ಎಕ್ಸೈಟ್‌ಮೆಂಟ್ (Excitement) ಆನ್ ಆಗಿದೆ ಗುರು!",
    calm: "ಪ್ರಶಾಂತ ಕಾಮ್ (Calm) ವೈಬ್ ಸೆಟ್ ಗುರು.",
    romantic: "ಸ್ವೀಟ್ ರೊಮ್ಯಾಂಟಿಕ್ ಧ್ವನಿ ರೆಡಿ ಗುರು.",
    bold: "ಖಡಕ್ ಬೋಲ್ಡ್ (Bold) ಧ್ವನಿ ಸಿದ್ಧ ಗುರು!"
  },

  // Bengali
  standard_bengali: {
    default: "প্রমিত বাংলা ভয়েস টোন সক্রিয় করা হয়েছে। আমি কীভাবে সহায়তা করতে পারি?",
    happy: "আনন্দ ও খুশির (Happy) মেজাজ সেট করা হয়েছে!",
    sad: "শান্ত ও কোমল (Sad) সুর সক্রিয় করা হয়েছে।",
    husky: "গম্ভীর ও চমৎকার হাস্কি (Husky) টোন প্রস্তুত।",
    excitement: "উত্তেজনাপূর্ণ (Excitement) মেজাজ চালু হয়েছে!",
    calm: "শান্ত ও স্নিগ্ধ (Calm) মেজাজ নির্বাচিত হয়েছে।",
    romantic: "মধুর রোমান্টিক (Romantic) সুর সক্রিয় হয়েছে।",
    bold: "দৃঢ় ও আত্মবিশ্বাসী (Bold) কণ্ঠস্বর প্রস্তুত।"
  },
  kolkata_bengali: {
    default: "ডিফল্ট ভয়েস টোন সেট দাদা! বলুন কি খবর?",
    happy: "দারুণ আনন্দের (Happy) মুড সেট দাদা!",
    sad: "একদম শান্ত ও স্নিগ্ধ টোন সেট দাদা।",
    husky: "গম্ভীর হাস্কি (Husky) টোন রেডি দাদা!",
    excitement: "ফাটাফাটি এক্সাইটমেন্ট (Excitement) মোড অন দাদা!",
    calm: "একদম রিল্যাক্সড শান্ত টোন সেট দাদা।",
    romantic: "মিষ্টি রোমান্টিক সুর সেট দাদা।",
    bold: "দমদার বোল্ড (Bold) ভয়েস প্রস্তুত দাদা!"
  },

  // Marathi
  standard_marathi: {
    default: "प्रमाण मराठी आवाज टोन सक्रिय केला आहे. मी आपली काय मदत करू शकतो?",
    happy: "आनंदी आणि प्रसन्न (Happy) मूड सेट झाला आहे!",
    sad: "शांत आणि हळुवार (Sad) टोन निवडला गेला आहे.",
    husky: "खर्जातला हस्की (Husky) आवाज तयार आहे.",
    excitement: "पूर्ण उत्साही (Excitement) मोड सुरू झाला आहे!",
    calm: "प्रशांत आणि एकाग्र (Calm) टोन सेट झाला आहे.",
    romantic: "मधुर रोमँटिक (Romantic) सूर सक्रिय झाला आहे.",
    bold: "ठोस आणि प्रभावी (Bold) आवाज तयार आहे."
  },
  puneri_marathi: {
    default: "पुणेरी आवाज टोन सेट झाला आहे. बोला काय काम आहे?",
    happy: "एकदम प्रसन्न आणि आनंदी (Happy) मूड सेट झालाय!",
    sad: "शांत आणि संयमित टोन तयार आहे.",
    husky: "गंभीर हस्की (Husky) आवाज सज्ज आहे.",
    excitement: "झकास उत्साह (Excitement) मोड ऑन आहे!",
    calm: "शांत आणि निवांत (Calm) टोन सेट झाला आहे.",
    romantic: "मधुर आणि हळुवार टोन सेट झाला आहे.",
    bold: "अस्सल आणि करारी (Bold) आवाज तयार आहे!"
  },

  // Gujarati
  standard_gujarati: {
    default: "પ્રમાણિત ગુજરાતી વૉઇસ ટોન સક્રિય થયો છે. હું તમારી શું સહાય કરી શકું?",
    happy: "આનંદ અને ઉત્સાહભર્યો (Happy) મૂડ સેટ થયો છે!",
    sad: "શાંત અને સૌમ્ય (Sad) ટોન પસંદ થયો છે.",
    husky: "ગંભીર અને હસ્કી (Husky) અવાજ તૈયાર છે.",
    excitement: "જોરદાર ઉત્સાહ (Excitement) મોડ ચાલુ થઈ ગયો છે!",
    calm: "શાંત અને સ્થિર (Calm) અવાજ સેટ થયો છે.",
    romantic: "મધુર અને રોમેન્ટિક (Romantic) સૂર સક્રિય થયો છે.",
    bold: "મજબૂત અને બોલ્ડ (Bold) અવાજ તૈયાર છે."
  },
  amdavad_gujarati: {
    default: "અમદાવાદી વૉઇસ ટોન સેટ થઈ ગયો ભાઈ! બોલો શું કામ છે?",
    happy: "એકદમ મજાનો હેપી (Happy) મૂડ સેટ થઈ ગયો ભાઈ!",
    sad: "શાંત અને ધીમો ટોન સેટ થયો છે ભાઈ.",
    husky: "હસ્કી (Husky) અંદાજ તૈયાર છે ભાઈ!",
    excitement: "ફૂલ ઓન એક્સાઇટમેન્ટ (Excitement) મોડ ચાલુ છે ભાઈ!",
    calm: "એકદમ શાંત અને કૂલ ટોન રેડી છે ભાઈ.",
    romantic: "મીઠો રોમેન્ટિક ટોન સેટ થયો ભાઈ.",
    bold: "દમદાર બોલ્ડ (Bold) અવાજ રેડી છે ભાઈ!"
  },

  // Spanish
  standard_spanish: {
    default: "Tono de voz predeterminado activado. ¿Cómo puedo asistirte hoy?",
    happy: "¡Modo alegre y entusiasta (Happy) activado!",
    sad: "Tono suave y compasivo (Sad) seleccionado.",
    husky: "Timbre de voz profundo y cálido (Husky) activado.",
    excitement: "¡Modo de máxima emoción (Excitement) encendido!",
    calm: "Tono tranquilo y sereno (Calm) establecido.",
    romantic: "Tono dulce y romántico (Romantic) activado.",
    bold: "¡Voz audaz y autoritaria (Bold) lista!"
  },
  castilian_spanish: {
    default: "Tono estándar en castellano fijado. ¿En qué te puedo ayudar?",
    happy: "¡Modo alegre y festivo activado, genial!",
    sad: "Tono suave y sereno seleccionado.",
    husky: "Voz profunda y resonante activada.",
    excitement: "¡Voz llena de energía y entusiasmo lista!",
    calm: "Ambiente tranquilo y sosegado activado.",
    romantic: "Tono dulce y acogedor activado.",
    bold: "¡Voz firme y enérgica preparada!"
  },

  // French
  parisian_french: {
    default: "Tonalité vocale par défaut configurée. Comment puis-je vous aider ?",
    happy: "Tonalité joyeuse et enthousiaste (Happy) activée !",
    sad: "Tonalité douce et compatissante (Sad) sélectionnée.",
    husky: "Timbre grave et chaleureux (Husky) activé.",
    excitement: "Mode excitation et énergie maximale (Excitement) activé !",
    calm: "Tonalité calme et sereine (Calm) configurée.",
    romantic: "Tonalité douce et romantique (Romantic) sélectionnée.",
    bold: "Voix affirmée et confiante (Bold) prête !"
  },

  // German
  standard_german: {
    default: "Standard-Stimmton aktiviert. Wie kann ich Ihnen behilflich sein?",
    happy: "Fröhlicher und heiterer (Happy) Modus aktiviert!",
    sad: "Sanfter und einfühlsamer (Sad) Ton ausgewählt.",
    husky: "Tiefe, sonore (Husky) Klangfarbe aktiviert.",
    excitement: "Hochenergetischer Begeisterungsmodus (Excitement) ist AN!",
    calm: "Ruhiger und entspannter (Calm) Ton eingestellt.",
    romantic: "Sanfter, herzlicher (Romantic) Ton aktiviert.",
    bold: "Selbstbewusste und kraftvolle (Bold) Stimme ist bereit!"
  },

  // Japanese
  standard_japanese: {
    default: "標準のボイストーンが設定されました。どのようなご用件でしょうか？",
    happy: "明るく元気な（Happy）トーンに設定されました！",
    sad: "穏やかで優しい（Sad）トーンが選択されました。",
    husky: "深みのあるハスキー（Husky）な声色になりました。",
    excitement: "ハイエナジーなワクワク（Excitement）モードがオンになりました！",
    calm: "落ち着いたリラックス（Calm）トーンに設定されました。",
    romantic: "甘く優しいロマンチック（Romantic）トーンになりました。",
    bold: "力強く頼もしい（Bold）ボイスの準備が整いました！"
  },

  // Arabic
  standard_arabic: {
    default: "تم تفعيل نبرة الصوت الافتراضية. كيف يمكنني مساعدتك اليوم؟",
    happy: "تم تفعيل النبرة السعيدة والمبتهجة (Happy) بنجاح!",
    sad: "تم تفعيل النبرة الهادئة واللطيفة (Sad).",
    husky: "تم تفعيل النبرة العميقة والدافئة (Husky).",
    excitement: "تم تشغيل وضع الحماس والطاقة العالية (Excitement)!",
    calm: "تم ضبط النبرة الهادئة والمريحة (Calm).",
    romantic: "تم تفعيل النبرة الرومانسية الدافئة (Romantic).",
    bold: "صوت قوي وواثق (Bold) جاهز للتحدث!"
  }
};

export const DIALECT_SPEED_PROMPTS = {
  kongu_tamil: {
    slow: "சரிங்கண்ணா! குரல் வேகம் மெதுவாக (Slow - 0.75x) மாற்றப்பட்டதுங்கண்ணா. இனி பொறுமையா, தெளிவா பேசுறேங்கண்ணா.",
    normal: "சரிங்கண்ணா! குரல் வேகம் இயல்பான (Normal - 1.0x) வேகத்திற்கு மாற்றப்பட்டதுங்கண்ணா.",
    fast: "சரிங்கண்ணா! குரல் வேகம் வேகமாக (Fast - 1.4x) மாற்றப்பட்டதுங்கண்ணா. இனி சட்டுன்னு பதில் சொல்றேங்கண்ணா!"
  },
  chennai_tamil: {
    slow: "சூப்பர் பா! வாய்ஸ் ஸ்பீடை ஸ்லோவா (Slow - 0.75x) செட் பண்ணியாச்சு பா. இனி மெதுவா பேசுறேன் பா.",
    normal: "கரெக்ட் பா! வாய்ஸ் ஸ்பீடை நார்மலா (Normal - 1.0x) மாத்தியாச்சு பா.",
    fast: "மஜா பா! வாய்ஸ் ஸ்பீடை பாஸ்ட்டா (Fast - 1.4x) செட் பண்ணிட்டேன் பா. ஜெட் வேகத்துல பதில் சொல்றேன் பா!"
  },
  madurai_tamil: {
    slow: "சரிங்கயா! குரல் வேகத்தை மெதுவாக (Slow - 0.75x) வச்சாச்சுங்கயா. இனி நிதானமா பேசுறேன்யா.",
    normal: "சரிங்கயா! குரல் வேகத்தை இயல்பான (Normal - 1.0x) வேகத்துல வச்சாச்சுங்கயா.",
    fast: "அடிதூள்யா! குரல் வேகத்தை வேகமா (Fast - 1.4x) மாத்தியாச்சுங்கயா. பட்டாசா பதில் சொல்றேன்யா!"
  },
  nellai_tamil: {
    slow: "அட ஏலே! குரல் வேகத்த மெதுவா (Slow - 0.75x) மாத்தியாச்சுவே. அமைதியா பேசுறேன்வே.",
    normal: "சரிவே! குரல் வேகத்த நார்மலா (Normal - 1.0x) வச்சாச்சுவே.",
    fast: "அடேங்கப்பா! குரல் வேகத்த பாஸ்ட்டா (Fast - 1.4x) மாத்தியாச்சுவே. மிரட்டலா பதில் தாரேன்வே!"
  },
  standard_tamil: {
    slow: "குரல் வேகம் மெதுவாக (Slow - 0.75x) அமைக்கப்பட்டது. இனி தெளிவான மெதுவான வேகத்தில் பதிலளிப்பேன்.",
    normal: "குரல் வேகம் இயல்பான (Normal - 1.0x) வேகத்திற்கு மாற்றப்பட்டது.",
    fast: "குரல் வேகம் வேகமாக (Fast - 1.4x) அமைக்கப்பட்டது. இனி அதிவேகத்தில் பதிலளிப்பேன்!"
  },
  delhi_hindi: {
    slow: "आवाज़ की गति धीमी (Slow - 0.75x) कर दी गई है भाई। अब मैं आराम से बोलूंगा।",
    normal: "आवाज़ की गति सामान्य (Normal - 1.0x) पर सेट कर दी गई है।",
    fast: "आवाज़ की गति तेज़ (Fast - 1.4x) कर दी गई है! अब फटाफट जवाब दूंगा।"
  },
  standard_hindi: {
    slow: "आवाज़ की गति धीमी (Slow - 0.75x) कर दी गई है। अब मैं आराम से बोलूंगा।",
    normal: "आवाज़ की गति सामान्य (Normal - 1.0x) गति पर सेट कर दी गई है।",
    fast: "आवाज़ की गति तेज़ (Fast - 1.4x) कर दी गई है। अब मैं तेज़ी से उत्तर दूंगा!"
  },
  telangana_telugu: {
    slow: "వాయిస్ వేగం నెమ్మదిగా (Slow - 0.75x) మార్చబడింది. ఇక నిదానంగా మాట్లాడుతాను.",
    normal: "వాయిస్ వేగం సాధారణ (Normal - 1.0x) వేగానికి మార్చబడింది.",
    fast: "వాయిస్ వేగం వేగంగా (Fast - 1.4x) మార్చబడింది! ఇక ఫాస్ట్‌గా సమాధానం ఇస్తాను."
  },
  standard_telugu: {
    slow: "వాయిస్ వేగం నెమ్మదిగా (Slow - 0.75x) మార్చబడింది. ఇకపై స్పష్టంగా నిదానంగా మాట్లాడతాను.",
    normal: "వాయిస్ వేగం సాధారణ (Normal - 1.0x) వేగానికి మార్చబడింది.",
    fast: "వాయిస్ వేగం వేగంగా (Fast - 1.4x) మార్చబడింది! ఇకపై వేగంగా స్పందిస్తాను."
  },
  valluvanadan_malayalam: {
    slow: "ശബ്ദ വേഗത സാവധാനത്തിലാക്കി (Slow - 0.75x). ഇനി ശാന്തമായി സംസാരിക്കാം.",
    normal: "ശബ്ദ വേഗത സാധാരണ നിലയിലാക്കി (Normal - 1.0x).",
    fast: "ശബ്ദ വേഗത വേഗത്തിലാക്കി (Fast - 1.4x)! ഇനി പെട്ടെന്ന് മറുപടി തരാം."
  },
  standard_malayalam: {
    slow: "ശബ്ദ വേഗത സാവധാനത്തിലാക്കി (Slow - 0.75x).",
    normal: "ശബ്ദ വേഗത സാധാരണ നിലയിലാക്കി (Normal - 1.0x).",
    fast: "ശബ്ദ വേഗത വേഗത്തിലാക്കി (Fast - 1.4x)!"
  },
  bengaluru_kannada: {
    slow: "ಧ್ವನಿಯ ವೇಗವನ್ನು ನಿಧಾನವಾಗಿ (Slow - 0.75x) ಹೊಂದಿಸಲಾಗಿದೆ. ಇನ್ಮುಂದೆ ಶಾಂತವಾಗಿ ಮಾತಾಡ್ತೀನಿ.",
    normal: "ಧ್ವನಿಯ ವೇಗವನ್ನು ಸಾಮಾನ್ಯ (Normal - 1.0x) ವೇಗಕ್ಕೆ ಹೊಂದಿಸಲಾಗಿದೆ.",
    fast: "ಧ್ವನಿಯ ವೇಗವನ್ನು ವೇಗವಾಗಿ (Fast - 1.4x) ಹೊಂದಿಸಲಾಗಿದೆ! ಇನ್ಮುಂದೆ ಬೇಗ ಉತ್ತರಿಸ್ತೀನಿ."
  },
  standard_kannada: {
    slow: "ಧ್ವನಿಯ ವೇಗವನ್ನು ನಿಧಾನವಾಗಿ (Slow - 0.75x) ಹೊಂದಿಸಲಾಗಿದೆ.",
    normal: "ಧ್ವನಿಯ ವೇಗವನ್ನು ಸಾಮಾನ್ಯ (Normal - 1.0x) ವೇಗಕ್ಕೆ ಹೊಂದಿಸಲಾಗಿದೆ.",
    fast: "ಧ್ವನಿಯ ವೇಗವನ್ನು ವೇಗವಾಗಿ (Fast - 1.4x) ಹೊಂದಿಸಲಾಗಿದೆ!"
  },
  kolkata_bengali: {
    slow: "কথা বলার গতি ধীর (Slow - 0.75x) করা হয়েছে। এবার ধীরে ধীরে বলব।",
    normal: "কথা বলার গতি স্বাভাবিক (Normal - 1.0x) গতিতে সেট করা হয়েছে।",
    fast: "কথা বলার গতি দ্রুত (Fast - 1.4x) করা হয়েছে! এবার ঝটপট উত্তর দেব।"
  },
  standard_bengali: {
    slow: "কথা বলার গতি ধীর (Slow - 0.75x) করা হয়েছে।",
    normal: "কথা বলার গতি স্বাভাবিক (Normal - 1.0x) করা হয়েছে।",
    fast: "কথা বলার গতি দ্রুত (Fast - 1.4x) করা হয়েছে!"
  },
  puneri_marathi: {
    slow: "आवाजाचा वेग मंद (Slow - 0.75x) करण्यात आला आहे. आता शांतपणे बोलेन.",
    normal: "आवाजाचा वेग सामान्य (Normal - 1.0x) ठेवला आहे.",
    fast: "आवाजाचा वेग जलद (Fast - 1.4x) करण्यात आला आहे! आता पटकन उत्तर देईन."
  },
  standard_marathi: {
    slow: "आवाजाचा वेग मंद (Slow - 0.75x) करण्यात आला आहे.",
    normal: "आवाजाचा वेग सामान्य (Normal - 1.0x) ठेवला आहे.",
    fast: "आवाजाचा वेग जलद (Fast - 1.4x) करण्यात आला आहे!"
  },
  amdavad_gujarati: {
    slow: "અવાજની ગતિ ધીમી (Slow - 0.75x) કરવામાં આવી છે. હવે ધીમેથી બોલીશ.",
    normal: "અવાજની ગતિ સામાન્ય (Normal - 1.0x) કરવામાં આવી છે.",
    fast: "અવાજની ગતિ ઝડપી (Fast - 1.4x) કરવામાં આવી છે! હવે ફટાફટ જવાબ આપીશ."
  },
  standard_gujarati: {
    slow: "અવાજની ગતિ ધીમી (Slow - 0.75x) કરવામાં આવી છે.",
    normal: "અવાજની ગતિ સામાન્ય (Normal - 1.0x) કરવામાં આવી છે.",
    fast: "અવાજની ગતિ ઝડપી (Fast - 1.4x) કરવામાં આવી છે!"
  },
  american_standard: {
    slow: "Speech speed set to Slow (0.75x). I will speak more deliberately and clearly.",
    normal: "Speech speed restored to Normal (1.0x) pace.",
    fast: "Speech speed set to Fast (1.4x). I will respond quickly and briskly!"
  },
  british_rp: {
    slow: "Speech pace adjusted to Slow (0.75x). Speaking at a relaxed pace.",
    normal: "Speech pace set to Normal (1.0x).",
    fast: "Speech pace set to Fast (1.4x). Ready for rapid responses!"
  },
  indian_english: {
    slow: "Speech speed set to Slow (0.75x). I will speak slowly and clearly for you.",
    normal: "Speech speed set to Normal (1.0x).",
    fast: "Speech speed set to Fast (1.4x). Rapid response mode active!"
  },
  standard_spanish: {
    slow: "Velocidad de voz configurada a lenta (Slow - 0.75x). Hablaré con más calma.",
    normal: "Velocidad de voz establecida en normal (Normal - 1.0x).",
    fast: "Velocidad de voz configurada a rápida (Fast - 1.4x). ¡Respuestas inmediatas!"
  },
  parisian_french: {
    slow: "Vitesse vocale réglée sur lente (Slow - 0.75x). Je parlerai plus posément.",
    normal: "Vitesse vocale rétablie sur normale (Normal - 1.0x).",
    fast: "Vitesse vocale réglée sur rapide (Fast - 1.4x). Réponses instantanées !"
  },
  standard_german: {
    slow: "Sprechgeschwindigkeit auf langsam (Slow - 0.75x) eingestellt. Ich spreche nun ruhiger.",
    normal: "Sprechgeschwindigkeit auf normal (Normal - 1.0x) gesetzt.",
    fast: "Sprechgeschwindigkeit auf schnell (Fast - 1.4x) gestellt. Schnelle Antworten aktiviert!"
  },
  standard_japanese: {
    slow: "音声速度をゆっくり（0.75倍）に設定しました。落ち着いてお話しします。",
    normal: "音声速度を標準（1.0倍）に設定しました。",
    fast: "音声速度を速く（1.4倍）に設定しました！素早くお答えします。"
  },
  standard_arabic: {
    slow: "تم ضبط سرعة الصوت على بطيء (Slow - 0.75x). سأتحدث بهدوء ووضوح.",
    normal: "تم ضبط سرعة الصوت على عادي (Normal - 1.0x).",
    fast: "تم ضبط سرعة الصوت على سريع (Fast - 1.4x). جاهز للإجابة بسرعة!"
  }
};

export function getEmotionConfirmationMessage(slangId = 'kongu_tamil', emotionId = 'default', langId = 'tamil') {
  // 1. Exact dialect match
  if (slangId && DIALECT_EMOTION_PROMPTS[slangId] && DIALECT_EMOTION_PROMPTS[slangId][emotionId]) {
    return DIALECT_EMOTION_PROMPTS[slangId][emotionId];
  }

  // 2. Strict language-level fallback
  const langFallbackMap = {
    tamil: DIALECT_EMOTION_PROMPTS.standard_tamil || DIALECT_EMOTION_PROMPTS.kongu_tamil,
    english: DIALECT_EMOTION_PROMPTS.american_standard,
    hindi: DIALECT_EMOTION_PROMPTS.standard_hindi || DIALECT_EMOTION_PROMPTS.delhi_hindi,
    telugu: DIALECT_EMOTION_PROMPTS.standard_telugu || DIALECT_EMOTION_PROMPTS.telangana_telugu,
    malayalam: DIALECT_EMOTION_PROMPTS.standard_malayalam || DIALECT_EMOTION_PROMPTS.valluvanadan_malayalam,
    kannada: DIALECT_EMOTION_PROMPTS.standard_kannada || DIALECT_EMOTION_PROMPTS.bengaluru_kannada,
    bengali: DIALECT_EMOTION_PROMPTS.standard_bengali || DIALECT_EMOTION_PROMPTS.kolkata_bengali,
    marathi: DIALECT_EMOTION_PROMPTS.standard_marathi || DIALECT_EMOTION_PROMPTS.puneri_marathi,
    gujarati: DIALECT_EMOTION_PROMPTS.standard_gujarati || DIALECT_EMOTION_PROMPTS.amdavad_gujarati,
    spanish: DIALECT_EMOTION_PROMPTS.standard_spanish || DIALECT_EMOTION_PROMPTS.castilian_spanish,
    french: DIALECT_EMOTION_PROMPTS.parisian_french,
    german: DIALECT_EMOTION_PROMPTS.standard_german,
    japanese: DIALECT_EMOTION_PROMPTS.standard_japanese,
    arabic: DIALECT_EMOTION_PROMPTS.standard_arabic
  };

  const fallbackMap = langFallbackMap[langId] || DIALECT_EMOTION_PROMPTS.standard_tamil;
  return fallbackMap?.[emotionId] || fallbackMap?.default || "Voice tone updated!";
}

export function getSpeechSpeedConfirmationMessage(slangId = 'kongu_tamil', speedId = 'normal', langId = 'tamil') {
  const normalizedSpeed = (speedId === 'slow' || speedId === 'fast') ? speedId : 'normal';

  // 1. Exact dialect match
  if (slangId && DIALECT_SPEED_PROMPTS[slangId] && DIALECT_SPEED_PROMPTS[slangId][normalizedSpeed]) {
    return DIALECT_SPEED_PROMPTS[slangId][normalizedSpeed];
  }

  // 2. Strict language-level fallback
  const langFallbackMap = {
    tamil: DIALECT_SPEED_PROMPTS.standard_tamil || DIALECT_SPEED_PROMPTS.kongu_tamil,
    english: DIALECT_SPEED_PROMPTS.american_standard,
    hindi: DIALECT_SPEED_PROMPTS.standard_hindi || DIALECT_SPEED_PROMPTS.delhi_hindi,
    telugu: DIALECT_SPEED_PROMPTS.standard_telugu || DIALECT_SPEED_PROMPTS.telangana_telugu,
    malayalam: DIALECT_SPEED_PROMPTS.standard_malayalam || DIALECT_SPEED_PROMPTS.valluvanadan_malayalam,
    kannada: DIALECT_SPEED_PROMPTS.standard_kannada || DIALECT_SPEED_PROMPTS.bengaluru_kannada,
    bengali: DIALECT_SPEED_PROMPTS.standard_bengali || DIALECT_SPEED_PROMPTS.kolkata_bengali,
    marathi: DIALECT_SPEED_PROMPTS.standard_marathi || DIALECT_SPEED_PROMPTS.puneri_marathi,
    gujarati: DIALECT_SPEED_PROMPTS.standard_gujarati || DIALECT_SPEED_PROMPTS.amdavad_gujarati,
    spanish: DIALECT_SPEED_PROMPTS.standard_spanish,
    french: DIALECT_SPEED_PROMPTS.parisian_french,
    german: DIALECT_SPEED_PROMPTS.standard_german,
    japanese: DIALECT_SPEED_PROMPTS.standard_japanese,
    arabic: DIALECT_SPEED_PROMPTS.standard_arabic
  };

  const fallbackMap = langFallbackMap[langId] || DIALECT_SPEED_PROMPTS.standard_tamil;
  return fallbackMap?.[normalizedSpeed] || fallbackMap?.normal || "Speech speed updated!";
}
