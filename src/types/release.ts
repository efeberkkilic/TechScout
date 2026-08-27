export type CategoryId = 
  | 'all' 
  | 'frontend' 
  | 'backend' 
  | 'ai' 
  | 'devops' 
  | 'database_data'
  | 'editors_ai' 
  | 'security'
  | 'game_dev'
  | 'systems';

export type ImportanceLevel = 1 | 2 | 3;
export type ImportanceFilter = 'all' | '3' | '2' | '1';

export type Language = 'en' | 'tr';
export type Theme = 'dark' | 'light';

export interface Category {
  id: CategoryId;
  nameEn: string;
  nameTr: string;
  iconName: string;
}

export interface RepositoryConfig {
  owner: string;
  repo: string;
  category: CategoryId;
  name: string;
  tag: string;
  color?: string;
  logoUrl?: string;
}

export interface ReleaseItem {
  id: string;
  repoName: string;
  repoFullName: string;
  category: CategoryId;
  tag: string;
  color?: string;
  logoUrl?: string;
  tagName: string;
  title: string;
  body: string;
  summaryEn: string;
  summaryTr: string | null;
  whatChangedEn?: string;
  whatChangedTr?: string | null;
  developerImpactEn?: string;
  developerImpactTr?: string | null;
  translatedTitle: string | null;
  translatedBody: string | null;
  importanceLevel: 1 | 2 | 3; // 1: Patch/Routine, 2: Feature/Minor, 3: Critical/Major
  importanceReasonEn: string;
  importanceReasonTr: string | null;
  publishedAt: string;
  author: string;
  authorAvatar: string;
  htmlUrl: string;
  prerelease: boolean;
}
