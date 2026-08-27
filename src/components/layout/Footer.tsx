import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Github, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  return (
    <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand Info */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-zinc-950 p-0.5 flex items-center justify-center border border-zinc-800 shrink-0">
              <img
                src="/logo.png"
                alt="TechScout Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-heading font-bold text-sm text-zinc-900 dark:text-zinc-100">
              TechScout
            </span>
            <span className="text-xs text-zinc-400">
              © {new Date().getFullYear()} — {isTr ? (
                <>
                  Geliştiriciler için{' '}
                  <a
                    href="https://efeberk.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
                  >
                    efeberk.dev
                  </a>{' '}
                  tarafından tasarlandı.
                </>
              ) : (
                <>
                  Designed for developers by{' '}
                  <a
                    href="https://efeberk.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
                  >
                    efeberk.dev
                  </a>
                  .
                </>
              )}
            </span>
          </div>

          {/* Technology Badges & Repo Link */}
          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-zinc-700 dark:text-zinc-300">GitHub API</span>
              <span className="text-zinc-400 dark:text-zinc-600">·</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Credential-free
              </span>
            </span>

            <a
              href="https://github.com/efeberkkilic/TechScout"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="TechScout GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
