import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CategoryId, ReleaseItem } from '../../types/release';
import { API_CONFIG } from '../../config/api.config';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Globe, 
  Smartphone, 
  Layout, 
  Server, 
  Brain, 
  Cloud, 
  Terminal,
  SlidersHorizontal,
  Check,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Wand2,
  Database,
  Gamepad2,
  ShieldCheck
} from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  categoryCounts: Record<CategoryId, number>;
  selectedTech: string;
  onSelectTech: (techName: string) => void;
  releases: ReleaseItem[];
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  selectedTech,
  onSelectTech,
  releases
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const categories = API_CONFIG.CATEGORIES;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techSearch, setTechSearch] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-3.5 h-3.5" />;
      case 'Wand2': return <Wand2 className="w-3.5 h-3.5" />;
      case 'Database': return <Database className="w-3.5 h-3.5" />;
      case 'Gamepad2': return <Gamepad2 className="w-3.5 h-3.5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'Smartphone': return <Smartphone className="w-3.5 h-3.5" />;
      case 'Layout': return <Layout className="w-3.5 h-3.5" />;
      case 'Server': return <Server className="w-3.5 h-3.5" />;
      case 'Brain': return <Brain className="w-3.5 h-3.5" />;
      case 'Cloud': return <Cloud className="w-3.5 h-3.5" />;
      case 'Terminal': return <Terminal className="w-3.5 h-3.5" />;
      default: return <Globe className="w-3.5 h-3.5" />;
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // 1. Get only releases matching the current category
  const categoryReleases = useMemo(() => {
    if (activeCategory === 'all') return releases;
    return releases.filter(r => r.category === activeCategory);
  }, [releases, activeCategory]);

  // 2. Extract uniquely available technologies in this category with counts & logos
  const availableTechs = useMemo(() => {
    const techMap = new Map<string, { name: string; logoUrl?: string; count: number; tag: string }>();

    categoryReleases.forEach((r) => {
      const existing = techMap.get(r.repoName);
      if (existing) {
        existing.count += 1;
      } else {
        techMap.set(r.repoName, {
          name: r.repoName,
          logoUrl: r.logoUrl,
          count: 1,
          tag: r.tag || 'Tool'
        });
      }
    });

    if (techMap.size === 0) {
      const repos = activeCategory === 'all' 
        ? API_CONFIG.REPOSITORIES 
        : API_CONFIG.REPOSITORIES.filter(r => r.category === activeCategory);
      repos.forEach(repo => {
        techMap.set(repo.name, {
          name: repo.name,
          logoUrl: repo.logoUrl,
          count: 0,
          tag: repo.tag
        });
      });
    }

    return Array.from(techMap.values());
  }, [categoryReleases, activeCategory, releases]);

  const filteredTechs = availableTechs.filter(t => 
    t.name.toLowerCase().includes(techSearch.toLowerCase()) ||
    t.tag.toLowerCase().includes(techSearch.toLowerCase())
  );

  const activeTechObj = availableTechs.find(t => t.name === selectedTech);

  return (
    <>
      <div className="relative w-full flex items-center gap-1.5">
        
        {/* Left Scroll Chevron */}
        <button
          onClick={() => handleScroll('left')}
          className="hidden sm:flex p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 shrink-0 transition-colors"
          title="Sola Kaydır"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Unified Scrollable Container: Select Tech + All Categories */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="category-scroll flex items-center gap-1.5 overflow-x-auto pb-2 pt-0.5 px-0.5 scroll-smooth flex-1 min-w-0"
          aria-label="Filter Categories and Technologies"
        >
          
          {/* 1. Technology Filter Button Trigger */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setTechSearch('');
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border shrink-0 ${
                selectedTech !== 'all'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200/80 dark:border-zinc-800'
              }`}
              title={isTr ? 'Mevcut haberlerdeki dilleri ve teknolojileri filtrele' : 'Filter by active technology'}
            >
              {activeTechObj?.logoUrl ? (
                <img
                  src={activeTechObj.logoUrl}
                  alt={activeTechObj.name}
                  className="w-3.5 h-3.5 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              )}

              <span>
                {selectedTech === 'all'
                  ? isTr
                    ? `Teknoloji Seç (${availableTechs.length})`
                    : `Select Tech (${availableTechs.length})`
                  : selectedTech}
              </span>
            </button>

            {/* Quick Clear "X" button when a specific tech is active */}
            {selectedTech !== 'all' && (
              <button
                onClick={() => onSelectTech('all')}
                className="p-2 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors shrink-0"
                title={isTr ? 'Teknoloji filtresini sıfırla' : 'Reset technology filter'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 2. All Category Tabs */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            const name = isTr ? cat.nameTr : cat.nameEn;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onSelectTech('all'); // Reset tech filter on category switch
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border shrink-0 ${
                  isActive
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200/80 dark:border-zinc-800'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-950'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

        </div>

        {/* Right Scroll Chevron */}
        <button
          onClick={() => handleScroll('right')}
          className="hidden sm:flex p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 shrink-0 transition-colors"
          title="Sağa Kaydır"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* 3. Dedicated Clean Modal Palette */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity duration-200"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/70">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {isTr ? 'Teknoloji / Dil Filtrele' : 'Filter by Technology / Language'}
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {isTr 
                        ? `${availableTechs.length} aktif dil, veritabanı, motor veya araç bulundu` 
                        : `${availableTechs.length} active technologies in this category`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar in Modal */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={techSearch}
                  onChange={(e) => setTechSearch(e.target.value)}
                  placeholder={isTr ? 'Teknoloji, veritabanı veya araç ara (örn. PostgreSQL, Godot, Trivy)...' : 'Search technology (e.g. PostgreSQL, Godot, Trivy)...'}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  autoFocus
                />
              </div>
            </div>

            {/* Modal Body: Technology Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              
              {/* Option: "All Technologies in this Category" */}
              <button
                onClick={() => {
                  onSelectTech('all');
                  setIsModalOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors border ${
                  selectedTech === 'all'
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4" />
                  <span>{isTr ? 'Tüm Teknolojileri Göster (Filtreyi Sıfırla)' : 'Show All Technologies (Reset Filter)'}</span>
                </div>
                {selectedTech === 'all' && <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />}
              </button>

              {/* Grid of Available Technologies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {filteredTechs.map((tech) => {
                  const isSelected = selectedTech === tech.name;

                  return (
                    <button
                      key={tech.name}
                      onClick={() => {
                        onSelectTech(tech.name);
                        setIsModalOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs transition-all border ${
                        isSelected
                          ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-900 dark:text-brand-100 border-brand-300 dark:border-brand-700 shadow-sm'
                          : 'bg-white dark:bg-zinc-800/40 text-zinc-800 dark:text-zinc-200 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-zinc-700/60">
                          {tech.logoUrl ? (
                            <img
                              src={tech.logoUrl}
                              alt={tech.name}
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Terminal className="w-4 h-4 text-zinc-400" />
                          )}
                        </div>

                        <div className="text-left min-w-0">
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{tech.name}</div>
                          <div className="text-[10px] text-zinc-400 truncate">{tech.tag}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700/80">
                          {tech.count}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredTechs.length === 0 && (
                <div className="py-12 text-center text-xs text-zinc-400">
                  {isTr ? 'Aramanızla eşleşen teknoloji veya araç bulunamadı.' : 'No tool matches your search.'}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-3 px-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                {isTr ? 'Kapat' : 'Close'}
              </button>
            </div>

          </div>

        </div>
      )}
    </>
  );
};
