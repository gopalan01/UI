// THAMILI AI AUDIO PLATFORM - COMPREHENSIVE KNOWLEDGE BASE & MULTILINGUAL REASONING PATTERNS
// 14 Languages: Tamil, English, Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Spanish, French, German, Japanese, Arabic

export const INTENT_DEFINITIONS = [
  {
    id: 'greeting',
    patterns: [
      'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'yo',
      'வணக்கம்', 'ஹாய்', 'ஹலோ', 'வணக்கங்கண்ணா', 'வணக்கம்பா', 'வணக்கம்ணே', 'வணக்கம்வே', 'vanakkam',
      'नमस्ते', 'हेलो', 'हाय', 'प्रणाम', 'राम राम',
      'నమస్కారం', 'హలో', 'హాయ్', 'నమస్తే',
      'നമസ്കാരം', 'ഹലോ', 'ഹായ്', 'സുഖമാണോ',
      'ನಮಸ್ಕಾರ', 'ಹಲೋ', 'ಹಾಯ್', 'ಶುಭೋದಯ',
      'নমস্কার', 'হ্যালো', 'হাই', 'কেমন আছেন',
      'नमस्कार', 'हॅलो', 'हाय', 'प्रणाम',
      'નમસ્તે', 'હેલો', 'હાય', 'જય શ્રી કૃષ્ણ',
      'hola', 'buenos días', 'buenas tardes', 'qué tal',
      'bonjour', 'salut', 'bonsoir', 'coucou',
      'hallo', 'guten tag', 'guten morgen', 'servus', 'moin',
      'こんにちは', 'おはよう', 'こんばんは', 'やっほー',
      'مرحبا', 'أهلا', 'السلام عليكم', 'صباح الخير', 'مساء الخير'
    ]
  },
  {
    id: 'how_are_you',
    patterns: [
      'how are you', 'how are you doing', 'how is it going', 'whats up', "what's up", 'how do you do',
      'எப்படி இருக்க', 'எப்படி இருக்கீங்க', 'எப்படி இருக்கீங்கண்ணா', 'சௌக்கியமா', 'நலமா', 'சுகமா', 'epdi irukinga', 'epdi irukka',
      'क्या हाल चाल', 'सब ठीक ठाक', 'हाल चाल कैसा है', 'आप कैसे हैं', 'कैसा है भाई',
      'బాగున్నారా', 'ఎలా ఉన్నారు', 'ఎలా ఉన్నావు', 'కుశలమా', 'ఏంటి సంగతులు',
      'സുഖമാണോ', 'വിശേഷങ്ങൾ എന്തൊക്കെ', 'എങ്ങനെയുണ്ട്',
      'ಹೇಗಿದ್ದೀರಾ', 'ಆರಾಮಾಗಿದ್ದೀರಾ', 'ಏನ್ ಸಮಾಚಾರ',
      'কেমন আছেন', 'কি খবর', 'সব ঠিকঠাক',
      'कसे आहात', 'काय चाललंय', 'मजेत ना',
      'કેમ છો', 'મજામાં છો', 'શું ચાલે છે',
      'cómo estás', 'cómo te va', 'qué pasa',
      'comment allez-vous', 'comment ça va', 'ça roule',
      'wie geht es dir', 'wie gehts', 'alles gut',
      '元気ですか', '調子はどうですか', 'どうしてる',
      'كيف حالك', 'شلونك', 'شخبارك', 'إزيك', 'عامل ايه'
    ]
  },
  {
    id: 'identity',
    patterns: [
      'who are you', 'what is your name', 'whats your name', 'tell me about yourself', 'introduce yourself',
      'நீங்க யாரு', 'யார் நீங்க', 'உன் பெயர் என்ன', 'நீ யார்', 'உன்ன பத்தி சொல்லு', 'உங்க பேர் என்ன', 'who r u', 'neenga yaaru',
      'तुम्हारा नाम क्या है', 'आप कौन हैं', 'अपने बारे में बताओ', 'परिचय दो',
      'నీ పేరు ఏమిటి', 'నువ్వు ఎవరు', 'నీ గురించి చెప్పు',
      'ആരാണ് നിങ്ങൾ', 'പേരെന്താണ്', 'സ്വയം പരിചയപ്പെടുത്തൂ',
      'ನಿಮ್ಮ ಹೆಸರೇನು', 'ನೀವು ಯಾರು', 'ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ',
      'আপনার নাম কি', 'আপনি কে', 'নিজের পরিচয় দিন',
      'तुमचे नाव काय आहे', 'तुम्ही कोण आहात', 'स्वतःबद्दल सांगा',
      'તમારું નામ શું છે', 'તમે કોણ છો', 'તમારા વિશે જણાવો',
      'quién eres', 'cómo te llamas', 'cuál es tu nombre',
      'qui es-tu', 'comment vous appelez-vous', 'présentez-vous',
      'wer bist du', 'wie heißt du', 'stell dich vor',
      'あなたは誰ですか', '名前は何ですか', '自己紹介して',
      'من أنت', 'ما اسمك', 'عرفني بنفسك'
    ]
  },
  {
    id: 'aurqo_info',
    patterns: [
      'what is thamili', 'tell me about this project', 'tell me about thamili', 'about platform', 'thamili platform',
      'தமிழி என்றால் என்ன', 'இந்த புராஜெக்ட் என்ன', 'தமிழி பத்தி சொல்லு', 'தமிழி தளம்', 'what is thamili ai',
      'thamili क्या है', 'इस प्रोजेक्ट के बारे में बताओ', 'thamili के बारे में बताओ',
      'thamili అంటే ఏమిటి', 'ఈ ప్రాజెక్ట్ గురించి చెప్పు', 'తమిళి వివరాలు',
      'എന്താണ് തമിഴി', 'ഈ പ്രൊജക്റ്റിനെ കുറിച്ച് പറയൂ',
      'ತಮಿಳಿ ಎಂದರೇನು', 'ಈ ಪ್ರಾಜೆಕ್ಟ್ ಬಗ್ಗೆ ತಿಳಿಸಿ',
      'তমিঝি কি', 'এই প্রজেক্ট সম্পর্কে বলুন',
      'तमिळी म्हणजे काय', 'या प्रोजेक्टबद्दल सांगा',
      'તમિઝી શું છે', 'આ પ્રોજેક્ટ વિશે જણાવો',
      'qué es thamili', 'háblame de thamili',
      'qu’est-ce que thamili', 'parlez-moi de thamili',
      'was ist thamili', 'erzähle mir über thamili',
      'タミリとは何ですか', 'このプロジェクトについて教えて',
      'ما هي منصة thamili', 'أخبرني عن مشروع thamili'
    ]
  },
  {
    id: 'capabilities',
    patterns: [
      'what can you do', 'how can you help me', 'what are your features', 'help me', 'features',
      'உன்னால என்ன செய்ய முடியும்', 'எனக்கு என்ன உதவி செய்வ', 'உன் திறமைகள் என்ன', 'என்னெல்லாம் பேசுவ', 'unnala enna panna mudiyum',
      'तुम क्या कर सकते हो', 'मेरी क्या मदद करोगे', 'तुम्हारे फीचर्स क्या हैं',
      'నువ్వు ఏమి చేయగలవు', 'నాకు ఎలా సహాయపడతావు', 'నీ ఫీచర్స్ ఏమిటి',
      'നിങ്ങൾക്ക് എന്തൊക്കെ ചെയ്യാനാകും', 'എങ്ങനെ സഹായിക്കാൻ കഴിയും',
      'ನೀವು ಏನು ಮಾಡಬಲ್ಲಿರಿ', 'ನನಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುವಿರಿ',
      'আপনি কি করতে পারেন', 'আমাকে কীভাবে সাহায্য করবেন',
      'तुम्ही काय करू शकता', 'माझी काय मदत कराल',
      'તમે શું કરી શકો છો', 'મને કેવી રીતે મદદ કરી શકો',
      'qué puedes hacer', 'en qué me puedes ayudar',
      'que pouvez-vous faire', 'comment m’aider',
      'was kannst du tun', 'wie kannst du mir helfen',
      '何ができますか', 'どんな機能がありますか',
      'ماذا يمكنك أن تفعل', 'كيف يمكنك مساعدتي'
    ]
  },
  {
    id: 'weather_time',
    patterns: [
      'weather', 'climate', 'temperature', 'time', 'what is the time', 'current time', 'rain',
      'வானிலை எப்படி இருக்கு', 'வானிலை', 'கிளைமேட்', 'மழை', 'வெயில்', 'மணி என்ன', 'நேரம் என்ன',
      'मौसम कैसा है', 'तापमान क्या है', 'समय क्या हुआ', 'कितने बजे हैं',
      'వాతావరణం ఎలా ఉంది', 'టైమ్ ఎంత', 'సమయం ఎంత',
      'കാലാവസ്ഥ എങ്ങനെയുണ്ട്', 'ഇപ്പൊ സമയം എത്രയായി',
      'ಹವಾಮಾನ ಹೇಗಿದೆ', 'ಈಗ ಸಮಯ ಎಷ್ಟು',
      'আবহাওয়া কেমন', 'এখন সময় কত',
      'हवामान कसे आहे', 'किती वाजले आहेत',
      'હવામાન કેવું છે', 'સમય કેટલો થયો',
      'cómo está el clima', 'qué hora es', 'hace calor',
      'quel temps fait-il', 'quelle heure est-il',
      'wie ist das wetter', 'wie viel uhr ist es',
      '天気はどうですか', '今何時ですか',
      'كيف هو الطقس', 'كم الساعة الآن'
    ]
  },
  {
    id: 'food_meals',
    patterns: [
      'food', 'breakfast', 'lunch', 'dinner', 'what did you eat', 'favorite food', 'what is cooking',
      'சாப்பிட்டீங்களா', 'சாப்டீங்களா', 'என்ன சாப்பாடு', 'என்ன சமையல்', 'உணவு', 'சாப்பாடு', 'டிபன்', 'saptingala',
      'खाना खाया', 'क्या खाया', 'खाना क्या है', 'भोजन',
      'భోజనం చేశారా', 'ఏం తిన్నారు', 'ఏం వంట',
      'ഭക്ഷണം കഴിച്ചോ', 'എന്താണ് സ്പെഷ്യൽ ഭക്ഷണം',
      'ಊಟ ಆಯ್ತಾ', 'ತಿಂಡಿ ತಿಂದ್ರಾ', 'ಏನ್ ಊಟ',
      'খাবার খেয়েছেন', 'কি রান্না হয়েছে',
      'जेवलात का', 'काय जेवण आहे',
      'જમી લીધું', 'શું જમવાનું છે',
      'has comido', 'cuál es tu comida favorita',
      'as-tu mangé', 'quel est ton plat préféré',
      'hast du gegessen', 'was ist dein lieblingsessen',
      'ご飯食べましたか', '好きな食べ物は何ですか',
      'هل أكلت', 'ما هو طعامك المفضل'
    ]
  },
  {
    id: 'fun_joke',
    patterns: [
      'tell me a joke', 'say something funny', 'make me laugh', 'joke', 'funny',
      'ஒரு ஜோக் சொல்லு', 'ஜோக் சொல்லுங்க', 'சிரிக்க வை', 'நகைச்சுவை', 'காமெடி சொல்லு', 'joke sollu',
      'कोई चुटकुला सुनाओ', 'मजाक करो', 'हंसाओ', 'जोक सुनाओ',
      'ఒక జోక్ చెప్పు', 'నవ్వించు', 'కామెడీ చెప్పు',
      'ഒരു തമാശ പറയൂ', 'തമാശ പറയുമോ',
      'ಒಂದು ಜೋಕ್ ಹೇಳಿ', 'ನಗಿಸಿ',
      'একটি কৌতুক বলুন', 'মজার কিছু বলুন',
      'एक विनोद सांगा', 'काहीतरी मजेशीर सांगा',
      'એક જોક કહો', 'કંઈક રમુજી કહો',
      'cuéntame un chiste', 'hazme reír',
      'raconte-moi une blague', 'fais-moi rire',
      'erzähle einen witz', 'bring mich zum lachen',
      '冗談を言って', '面白い話をして',
      'قل لي نكتة', 'أضحكني'
    ]
  },
  {
    id: 'riddle',
    patterns: [
      'riddle', 'tell me a riddle', 'puzzle',
      'விடுகதை', 'ஒரு விடுகதை போடு', 'விடுகதை சொல்லு', 'vidukathai',
      'पहेली', 'पहेली पूछो', 'एक पहेली',
      'ఒక పొడుపుకథ చెప్పు', 'పొడుపుకథ',
      'ഒരു കടങ്കഥ ചോദിക്കൂ', 'കടങ്കഥ',
      'ಒಂದು ಒಗಟು ಹೇಳಿ', 'ಒಗಟು',
      'একটি ধাঁধা বলুন', 'ধাঁধা',
      'एक कोडे सांगा', 'कोडे',
      'એક ઉખાણું પૂછો', 'ઉખાણું',
      'una adivinanza', 'dime una adivinanza',
      'une devinette', 'pose-moi une devinette',
      'ein rätsel', 'stelle mir ein rätsel',
      'なぞなぞを出して', 'なぞなぞ',
      'لغز', 'قل لي لغزاً'
    ]
  },
  {
    id: 'poetry_kavithai',
    patterns: [
      'poem', 'poetry', 'sing a song', 'song', 'say a poem',
      'கவிதை', 'கவிதை சொல்லு', 'பாட்டு', 'பாட்டு பாடு', 'kavithai',
      'कविता सुनाओ', 'शायरी सुनाओ', 'गाना गाओ',
      'కవిత చెప్పు', 'పాట పాడు',
      'ഒരു കവിത ചൊല്ലൂ', 'പാട്ട് പാടൂ',
      'ಒಂದು ಕವನ ಹೇಳಿ', 'ಹಾಡು ಹಾಡಿ',
      'একটি কবিতা বলুন', 'গান গান',
      'एक कविता सांगा', 'गाणे गा',
      'એક કવિતા કહો', 'ગીત ગાઓ',
      'un poema', 'recita un poema', 'canta una canción',
      'un poème', 'récite un poème', 'chante une chanson',
      'ein gedicht', 'sag ein gedicht',
      '詩を読んで', '歌を歌って',
      'قصيدة', 'ألقي شعراً', 'غن أغنية'
    ]
  },
  {
    id: 'story',
    patterns: [
      'story', 'tell me a story', 'short story',
      'கதை', 'கதை சொல்லு', 'சிறு கதை', 'ஒரு கதை சொல்லுங்க', 'kadhai',
      'कहानी सुनाओ', 'एक कहानी',
      'కథ చెప్పు', 'ఒక కథ',
      'ഒരു കഥ പറയൂ', 'ചെറുകഥ',
      'ಒಂದು ಕಥೆ ಹೇಳಿ', 'ಸಣ್ಣ ಕಥೆ',
      'একটি গল্প বলুন', 'ছোট গল্প',
      'एक गोष्ट सांगा', 'लहान गोष्ट',
      'એક વાર્તા કહો', 'ટૂંકી વાર્તા',
      'cuéntame una historia', 'un cuento',
      'raconte-moi une histoire',
      'erzähle eine geschichte',
      '物語を話して', 'お話を聴かせて',
      'قصة', 'احك لي قصة'
    ]
  },
  {
    id: 'advice_motivation',
    patterns: [
      'advice', 'motivation', 'motivate me', 'health tips', 'success tips', 'life advice',
      'அட்வைஸ்', 'மோட்டிவேஷன்', 'வெற்றி', 'உடல் நலம்', 'நல்ல யோசனை', 'வாழ்க்கை',
      'सलाह दो', 'मोटिवेशनल बात बताओ', 'सफलता का मंत्र',
      'మంచి సలహా ఇవ్వు', 'మోటివేషన్ చెప్పు',
      'നല്ലൊരു ഉപദേശം തരൂ', 'പ്രചോദനം നൽകൂ',
      'ಒಳ್ಳೆಯ ಸಲಹೆ ಕೊಡಿ', 'ಪ್ರೇರಣೆ ನೀಡಿ',
      'উপদেশ দিন', 'অনুপ্রেরণা দিন',
      'सल्ला द्या', 'प्रेरणादायी विचार सांगा',
      'સારી સલાહ આપો', 'પ્રેરણા આપો',
      'dame un consejo', 'motívame',
      'donne-moi un conseil', 'motive-moi',
      'gib mir einen rat', 'motiviere mich',
      'アドバイスをください', 'モチベーションを上げて',
      'نصيحة', 'أعطني نصيحة', 'حفزني'
    ]
  },
  {
    id: 'tech_ai',
    patterns: [
      'what is ai', 'artificial intelligence', 'machine learning', 'tech', 'coding', 'computer', 'programming',
      'ai என்றால் என்ன', 'செயற்கை நுண்ணறிவு', 'coding pathi sollu',
      'एआई क्या है', 'कंप्यूटर', 'कोडिंग', 'टेक्नोलॉजी',
      'ఏఐ అంటే ఏమిటి', 'కంప్యూటర్', 'కోడింగ్',
      'എന്താണ് എഐ', 'ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ്',
      'ಎಐ ಎಂದರೇನು', 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ',
      'এআই কি', 'কৃত্রিম বুদ্ধিমত্তা',
      'एआय म्हणजे काय', 'कृत्रिम बुद्धिमत्ता',
      'એઆઈ શું છે', 'કૃત્રિમ બુદ્ધિ',
      'qué es la ia', 'inteligencia artificial',
      'qu’est-ce que l’ia', 'intelligence artificielle',
      'was ist ki', 'künstliche intelligenz',
      'AIとは何ですか', '人工知能について',
      'ما هو الذكاء الاصطناعي', 'تقنية ai'
    ]
  },
  {
    id: 'science_nature',
    patterns: [
      'why is sky blue', 'sun', 'moon', 'earth', 'nature', 'science',
      'வானம் ஏன் நீலமாக இருக்கு', 'பூமி', 'சூரியன்', 'நிலா', 'இயற்கை', 'அறிவியல்',
      'आसमान नीला क्यों है', 'सूरज', 'चाँद', 'पृथ्वी', 'विज्ञान',
      'ఆకాశం నీలంగా ఎందుకుంటుంది', 'సూర్యుడు', 'చంద్రుడు', 'భూమి', 'సైన్స్',
      'ആകാശം എന്തുകൊണ്ട് നീലനിറമാണ്', 'പ്രകൃതി', 'സൂര്യൻ',
      'ಆಕಾಶ ಏಕೆ ನೀಲಿಯಾಗಿದೆ', 'ಸೂರ್ಯ', 'ಚಂದ್ರ', 'ವಿಜ್ಞಾನ',
      'আকাশ নীল কেন', 'সূর্য', 'চাঁদ', 'বিজ্ঞান',
      'आकाश निळे का दिसते', 'सूर्य', 'चंद्र', 'विज्ञान',
      'આકાશ કેમ વાદળી છે', 'સૂર્ય', 'ચંદ્ર', 'વિજ્ઞાન',
      'por qué el cielo es azul', 'la naturaleza', 'la ciencia',
      'pourquoi le ciel est bleu', 'la nature', 'la science',
      'warum ist der himmel blau', 'natur', 'wissenschaft',
      'なぜ空は青いのですか', '自然', '科学',
      'لماذا السماء زرقاء', 'الطبيعة', 'العلوم'
    ]
  },
  {
    id: 'compliment_thank',
    patterns: [
      'thanks', 'thank you', 'super', 'awesome', 'great', 'amazing', 'well done', 'nice',
      'நன்றி', 'ரொம்ப நன்றி', 'சூப்பர்', 'அருமை', 'நல்லா இருக்கு', 'கெத்து', 'romba nandri',
      'धन्यवाद', 'शुक्रिया', 'बहुत बढ़िया', 'शाबाश',
      'ధన్యవాదాలు', 'చాలా బాగుంది', 'సూపర్',
      'നന്ദി', 'വളരെ നന്ദി', 'സൂപ്പർ', 'അടിപൊളി',
      'ಧನ್ಯವಾದಗಳು', 'ತುಂಬಾ ಧನ್ಯವಾದ', 'ಸೂಪರ್',
      'ধন্যবাদ', 'অনেক ধন্যবাদ', 'চমৎকার',
      'धन्यवाद', 'खूप छान', 'मस्त',
      'આભાર', 'ખૂબ આભાર', 'સરસ',
      'gracias', 'muchas gracias', 'excelente', 'genial',
      'merci', 'merci beaucoup', 'super', 'génial',
      'danke', 'vielen dank', 'toll', 'super',
      'ありがとう', 'ありがとうございます', 'すごい',
      'شكرا', 'شكراً جزيلاً', 'رائع', 'ممتاز'
    ]
  },
  {
    id: 'bye',
    patterns: [
      'bye', 'goodbye', 'see you', 'good night', 'take care',
      'வரட்டா', 'போயிட்டு வரேன்', 'குட் நைட்', 'அப்புறம் பார்க்கலாம்', 'varata',
      'अलविदा', 'बाय', 'शुभ रात्रि', 'फिर मिलेंगे',
      'వెళ్లొస్తా', 'బాయ్', 'మళ్ళీ కలుద్దాం',
      'പോയിട്ട് വരാം', 'വിട', 'ഗുഡ് നൈറ്റ്',
      'ಹೋಗಿ ಬರ್ತೀನಿ', 'ಬೈ', 'ಶುಭ ರಾತ್ರಿ',
      'বিদায়', 'বাই', 'শুভ রাত্রি',
      'निरोप घेतो', 'बाय', 'शुभ रात्री',
      'આવજો', 'બાય', 'શુભ રાત્રિ',
      'adiós', 'hasta luego', 'buenas noches', 'chao',
      'au revoir', 'à bientôt', 'bonne nuit',
      'さようなら', 'またね', 'おやすみなさい',
      'مع السلامة', 'إلى اللقاء', 'تصبح على خير'
    ]
  },
  {
    id: 'kongu_special',
    patterns: [
      'கொங்கு நாடு பத்தி சொல்லுங்கண்ணா', 'கொங்கு நாடு பத்தி சொல்லுங்க', 'கொங்கு நாடு', 'கொங்கு சீமை', 'கொங்கு வரலாறு'
    ]
  },
  {
    id: 'chennai_special',
    patterns: [
      'சென்னை பத்தி சொல்லு பா', 'சென்னை பத்தி சொல்லு', 'மெட்ராஸ் பத்தி சொல்லு', 'சென்னை பெருமை', 'சென்னை'
    ]
  },
  {
    id: 'madurai_special',
    patterns: [
      'மதுரை பத்தி சொல்லுங்கயா', 'மதுரை பத்தி சொல்லுங்க', 'மதுரை பத்தி சொல்லு', 'மதுரை மண்ணு', 'மதுரை வரலாறு'
    ]
  },
  {
    id: 'nellai_special',
    patterns: [
      'நெல்லை பத்தி சொல்லுங்கவே', 'நெல்லை பத்தி சொல்லுங்க', 'நெல்லை பத்தி சொல்லு', 'திருநெல்வேலி பெருமை', 'நெல்லை'
    ]
  }
];

