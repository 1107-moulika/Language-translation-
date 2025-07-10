import { useState, useCallback } from 'react';

// Enhanced mock translation database with more comprehensive translations
const mockTranslations: Record<string, Record<string, string>> = {
  // English phrases
  'Hello': {
    'es': 'Hola',
    'fr': 'Bonjour',
    'de': 'Hallo',
    'it': 'Ciao',
    'pt': 'Olá',
    'ru': 'Привет',
    'ja': 'こんにちは',
    'ko': '안녕하세요',
    'zh': '你好',
    'ar': 'مرحبا',
    'hi': 'नमस्ते',
    'th': 'สวัสดี',
    'vi': 'Xin chào',
    'tr': 'Merhaba',
    'nl': 'Hallo',
    'pl': 'Cześć',
    'sv': 'Hej',
    'da': 'Hej',
    'no': 'Hei',
  },
  'How are you?': {
    'es': '¿Cómo estás?',
    'fr': 'Comment allez-vous?',
    'de': 'Wie geht es dir?',
    'it': 'Come stai?',
    'pt': 'Como você está?',
    'ru': 'Как дела?',
    'ja': '元気ですか？',
    'ko': '어떻게 지내세요?',
    'zh': '你好吗？',
    'ar': 'كيف حالك؟',
    'hi': 'आप कैसे हैं?',
    'th': 'คุณเป็นอย่างไร?',
    'vi': 'Bạn có khỏe không?',
    'tr': 'Nasılsın?',
    'nl': 'Hoe gaat het?',
    'pl': 'Jak się masz?',
    'sv': 'Hur mår du?',
    'da': 'Hvordan har du det?',
    'no': 'Hvordan har du det?',
  },
  'Good morning': {
    'es': 'Buenos días',
    'fr': 'Bonjour',
    'de': 'Guten Morgen',
    'it': 'Buongiorno',
    'pt': 'Bom dia',
    'ru': 'Доброе утро',
    'ja': 'おはようございます',
    'ko': '좋은 아침',
    'zh': '早上好',
    'ar': 'صباح الخير',
    'hi': 'शुभ प्रभात',
    'th': 'อรุณสวัสดิ์',
    'vi': 'Chào buổi sáng',
    'tr': 'Günaydın',
    'nl': 'Goedemorgen',
    'pl': 'Dzień dobry',
    'sv': 'God morgon',
    'da': 'God morgen',
    'no': 'God morgen',
  },
  'Thank you': {
    'es': 'Gracias',
    'fr': 'Merci',
    'de': 'Danke',
    'it': 'Grazie',
    'pt': 'Obrigado',
    'ru': 'Спасибо',
    'ja': 'ありがとう',
    'ko': '감사합니다',
    'zh': '谢谢',
    'ar': 'شكرا',
    'hi': 'धन्यवाद',
    'th': 'ขอบคุณ',
    'vi': 'Cảm ơn',
    'tr': 'Teşekkür ederim',
    'nl': 'Dank je',
    'pl': 'Dziękuję',
    'sv': 'Tack',
    'da': 'Tak',
    'no': 'Takk',
  },
  'Welcome': {
    'es': 'Bienvenido',
    'fr': 'Bienvenue',
    'de': 'Willkommen',
    'it': 'Benvenuto',
    'pt': 'Bem-vindo',
    'ru': 'Добро пожаловать',
    'ja': 'いらっしゃいませ',
    'ko': '환영합니다',
    'zh': '欢迎',
    'ar': 'أهلا وسهلا',
    'hi': 'स्वागत है',
    'th': 'ยินดีต้อนรับ',
    'vi': 'Chào mừng',
    'tr': 'Hoş geldiniz',
    'nl': 'Welkom',
    'pl': 'Witamy',
    'sv': 'Välkommen',
    'da': 'Velkommen',
    'no': 'Velkommen',
  },
  'I love you': {
    'es': 'Te amo',
    'fr': 'Je t\'aime',
    'de': 'Ich liebe dich',
    'it': 'Ti amo',
    'pt': 'Eu te amo',
    'ru': 'Я тебя люблю',
    'ja': '愛してる',
    'ko': '사랑해요',
    'zh': '我爱你',
    'ar': 'أحبك',
    'hi': 'मैं तुमसे प्यार करता हूँ',
    'th': 'ฉันรักเธอ',
    'vi': 'Anh yêu em',
    'tr': 'Seni seviyorum',
    'nl': 'Ik hou van je',
    'pl': 'Kocham cię',
    'sv': 'Jag älskar dig',
    'da': 'Jeg elsker dig',
    'no': 'Jeg elsker deg',
  },
  'What is your name?': {
    'es': '¿Cómo te llamas?',
    'fr': 'Comment vous appelez-vous?',
    'de': 'Wie heißt du?',
    'it': 'Come ti chiami?',
    'pt': 'Qual é o seu nome?',
    'ru': 'Как тебя зовут?',
    'ja': 'お名前は何ですか？',
    'ko': '이름이 뭐예요?',
    'zh': '你叫什么名字？',
    'ar': 'ما اسمك؟',
    'hi': 'आपका नाम क्या है?',
    'th': 'คุณชื่ออะไร?',
    'vi': 'Tên bạn là gì?',
    'tr': 'Adın ne?',
    'nl': 'Hoe heet je?',
    'pl': 'Jak masz na imię?',
    'sv': 'Vad heter du?',
    'da': 'Hvad hedder du?',
    'no': 'Hva heter du?',
  },
  'Where are you from?': {
    'es': '¿De dónde eres?',
    'fr': 'D\'où venez-vous?',
    'de': 'Woher kommst du?',
    'it': 'Di dove sei?',
    'pt': 'De onde você é?',
    'ru': 'Откуда ты?',
    'ja': 'どちらの出身ですか？',
    'ko': '어디서 왔어요?',
    'zh': '你来自哪里？',
    'ar': 'من أين أنت؟',
    'hi': 'आप कहाँ से हैं?',
    'th': 'คุณมาจากไหน?',
    'vi': 'Bạn đến từ đâu?',
    'tr': 'Nerelisin?',
    'nl': 'Waar kom je vandaan?',
    'pl': 'Skąd jesteś?',
    'sv': 'Var kommer du ifrån?',
    'da': 'Hvor kommer du fra?',
    'no': 'Hvor kommer du fra?',
  },
  // Spanish phrases
  'Hola': {
    'en': 'Hello',
    'fr': 'Bonjour',
    'de': 'Hallo',
    'it': 'Ciao',
    'pt': 'Olá',
    'ru': 'Привет',
    'ja': 'こんにちは',
    'ko': '안녕하세요',
    'zh': '你好',
    'ar': 'مرحبا',
    'hi': 'नमस्ते',
  },
  'Gracias': {
    'en': 'Thank you',
    'fr': 'Merci',
    'de': 'Danke',
    'it': 'Grazie',
    'pt': 'Obrigado',
    'ru': 'Спасибо',
    'ja': 'ありがとう',
    'ko': '감사합니다',
    'zh': '谢谢',
    'ar': 'شكرا',
    'hi': 'धन्यवाद',
  },
  // French phrases
  'Bonjour': {
    'en': 'Hello',
    'es': 'Hola',
    'de': 'Hallo',
    'it': 'Ciao',
    'pt': 'Olá',
    'ru': 'Привет',
    'ja': 'こんにちは',
    'ko': '안녕하세요',
    'zh': '你好',
    'ar': 'مرحبا',
    'hi': 'नमस्ते',
  },
  'Merci': {
    'en': 'Thank you',
    'es': 'Gracias',
    'de': 'Danke',
    'it': 'Grazie',
    'pt': 'Obrigado',
    'ru': 'Спасибо',
    'ja': 'ありがとう',
    'ko': '감사합니다',
    'zh': '谢谢',
    'ar': 'شكرا',
    'hi': 'धन्यवाद',
  },
  // German phrases
  'Hallo': {
    'en': 'Hello',
    'es': 'Hola',
    'fr': 'Bonjour',
    'it': 'Ciao',
    'pt': 'Olá',
    'ru': 'Привет',
    'ja': 'こんにちは',
    'ko': '안녕하세요',
    'zh': '你好',
    'ar': 'مرحبا',
    'hi': 'नमस्ते',
  },
  'Danke': {
    'en': 'Thank you',
    'es': 'Gracias',
    'fr': 'Merci',
    'it': 'Grazie',
    'pt': 'Obrigado',
    'ru': 'Спасибо',
    'ja': 'ありがとう',
    'ko': '감사합니다',
    'zh': '谢谢',
    'ar': 'شكرا',
    'hi': 'धन्यवाद',
  },
};

