import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '../types/release';
import { API_CONFIG } from '../config/api.config';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('devpulse_lang') as Language;
      return (saved === 'tr' || saved === 'en') ? saved : API_CONFIG.DEFAULT_LANGUAGE;
    } catch {
      return API_CONFIG.DEFAULT_LANGUAGE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('devpulse_lang', language);
    } catch {
      // Keep the selected language for this session when storage is unavailable.
    }
  }, [language]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'tr' : 'en';
    setLanguageState(nextLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
