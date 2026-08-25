export type ProjectStatus = 'draft' | 'published' | 'archived';
export type RepoVisibility = 'public' | 'private';

export interface Project {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  category: string;
  status: ProjectStatus;
  featured: boolean;
  thumbnail_url: string;
  hero_image_url: string;
  live_url?: string;
  source_url?: string;
  repository_visibility: RepoVisibility;
  problem_statement: string;
  solution_statement: string;
  outcome_statement: string;
  architecture_overview: string;
  challenges_lessons: string;
  created_at: string;
  updated_at: string;
}