// Language detection patterns for auto-detect
const languagePatterns: Record<string, RegExp[]> = {
  'es': [/¿.*\?/, /ñ/, /á|é|í|ó|ú/, /ll/, /rr/],
  'fr': [/ç/, /à|è|é|ê|ë|î|ï|ô|ù|û|ü|ÿ/, /qu/, /eau/, /tion$/],
  'de': [/ß/, /ä|ö|ü/, /sch/, /tsch/, /ung$/],
  'it': [/gli/, /gn/, /à|è|é|ì|í|î|ò|ó|ù|ú/, /zione$/],
  'pt': [/ã|õ/, /ç/, /ão/, /lh/, /nh/],
  'ru': [/[а-яё]/i],
  'ja': [/[ひらがな]|[カタカナ]|[一-龯]/],
  'ko': [/[가-힣]/],
  'zh': [/[一-龯]/],
  'ar': [/[ا-ي]/],
  'hi': [/[अ-ह]/],
  'th': [/[ก-๙]/],
  'vi': [/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i],
};

// Auto-detect language based on text patterns
const detectLanguage = (text: string): string => {
  const cleanText = text.toLowerCase().trim();
  
  for (const [lang, patterns] of Object.entries(languagePatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(cleanText)) {
        return lang;
      }
    }
  }
  
  return 'en'; // Default to English
};

