import { Language } from '../types/release';

export function formatDate(isoString: string, lang: Language): string {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return 'Recent';
    return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return 'Recent';
  }
}

export function formatTimeAgo(isoString: string, lang: Language): string {
  try {
    const now = new Date();
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return lang === 'tr' ? `${diffDays} gün önce` : `${diffDays}d ago`;
    }
    if (diffHours > 0) {
      return lang === 'tr' ? `${diffHours} saat önce` : `${diffHours}h ago`;
    }
    return lang === 'tr' ? 'Az önce' : 'Just now';
  } catch (e) {
    return '';
  }
}
