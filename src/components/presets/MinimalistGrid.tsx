import React from 'react';
import { ReleaseItem } from '../../types/release';
import { useLanguage } from '../../context/LanguageContext';
import { formatDate } from '../../utils/dateUtils';
import { StarRatingBadge } from '../common/StarRatingBadge';
import { ArrowRight, Tag, Calendar, Terminal, FlaskConical, Sparkles, Zap } from 'lucide-react';

interface PresetProps {
  releases: ReleaseItem[];
  onSelectRelease: (item: ReleaseItem) => void;
}

export const MinimalistGrid: React.FC<PresetProps> = ({ releases, onSelectRelease }) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {releases.map((item) => {
        const title = (isTr && item.translatedTitle) ? item.translatedTitle : item.title;
        const whatChanged = isTr
          ? (item.whatChangedTr || item.summaryTr || item.whatChangedEn || item.summaryEn)
          : (item.whatChangedEn || item.summaryEn);
        const developerImpact = isTr
          ? (item.developerImpactTr || item.importanceReasonTr || item.developerImpactEn || item.importanceReasonEn)
          : (item.developerImpactEn || item.importanceReasonEn);

        return (
          <article
            key={item.id}
            onClick={() => onSelectRelease(item)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelectRelease(item);
              }
            }}
            role={'button'}
            tabIndex={0}
            aria-label={item.repoName + ' ' + item.tagName + ': ' + title}
            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/90 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div>
              {/* Card Header: Repo Badge, Tag Version & 3-Star Rating */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                  {/* Tech Logo in Badge */}
                  <div className="w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5 flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-zinc-700/60">
                    {item.logoUrl ? (
                      <img
                        src={item.logoUrl}
                        alt={item.repoName}
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          // Fallback to text icon if image fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Terminal className="w-3 h-3 text-zinc-400" />
                    )}
                  </div>

                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                    {item.repoName}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0">
                    <Tag className="w-2.5 h-2.5" />
                    {item.tagName}
                  </span>

                  {item.prerelease && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80 shrink-0">
                      <FlaskConical className="w-2.5 h-2.5 text-purple-500" />
                      PREVIEW
                    </span>
                  )}
                </div>
                
                {/* 3-Star Rating Badge */}
                <div className="shrink-0">
                  <StarRatingBadge level={item.importanceLevel || 1} showLabel={true} />
                </div>
              </div>

              {/* Title with Tech Logo Integration */}
              <div className="flex items-start gap-2.5 mb-3">
                <h3 className="font-heading text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                  {title}
                </h3>
              </div>

              {/* Structured Summary: Ne Değişti + Geliştiriciye Etkisi */}
              <div className="space-y-2.5 my-3 text-xs bg-zinc-50/70 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/70">
                {/* Ne Değişti */}
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-[10.5px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                    <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{isTr ? 'Ne Değişti?' : 'What Changed?'}</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-2 pl-3 border-l-2 border-emerald-500/40">
                    {whatChanged}
                  </p>
                </div>

                {/* Geliştiriciye Etkisi */}
                <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex items-center gap-1.5 font-bold text-[10.5px] uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                    <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{isTr ? 'Geliştiriciye Etkisi:' : 'Developer Impact:'}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 pl-3 border-l-2 border-amber-500/40">
                    {developerImpact}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-zinc-400" />
                {formatDate(item.publishedAt, language)}
              </span>

              <span className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>{isTr ? 'İncele' : 'View'}</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
};