// Enhanced mock translation function with better language handling
const mockTranslateAPI = async (
  text: string, 
  sourceLanguage: string, 
  targetLanguage: string
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
  
  const cleanText = text.trim();
  
  // Auto-detect source language if needed
  const actualSourceLang = sourceLanguage === 'auto' ? detectLanguage(cleanText) : sourceLanguage;
  
  // If source and target are the same, return original text
  if (actualSourceLang === targetLanguage) {
    return cleanText;
  }
  
  // Check for exact matches first
  if (mockTranslations[cleanText] && mockTranslations[cleanText][targetLanguage]) {
    return mockTranslations[cleanText][targetLanguage];
  }
  
  // Check for case-insensitive matches
  const lowerText = cleanText.toLowerCase();
  for (const [key, translations] of Object.entries(mockTranslations)) {
    if (key.toLowerCase() === lowerText && translations[targetLanguage]) {
      return translations[targetLanguage];
    }
  }
  
  // For sentences, try to translate word by word
  const words = cleanText.split(/\s+/);
  if (words.length > 1) {
    const translatedWords = words.map(word => {
      const cleanWord = word.replace(/[.,!?;:]/, '').toLowerCase();
      for (const [key, translations] of Object.entries(mockTranslations)) {
        if (key.toLowerCase() === cleanWord && translations[targetLanguage]) {
          return translations[targetLanguage];
        }
      }
      return word;
    });
    
    // If we translated at least some words, return the result
    const translatedSentence = translatedWords.join(' ');
    if (translatedSentence !== cleanText) {
      return translatedSentence;
    }
  }
  
  // Language-specific mock responses for unknown text
  const languageResponses: Record<string, string[]> = {
    'es': [
      `"${cleanText}" (traducido del ${actualSourceLang})`,
      `Traducción: ${cleanText}`,
      `[ES] ${cleanText}`,
    ],
    'fr': [
      `"${cleanText}" (traduit de ${actualSourceLang})`,
      `Traduction: ${cleanText}`,
      `[FR] ${cleanText}`,
    ],
    'de': [
      `"${cleanText}" (übersetzt aus ${actualSourceLang})`,
      `Übersetzung: ${cleanText}`,
      `[DE] ${cleanText}`,
    ],
    'it': [
      `"${cleanText}" (tradotto da ${actualSourceLang})`,
      `Traduzione: ${cleanText}`,
      `[IT] ${cleanText}`,
    ],
    'pt': [
      `"${cleanText}" (traduzido de ${actualSourceLang})`,
      `Tradução: ${cleanText}`,
      `[PT] ${cleanText}`,
    ],
    'ru': [
      `"${cleanText}" (переведено с ${actualSourceLang})`,
      `Перевод: ${cleanText}`,
      `[RU] ${cleanText}`,
    ],
    'ja': [
      `"${cleanText}" (${actualSourceLang}から翻訳)`,
      `翻訳: ${cleanText}`,
      `[JA] ${cleanText}`,
    ],
    'ko': [
      `"${cleanText}" (${actualSourceLang}에서 번역됨)`,
      `번역: ${cleanText}`,
      `[KO] ${cleanText}`,
    ],
    'zh': [
      `"${cleanText}" (从${actualSourceLang}翻译)`,
      `翻译: ${cleanText}`,
      `[ZH] ${cleanText}`,
    ],
    'ar': [
      `"${cleanText}" (مترجم من ${actualSourceLang})`,
      `ترجمة: ${cleanText}`,
      `[AR] ${cleanText}`,
    ],
    'hi': [
      `"${cleanText}" (${actualSourceLang} से अनुवादित)`,
      `अनुवाद: ${cleanText}`,
      `[HI] ${cleanText}`,
    ],
  };
  
  const responses = languageResponses[targetLanguage] || [
    `"${cleanText}" (translated from ${actualSourceLang} to ${targetLanguage})`,
    `Translation: ${cleanText}`,
    `[${targetLanguage.toUpperCase()}] ${cleanText}`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useTranslation = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  const translateText = useCallback(async (
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ) => {
    if (!text.trim()) {
      setTranslatedText('');
      setDetectedLanguage(null);
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      // Detect language if auto-detect is enabled
      if (sourceLanguage === 'auto') {
        const detected = detectLanguage(text);
        setDetectedLanguage(detected);
      } else {
        setDetectedLanguage(null);
      }

      // Perform translation
      const translated = await mockTranslateAPI(text, sourceLanguage, targetLanguage);
      setTranslatedText(translated);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  }, []);

  return {
    translatedText,
    isTranslating,
    error,
    detectedLanguage,
    translateText,
  };
};