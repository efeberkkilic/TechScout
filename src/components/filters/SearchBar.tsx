import React from 'react';
import { ImportanceLevel } from '../../types/release';
import { useLanguage } from '../../context/LanguageContext';
import { Search, X, Star, FlaskConical } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  resultsCount: number;
  selectedLevels: ImportanceLevel[];
  onToggleLevel: (level: ImportanceLevel) => void;
  onClearLevels: () => void;
  showPreviews: boolean;
  onTogglePreviews: () => void;
  previewCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  resultsCount,
  selectedLevels,
  onToggleLevel,
  onClearLevels,
  showPreviews,
  onTogglePreviews,
  previewCount
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const isAllActive = selectedLevels.length === 0 || selectedLevels.length === 3;
  const is3Active = selectedLevels.includes(3);
  const is2Active = selectedLevels.includes(2);
  const is1Active = selectedLevels.includes(1);

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
      
      {/* Search Input Box */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isTr
              ? 'Sürümlerde ara (örn. React, Rust, Go, v3.0, Web)...'
              : 'Search releases (e.g. React, Rust, Go, v3.0, Compiler)...'
          }
          className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all shadow-sm"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-14 pr-2 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-[11px] font-mono font-medium text-zinc-400 dark:text-zinc-500">
            {resultsCount} {isTr ? 'sonuç' : 'hits'}
          </span>
        </div>
      </div>

      {/* Action Filters: Preview Toggle (To the left of Levels) + Star Rating Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 pb-1 lg:pb-0">
        
        {/* Preview Releases Toggle Button */}
        <button
          type="button"
          onClick={onTogglePreviews}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border shrink-0 ${
            showPreviews
              ? 'bg-purple-600 dark:bg-purple-500 text-white border-purple-600 dark:border-purple-500 shadow-sm shadow-purple-500/25'
              : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200/80 dark:border-zinc-800'
          }`}
          title={
            isTr
              ? 'Alpha, Beta, RC ve Pre-release sürümlerini akışa dahil et'
              : 'Include Alpha, Beta, RC, and Pre-release builds in the feed'
          }
        >
          <FlaskConical className={`w-3.5 h-3.5 ${showPreviews ? 'text-white' : 'text-purple-500 dark:text-purple-400'}`} />
          <span>{isTr ? 'Preview Sürümleri' : 'Preview Releases'}</span>
          {previewCount !== undefined && previewCount > 0 && (
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                showPreviews
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60'
              }`}
            >
              {previewCount}
            </span>
          )}
        </button>

        {/* 3-Star Rating Quick Filter Pills (Multi-Selectable) */}
        <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shrink-0">
          
          {/* All Levels */}
          <button
            onClick={onClearLevels}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              isAllActive
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {isTr ? 'Tüm Seviyeler' : 'All Levels'}
          </button>

          {/* 3 Stars */}
          <button
            onClick={() => onToggleLevel(3)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
              is3Active
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-700 shadow-sm'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isTr ? '3 Yıldız: Kritik ve Kırıcı Değişiklikler (Çoklu seçilebilir)' : '3 Stars: Critical & Major Releases (Multi-selectable)'}
          >
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
            </div>
            <span>3★</span>
          </button>

          {/* 2 Stars */}
          <button
            onClick={() => onToggleLevel(2)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
              is2Active
                ? 'bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300/80 dark:border-amber-800 shadow-sm'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isTr ? '2 Yıldız: Yeni Özellikler ve Performans (Çoklu seçilebilir)' : '2 Stars: New Features & Performance (Multi-selectable)'}
          >
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 text-zinc-300 dark:text-zinc-600" />
            </div>
            <span>2★</span>
          </button>

          {/* 1 Star */}
          <button
            onClick={() => onToggleLevel(1)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
              is1Active
                ? 'bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300/80 dark:border-amber-800 shadow-sm'
                : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isTr ? '1 Yıldız: Rutin Bakım ve Yamalar (Çoklu seçilebilir)' : '1 Star: Routine Patches & Bug Fixes (Multi-selectable)'}
          >
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400" />
              <Star className="w-3 h-3 text-zinc-300 dark:text-zinc-600" />
              <Star className="w-3 h-3 text-zinc-300 dark:text-zinc-600" />
            </div>
            <span>1★</span>
          </button>

        </div>

      </div>

    </div>
  );
};
