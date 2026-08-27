import { API_CONFIG } from '../config/api.config';
import { Language, ReleaseItem } from '../types/release';

const TRANSLATION_CACHE_KEY = 'devpulse_gemini_translations_v4_impact';
const CODE_SNIPPET_CACHE_KEY = 'devpulse_gemini_snippets_v1';

export interface TranslatedData {
  translatedTitle: string;
  whatChangedTr: string;
  developerImpactTr: string;
  summaryTr: string;
  translatedBody: string;
}

class GeminiService {
  private cache: Record<string, TranslatedData> = {};
  private snippetCache: Record<string, string> = {};
  public isTranslating = false;

  constructor() {
    this.cache = this.loadCache(TRANSLATION_CACHE_KEY);
    this.snippetCache = this.loadCache(CODE_SNIPPET_CACHE_KEY);
  }

  private loadCache<T>(key: string): Record<string, T> {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  private saveCache<T>(key: string, data: Record<string, T>): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      // Storage quota safety
    }
  }

  public async translateItem(item: ReleaseItem): Promise<ReleaseItem> {
    if (!item || !item.id) return item;

    if (this.cache[item.id]) {
      const cached = this.cache[item.id];
      item.translatedTitle = cached.translatedTitle;
      item.whatChangedTr = cached.whatChangedTr;
      item.developerImpactTr = cached.developerImpactTr;
      item.summaryTr = cached.summaryTr;
      item.translatedBody = cached.translatedBody;
      return item;
    }

    const apiKey = API_CONFIG.GEMINI_API_KEY ? API_CONFIG.GEMINI_API_KEY.trim() : '';
    if (!apiKey) {
      item.whatChangedTr = item.whatChangedEn || `${item.repoName} için yeni özellikler ve optimizasyonlar yayınlandı.`;
      item.developerImpactTr = item.developerImpactTr || 'Performans artışı ve kararlılık iyileştirmesi sağlar.';
      item.summaryTr = item.whatChangedTr;
      item.translatedTitle = item.title;
      return item;
    }

    try {
      const prompt = `You are a senior software architect and technical translator.
Analyze and translate the following software release for a developer intelligence dashboard.
Translate technical details naturally to Turkish while preserving established software engineering terms (SDK, runtime, compiler, garbage collection, async, thread-safe, etc.).

Release: ${item.repoName} (${item.tagName})
Title: ${item.title}
English What Changed: ${item.whatChangedEn || item.summaryEn}
Excerpt: ${item.body ? item.body.substring(0, 1000) : ''}

Respond ONLY with a valid JSON object matching this schema:
{
  "translatedTitle": "Turkish translated title",
  "whatChangedTr": "Ne değişti? (Sürümle gelen ana teknik yenilikleri veya düzeltmeleri anlatan 1-2 net cümle)",
  "developerImpactTr": "Geliştiriciye etkisi: (Yazılımcıların iş akışına, performansa veya geçiş zorunluluğuna pratik etkisini anlatan 1 net cümle)",
  "summaryTr": "Genel kısa özet",
  "translatedBody": "Markdown formatında Türkçe detaylı çeviri"
}`;

      const endpoints = [
        `${API_CONFIG.GEMINI_API_URL}?key=${apiKey}`,
        `${API_CONFIG.GEMINI_API_FALLBACK_URL}?key=${apiKey}`
      ];

      let response: Response | null = null;
      for (const endpoint of endpoints) {
        try {
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: 'application/json'
              }
            })
          });
          if (response.ok) break;
        } catch (e) {
          // Retry next endpoint
        }
      }

      if (response && response.ok) {
        const resData = await response.json();
        const rawText = resData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          let parsed: any;
          try {
            parsed = JSON.parse(rawText);
          } catch (err) {
            const match = rawText.match(/\{[\s\S]*\}/);
            if (match) parsed = JSON.parse(match[0]);
          }

          if (parsed) {
            const finalTitle = parsed.translatedTitle || item.title || 'Yeni Sürüm';
            const whatChangedTr = parsed.whatChangedTr || parsed.summaryTr || item.whatChangedEn || '';
            const developerImpactTr = parsed.developerImpactTr || item.developerImpactTr || '';
            const finalSummary = parsed.summaryTr || whatChangedTr;
            const finalBody = parsed.translatedBody || item.body || '';

            item.translatedTitle = finalTitle;
            item.whatChangedTr = whatChangedTr;
            item.developerImpactTr = developerImpactTr;
            item.summaryTr = finalSummary;
            item.translatedBody = finalBody;

            this.cache[item.id] = {
              translatedTitle: finalTitle,
              whatChangedTr: whatChangedTr,
              developerImpactTr: developerImpactTr,
              summaryTr: finalSummary,
              translatedBody: finalBody
            };
            this.saveCache(TRANSLATION_CACHE_KEY, this.cache);
            return item;
          }
        }
      }
    } catch (err) {
      console.error(`Gemini translation error for ${item.repoName}:`, err);
    }

    item.whatChangedTr = item.whatChangedTr || `${item.repoName} için yeni özellikler ve optimizasyonlar yayınlandı.`;
    item.developerImpactTr = item.developerImpactTr || 'Performans artışı ve kararlılık iyileştirmesi sağlar.';
    item.summaryTr = item.whatChangedTr;
    item.translatedTitle = item.translatedTitle || item.title;
    return item;
  }

  public async batchTranslate(
    items: ReleaseItem[],
    onProgress?: (completed: number, total: number) => void
  ): Promise<void> {
    if (this.isTranslating) return;
    this.isTranslating = true;

    try {
      items.forEach(item => {
        const cached = this.cache[item.id];
        if (cached) {
          item.translatedTitle = cached.translatedTitle || item.translatedTitle;
          item.whatChangedTr = cached.whatChangedTr || item.whatChangedTr || null;
          item.developerImpactTr = cached.developerImpactTr || item.developerImpactTr || null;
          item.summaryTr = cached.summaryTr || item.whatChangedTr || null;
          item.translatedBody = cached.translatedBody || item.translatedBody;
        }
      });

      const untranslated = items.filter(item => !this.cache[item.id]);
      let completed = items.length - untranslated.length;
      if (onProgress) onProgress(completed, items.length);

      const batchSize = 3;
      for (let i = 0; i < untranslated.length; i += batchSize) {
        const currentBatch = untranslated.slice(i, i + batchSize);
        await Promise.all(currentBatch.map(item => this.translateItem(item)));
        completed += currentBatch.length;
        if (onProgress) onProgress(completed, items.length);
      }
    } finally {
      this.isTranslating = false;
    }
  }

  // Generate Practical Code Snippet / Migration Example with Gemini AI
  public async generateCodeSnippet(item: ReleaseItem, language: Language): Promise<string> {
    const cacheKey = `${item.id}_${language}`;
    if (this.snippetCache[cacheKey]) {
      return this.snippetCache[cacheKey];
    }

    const apiKey = API_CONFIG.GEMINI_API_KEY ? API_CONFIG.GEMINI_API_KEY.trim() : '';
    if (!apiKey) {
      return `// Code example unavailable (Missing Gemini API Key)\n// ${item.repoName} ${item.tagName}`;
    }

    const isTr = language === 'tr';
    const prompt = `You are a Principal Software Engineer specializing in ${item.repoName} and modern software architecture.
A developer is looking at the release "${item.title}" (${item.tagName}) for repository "${item.repoFullName}".

Release Summary: ${item.summaryEn}
Changelog: ${item.body ? item.body.substring(0, 1000) : ''}

Generate a concise, realistic, and practical code snippet demonstrating:
1. Either a "Before vs. After (Migration)" code example OR
2. A clean, practical code snippet showing how to use the key new feature / API in this release.

Requirements:
- Target language/framework: ${item.repoName} (${item.tag})
- Keep it concise (10-25 lines of idiomatic code).
- Add brief, helpful code comments in ${isTr ? 'Turkish (Türkçe)' : 'English'}.
- Format output in a standard Markdown code block with language identifier (e.g. \`\`\`typescript or \`\`\`rust or \`\`\`python).`;

    try {
      const endpoints = [
        `${API_CONFIG.GEMINI_API_URL}?key=${apiKey}`,
        `${API_CONFIG.GEMINI_API_FALLBACK_URL}?key=${apiKey}`
      ];

      let response: Response | null = null;
      for (const endpoint of endpoints) {
        try {
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2
              }
            })
          });
          if (response.ok) break;
        } catch (e) {
          // Retry
        }
      }

      if (response && response.ok) {
        const resData = await response.json();
        const snippetText = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (snippetText) {
          this.snippetCache[cacheKey] = snippetText;
          this.saveCache(CODE_SNIPPET_CACHE_KEY, this.snippetCache);
          return snippetText;
        }
      }
    } catch (err) {
      console.error('Gemini code snippet error:', err);
    }

    const fallbackSnippet = `// ${item.repoName} ${item.tagName} Example\n// ${item.title}\n\n// Import & use latest capabilities\nconsole.log("Updated to ${item.repoName} ${item.tagName}");`;
    return fallbackSnippet;
  }
}

export const geminiService = new GeminiService();
