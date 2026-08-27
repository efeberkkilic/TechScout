import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Star } from 'lucide-react';

interface StarRatingBadgeProps {
  level: 1 | 2 | 3;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export const StarRatingBadge: React.FC<StarRatingBadgeProps> = ({
  level,
  showLabel = true,
  size = 'sm'
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const getLabel = () => {
    switch (level) {
      case 3:
        return isTr ? 'Kritik / Ana Sürüm' : 'Critical / Major';
      case 2:
        return isTr ? 'Önemli / Özellik' : 'Feature / Minor';
      case 1:
      default:
        return isTr ? 'Rutin / Yama' : 'Patch / Routine';
    }
  };

  const getBadgeStyle = () => {
    switch (level) {
      case 3:
        return 'bg-amber-50/80 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/40';
      case 2:
        return 'bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/60';
      case 1:
      default:
        return 'bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800/60';
    }
  };

  const starSize = size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3';

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${getBadgeStyle()}`}
      title={`${level} / 3 Stars - ${getLabel()}`}
    >
      {/* 3 Stars with Lit / Dimmed states */}
      <div className="flex items-center gap-0.5">
        {/* Star 1 */}
        <Star
          className={`${starSize} ${
            level >= 1
              ? 'fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.35)]'
              : 'text-zinc-300 dark:text-zinc-700'
          }`}
        />
        {/* Star 2 */}
        <Star
          className={`${starSize} ${
            level >= 2
              ? 'fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.35)]'
              : 'text-zinc-300 dark:text-zinc-700 fill-zinc-200 dark:fill-zinc-800'
          }`}
        />
        {/* Star 3 */}
        <Star
          className={`${starSize} ${
            level >= 3
              ? 'fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'
              : 'text-zinc-300 dark:text-zinc-700 fill-zinc-200 dark:fill-zinc-800'
          }`}
        />
      </div>

      {showLabel && (
        <span className="font-medium text-[10px] tracking-tight">
          {level === 3 ? (isTr ? 'Kritik' : 'Critical') : level === 2 ? (isTr ? 'Önemli' : 'Feature') : (isTr ? 'Rutin' : 'Patch')}
        </span>
      )}
    </div>
  );
};
