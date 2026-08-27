import React, { useEffect, useState } from 'react';
import { ReleaseItem } from '../../types/release';
import { useLanguage } from '../../context/LanguageContext';
import { formatDate } from '../../utils/dateUtils';
import { renderMarkdownToHtml } from '../../utils/markdownParser';
import { geminiService } from '../../services/geminiService';
import { StarRatingBadge } from '../common/StarRatingBadge';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  Tag, 
  Calendar, 
  Code2, 
  Copy, 
  Check, 
  Loader2,
  FileText,
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

  const [activeTab, setActiveTab] = useState<'changelog' | 'code'>('changelog');
  const [codeSnippet, setCodeSnippet] = useState<string | null>(null);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setActiveTab('changelog');
      setCodeSnippet(null);
      setIsGeneratingCode(false);
      setIsCopied(false);
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

  const handleGenerateCode = async () => {
    setActiveTab('code');
    if (codeSnippet) return;

    setIsGeneratingCode(true);
    try {
      const snippet = await geminiService.generateCodeSnippet(item, language);
      setCodeSnippet(snippet);
    } catch (err) {
      console.error('Failed to generate code snippet:', err);
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleCopyCode = async () => {
    if (!codeSnippet) return;
    const cleanCode = codeSnippet.replace(/```[a-z]*\n?/gi, '').replace(/```$/gi, '').trim();
    try {
      await navigator.clipboard.writeText(cleanCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code snippet:', err);
    }
  };

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

        {/* Action Bar / Tabs */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('changelog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'changelog'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isTr ? 'Sürüm Notları (Changelog)' : 'Release Changelog'}</span>
            </button>

            <button
              onClick={handleGenerateCode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'code'
                  ? 'bg-white dark:bg-zinc-800 text-brand-600 dark:text-brand-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-brand-500" />
              <span>{isTr ? '⚡ AI Kod / Geçiş Örneği' : '⚡ AI Code Snippet'}</span>
            </button>
          </div>

          {activeTab === 'code' && codeSnippet && (
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isTr ? 'Kopyalandı' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isTr ? 'Kodu Kopyala' : 'Copy Code'}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* TAB 1: CHANGELOG VIEW */}
          {activeTab === 'changelog' && (
            <>
              {/* Structured AI Overview Box: Ne Değişti + Geliştiriciye Etkisi */}
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
            </>
          )}

          {/* TAB 2: AI CODE SNIPPET VIEW */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isTr ? 'Gemini AI Kod & Geçiş Rehberi' : 'Gemini AI Migration & Usage Example'}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 font-mono">
                  {item.repoName} ({item.tagName})
                </span>
              </div>

              {isGeneratingCode ? (
                <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <Loader2 className="w-7 h-7 animate-spin text-brand-400 mb-3" />
                  <p className="text-sm font-medium text-zinc-200">
                    {isTr ? 'Gemini AI kod örneği hazırlıyor...' : 'Gemini AI is generating code snippet...'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {isTr ? 'Sürüm notları taranıp örnek kod inşa ediliyor.' : 'Analyzing changelog and structuring practical usage.'}
                  </p>
                </div>
              ) : codeSnippet ? (
                <div 
                  className="prose dark:prose-invert max-w-none text-sm font-mono leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(codeSnippet) }}
                />
              ) : (
                <div className="text-center py-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-dashed border-zinc-300 dark:border-zinc-700">
                  <Code2 className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <p className="text-xs text-zinc-500">
                    {isTr ? 'Bu sürüm için pratik kod örneği oluşturmak için butona tıklayın.' : 'Click to generate a practical code snippet for this release.'}
                  </p>
                  <button
                    onClick={handleGenerateCode}
                    className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isTr ? 'Örnek Kod Oluştur' : 'Generate Code Snippet'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

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

            {activeTab !== 'code' && (
              <button
                onClick={handleGenerateCode}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900/60 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-brand-500" />
                <span>{isTr ? '⚡ Kod Örneği Göster' : '⚡ Code Example'}</span>
              </button>
            )}
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
