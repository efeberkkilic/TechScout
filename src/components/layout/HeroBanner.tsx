import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Terminal, Activity, Layers, Calendar } from 'lucide-react';

interface HeroBannerProps {
  totalReleases: number;
  activeReposCount: number;
  categoriesCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalReleases,
  activeReposCount,
  categoriesCount
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  return (
    <section className="relative overflow-hidden pt-8 pb-4">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-r from-brand-500/10 via-emerald-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
        
        {/* Title & Tagline */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {isTr 
                ? 'Geliştirici İstihbarat • Son 3 Ayın Sürümleri' 
                : 'Developer Intelligence • Past 3 Months Releases'}
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            {isTr ? (
              <>
                <span className="text-emerald-600 dark:text-emerald-400">TechScout:</span> En Yeni Yazılım & Teknoloji Gelişmeleri
              </>
            ) : (
              <>
                <span className="text-emerald-600 dark:text-emerald-400">TechScout:</span> Real-Time Tech & Language Releases
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {isTr
              ? 'GitHub ekosistemindeki en güncel sürümleri, yükselen araçları ve önemli teknoloji gelişmelerini tek yerde keşfedin.'
              : 'Discover the latest releases, trending developer tools, and key technology breakthroughs across the GitHub ecosystem in one place.'}
          </p>
        </div>

        {/* Live Metrics Counters (Including 3 Months Time Range Card) */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 self-start md:self-end">
          
          {/* Card 1: Time Range (Son 3 Ay) */}
          <div className="flex flex-col items-center justify-center text-center px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm min-w-[100px]">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{isTr ? 'Zaman Aralığı' : 'Timeframe'}</span>
            </div>
            <div className="text-base sm:text-lg font-heading font-bold whitespace-nowrap text-emerald-600 dark:text-emerald-400">
              {isTr ? 'Son 3 Ay' : 'Past 3 Mo'}
            </div>
          </div>

          {/* Card 2: Releases */}
          <div className="flex flex-col items-center justify-center text-center px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm min-w-[90px]">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-0.5">
              <Activity className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span>{isTr ? 'Aktif Sürüm' : 'Releases'}</span>
            </div>
            <div className="text-base sm:text-lg font-heading font-bold text-zinc-900 dark:text-zinc-100">
              {totalReleases}
            </div>
          </div>

          {/* Card 3: Ecosystems */}
          <div className="flex flex-col items-center justify-center text-center px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm min-w-[90px]">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-0.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{isTr ? 'Teknoloji' : 'Ecosystems'}</span>
            </div>
            <div className="text-base sm:text-lg font-heading font-bold text-zinc-900 dark:text-zinc-100">
              {activeReposCount}
            </div>
          </div>

          {/* Card 4: Categories */}
          <div className="flex flex-col items-center justify-center text-center px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm min-w-[90px]">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-0.5">
              <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{isTr ? 'Kategori' : 'Categories'}</span>
            </div>
            <div className="text-base sm:text-lg font-heading font-bold text-zinc-900 dark:text-zinc-100">
              {categoriesCount}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