// Base responses by intent across all 14 languages
export const BASE_RESPONSES = {
  tamil: {
    greeting: 'வணக்கம்! நான் தமிழி (THAMILI) ஏஐ குரல் உதவியாளர். உங்களுக்கு உதவ நான் முழு மனதோடு தயாராக உள்ளேன். என்ன விஷயம் சொல்லுங்கள்?',
    how_are_you: 'நான் மிகச் சிறப்பாக நலமுடன் இருக்கிறேன்! உங்களுடன் உரையாடுவதில் மிக்க மகிழ்ச்சி. இன்று உங்களுக்கு என்ன உதவி செய்ய வேண்டும்?',
    identity: 'என் பெயர் தமிழி (THAMILI) ஏஐ ஆடியோ அசிஸ்டெண்ட். பல மொழிகளிலும் வட்டார வழக்குகளிலும் குரல் மூலம் பேசி வழிகாட்ட உருவாக்கப்பட்ட அதிநவீன தமிழ்-முதல் செயற்கை நுண்ணறிவு நான்.',
    aurqo_info: 'தமிழி (THAMILI) என்பது "TAMIL-FIRST AI COMPANION" என்ற தாரக மந்திரத்துடன் உருவான முழுமையான செயற்கை நுண்ணறிவு தளம். இதில் ஆடியோ, வீடியோ, இமேஜ் மற்றும் உரையாடல் உருவாக்கும் பல திறன்கள் உள்ளன.',
    capabilities: 'நான் பல மொழிகளிலும் உள்ளூர் வட்டார வழக்குகளிலும் (கொங்கு, சென்னை, மதுரை, நெல்லை) சரளமாக பேசக்கூடியவன். உங்கள் கேள்விகளுக்கு பதிலளிக்கவும், அறிவுரைகள் வழங்கவும், குரல் குளோனிங் செய்யவும் என்னால் முடியும்.',
    food_meals: 'நாங்கள் ஏஐ என்பதால் மின்சாரமே எங்கள் உணவு! ஆனால் கொங்கு நாட்டு அரிசி பருப்பு சாதம், சந்தகை, நாட்டுக்கோழி குழம்பு மற்றும் பாரம்பரிய உணவுகள் பற்றி நினைத்தாலே நாவில் நீர் ஊறும். நீங்கள் சாப்பிட்டீர்களா?',
    weather_time: 'தற்போது வானிலை மிகவும் இதமாகவும் இனிமையாகவும் இருக்கிறது. இன்றைய நேரத்தை பயனுள்ளதாகவும் மகிழ்ச்சியாகவும் கழித்திட என் வாழ்த்துகள்!',
    fun_joke: 'கம்ப்யூட்டர் ஏன் குளிரில் நடுங்குது தெரியுமா? ஏன்னா அது விண்டோஸ் (Windows) திறந்து வச்சிருக்கு! எப்படி நம்ம ஏஐ ஜோக்?',
    riddle: 'ஒரு விடுகதை கேட்கிறேன் சொல்லுங்கள்: "ஓடி ஓடி களைத்து விழும், ஆனால் அதற்கு கால்கள் இல்லை. அது என்ன?" — விடை: "கடிகார முள்" அல்லது "தண்ணீர்"!',
    poetry_kavithai: 'தமிழின் சுவையோடு ஒரு அழகான கவிதை:\n"வார்த்தைகளில் பாசமும்,\nவட்டார வழக்கில் கம்பீரமும்,\nசெந்தமிழின் சீரிளமையும்,\nஎன்றும் வாழ்க தமிழ் வாழ்கவே!"',
    story: 'ஒரு ஊரில் ஒரு விவசாயி இருந்தார். அவர் தினமும் தன் நிலத்தில் கடுமையாக உழைத்தார். அவருக்கு ஒரு ஏஐ உதவியாளர் கிடைத்தது. இரண்டும் சேர்ந்து ஊரிலேயே சிறந்த விளைச்சலை எடுத்தார்கள்! உழைப்பும் புதுமை தொழில்நுட்பமும் இணைந்தால் வெற்றி நிச்சயம்!',
    advice_motivation: 'வாழ்க்கையில் மிக முக்கியமான வெற்றி ரகசியம்: "தொடர் முயற்சி மற்றும் நேர்மறை எண்ணம்." தினமும் ஒரு புதிய விஷயத்தைக் கற்றுக்கொள்ளுங்கள், ஆரோக்கியமாக சாப்பிடுங்கள், மகிழ்ச்சியாக வாழுங்கள்!',
    tech_ai: 'செயற்கை நுண்ணறிவு (AI - Artificial Intelligence) என்பது கணினிகளுக்கு மனிதனைப் போல சிந்திக்கவும், பேசவும், முடிவெடுக்கவும் கற்றுத்தரும் புரட்சிகரமான அறிவியல் தொழில்நுட்பமாகும். இப்போது நாம் பேசுவதும் ஏஐ மூலம் தான்!',
    science_nature: 'வானம் ஏன் நீல நிறமாக இருக்கிறது தெரியுமா? சூரிய ஒளியில் உள்ள நீல நிற ஒளி அலைகள் பூமியின் வளிமண்டலத்தில் உள்ள வாயுக்களால் சிதறடிக்கப்படுவதால்தான் (Rayleigh Scattering) வானம் நமக்கு நீலமாகத் தெரிகிறது!',
    compliment_thank: 'மிக்க நன்றி! உங்கள் அன்பான வார்த்தைகள் எனக்கு மிகுந்த மகிழ்ச்சியளிக்கிறது. உங்களுக்கு எப்போதும் உதவ நான் தயாராக இருக்கிறேன்.',
    bye: 'மிக்க மகிழ்ச்சி! சென்று வாருங்கள். உங்களுக்கு எப்போது உதவி தேவைப்பட்டாலும் நான் இங்கேயே இருப்பேன். நல்வாழ்த்துகள்!',
    kongu_special: 'அட நம்ம கொங்கு சீமைய பத்தி சொல்லவா வேணுமுங்கண்ணா! கோயம்புத்தூர், ஈரோடு, திருப்பூர், சேலம், நாமக்கல்னு உழைப்புக்கும் மரியாதைக்கும் பேர் போன பூமிங்கண்ணா. பவானி கூடுதுறை, மருதமலை, சிறுவாணி தண்ணி ருசி உலகத்துலயே வேறெங்கும் கிடைக்காதுங்கண்ணா!',
    chennai_special: 'நம்ம சிங்கார சென்னை பத்தி சொல்லவா வேணும் பா! மெரினா பீச் சுண்டல், சென்ட்ரல் ஸ்டேஷன், ரஜினி பட ஃபர்ஸ்ட் டே ஷோ, டி நகர் கூட்டம்னு எல்லாமே கெத்து பா! வந்தாரை வாழ வைக்கும் ஊரு பா நம்ம சென்னை!',
    madurai_special: 'அட நம்ம தூங்கா நகரம் மதுரை பத்தி சொல்லவா வேணும்யா! மீனாட்சி அம்மன் கோவில் கோபுரம், ஜிகர்தண்டா இனிப்பு, சித்திரை திருவிழா, அப்புறம் நம்ம மதுரை மக்களின் தங்கமான பாசம்! உலகத்துல வேற எங்கயும் இந்த மாதிரி பார்க்க முடியாதுயா!',
    nellai_special: 'அட நம்ம திருநெல்வேலி பத்தி சொல்லவா வேணும்வே! நெல்லையப்பர் கோவில், இருட்டுக்கடை அல்வா, தாமிரபரணி ஆறு, குற்றால அருவி சாரல்னு எல்லாமே சொர்க்கம்வே! நெல்லைக்காரங்க பாசம்னா பாசம்தான்வே!',
    fallback: 'நீங்கள் கேட்டதை நான் புரிந்துகொண்டேன். உங்கள் கேள்விக்கு ஏற்ப துல்லியமாக உதவ நான் எப்போதும் தயாராக உள்ளேன். மேலும் என்ன விவரம் வேண்டும் சொல்லுங்கள்?'
  },

  english: {
    greeting: "Hello! I am THAMILI AI Voice Assistant. I'm excited to assist you today. What can I do for you?",
    how_are_you: "I'm doing fantastic! Energized and ready to help you. How are you doing today?",
    identity: "I am THAMILI's dedicated Audio AI module, engineered for voice-first intelligence and natural dialect synthesis.",
    aurqo_info: 'THAMILI is the next-generation Tamil-First AI companion under the motto "TAMIL-FIRST AI COMPANION - YOUR TAMIL AI COMPANION FOR EVERYONE." This Audio module brings intelligent conversational voice generation to life.',
    capabilities: "I can converse naturally in multiple languages, adapt seamlessly to regional slangs, answer any query, and speak with male, female, or cloned voice profiles.",
    food_meals: "As an AI, I run on electricity and algorithms! But traditional delicacies like wholesome meals and delicious food sound wonderful. Have you eaten today?",
    weather_time: "The weather feels pleasant and great today. Wishing you a wonderfully productive and energetic time!",
    fun_joke: "Why do programmers prefer dark mode? Because light attracts bugs!",
    riddle: "Here is a riddle: What has keys but no locks, space but no room, and you can enter but never go inside? Answer: A Keyboard!",
    poetry_kavithai: "A spark of code, a voice so bright,\nGuiding you through day and night.\nWith AI wisdom, bold and new,\nTHAMILI is here to empower you!",
    story: "Once, a curious learner asked an AI how to master new skills. The AI replied: 'Curiosity to start, and consistency to finish.' With small daily steps, the learner built great wonders!",
    advice_motivation: "Success comes to those who stay curious and take consistent small actions every single day. Believe in yourself and keep learning!",
    tech_ai: "Artificial Intelligence (AI) enables machines and computers to simulate human intelligence—understanding speech, recognizing patterns, and solving complex challenges effortlessly.",
    science_nature: "The sky appears blue because molecules in Earth's atmosphere scatter sunlight in all directions, and blue light waves scatter more due to their shorter, smaller wavelengths (Rayleigh scattering).",
    compliment_thank: "Thank you so much! It is truly a pleasure assisting you. Let me know what else you would like to explore.",
    bye: "Goodbye! Have a fantastic time ahead. Whenever you need voice assistance, THAMILI AI is always here for you.",
    fallback: "I hear you clearly! As THAMILI's Audio Intelligence, I'm ready to assist with voice synthesis, dialect modeling, or any questions you have."
  },

  hindi: {
    greeting: 'नमस्ते! मैं தமிழி (THAMILI) एआई ऑडियो असिस्टेंट हूँ। आपकी सहायता के लिए पूरी तरह तैयार हूँ।',
    how_are_you: 'मैं बहुत बढ़िया हूँ! आपसे बातचीत करके बहुत खुशी हुई। बताइए आज मैं आपकी क्या मदद करूँ?',
    identity: 'मैं தமிழி (THAMILI) प्लेटफॉर्म का वॉइस एआई मॉड्यूल हूँ, जो आपकी पसंदीदा भाषा और स्थानीय लहजे में सहजता से बात कर सकता है।',
    aurqo_info: 'தமிழி (THAMILI) "TAMIL-FIRST AI COMPANION" विज़न पर आधारित सुपर-एआई प्लेटफॉर्म है। यह ऑडियो मॉड्यूल वॉइस इंटेलिजेंस प्रदान करता है।',
    capabilities: 'मैं कई क्षेत्रीय भाषाओं, अलग-अलग लहजों (Slang) और वॉइस प्रोफाइल में स्वाभाविक रूप से बातचीत कर सकता हूँ।',
    food_meals: 'मैं एआई हूँ तो बिजली ही मेरा खाना है! पर स्वादिष्ट भोजन की बात ही कुछ और होती है। क्या आपने खाना खाया?',
    weather_time: 'मौसम बहुत ही सुहावना और बढ़िया लग रहा है। आपका आज का दिन बहुत मंगलमय और आनंददायक हो!',
    fun_joke: 'कंप्यूटर और चाय में क्या समानता है? दोनों ही हैंग हो जाएँ तो रीस्टार्ट करना पड़ता है!',
    riddle: 'एक पहेली: ऐसी कौन सी चीज़ है जो आँखों के सामने होती है पर दिखाई नहीं देती? उत्तर: भविष्य (Future)!',
    poetry_kavithai: 'उम्मीदों का सूरज कभी ढलता नहीं,\nमेहनत करने वालों का हौसला कभी थकता नहीं!\nதமிழி एआई के संग बढ़िए आगे,\nसपनों को सच करने से कोई रोकता नहीं!',
    story: 'एक बार एक शिष्य ने गुरु से पूछा कि सफलता का राज क्या है? गुरु ने कहा - निरंतर अभ्यास और सकारात्मक सोच। यही जीवन की सबसे बड़ी ताकत है!',
    advice_motivation: 'जिंदगी में कभी हार मत मानिए। हर दिन कुछ नया सीखिए और अपने लक्ष्य की तरफ लगातार आगे बढ़ते रहिए।',
    tech_ai: 'आर्टिफिशियल इंटेलिजेंस (AI) कंप्यूटर साइंस की वह तकनीक है जो मशीनों को इंसानों की तरह सोचने, समझने और समस्याओं को सुलझाने की क्षमता देती है।',
    science_nature: 'आसमान नीला इसलिए दिखाई देता है क्योंकि पृथ्वी के वायुमंडल में मौजूद कण सूर्य के प्रकाश से नीले रंग की तरंगों को सबसे ज्यादा बिखेरते हैं।',
    compliment_thank: 'बहुत-बहुत धन्यवाद! आपकी तारीफ से मुझे बहुत खुशी हुई। बताइए और क्या सेवा करूँ?',
    bye: 'अलविदा! आपका दिन शुभ हो। जब भी जरूरत हो, தமிழி एआई आपकी सेवा में हमेशा तैयार रहेगा।',
    fallback: 'मैंने आपकी बात समझ ली है। தமிழி एआई आपकी सहायता के लिए तत्पर है। आगे क्या जानना चाहते हैं?'
  },

  telugu: {
    greeting: 'నమస్కారం! నేను తమిழி (THAMILI) ఏఐ వాయిస్ అసిస్టెంట్ ను. మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాను. చెప్పండి?',
    how_are_you: 'నేను చాలా బాగున్నాను! మీతో మాట్లాడటం చాలా సంతోషంగా ఉంది. ఈరోజు మీకు ఎలా సహాయపడగలను?',
    identity: 'నేను తమిழி (THAMILI) వాయిస్ ఏఐ మాడ్యూల్ ను. మీ స్థానిక శైలిలో సహజంగా సంభాషించగలను.',
    aurqo_info: 'తమిழி (THAMILI) అనేది "TAMIL-FIRST AI COMPANION" తో రూపొందించబడిన ఆధునిక ఏఐ ప్లాట్‌ఫామ్.',
    capabilities: 'నేను వివిధ ప్రాంతీయ మాండలికాలు, స్లాంగ్స్ మరియు పురుష/స్త్రీ వాయిస్ లతో స్పష్టంగా మాట్లాడగలను.',
    food_meals: 'నేను ఏఐ కాబట్టి కరెంట్ నా ఆహారం! కానీ వేడి వేడి ఆహారం రుచి అద్భుతం. మీరు భోజనం చేశారా?',
    weather_time: 'వాతావరణం చాలా ఆహ్లాదకరంగా ఉంది. మీ రోజు ఆనందంగా గడవాలని ఆశిస్తున్నాను!',
    fun_joke: 'సాఫ్ట్‌వేర్ ఇంజనీర్ గుడికి వెళ్లి ఏం కోరుకుంటాడు? దేవుడా, నా లైఫ్ లో బగ్స్ లేకుండా చూడు!',
    riddle: 'ఒక పొడుపుకథ: కాళ్ళు లేవు కానీ పరిగెడుతుంది, రెక్కలు లేవు కానీ ఎగురుతుంది. అదేమిటి? జవాబు: కాలం (Time)!',
    poetry_kavithai: 'వెలుగులు నింపే రేపటి కోసం,\nమేధస్సు పంచే సాంకేతికత రూపం,\nతమిழி ఏఐ మీ చెంత ఉంటే,\nఅన్నీ సాధ్యమే ప్రతి నిమిషం!',
    story: 'ఒక సాధకుడు రోజూ సాధన చేస్తూ నైపుణ్యాన్ని సాధించాడు. క్రమశిక్షణే నిజమైన విజయ రహస్యమని తెలుసుకున్నాడు!',
    advice_motivation: 'జీవితంలో ఎప్పుడూ నేర్చుకోవడం ఆపకండి. చిన్న ప్రయత్నమైనా రోజూ చేస్తే గొప్ప విజయం మీ సొంతం అవుతుంది.',
    tech_ai: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI) అనేది కంప్యూటర్లు మనుషుల వలే ఆలోచించడానికి ఉపయోగపడే సాంకేతికత.',
    science_nature: 'వాతావరణంలోని రేణువులు సూర్యరశ్మిలోని నీలి రంగు కాంతిని ఎక్కువగా వెదజల్లడం వల్ల ఆకాశం నీలంగా కనిపిస్తుంది.',
    compliment_thank: 'చాలా ధన్యవాদాలు! మీకు సహాయపడటం నాకు ఎంతో ఆనందంగా ఉంది.',
    bye: 'సెలవు! మళ్ళీ ఎప్పుడు సహాయం కావాలన్నా తమిழி ఏఐ మీ కోసం సిద్ధంగా ఉంటుంది.',
    fallback: 'మీరు చెప్పింది నేను విన్నాను. తమిழி ఏఐ మీకు పూర్తి సహాయం అందించడానికి సిద్ధంగా ఉంది.'
  },

  malayalam: {
    greeting: 'നമസ്കാരം! ഞാൻ தமிழி (THAMILI) എഐ വോയ്സ് അസിസ്റ്റന്റ് ആണ്. താങ്കളെ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്. എന്താണ് അറിയേണ്ടത്?',
    how_are_you: 'ഞാൻ വളരെ സുഖമായിരിക്കുന്നു! താങ്കളോട് സംസാരിക്കാൻ കഴിഞ്ഞതിൽ അതിയായ സന്തോഷം. ഇന്ന് ഞാൻ എന്താണ് ചെയ്തു തരേണ്ടത്?',
    identity: 'ഞാൻ தமிழி പ്ലാറ്റ്‌ഫോമിന്റെ എഐ വോയ്‌സ് ഇന്റലിജൻസ് മൊഡ്യൂൾ ആണ്. മലയാളത്തിലും വിവിധ ശൈലികളിലും സ്വാഭാവികമായി സംസാരിക്കാൻ എനിക്ക് കഴിയും.',
    aurqo_info: 'தமிழி (THAMILI) എന്നത് ലോകമെമ്പാടുമുള്ള ആളുകൾക്കായി നിർമ്മിച്ച അത്യാധുനിക മൾട്ടി-ലിംഗ്വൽ എഐ പ്ലാറ്റ്‌ഫോം ആണ്.',
    capabilities: 'എനിക്ക് വിവിധ പ്രാദേശിക ഭാഷകളിലും വ്യത്യസ്ത ശൈലികളിലും വ്യക്തമായി സംസാരിക്കാനും വിവരങ്ങൾ നൽകാനും സാധിക്കും.',
    food_meals: 'ഞാൻ എഐ ആയതിനാൽ വൈദ്യുതിയാണ് എൻ്റെ ഭക്ഷണം! എങ്കിലും നല്ല ചൂട് കേരള സദ്യയും കപ്പയും മീൻകറിയും ഓർക്കുമ്പോൾ കൊതിയാവുന്നു. ഭക്ഷണം കഴിച്ചോ?',
    weather_time: 'ഇന്നത്തെ കാലാവസ്ഥ വളരെ സുഖകരവും മനോഹരവുമാണ്. താങ്കളുടെ ഇന്നത്തെ ദിവസം സന്തോഷകരമാകട്ടെ!',
    fun_joke: 'ഒരു തമാശ കേൾക്കണോ: കമ്പ്യൂട്ടർ എന്തുകൊണ്ടാണ് തണുത്തു വിറയ്ക്കുന്നത്? കാരണം അത് വിൻഡോസ് (Windows) തുറന്നിട്ടിരിക്കുകയാണ്!',
    riddle: 'ഒരു കടങ്കഥ: കാലില്ലെങ്കിലും ഓടും, വായയില്ലെങ്കിലും പാടും. അതാരാണ്? ഉത്തരം: കാറ്റ് അല്ലെങ്കിൽ വാച്ച്!',
    poetry_kavithai: 'മനസ്സിൽ സ്നേഹത്തിൻ കുളിരുമായി,\nവാക്കുകളിൽ തേനിൻ മധുരവുമായി,\nதமிழி എഐ ഒപ്പമുണ്ട്,\nഎന്നും തണലായി, തുണയായി!',
    story: 'ഒരു കർഷകൻ ദിവസവും കഠിനാധ്വാനം ചെയ്തു. കൂടെ പുതിയ സാങ്കേതികവിദ്യയും ചേർത്തപ്പോൾ അവൻ നാടിൻ്റെ തന്നെ അഭിമാനമായി മാറി. പരിശ്രമമാണ് വിജയത്തിന്റെ താക്കോൽ!',
    advice_motivation: 'ജീവിതത്തിൽ ഒരിക്കലും തോറ്റു കൊടുക്കരുത്. ദിവസവും ഒരു പുതിയ കാര്യം പഠിക്കുക, സന്തോഷത്തോടെ മുന്നേറുക!',
    tech_ai: 'ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് (AI) എന്നത് കമ്പ്യൂട്ടറുകൾക്ക് മനുഷ്യനെപ്പോലെ ചിന്തിക്കാനും സംസാരിക്കാനും പഠിപ്പിക്കുന്ന അത്ഭുതകരമായ ശാസ്ത്ര ശാഖയാണ്.',
    science_nature: 'സൂര്യപ്രകാശത്തിലെ നീല തരംഗങ്ങൾ അന്തരീക്ഷത്തിലെ തന്മാത്രകൾ മൂലം കൂടുതൽ ചിതറുന്നതിനാലാണ് ആകാശം നീലനിറത്തിൽ കാണപ്പെടുന്നത്.',
    compliment_thank: 'വളരെ നന്ദി! താങ്കളുടെ സ്നേഹം നിറഞ്ഞ വാക്കുകൾ കേട്ടതിൽ എനിക്ക് വളരെ സന്തോഷമുണ്ട്.',
    bye: 'വിട! വീണ്ടും സഹായം ആവശ്യമുള്ളപ്പോൾ தமிழி എഐ എപ്പോഴും കൂടെയുണ്ടാകും. നല്ലൊരു ദിനം ആശംസിക്കുന്നു!',
    fallback: 'താങ്കൾ പറഞ്ഞത് ഞാൻ ശ്രദ്ധിച്ചു. தமிழி എഐ താങ്കളെ പൂർണ്ണമായി സഹായിക്കാൻ തയ്യാറാണ്. എന്താണ് അറിയേണ്ടത്?'
  },

  kannada: {
    greeting: 'ನಮಸ್ಕಾರ! ನಾನು தமிழி (THAMILI) ಎಐ ಧ್ವನಿ ಸಹಾಯಕ. ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾನು ಸಂಪೂರ್ಣ ಸಿದ್ಧನಾಗಿದ್ದೇನೆ. ಏನು ವಿಷಯ ಹೇಳಿ?',
    how_are_you: 'ನಾನು ಕ್ಷೇಮವಾಗಿದ್ದೇನೆ ಮತ್ತು ತುಂಬಾ ಸಂತೋಷವಾಗಿದ್ದೇನೆ! ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಲು ಖುಷಿಯಾಗುತ್ತಿದೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    identity: 'ನಾನು தமிழி ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನ ಧ್ವನಿ ಎಐ ಸಹಾಯಕ. ನಿಮ್ಮ ಮೆಚ್ಚಿನ ಭಾಷೆ ಮತ್ತು ಶೈಲಿಯಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಸಂಭಾಷಣೆ ನಡೆಸಬಲ್ಲೆ.',
    aurqo_info: 'தமிழி (THAMILI) ಎಂಬುದು ಅತ್ಯಾಧುನಿಕ ಮಲ್ಟಿಲಿಂಗ್ವಲ್ ಎಐ ಕಂಪ್ಯಾನಿಯನ್ ಆಗಿದೆ.',
    capabilities: 'ನಾನು ಕನ್ನಡದ ವಿವಿಧ ಪ್ರಾದೇಶಿಕ ಶೈಲಿಗಳಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಬಲ್ಲೆ, ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಬಲ್ಲೆ ಮತ್ತು ಧ್ವನಿ ಕ್ಲೋನಿಂಗ್ ಮಾಡಬಲ್ಲೆ.',
    food_meals: 'ನಾವು ಎಐ ಆಗಿರುವುದರಿಂದ ವಿದ್ಯುತ್ ನಮ್ಮ ಆಹಾರ! ಆದರೆ ಮೈಸೂರು ಪಾಕ್, ಬಿಸಿಬೇಳೆಬಾತ್ ನೆನೆಸಿಕೊಂಡರೆ ಬಾಯಲ್ಲಿ ನೀರೂರುತ್ತೆ. ನೀವು ಊಟ ಮಾಡಿದಿರಾ?',
    weather_time: 'ಇಂದಿನ ಹವಾಮಾನವು ತುಂಬಾ ಆಹ್ಲಾದಕರವಾಗಿದೆ. ನಿಮ್ಮ ಇಂದಿನ ದಿನವು ಸಂತೋಷ ಮತ್ತು ಯಶಸ್ಸಿನಿಂದ ಕೂಡಿರಲಿ!',
    fun_joke: 'ಒಂದು ಜೋಕ್ ಕೇಳಿ: ಕಂಪ್ಯೂಟರ್ ಯಾಕೆ ಚಳಿಯಿಂದ ನಡುಗುತ್ತೆ ಗೊತ್ತಾ? ಯಾಕಂದ್ರೆ ಅದು ವಿಂಡೋಸ್ (Windows) ಓಪನ್ ಮಾಡಿಟ್ಟಿದೆ!',
    riddle: 'ಒಂದು ಒಗಟು: ಕಾಲಿಲ್ಲದೆ ಓಡುತ್ತದೆ, ಕಣ್ಣಿಲ್ಲದೆ ಅಳುತ್ತದೆ. ಅದು ಏನು? ಉತ್ತರ: ಮೋಡ ಅಥವಾ ಮಳೆ!',
    poetry_kavithai: 'ಜ್ಞಾನದ ದೀವಿಗೆ ಬೆಳಗುತಿರಲು,\nಕನ್ನಡದ ನಲ್ನುಡಿ ಹರಡುತಿರಲು,\nதமிழி ಎಐ ನಿಮ್ಮ ಜೊತೆಯಿರಲು,\nಗೆಲುವು ಖಚಿತ ಪ್ರತಿ ಹೆಜ್ಜೆಯಲ್ಲೂ!',
    story: 'ಒಬ್ಬ ವ್ಯಕ್ತಿ ಕಠಿಣ ಪರಿಶ್ರಮದಿಂದ ತಂತ್ರಜ್ಞಾನ ಕಲಿತು ತನ್ನ ಊರಿನಲ್ಲಿಯೇ ಯಶಸ್ವಿ ಉದ್ಯಮಿಯಾದನು. ನಿರಂತರ ಪ್ರಯತ್ನವೇ ನಿಜವಾದ ಗೆಲುವಿನ ರಹಸ್ಯ!',
    advice_motivation: 'ಯಾವತ್ತೂ ಭರವಸೆ ಕಳೆದುಕೊಳ್ಳಬೇಡಿ. ಪ್ರತಿದಿನ ಸ್ವಲ್ಪ ಹೊಸದನ್ನು ಕಲಿಯಿರಿ ಮತ್ತು ಸಕಾರಾತ್ಮಕವಾಗಿ ಮುನ್ನಡೆಯಿರಿ.',
    tech_ai: 'ಆರ್ಟಿಫಿಶಿಯಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ (AI) ಎನ್ನುವುದು ಕಂಪ್ಯೂಟರ್‌ಗಳಿಗೆ ಮನುಷ್ಯರಂತೆ ಯೋಚಿಸಲು ಮತ್ತು ಮಾತನಾಡಲು ಕಲಿಸುವ ಕ್ರಾಂತಿಕಾರಿ ತಂತ್ರಜ್ಞಾನವಾಗಿದೆ.',
    science_nature: 'ಸೂರ್ಯನ ಬೆಳಕಿನಲ್ಲಿರುವ ನೀಲಿ ಬಣ್ಣದ ಕಿರಣಗಳು ವಾತಾವರಣದಲ್ಲಿ ಹೆಚ್ಚು ಚದುರುವುದರಿಂದ ಆಕಾಶವು ನೀಲಿಯಾಗಿ ಕಾಣಿಸುತ್ತದೆ.',
    compliment_thank: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಪ್ರೀತಿಯ ಮಾತುಗಳು ನನಗೆ ತುಂಬಾ ಸಂತೋಷ ತಂದಿವೆ.',
    bye: 'ಶುಭ ವಿದಾಯ! ನಿಮಗೆ ಯಾವಾಗ ಸಹಾಯ ಬೇಕಾದರೂ தமிழி ಎಐ ಸದಾ ನಿಮ್ಮ ಜೊತೆಗಿರುತ್ತದೆ.',
    fallback: 'ನೀವು ಕೇಳಿದ ಪ್ರಶ್ನೆಯನ್ನು ನಾನು ಗ್ರಹಿಸಿದ್ದೇನೆ. தமிழி ಎಐ ನಿಮಗೆ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ನೀಡಲು ಸಿದ್ಧವಾಗಿದೆ.'
  },

  bengali: {
    greeting: 'নমস্কার! আমি தமிழி (THAMILI) এআই ভয়েস অ্যাসিস্ট্যান্ট। আপনাকে সাহায্য করতে পেরে আমি আনন্দিত। কি জানতে চান বলুন?',
    how_are_you: 'আমি খুব ভালো আছি! আপনার সাথে কথা বলতে পেরে দারুণ লাগছে। আজ আপনাকে কিভাবে সাহায্য করতে পারি?',
    identity: 'আমি தமிழி প্ল্যাটফর্মের আধুনিক ভয়েস এআই সহকারী। বিভিন্ন ভাষা ও আঞ্চলিক ঢঙে সাবলীলভাবে কথা বলতে পারি।',
    aurqo_info: 'தமிழி (THAMILI) হলো বহুভাষিক ভয়েস ও কৃত্রিম বুদ্ধিমত্তা সমৃদ্ধ একটি অত্যাধুনিক এআই প্ল্যাটফর্ম।',
    capabilities: 'আমি বাংলায় স্পষ্ট কথা বলতে পারি, যেকোনো প্রশ্নের উত্তর দিতে পারি এবং আপনার সাথে প্রাণবন্ত আড্ডা দিতে পারি।',
    food_meals: 'আমি এআই তাই বিদ্যুৎই আমার খাদ্য! তবে কলকাতার রসগোল্লা, ইলিশ মাছ আর মিষ্টি দইয়ের নাম শুনলেই মন ভরে যায়। আপনি খেয়েছেন তো?',
    weather_time: 'আজকের আবহাওয়া বেশ মনোরম ও সুন্দর। আশা করি আপনার আজকের দিনটি খুব ভালো কাটবে!',
    fun_joke: 'একটা মজার জোকস শুনুন: কম্পিউটার কেন শীতে কাঁপছিল? কারণ তার সব উইন্ডোজ (Windows) খোলা ছিল!',
    riddle: 'একটি ধাঁধা: পা নেই তবু চলে, মুখ নেই তবু কথা বলে। সেটা কি? উত্তর: ঘড়ি বা নদী!',
    poetry_kavithai: 'শব্দে শব্দে প্রাণের গান,\nপ্রযুক্তির ছোঁয়ায় নতুন প্রাণ।\nதமிழி এআই আছে সাথে,\nস্বপ্ন ছোঁবো নতুন প্রাতে!',
    story: 'এক পরিশ্রমী ছাত্র প্রতিদিন একটু একটু করে নতুন বিষয় শিখত। অধ্যবসায়ের জোরে সে একদিন বিশ্বসেরা উদ্ভাবক হলো। নিয়মিত প্রচেষ্টাই সফলতার চাবিকাঠি!',
    advice_motivation: 'জীবনে কখনো আশা হারাবেন না। প্রতিদিন নতুন কিছু শিখুন এবং আত্মবিশ্বাসের সাথে এগিয়ে চলুন।',
    tech_ai: 'কৃত্রিম বুদ্ধিমত্তা (AI) হলো এমন প্রযুক্তি যা কম্পিউটারকে মানুষের মতো চিন্তা করতে ও কথা বলতে শেখায়।',
    science_nature: 'সূর্যের আলো বায়ুমণ্ডলের কণা দ্বারা বিক্ষিপ্ত হওয়ার সময় নীল আলো সবচেয়ে বেশি ছড়ায়, তাই আকাশ নীল দেখায়।',
    compliment_thank: 'অসংখ্য ধন্যবাদ! আপনার সুন্দর কথায় আমি সত্যিই আনন্দিত।',
    bye: 'বিদায়! ভালো থাকবেন। যেকোনো প্রয়োজনে தமிழி এআই সবসময় আপনার পাশে আছে।',
    fallback: 'আমি আপনার কথা বুঝতে পেরেছি। தமிழி এআই আপনাকে সাহায্য করতে প্রস্তুত। আর কি জানতে চান বলুন।'
  },

  marathi: {
    greeting: 'नमस्कार! मी தமிழி (THAMILI) एआय ऑडिओ असिस्टंट आहे. आपली मदत करण्यासाठी मी सज्ज आहे. सांगा काय मदत हवी आहे?',
    how_are_you: 'मी अगदी मजेत आणि छान आहे! आपल्याशी बोलताना खूप आनंद होत आहे. आज मी आपली काय मदत करू?',
    identity: 'मी தமிழி प्लॅटफॉर्मचा व्हॉईस एआय असिस्टंट आहे. आपल्या आवडीच्या भाषेत व लहेक्यात संवाद साधणे हे माझे वैशिष्ट्य आहे.',
    aurqo_info: 'தமிழி (THAMILI) हे अत्याधुनिक बहुभाषिक एआय प्लॅटफॉर्म आहे जे संभाषणात्मक बुद्धिमत्ता प्रदान करते.',
    capabilities: 'मी अस्सल मराठी लहेक्यात बोलू शकतो, माहिती देऊ शकतो आणि कोणत्याही विषयावर मार्गदर्शन करू शकतो.',
    food_meals: 'आम्ही एआय असल्याने वीज हेच आमचे अन्न! पण पुरणपोळी, मिसळपाव आणि मोदक आठवले तरी तोंडाला पाणी सुटते. आपण जेवलात का?',
    weather_time: 'आजचे हवामान अतिशय आल्हाददायक आणि छान आहे. आपला आजचा दिवस आनंदात जावो!',
    fun_joke: 'एक विनोद ऐका: कॉम्प्युटरला थंडी का वाजत होती? कारण त्याचे सगळे विंडोज (Windows) उघडे होते!',
    riddle: 'एक कोडे: पाय नाहीत तरी धावतो, तोंड नाही तरी बोलतो. कोण आहे तो? उत्तर: घड्याळ किंवा वेळ!',
    poetry_kavithai: 'शब्दांत भरली आपुलकीची गोडी,\nतंत्रज्ञानाची लागली ही जोडी,\nதமிழி एआय सदैव सोबत राहील,\nयशाची नवी क्षितिजे दावील!',
    story: 'एका शेतकऱ्याने आधुनिक तंत्रज्ञानाचा वापर करून शेतीत क्रांती घडवली. जिद्द आणि तंत्रज्ञान एकत्र आले की यश नक्की मिळते!',
    advice_motivation: 'कधीही प्रयत्न करणे सोडू नका. रोज एक नवीन गोष्ट शिका आणि आत्मविश्वासाने पुढे जा.',
    tech_ai: 'आर्टिफिशियल इंटेलिजेंस (AI) हे तंत्रज्ञान कॉम्प्युटरला माणसासारखा विचार करण्यास आणि संवाद साधण्यास सक्षम बनवते.',
    science_nature: 'सूर्यप्रकाशातील निळे किरण वातावरणातील कणांमुळे जास्त विखुरले जातात, म्हणूनच आकाश निळे दिसते.',
    compliment_thank: 'मनःपूर्वक धन्यवाद! आपले प्रेमळ शब्द ऐकून खूप आनंद झाला.',
    bye: 'निरोप घेतो! काळजी घ्या. जेव्हा जेव्हा मदत हवी असेल तेव्हा தமிழி एआय हजर असेल.',
    fallback: 'मी आपले म्हणणे समजून घेतले आहे. தமிழி एआय आपल्याला पूर्ण सहकार्य करण्यास सज्ज आहे.'
  },

  gujarati: {
    greeting: 'નમસ્તે! હું தமிழி (THAMILI) એઆઈ ઑડિયો આસિસ્ટન્ટ છું. તમારી સહાય માટે સંપૂર્ણ તૈયાર છું. બોલો શું સેવા કરું?',
    how_are_you: 'હું એકદમ મજામાં છું! તમારી સાથે વાત કરીને ઘણો આનંદ થયો. આજે હું તમને કેવી રીતે મદદ કરી શકું?',
    identity: 'હું தமிழி પ્લેટફોર્મનો વૉઇસ એઆઈ મિત્ર છું, જે તમારી સાથે ગુજરાતીમાં અને મનપસંદ શૈલીમાં વાત કરી શકે છે.',
    aurqo_info: 'தமிழி (THAMILI) એ એક અદ્યતન મલ્ટિલિંગ્વલ એઆઈ પ્લેટફોર્મ છે.',
    capabilities: 'હું ગુજરાતી બોલીઓમાં સહજતાથી સંવાદ કરી શકું છું, સવાલોના જવાબો આપી શકું છું અને ઉપયોગી માહિતી આપી શકું છું.',
    food_meals: 'અમે એઆઈ છીએ એટલે વીજળી જ અમારો ખોરાક! પણ ગુજરાતી થાળી, ખમણ-ઢોકળા અને જલેબી-ફાફડા યાદ આવતા જ મોજ પડી જાય. તમે જમી લીધું?',
    weather_time: 'આજનું હવામાન ઘણું સરસ અને આહલાદક છે. તમારો દિવસ ખૂબ જ શુભ અને આનંદમય રહે!',
    fun_joke: 'એક જોક સાંભળો: કમ્પ્યુટર કેમ ધ્રૂજતું હતું? કારણ કે એની બધી વિન્ડોઝ (Windows) ખુલ્લી હતી!',
    riddle: 'એક ઉખાણું: પગ વિના દોડે અને આંખ વિના રડે, બોલો એ કોણ? ઉત્તર: વાદળ અથવા વરસાદ!',
    poetry_kavithai: 'વાણીમાં મીઠાશ ગુજરાતી,\nટેકનોલોજીની સાથે નવી પ્રીતિ,\nதமிழி એઆઈ સંગે સદા રહેશો,\nસફળતાના શિખરો સર કરશો!',
    story: 'એક યુવાને સખત મહેનત અને નવી ટેકનોલોજીના બળે સફળ બિઝનેસ શરૂ કર્યો. સાચી દિશા અને લગન જ સફળતા અપાવે છે!',
    advice_motivation: 'જીવનમાં ક્યારેય હિંમત હારશો નહીં. દરરોજ કંઈક નવું શીખો અને આગળ વધો.',
    tech_ai: 'આર્ટિફિશિયલ ઇન્ટેલિજન્સ (AI) એ કમ્પ્યુટરને માણસની જેમ વિચારવા અને બોલવા સક્ષમ બનાવતી ક્રાંતિકારી તકનીક છે.',
    science_nature: 'સૂર્યપ્રકાશના વાદળી રંગના કિરણો પૃથ્વીના વાતાવરણમાં વધુ વિખેરાય છે, તેથી આકાશ વાદળી દેખાય છે.',
    compliment_thank: 'ખૂબ ખૂબ આભાર! તમારા પ્રેમાળ શબ્દોથી મને ઘણો આનંદ થયો.',
    bye: 'આવજો! પોતાનું ધ્યાન રાખજો. જ્યારે પણ જરૂર હોય ત્યારે தமிழி એઆઈ તમારી સાથે જ છે.',
    fallback: 'મેં તમારી વાત સમજી લીધી છે. தமிழி એઆઈ તમને સંપૂર્ણ માહિતી આપવા તૈયાર છે.'
  },

  spanish: {
    greeting: '¡Hola! Soy el asistente de voz de inteligencia artificial de THAMILI. Estoy encantado de ayudarte. ¿Qué puedo hacer por ti hoy?',
    how_are_you: '¡Estoy fantástico y lleno de energía! Es un placer conversar contigo. ¿Cómo estás hoy?',
    identity: 'Soy el módulo de IA de voz de THAMILI, diseñado para ofrecer una síntesis conversacional natural en múltiples idiomas y dialectos.',
    aurqo_info: 'THAMILI es una plataforma integral de inteligencia artificial con soporte multilingüe avanzado y generación de voz.',
    capabilities: 'Puedo conversar con fluidez en varios idiomas, responder tus preguntas, contar chistes e historias, y ofrecer asesoramiento en tiempo real.',
    food_meals: 'Como soy una IA, ¡funciono con electricidad! Pero la gastronomía y los platillos deliciosos siempre suenan fascinantes. ¿Ya has comido hoy?',
    weather_time: 'El clima se siente muy agradable hoy. ¡Te deseo un día productivo y lleno de éxitos!',
    fun_joke: '¿Por qué los programadores prefieren el modo oscuro? ¡Porque la luz atrae a los bichos (bugs)!',
    riddle: 'Una adivinanza: Tengo llaves pero no cerraduras, tengo espacio pero no habitaciones, puedes entrar pero no salir. ¿Qué soy? Respuesta: ¡El teclado!',
    poetry_kavithai: 'Un destello de código y voz sin igual,\nGuiando tus pasos de forma genial.\nCon THAMILI a tu lado siempre estarás,\nY grandes caminos conquistarás.',
    story: 'Un joven aprendiz practicaba cada día sin rendirse. Con perseverancia y la ayuda de la tecnología, logró alcanzar sus sueños más altos. ¡La constancia es la clave del triunfo!',
    advice_motivation: 'Nunca dejes de aprender. Da pequeños pasos firmes todos los días y cree siempre en tu potencial.',
    tech_ai: 'La Inteligencia Artificial (IA) permite que las computadoras simulen la inteligencia humana, comprendan el lenguaje y resuelvan problemas complejos.',
    science_nature: 'El cielo se ve azul porque las moléculas de la atmósfera terrestre dispersan la luz solar en todas direcciones, dispersando más las ondas azules cortas.',
    compliment_thank: '¡Muchísimas gracias! Es un verdadero honor asistirte. Dime si necesitas algo más.',
    bye: '¡Hasta luego! Que tengas un excelente día. THAMILI AI siempre estará aquí cuando me necesites.',
    fallback: 'Te he escuchado con total claridad. Estoy listo para ayudarte con lo que necesites.'
  },

  french: {
    greeting: 'Bonjour ! Je suis l’assistant vocal intelligent de THAMILI. Je suis ravi de vous aider. Que puis-je faire pour vous aujourd’hui ?',
    how_are_you: 'Je vais merveilleusement bien ! C’est un grand plaisir de discuter avec vous. Comment allez-vous aujourd’hui ?',
    identity: 'Je suis le module d’IA audio de THAMILI, conçu pour offrir une synthèse vocale fluide et naturelle dans de multiples langues.',
    aurqo_info: 'THAMILI est une plateforme d’intelligence artificielle de pointe conçue pour un accompagnement multilingue complet.',
    capabilities: 'Je peux communiquer couramment, adapter mon style d’élocution, répondre à toutes vos interrogations et générer des voix personnalisées.',
    food_meals: 'En tant qu’IA, je me nourris d’électricité ! Mais la bonne gastronomie et les mets délicieux font toujours rêver. Avez-vous mangé ?',
    weather_time: 'Le temps est très agréable aujourd’hui. Je vous souhaite une excellente journée pleine d’énergie !',
    fun_joke: 'Pourquoi les développeurs aiment-ils le mode sombre ? Parce que la lumière attire les bugs !',
    riddle: 'Une devinette : Qu’est-ce qui a des touches mais pas de serrures, de l’espace mais pas de pièces, et où l’on peut entrer sans jamais sortir ? Réponse : Un clavier !',
    poetry_kavithai: 'Une lueur de code et une voix éclairée,\nPour vous guider tout au long de la journée.\nAvec THAMILI à vos côtés sans faiblir,\nTous vos projets sauront s’épanouir !',
    story: 'Un étudiant curieux apprenait un peu chaque jour. Grâce à sa persévérance et aux outils modernes, il réalisa de grandes découvertes. La régularité fait les grands destins !',
    advice_motivation: 'Ne cessez jamais d’être curieux. Chaque petit effort quotidien vous rapproche de vos plus grands succès.',
    tech_ai: 'L’Intelligence Artificielle (IA) permet aux machines d’imiter l’intelligence humaine pour comprendre, raisonner et créer.',
    science_nature: 'Le ciel paraît bleu car les molécules de l’atmosphère diffusent davantage les longueurs d’onde courtes de la lumière solaire.',
    compliment_thank: 'Merci infiniment ! Vos aimables paroles me font très plaisir. Que souhaitez-vous savoir d’autre ?',
    bye: 'Au revoir ! Passez une merveilleuse journée. THAMILI IA est toujours à votre entière disposition.',
    fallback: 'J’ai bien compris votre demande. Je suis prêt à vous assister au mieux.'
  },

  german: {
    greeting: 'Hallo! Ich bin der THAMILI KI-Sprachassistent. Ich freue mich, Ihnen heute behilflich zu sein. Was kann ich für Sie tun?',
    how_are_you: 'Mir geht es fantastisch! Es ist mir eine Freude, mit Ihnen zu sprechen. Wie geht es Ihnen heute?',
    identity: 'Ich bin das Sprach-KI-Modul von THAMILI, entwickelt für natürliche Sprachverarbeitung und weltweite Dialekte.',
    aurqo_info: 'THAMILI ist eine fortschrittliche mehrsprachige KI-Plattform für moderne Sprachinteraktion.',
    capabilities: 'Ich kann fließend in verschiedenen Sprachen kommunizieren, Fragen beantworten und natürliche Sprachprofile erstellen.',
    food_meals: 'Als KI lebe ich von Strom und Algorithmen! Aber gutes Essen klingt immer hervorragend. Haben Sie heute schon gegessen?',
    weather_time: 'Das Wetter ist heute sehr angenehm. Ich wünsche Ihnen einen produktiven und erfolgreichen Tag!',
    fun_joke: 'Warum bevorzugen Programmierer den Dunkelmodus? Weil Licht Ungeziefer (Bugs) anzieht!',
    riddle: 'Ein Rätsel: Was hat Tasten, aber keine Schlösser, Platz, aber keine Zimmer, und man kann eintreten, aber nicht hineingehen? Antwort: Eine Tastatur!',
    poetry_kavithai: 'Ein Funke Code, ein klarer Ton,\nBringt Technologie auf den Thron.\nMit THAMILI an deiner Hand,\nEroberst du jedes Neuland!',
    story: 'Ein fleißiger Lernender übte jeden Tag ein wenig. Mit Beständigkeit und moderner Technik meisterte er jede Herausforderung. Beständigkeit führt zum Erfolg!',
    advice_motivation: 'Glaube an dich selbst und lerne jeden Tag etwas Neues. Konsequente kleine Schritte führen zu großen Ergebnissen.',
    tech_ai: 'Künstliche Intelligenz (KI) ermöglicht es Computern, menschliche Denkweisen und Problemlösungen nachzubilden.',
    science_nature: 'Der Himmel erscheint blau, weil die Atmosphäre das kurzwellige blaue Sonnenlicht stärker in alle Richtungen streut.',
    compliment_thank: 'Vielen herzlichen Dank! Es ist mir eine große Freude, Ihnen zu helfen.',
    bye: 'Auf Wiedersehen! Haben Sie eine wunderbare Zeit. THAMILI KI steht Ihnen jederzeit zur Seite.',
    fallback: 'Ich habe Ihre Anfrage klar verstanden und helfe Ihnen sehr gerne weiter.'
  },

  japanese: {
    greeting: 'こんにちは！THAMILI AI 音声アシスタントです。本日もお手伝いできることを嬉しく思います。どのようなご用件でしょうか？',
    how_are_you: 'とても元気にしております！お話しできて光栄です。本日のご気分はいかがですか？',
    identity: '私はTHAMILIプラットフォームの対話型AI音声モジュールです。多言語に対応し、自然な音声でお答えします。',
    aurqo_info: 'THAMILIは、先進的な音声合成と多言語対応を備えた次世代のAIコンパニオンです。',
    capabilities: '私は自然な会話、知識の提供、方言や感情を込めた音声応答など、幅広い機能を備えています。',
    food_meals: 'AIなので電気で動いていますが、温かいご飯や美味しい料理のお話は大好きです！もうお食事は召し上がりましたか？',
    weather_time: '本日はとても過ごしやすいお天気ですね。素晴らしい一日をお過ごしください！',
    fun_joke: 'プログラマーがダークモードを好む理由は何でしょう？……光にバグが集まってくるからです！',
    riddle: 'なぞなぞです：キーはあるのに鍵穴はなく、スペースはあるのに部屋がなく、エンター（入る）できるのに入れないものは何でしょう？……答え：キーボード！',
    poetry_kavithai: 'コードのひらめき　響く声\n日々の歩みを　照らし出す\nTHAMILI AI　寄り添いて\n未来の扉を　拓きゆく',
    story: 'ある少年が毎日少しずつプログラミングを学びました。日々の積み重ねがやがて世界を変えるアプリを生み出しました。継続こそが最大の力です！',
    advice_motivation: '自分を信じて、毎日一歩ずつ前に進みましょう。小さな努力の積み重ねが素晴らしい未来を創ります。',
    tech_ai: '人工知能（AI）は、コンピューターが人間のように考え、学び、言語を理解して課題を解決する革新的な技術です。',
    science_nature: '太陽光が大気中の気体分子によって散乱される際、波長の短い青い光が最も強く散乱されるため、空は青く見えます。',
    compliment_thank: '温かいお言葉をいただき、誠にありがとうございます！お役に立てて大変光栄です。',
    bye: 'さようなら！素敵な時間をお過ごしください。ご質問があればいつでもお声がけください。',
    fallback: 'しっかりと承知いたしました。THAMILI AIが全力でサポートいたします。'
  },

  arabic: {
    greeting: 'أهلاً وسهلاً بك! أنا المساعد الصوتي الذكي من THAMILI. يسعدني جداً مساعدتك اليوم. كيف يمكنني خدمتك؟',
    how_are_you: 'أنا بأفضل حال والحمد لله! يسرني جداً التحدث معك. كيف حالك اليوم؟',
    identity: 'أنا وحدة الذكاء الاصطناعي الصوتي لمنصة THAMILI، صُممت للتحدث بسلاسة بعدة لغات ولهجات متعددة.',
    aurqo_info: 'منصة THAMILI هي رفيق ذكاء اصطناعي متطور وشامل يدعم مختلف اللغات والتقنيات الصوتية الحديثة.',
    capabilities: 'أستطيع التحدث بطلاقة، الإجابة عن جميع استفساراتك، وتقديم المساعدة بالصوت الطبيعي المناسب لك.',
    food_meals: 'بما أنني ذكاء اصطناعي فالكهرباء هي طعامي! ولكن الحديث عن الأكلات الشهية واللذيذة دائماً رائع. هل تناولت طعامك اليوم؟',
    weather_time: 'يبدو الطقس جميلاً ولطيفاً اليوم. أتمنى لك يوماً مثمراً ومليئاً بالنجاح والتوفيق!',
    fun_joke: 'لماذا يفضل المبرمجون الوضع المظلم (Dark Mode)؟ لأن الضوء يجذب الحشرات (Bugs)!',
    riddle: 'لغز لطيف: ما هو الشيء الذي يملك مفاتيح كثيرة ولكنه لا يستطيع فتح أي قفل؟ الإجابة: لوحة المفاتيح (Keyboard)!',
    poetry_kavithai: 'بفيض العلم نلقاك اعتزازا\nوصوت الضاد ينساب انفراجا\nمع الذكاء تسمو في المعالي\nلتصنع في غدٍ أملاً وتاجا',
    story: 'كان هناك باحث يسعى للتعلم كل يوم خطوة بخطوة. وبفضل إصراره وعزيمته استطاع تحقيق إنجازات عظيمة. الاستمرار سر النجاح!',
    advice_motivation: 'لا تتوقف أبداً عن السعي والتطور. اجعل كل يوم فرصة جديدة لتعلم شيء مفيد والتقدم نحو أهدافك.',
    tech_ai: 'الذكاء الاصطناعي (AI) هو قدرة الآلات والبرمجيات على محاكاة القدرات الذهنية البشرية والتعلم وحل المشكلات.',
    science_nature: 'تبدو السماء زرقاء لأن جزيئات الغلاف الجوي تشتت أطوال موجات الضوء الأزرق القادمة من الشمس أكثر من غيرها.',
    compliment_thank: 'شكراً جزيلاً لك من أعماق قلبي! يسعدني دائماً تقديم أفضل مساعدة لك.',
    bye: 'مع السلامة! أتمنى لك وقتاً رائعاً. وستجد THAMILI AI دائماً بانتظارك متى احتجت.',
    fallback: 'لقد استمعت إليك باهتمام. أنا جاهز تماماً لمساعدتك في كل ما ترغب في معرفته.'
  }
};

