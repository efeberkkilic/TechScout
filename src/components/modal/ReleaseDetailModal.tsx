import React, { useEffect } from 'react';
import { ReleaseItem } from '../../types/release';
import { useLanguage } from '../../context/LanguageContext';
import { formatDate } from '../../utils/dateUtils';
import { renderMarkdownToHtml } from '../../utils/markdownParser';
import { StarRatingBadge } from '../common/StarRatingBadge';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  Tag, 
  Calendar, 
  Terminal,
  FlaskConical,
  Zap
} from 'lucide-react';

interface ReleaseDetailModalProps {
  item: ReleaseItem | null;
  onClose: () => void;
}

export const ReleaseDetailModal: React.FC<ReleaseDetailModalProps> = ({ item, onClose }) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const title = (isTr && item.translatedTitle) ? item.translatedTitle : item.title;
  const whatChanged = isTr
    ? (item.whatChangedTr || item.summaryTr || item.whatChangedEn || item.summaryEn)
    : (item.whatChangedEn || item.summaryEn);
  const developerImpact = isTr
    ? (item.developerImpactTr || item.importanceReasonTr || item.developerImpactEn || item.importanceReasonEn)
    : (item.developerImpactEn || item.importanceReasonEn);
  const bodyContent = (isTr && item.translatedBody) ? item.translatedBody : item.body;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Modal Card */}
      <div role="dialog" aria-modal="true" aria-labelledby="release-detail-title" className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-start gap-4">
            
            {/* Tech Brand Logo */}
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-sm">
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt={item.repoName}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Terminal className="w-6 h-6 text-zinc-400" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {item.repoFullName}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  <Tag className="w-3 h-3 text-zinc-400" />
                  {item.tagName}
                </span>
                {item.prerelease && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80">
                    <FlaskConical className="w-3 h-3 text-purple-500" />
                    {isTr ? 'Önizleme / Preview' : 'Preview Build'}
                  </span>
                )}
                {/* 3-Star Rating Badge */}
                <StarRatingBadge level={item.importanceLevel || 1} showLabel={true} size="md" />
              </div>
              <h2 id="release-detail-title" className="font-heading text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                {title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(item.publishedAt, language)}</span>
                <span>•</span>
                <span>{item.tag}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={isTr ? 'Detay penceresini kapat' : 'Close release details'}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Release overview */}
              {/* Structured Overview Box: Ne Değişti + Geliştiriciye Etkisi */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 space-y-3">
                
                {/* Ne Değişti */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{isTr ? 'Ne Değişti?' : 'What Changed?'}</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans pl-3 border-l-2 border-emerald-500/40">
                    {whatChanged}
                  </p>
                </div>

                {/* Geliştiriciye Etkisi */}
                <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{isTr ? 'Geliştiriciye Etkisi:' : 'Developer Impact:'}</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans pl-3 border-l-2 border-amber-500/40">
                    {developerImpact}
                  </p>
                </div>

              </div>

              {/* Markdown Content */}
              <div 
                className="prose dark:prose-invert max-w-none text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(bodyContent) }}
              />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <a
              href={item.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 transition-colors shadow-sm"
            >
              <span>{isTr ? 'Resmi GitHub Sayfası' : 'View on GitHub'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            {isTr ? 'Kapat' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
