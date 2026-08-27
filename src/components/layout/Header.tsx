import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { ReleaseItem } from '../../types/release';
import { 
  Sun, 
  Moon, 
  Languages, 
  RotateCw, 
  Sparkles 
} from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  visibleReleases: ReleaseItem[];
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, isRefreshing }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, isTranslating, translationProgress } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#0c0d0e]/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand: TechScout */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 p-1 flex items-center justify-center shadow-md border border-zinc-200/50 dark:border-zinc-800 overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="TechScout Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
                TechScout
              </span>
            </div>
          </div>

          {/* Actions: Translation, Theme, Refresh */}
          <div className="flex items-center gap-2">
            
            {/* Translation Status Badge */}
            {isTranslating && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                Gemini Türkçe Çeviri ({translationProgress.completed}/{translationProgress.total})...
              </span>
            )}

            {/* Language Toggle (English / Türkçe) */}
            <button
              onClick={() => toggleLanguage()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/80 transition-colors"
              title="Dili Değiştir (Change Language)"
            >
              <Languages className="w-3.5 h-3.5 text-zinc-500" />
              <span>{language === 'tr' ? 'Türkçe' : 'English'}</span>
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/80 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {/* Refresh Data Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/80 transition-colors disabled:opacity-50"
              title="GitHub sürümlerini yeniden çek"
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