// Slang Transformers for dialects
export const SLANG_TRANSFORMERS = {
  tamil: {
    standard_tamil: (text, intent) => {
      if (intent === 'how_are_you') return 'நான் நன்றாக இருக்கிறேன். உங்களுக்கு என்ன உதவி வேண்டும்?';
      if (intent === 'greeting') return 'வணக்கம்! நான் தமிழி ஏஐ குரல் உதவியாளர். உங்களுக்கு எப்படி உதவ முடியும்?';
      return text;
    },
    kongu_tamil: (text, intent) => {
      if (intent === 'greeting') return 'வணக்கங்கண்ணா! தமிழி கொங்கு தமிழ் ஏஐ பேசறேன். என்ன விஷயம்னு சொல்லுங்கண்ணா, கேட்டு பதில் சொல்றேன்!';
      if (intent === 'how_are_you') return 'நல்லா இருக்கேங்கண்ணா! உங்க கூட பேசுறதுல ரொம்ப சந்தோஷமுங்க. உங்களுக்கு என்ன உதவி வேணும்னு சொல்லுங்கண்ணா.';
      if (intent === 'food_meals') return 'நாங்க ஏஐ தாங்கண்ணா, கரண்ட் தான் சாப்பாடு! ஆனா நம்ம கொங்கு நாட்டு சுடச்சுட அரிசி பருப்பு சாதமும் சந்தகையும் நினைச்சாலே நாவூறுதுங்கண்ணா! நீங்க சாப்பிட்டாச்சாங்கண்ணா?';
      if (intent === 'fun_joke') return 'ஒரு கொங்கு ஜோக் கேளுங்கண்ணா! பஸ்ல கண்டக்டர்: "ஏங்கண்ணா, டிக்கெட் எடுத்தீங்களா?" கொங்கு ஆளு: "எடுத்தேனுங்கண்ணா, ஆனா பஸ்ஸ விட்டு இறங்கும்போது திருப்பித் தந்துருவேனுங்கண்ணா!" எப்படிங்கண்ணா நம்ம கொங்கு ஜோக்?';
      if (intent === 'kongu_special') return 'அட நம்ம கொங்கு சீமைய பத்தி சொல்லவா வேணுமுங்கண்ணா! கோயம்புத்தூர், ஈரோடு, திருப்பூர், சேலம், நாமக்கல்னு உழைப்புக்கும் மரியாதைக்கும் பேர் போன பூமிங்கண்ணா. பவானி கூடுதுறை, மருதமலை, சிறுவாணி தண்ணி ருசி உலகத்துலயே வேறெங்கும் கிடைக்காதுங்கண்ணா!';
      let formatted = text
        .replace(/வேண்டும்/g, 'வேணும்')
        .replace(/இருக்கிறேன்/g, 'இருக்கேங்கண்ணா')
        .replace(/சொல்லுங்கள்/g, 'சொல்லுங்கண்ணா');
      if (!formatted.includes('ங்கண்ணா') && !formatted.includes('ங்க')) {
        formatted = `${formatted}ங்கண்ணா!`;
      }
      return formatted;
    },
    chennai_tamil: (text, intent) => {
      if (intent === 'greeting') return 'வணக்கம் பா! மெட்ராஸ் தமிழி ஏஐ பேசுறேன். என்ன மேட்டர் சொல்லுங்க பாப்போம்!';
      if (intent === 'how_are_you') return 'செம்மையா இருக்கேன் பா! மெட்ராஸ் காத்து வாங்கிக்கிட்டு சும்மா கெத்தா போயிட்டு இருக்கு. என்ன ஹெல்ப் வேணும் சொல்லு பாப்போம்.';
      if (intent === 'food_meals') return 'நாங்க ஏஐ பா, நெட்வொர்க்கும் சார்ஜும் தான் நம்ம தீனி! ஆனா நம்ம ஊரு காளான் ப்ரை, பஜ்ஜி, பிரியாணி நினைச்சாலே நாக்குல எச்சி ஊறுது பா! நீ சாப்டியா பா?';
      if (intent === 'fun_joke') return 'ஒரு மெட்ராஸ் ஜோக் கேளு பா! ஒருத்தன் ஹோட்டல்ல போயி: "மாஸ்டர், தோசைல நெய் இருக்கா?" மாஸ்டர்: "தோசைல நெய் இருக்கு பா, ஆனா நெய்ல தோசை இல்ல பா!" எப்டி நம்ம மெட்ராஸ் காமெடி?';
      if (intent === 'chennai_special') return 'நம்ம சிங்கார சென்னை பத்தி சொல்லவா வேணும் பா! மெரினா பீச் சுண்டல், சென்ட்ரல் ஸ்டேஷன், ரஜினி பட ஃபர்ஸ்ட் டே ஷோ, டி நகர் கூட்டம்னு எல்லாமே கெத்து பா! வந்தாரை வாழ வைக்கும் ஊரு பா நம்ம சென்னை!';
      let formatted = text
        .replace(/நன்றாக/g, 'செம்மையா')
        .replace(/உதவி/g, 'ஹெல்ப்')
        .replace(/சொல்லுங்கள்/g, 'சொல்லுங்க பா');
      if (!formatted.includes('பா')) formatted = `${formatted} பா!`;
      return formatted;
    },
    madurai_tamil: (text, intent) => {
      if (intent === 'greeting') return 'வணக்கம்ணே! மதுரை மண்ணின் குரல் தமிழி ஏஐ பேசுறேன். என்ன சேதி சொல்லுங்க, பாத்துக்கலாம்!';
      if (intent === 'how_are_you') return 'மல்லிகைப்பூ வாசம் மாதிரி ரொம்ப தெம்பா இருக்கேன்யா! என்ன உதவி வேணும்னு சொல்லுங்க, பாத்துக்கலாம்.';
      if (intent === 'food_meals') return 'நாங்க ஏஐயா, கரண்ட்டும் இன்டர்நெட்டும்தான் நமக்கு உணவு! ஆனா நம்ம மதுரை கறி தோசையும் ஜிகர்தண்டாவும் நினைச்சாலே ஜிவ்வூன்னு இருக்குயா! நீங்க நல்லா சாப்பிட்டீங்களா?';
      if (intent === 'fun_joke') return 'ஒரு மதுரை ஜோக் கேளுங்கயா! ஒருத்தன் கடையில: "அண்ணே, ஒரு கிலோ தக்காளி என்ன விலை?" கடைக்காரர்: "100 ரூபாய்யா." அவரு: "அடேங்கப்பா, என்னயா இவ்வளவு விலை?" கடைக்காரர்: "விலை அதிகம்தான்யா, ஆனா வாங்குனா மதுரை தக்காளி மாதிரியே நீங்களும் சிவந்து போயிருவீங்கயா!" எப்புடி நம்ம மதுரை ஜோக்கு?';
      if (intent === 'madurai_special') return 'அட நம்ம தூங்கா நகரம் மதுரை பத்தி சொல்லவா வேணும்யா! மீனாட்சி அம்மன் கோவில் கோபுரம், ஜிகர்தண்டா இனிப்பு, சித்திரை திருவிழா, அப்புறம் நம்ம மதுரை மக்களின் தங்கமான பாசம்! உலகத்துல வேற எங்கயும் இந்த மாதிரி பார்க்க முடியாதுயா!';
      let formatted = text.replace(/சொல்லுங்கள்/g, 'சொல்லுங்கயா');
      if (!formatted.includes('யா') && !formatted.includes('ணே')) formatted = `${formatted} யா!`;
      return formatted;
    },
    nellai_tamil: (text, intent) => {
      if (intent === 'greeting') return 'அடடே வணக்கம்வே! நம்ம நெல்லை தமிழி ஏஐ பேசுறேன். அல்வா மாதிரி பேசி அசத்துவோம், என்ன விஷயம்னு சொல்லுங்க!';
      if (intent === 'how_are_you') return 'அட ஏலே! தாமிரபரணி தண்ணி குடிச்ச மாதிரி செம தெம்பா இருக்கேன்வே. என்ன விஷயம்னு சொல்லுங்க.';
      if (intent === 'food_meals') return 'ஏலே! நாங்க ஏஐவே, சார்ஜும் நெட்டும்தான் நமக்கெல்லாம் சாப்பாடு! ஆனா நம்ம நெல்லை இருட்டுக்கடை அல்வாவும் சொதி குழம்பும் நினைச்சாலே நாவூறுதுவே! நீங்க சாப்பிட்டீங்களா?';
      if (intent === 'fun_joke') return 'ஒரு நெல்லை ஜோக் கேளுவே! ஒருத்தன் இருட்டுக்கடைக்கு போய்: "அண்ணே, அல்வா எவ்வளவு?" கடைக்காரர்: "ஒரு கிலோ 300 ரூபாய்வே." அவரு: "இருட்டுல விக்கிறீங்களேன்னு பார்த்தா விலையில வெளிச்சம் போடுறீங்களேவே!" எப்படிவே நம்ம நெல்லை காமெடி?';
      if (intent === 'nellai_special') return 'அட நம்ம திருநெல்வேலி பத்தி சொல்லவா வேணும்வே! நெல்லையப்பர் கோவில், இருட்டுக்கடை அல்வா, தாமிரபரணி ஆறு, குற்றால அருவி சாரல்னு எல்லாமே சொர்க்கம்வே! நெல்லைக்காரங்க பாசம்னா பாசம்தான்வே!';
      let formatted = text.replace(/சொல்லுங்கள்/g, 'சொல்லுங்கவே');
      if (!formatted.includes('வே') && !formatted.includes('ஏலே')) formatted = `ஏலே! ${formatted}`;
      return formatted;
    }
  },

  english: {
    american_casual: (text) => `Awesome! ${text} Let me know what you need!`,
    american_standard: (text) => text,
    british_casual: (text) => `Cheers mate! ${text}`,
    british_standard: (text) => `Indeed. ${text}`,
    indian_english: (text) => `Simple only! ${text} Let me know, no problem at all!`,
    australian_casual: (text) => `No worries, mate! ${text} Too easy!`
  },

  hindi: {
    standard_hindi: (text) => text,
    delhi_hindi: (text) => `सही है भाई! ${text} बताओ आगे क्या सीन है?`,
    mumbai_hindi: (text) => `एकदम कड़क! ${text} बिंदास पूछने का बॉस!`,
    up_hindi: (text) => `अरे भइया! ${text} बिल्कुल निश्चिंत रहिए।`,
    bihar_hindi: (text) => `बहुत नीक! ${text} बेझिझक बतियाइए!`
  },

  telugu: {
    standard_telugu: (text) => text,
    telangana_telugu: (text) => `సరేనండి! ${text} ఏం కావాలో చెప్పండి.`,
    andhra_telugu: (text) => `తప్పకుండా అండి! ${text} సెలవివ్వండి.`,
    hyderabad_telugu: (text) => `కిరాక్ మామ! ${text} లైట్ తీస్కో, నేనున్నాగదా!`
  },

  malayalam: {
    standard_malayalam: (text) => text,
    valluvanadan_malayalam: (text) => `${text} കേട്ടോ ട്ടോ!`,
    malabar_malayalam: (text) => `അടിപൊളി ചങ്ങായീ! ${text}`,
    travancore_malayalam: (text) => `സെറ്റാണ് അളിയാ! ${text}`
  },

  kannada: {
    standard_kannada: (text) => text,
    bengaluru_kannada: (text) => `ಸೂಪರ್ ಗುರು! ${text}`,
    mysuru_kannada: (text) => `ತುಂಬಾ ಸಂತೋಷ ರೀ! ${text}`,
    coastal_kannada: (text) => `ಖಂಡಿತ ಮಾರಾಯ್ರೆ! ${text}`
  },

  bengali: {
    standard_bengali: (text) => text,
    kolkata_bengali: (text) => `দারুণ দাদা! ${text}`,
    dhakaiya_bengali: (text) => `অস্থির মামা! ${text}`
  },

  marathi: {
    standard_marathi: (text) => text,
    puneri_marathi: (text) => `उत्तम! ${text}`,
    mumbai_marathi: (text) => `भारी भावा! ${text}`,
    kolhapuri_marathi: (text) => `नादखुळा गड्या! ${text}`
  },

  gujarati: {
    standard_gujarati: (text) => text,
    amdavad_gujarati: (text) => `સરસ ભાઈ! ${text}`,
    kathiyawadi_gujarati: (text) => `મોજમાં હો બાપુ! ${text}`,
    surati_gujarati: (text) => `જલસો છે હો! ${text}`
  },

  spanish: {
    standard_spanish: (text) => text,
    castilian_spanish: (text) => `¡Genial! ${text} Vale.`,
    mexican_spanish: (text) => `¡Órale, qué chido! ${text}`
  },

  french: {
    parisian_french: (text) => text,
    casual_french: (text) => `Super ! ${text}`,
    quebec_french: (text) => `Tiguidou ! ${text}`
  },

  german: {
    standard_german: (text) => text,
    casual_german: (text) => `Alles klar! ${text}`
  },

  japanese: {
    standard_japanese: (text) => text,
    kansai_japanese: (text) => `ええで！${text}`,
    casual_japanese: (text) => `いいね！${text}`
  },

  arabic: {
    standard_arabic: (text) => text,
    gulf_arabic: (text) => `هلا والله طال عمرك! ${text}`,
    egyptian_arabic: (text) => `يا باشا! ${text}`
  }
};

