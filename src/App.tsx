import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { CategoryId, ReleaseItem, ImportanceLevel } from './types/release';
import { API_CONFIG } from './config/api.config';
import { githubService } from './services/githubService';
import { useLanguage } from './context/LanguageContext';

// Layout Components
import { Header } from './components/layout/Header';
import { HeroBanner } from './components/layout/HeroBanner';
import { Footer } from './components/layout/Footer';

// Filter Components
import { SearchBar } from './components/filters/SearchBar';
import { CategoryTabs } from './components/filters/CategoryTabs';

// Minimalist Card Grid
import { MinimalistGrid } from './components/presets/MinimalistGrid';

// Modal
import { ReleaseDetailModal } from './components/modal/ReleaseDetailModal';
import { Inbox, Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const [releases, setReleases] = useState<ReleaseItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [selectedLevels, setSelectedLevels] = useState<ImportanceLevel[]>([]);
  const [showPreviews, setShowPreviews] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRelease, setSelectedRelease] = useState<ReleaseItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isTrRef = useRef(isTr);

  useEffect(() => {
    isTrRef.current = isTr;
  }, [isTr]);

  const loadData = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setIsRefreshing(true);
    else {
      setIsLoading(true);
      setLoadError(null);
    }

    try {
      const data = await githubService.fetchAllReleases(forceRefresh);
      setReleases(data);
    } catch (err) {
      console.error('Failed to load GitHub releases:', err);
      if (!forceRefresh) {
        setLoadError(isTrRef.current
          ? 'GitHub sürümleri şu anda yüklenemiyor. Lütfen daha sonra yeniden deneyin.'
          : 'GitHub releases could not be loaded. Please try again later.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Toggle multi-level selection
  const handleToggleLevel = (level: ImportanceLevel) => {
    setSelectedLevels(prev => {
      // If all levels are currently active (empty or all 3)
      if (prev.length === 0 || prev.length === 3) {
        return [level];
      }
      // If already active, toggle off
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      }
      // Add level
      const next = [...prev, level];
      if (next.length === 3) return [];
      return next;
    });
  };

  const handleClearLevels = () => {
    setSelectedLevels([]);
  };

  // Preview releases count
  const previewCount = useMemo(() => {
    return releases.filter(r => r.prerelease).length;
  }, [releases]);

  // Base stream: Exclude preview/pre-releases from main feed by default unless showPreviews is toggled
  const baseReleases = useMemo(() => {
    if (showPreviews) {
      return releases;
    }
    return releases.filter(r => !r.prerelease);
  }, [releases, showPreviews]);

  // Category counts calculation based on current preview mode
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: baseReleases.length,
      frontend: 0,
      backend: 0,
      ai: 0,
      devops: 0,
      database_data: 0,
      editors_ai: 0,
      security: 0,
      game_dev: 0,
      systems: 0
    };

    baseReleases.forEach(r => {
      if (counts[r.category] !== undefined) {
        counts[r.category]++;
      }
    });

    return counts;
  }, [baseReleases]);

  // Multi-filter pipeline: Category + Specific Tech + Multi-Select Importance Rating + Search Query
  const filteredReleases = useMemo(() => {
    let result = [...baseReleases];

    // 1. Broad Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(r => r.category === activeCategory);
    }

    // 2. Specific Technology Filter
    if (selectedTech !== 'all') {
      result = result.filter(r => r.repoName === selectedTech);
    }

    // 3. Multi-Select Importance Level Filter
    if (selectedLevels.length > 0 && selectedLevels.length < 3) {
      result = result.filter(r => selectedLevels.includes((r.importanceLevel || 1) as ImportanceLevel));
    }

    // 4. Keyword Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r => {
        return (
          r.title.toLowerCase().includes(q) ||
          r.repoName.toLowerCase().includes(q) ||
          r.tagName.toLowerCase().includes(q) ||
          r.summaryEn.toLowerCase().includes(q) ||
          (r.summaryTr && r.summaryTr.toLowerCase().includes(q))
        );
      });
    }

    return result;
  }, [baseReleases, activeCategory, selectedTech, selectedLevels, searchQuery]);

  const activeReposCount = useMemo(() => {
    return new Set(baseReleases.map(r => r.repoFullName)).size;
  }, [baseReleases]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      
      {/* Clean Minimalist Header */}
      <Header
        onRefresh={() => loadData(true)}
        isRefreshing={isRefreshing}
        visibleReleases={filteredReleases}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Metrics Banner */}
        <HeroBanner
          totalReleases={baseReleases.length}
          activeReposCount={activeReposCount}
          categoriesCount={API_CONFIG.CATEGORIES.length - 1}
        />

        {/* Controls: Search, Preview Toggle, Star Ratings & Category Navigation with Tech Dropdown */}
        <section className="my-6 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultsCount={filteredReleases.length}
            selectedLevels={selectedLevels}
            onToggleLevel={handleToggleLevel}
            onClearLevels={handleClearLevels}
            showPreviews={showPreviews}
            onTogglePreviews={() => setShowPreviews(prev => !prev)}
            previewCount={previewCount}
          />
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categoryCounts={categoryCounts}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            releases={baseReleases}
          />
        </section>

        {/* Minimalist Grid Stream Content */}
        <section className="mt-8 mb-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-zinc-400 mb-3" />
              <p className="text-sm font-medium text-zinc-500">
                {isTr ? 'GitHub API üzerinden sürümler yükleniyor...' : 'Fetching latest releases from GitHub...'}
              </p>
            </div>
          ) : loadError ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <Inbox className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {isTr ? 'Sürümler yüklenemedi' : 'Unable to load releases'}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{loadError}</p>
            </div>
          ) : filteredReleases.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <Inbox className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {isTr ? 'Eşleşen sürüm bulunamadı' : 'No matching releases found'}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                {isTr 
                  ? 'Arama terimlerinizi değiştirmeyi, kategori veya teknoloji filtresini sıfırlamayı deneyin.' 
                  : 'Try clearing your technology filter, adjusting search keywords, or selecting another rating.'}
              </p>
            </div>
          ) : (
            <MinimalistGrid
              releases={filteredReleases}
              onSelectRelease={(item) => setSelectedRelease(item)}
            />
          )}
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Release Detail Modal */}
      <ReleaseDetailModal
        item={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />

    </div>
  );
};
