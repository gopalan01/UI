import React from 'react';
import { Sparkles, MessageCircle, Lightbulb, Compass, Radio, Coffee, Smile } from 'lucide-react';

export default function VoiceOptions({
  onboardingStep,
  onboardingOptions = [],
  onSelectOption,
  onSelectPrompt,
  currentLanguage = 'tamil',
  currentSlangId = 'kongu_tamil',
  currentSlang = 'Kongu Tamil'
}) {
  // Quick prompt suggestions when onboarding is completed
  const getQuickPrompts = () => {
    if (currentLanguage === 'tamil') {
      if (currentSlangId === 'kongu_tamil') {
        return [
          { id: 'p1', icon: <Coffee size={13} />, text: 'சாப்பிட்டீங்களாங்ணா?' },
          { id: 'p2', icon: <Compass size={13} />, text: 'கொங்கு நாடு பத்தி சொல்லுங்கண்ணா' },
          { id: 'p3', icon: <Smile size={13} />, text: 'ஒரு கொங்கு ஜோக் சொல்லுங்க' },
          { id: 'p4', icon: <MessageCircle size={13} />, text: 'நல்லா இருக்கீங்களாங்ணா?' },
          { id: 'p5', icon: <Lightbulb size={13} />, text: 'AI என்றால் என்னங்ணா?' }
        ];
      }
      if (currentSlangId === 'chennai_tamil') {
        return [
          { id: 'p1', icon: <MessageCircle size={13} />, text: 'எப்படி இருக்க பா?' },
          { id: 'p2', icon: <Compass size={13} />, text: 'சென்னை பத்தி சொல்லு பா' },
          { id: 'p3', icon: <Smile size={13} />, text: 'ஒரு மெட்ராஸ் ஜோக் சொல்லு பா' },
          { id: 'p4', icon: <Coffee size={13} />, text: 'சாப்டியா பா?' }
        ];
      }
      if (currentSlangId === 'madurai_tamil') {
        return [
          { id: 'p1', icon: <MessageCircle size={13} />, text: 'எப்படி இருக்கீங்கயா?' },
          { id: 'p2', icon: <Compass size={13} />, text: 'மதுரை பத்தி சொல்லுங்கயா' },
          { id: 'p3', icon: <Smile size={13} />, text: 'ஒரு மதுரை ஜோக் சொல்லுங்க' }
        ];
      }
      if (currentSlangId === 'nellai_tamil') {
        return [
          { id: 'p1', icon: <MessageCircle size={13} />, text: 'ஏலே நல்லா இருக்கீங்களா?' },
          { id: 'p2', icon: <Compass size={13} />, text: 'நெல்லை பத்தி சொல்லுங்கவே' },
          { id: 'p3', icon: <Smile size={13} />, text: 'ஒரு நெல்லை ஜோக் சொல்லுவே' }
        ];
      }
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'ஒரு ஜோக் சொல்லுங்க' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி பத்தி சொல்லு' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'எப்படி இருக்கீங்க?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'உன்னால என்ன செய்ய முடியும்?' }
      ];
    }

    if (currentLanguage === 'hindi') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'एक मजेदार चुटकुला सुनाओ' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி (THAMILI) के बारे में बताओ' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'क्या हाल चाल है?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'तुम क्या कर सकते हो?' }
      ];
    }

    if (currentLanguage === 'telugu') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'ఒక మంచి జోక్ చెప్పు' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி (THAMILI) గురించి చెప్పు' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'ఎలా ఉన్నారు?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'నువ్వు ఏమి చేయగలవు?' }
      ];
    }

    if (currentLanguage === 'malayalam') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'ഒരു തമാശ പറയൂ' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி (THAMILI) കുറിച്ച് പറയൂ' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'സുഖമാണോ?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'എന്തൊക്കെ ചെയ്യാനാകും?' }
      ];
    }

    if (currentLanguage === 'kannada') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'ಒಂದು ಜೋಕ್ ಹೇಳಿ' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி (THAMILI) ಬಗ್ಗೆ ತಿಳಿಸಿ' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'ಹೇಗಿದ್ದೀರಾ?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯಗಳೇನು?' }
      ];
    }

    if (currentLanguage === 'bengali') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'একটি কৌতুক বলুন' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி (THAMILI) সম্পর্কে বলুন' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'কেমন আছেন?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'আপনি কি করতে পারেন?' }
      ];
    }

    if (currentLanguage === 'marathi') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'एक विनोद सांगा' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி (THAMILI) बद्दल सांगा' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'कसे आहात?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'तुम्ही काय करू शकता?' }
      ];
    }

    if (currentLanguage === 'gujarati') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'એક જોક કહો' },
        { id: 'p2', icon: <Compass size={13} />, text: 'தமிழி (THAMILI) વિશે જણાવો' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'કેમ છો?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'તમે શું કરી શકો છો?' }
      ];
    }

    if (currentLanguage === 'spanish') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'Cuéntame un chiste' },
        { id: 'p2', icon: <Compass size={13} />, text: '¿Qué es THAMILI AI?' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: '¿Cómo estás?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: '¿Qué puedes hacer?' }
      ];
    }

    if (currentLanguage === 'french') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'Raconte-moi une blague' },
        { id: 'p2', icon: <Compass size={13} />, text: 'Qu’est-ce que THAMILI AI ?' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'Comment allez-vous ?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'Que pouvez-vous faire ?' }
      ];
    }

    if (currentLanguage === 'german') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'Erzähle einen Witz' },
        { id: 'p2', icon: <Compass size={13} />, text: 'Was ist THAMILI KI?' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'Wie geht es dir?' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'Was kannst du tun?' }
      ];
    }

    if (currentLanguage === 'japanese') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: '面白いジョークを言って' },
        { id: 'p2', icon: <Compass size={13} />, text: 'THAMILI AIについて教えて' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: '元気ですか？' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: '何ができますか？' }
      ];
    }

    if (currentLanguage === 'arabic') {
      return [
        { id: 'p1', icon: <Sparkles size={13} />, text: 'قل لي نكتة مضحكة' },
        { id: 'p2', icon: <Compass size={13} />, text: 'أخبرني عن THAMILI AI' },
        { id: 'p3', icon: <MessageCircle size={13} />, text: 'كيف حالك اليوم؟' },
        { id: 'p4', icon: <Lightbulb size={13} />, text: 'ماذا يمكنك أن تفعل؟' }
      ];
    }

    return [
      { id: 'p1', icon: <Sparkles size={13} />, text: 'Tell me a funny joke' },
      { id: 'p2', icon: <Compass size={13} />, text: 'What is THAMILI AI?' },
      { id: 'p3', icon: <MessageCircle size={13} />, text: 'How are you doing?' },
      { id: 'p4', icon: <Lightbulb size={13} />, text: 'What are your voice features?' }
    ];
  };

  const isCompleted = onboardingStep === 'completed';
  const quickPrompts = getQuickPrompts();

  return (
    <div className="stage-options-section">
      {/* Onboarding Mode: Choice Chips for Language, Region, Slang, Voice */}
      {!isCompleted && onboardingOptions && onboardingOptions.length > 0 && (
        <div className="onboarding-chips-wrapper">
          <div className="options-hint-bar">
            <div className="hint-pill">
              <Sparkles size={13} className="hint-icon" />
              <span>Speak or tap your choice:</span>
            </div>
            {onboardingStep && (
              <span className="step-indicator-badge">
                Step: <strong className="capitalize">{onboardingStep}</strong>
              </span>
            )}
          </div>

          <div className="onboarding-chips-grid">
            {onboardingOptions.map((opt) => (
              <button
                key={opt.id}
                id={`chip-${opt.id}`}
                className="onboarding-choice-chip"
                onClick={() => onSelectOption(opt)}
                title={opt.description || opt.name}
              >
                {opt.flag && <span className="chip-flag">{opt.flag}</span>}
                {opt.icon && <span className="chip-icon">{opt.icon}</span>}
                <span className="chip-label">{opt.name}</span>
                {opt.nativeName && <span className="chip-sub">{opt.nativeName}</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Completed Mode: Quick Conversational Voice Prompts */}
      {isCompleted && (
        <div className="quick-prompts-wrapper">
          <div className="options-hint-bar">
            <div className="hint-pill">
              <Radio size={13} className="hint-icon" />
              <span>Quick voice suggestions ({currentSlang}):</span>
            </div>
          </div>

          <div className="quick-prompts-grid">
            {quickPrompts.map((item) => (
              <button
                key={item.id}
                id={`prompt-${item.id}`}
                className="quick-prompt-chip"
                onClick={() => onSelectPrompt(item.text)}
                title={`Ask: "${item.text}"`}
              >
                <span className="prompt-icon">{item.icon}</span>
                <span className="prompt-text">{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