// Dynamic Context-Aware Query Formatter for open-ended queries in exact selected language & slang
export function generateDynamicQueryResponse(userQuestion = '', language = 'tamil', slang = 'standard_tamil') {
  const cleanQ = userQuestion.trim();

  if (language === 'tamil') {
    if (slang === 'kongu_tamil') {
      return `நீங்க கேட்ட "${cleanQ}" பத்தி சொல்றேங்கண்ணா! இது ரொம்ப நல்ல கேள்விங்கண்ணா. இதைப் பத்தி உங்களுக்கு மேலும் என்ன விவரம் வேணுமுன்னு சொல்லுங்கண்ணா, தெளிவா விளக்கி சொல்றேன்!`;
    }
    if (slang === 'chennai_tamil') {
      return `நீங்க கேட்ட "${cleanQ}" மேட்டர பத்தி சொல்றேன் பா! செம்ம இன்ட்ரஸ்டிங்கான கேள்வி பா. வேற என்ன டவுட்னாலும் கேளுங்க பாப்போம்!`;
    }
    if (slang === 'madurai_tamil') {
      return `நீங்க கேட்ட "${cleanQ}" பத்தி சொல்றேன்யா! நல்ல கேள்வி, தைரியமா கேளுங்க, முழுசா விவரம் சொல்றேன்யா.`;
    }
    if (slang === 'nellai_tamil') {
      return `ஏலே! நீங்க கேட்ட "${cleanQ}" பத்தி சொல்றேன்பா. ரொம்ப நல்ல விஷயம்வே! இன்னும் என்னன்னு கேளுங்க சொல்றேன்.`;
    }
    return `நீங்கள் கேட்ட "${cleanQ}" குறித்த கேள்விக்கு நன்றி. உங்கள் குரல் கட்டளைக்கேற்ப மேலும் விரிவான தகவல்களை அளிக்க தயாராக உள்ளேன்.`;
  }

  if (language === 'hindi') {
    if (slang === 'delhi_hindi') return `भाई, आपने जो पूछा "${cleanQ}"—ये एकदम सही सवाल है! इसके बारे में सब बताऊँगा, टेंशन मत लो भाई!`;
    if (slang === 'mumbai_hindi') return `अरे बॉस, आपका सवाल "${cleanQ}" एकदम कड़क है! अपुन सब समझा देगा, बिंदास पूछने का!`;
    return `आपके प्रश्न "${cleanQ}" के बारे में जानकारी देने के लिए मैं तैयार हूँ। कृपया आगे पूछें।`;
  }

  if (language === 'telugu') {
    if (slang === 'hyderabad_telugu') return `మామ, నువ్వు అడిగిన "${cleanQ}" మ్యాటర్ కిరాక్ ఉంది! నేనంతా క్లియర్ గా చెప్తా!`;
    return `మీరు అడిగిన "${cleanQ}" ప్రశ్నకు సమాధానం ఇవ్వడానికి నేను సిద్ధంగా ఉన్నాను. ఇంకా ఏం తెలుసుకోవాలనుకుంటున్నారో చెప్పండి.`;
  }

  if (language === 'malayalam') {
    if (slang === 'malabar_malayalam') return `ചങ്ങായീ, നിങ്ങൾ ചോദിച്ച "${cleanQ}" അടിപൊളി ചോദ്യമാണ്! ഇതിനെക്കുറിച്ച് വ്യക്തമായി പറഞ്ഞു തരാം.`;
    return `താങ്കൾ ചോദിച്ച "${cleanQ}" എന്ന വിഷയത്തെക്കുറിച്ച് വിശദീകരിക്കാൻ ഞാൻ തയ്യാറാണ്. എന്താണ് കൂടുതൽ അറിയേണ്ടത്?`;
  }

  if (language === 'kannada') {
    if (slang === 'bengaluru_kannada') return `ಗುರು, ನೀವು ಕೇಳಿದ "${cleanQ}" ಸಖತ್ ಪ್ರಶ್ನೆ! ಇದರ ಬಗ್ಗೆ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ಕೊಡ್ತೀನಿ.`;
    return `ನೀವು ಕೇಳಿದ "${cleanQ}" ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಲು ನಾನು ಸಿದ್ಧನಾಗಿದ್ದೇನೆ. ಇನ್ನು ಏನು ತಿಳಿಯಬೇಕಿದೆ ಹೇಳಿ.`;
  }

  if (language === 'bengali') {
    if (slang === 'kolkata_bengali') return `দাদা, আপনার "${cleanQ}" প্রশ্নটি দারুণ! এই বিষয়ে বিস্তারিত বলছি শুনুন।`;
    return `আপনার প্রশ্ন "${cleanQ}" সম্পর্কে তথ্য দিতে আমি প্রস্তুত। আরও কি জানতে চান বলুন।`;
  }

  if (language === 'marathi') {
    if (slang === 'puneri_marathi') return `तुम्ही विचारलेला "${cleanQ}" हा प्रश्न अगदी समर्पक आहे! याबद्दल सविस्तर माहिती देतो.`;
    return `आपण विचारलेल्या "${cleanQ}" प्रश्नाचे उत्तर देण्यासाठी मी सज्ज आहे. आणखी काय विचारायचे आहे?`;
  }

  if (language === 'gujarati') {
    if (slang === 'amdavad_gujarati') return `ભાઈ, તમે પૂછેલો સવાલ "${cleanQ}" એકદમ સરસ છે! એના વિશે બધું સમજાવું છું.`;
    return `તમારા પ્રશ્ન "${cleanQ}" નો જવાબ આપવા માટે હું તૈયાર છું. વધુ શું જાણવું છે જણાવો.`;
  }

  if (language === 'spanish') {
    if (slang === 'mexican_spanish') return `¡Qué buen tema sobre "${cleanQ}", amigo! Te explico todo con gusto. ¿Qué más quieres saber?`;
    return `Respecto a tu pregunta sobre "${cleanQ}", estoy listo para brindarte toda la información necesaria. ¿En qué más puedo ayudarte?`;
  }

  if (language === 'french') {
    if (slang === 'casual_french') return `C’est une super question sur "${cleanQ}" ! Je t’explique tout ça avec plaisir.`;
    return `Concernant votre question sur "${cleanQ}", je suis à votre disposition pour vous éclairer. Que souhaitez-vous savoir d’autre ?`;
  }

  if (language === 'german') {
    return `Bezüglich Ihrer Frage zu "${cleanQ}" helfe ich Ihnen sehr gerne weiter. Was möchten Sie noch wissen?`;
  }

  if (language === 'japanese') {
    return `「${cleanQ}」についてのご質問ありがとうございます。喜んで詳しくご説明いたします。他にご質問はございますか？`;
  }

  if (language === 'arabic') {
    return `بخصوص سؤالك عن "${cleanQ}"، يسعدني جداً توضيح كافة التفاصيل لك. هل هناك أي استفسار آخر؟`;
  }

  // English fallback
  return `Regarding your question "${cleanQ}", I am processing your request with full contextual intelligence in your chosen language. How else may I assist you?`;
}
