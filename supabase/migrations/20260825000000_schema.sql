CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE repo_visibility AS ENUM ('public', 'private');

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    category TEXT NOT NULL,
    status project_status DEFAULT 'draft' NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    thumbnail_url TEXT NOT NULL,
    hero_image_url TEXT NOT NULL,
    live_url TEXT,
    source_url TEXT,
    repository_visibility repo_visibility DEFAULT 'public' NOT NULL,
    problem_statement TEXT NOT NULL,
    solution_statement TEXT NOT NULL,
    outcome_statement TEXT NOT NULL,
    architecture_overview TEXT NOT NULL,
    challenges_lessons TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public users can view published projects" 
    ON public.projects FOR SELECT USING (status = 'published');

CREATE POLICY "Admins full access" 
    ON public.projects FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);