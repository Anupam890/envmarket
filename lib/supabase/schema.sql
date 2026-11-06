-- EnvMarket: Production PostgreSQL Schema for Supabase
-- Run this in your Supabase SQL Editor to initialize tables, RLS policies, and storage.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT NOT NULL,
    description TEXT NOT NULL,
    environment_count INTEGER DEFAULT 0,
    highlighted_tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Environments Table
CREATE TABLE IF NOT EXISTS public.environments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    category_slug TEXT REFERENCES public.categories(slug) ON DELETE SET NULL,
    provider_name TEXT NOT NULL,
    provider_website TEXT,
    provider_verified BOOLEAN DEFAULT FALSE,
    provider_avatar_url TEXT,
    tags TEXT[] DEFAULT '{}',
    supported_frameworks TEXT[] DEFAULT '{}',
    runtimes TEXT[] DEFAULT '{}',
    deployment_type TEXT NOT NULL,
    pricing TEXT NOT NULL,
    pricing_details TEXT,
    verified BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    popular BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    installs_count INTEGER DEFAULT 0,
    stars_count INTEGER DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 5.00,
    review_count INTEGER DEFAULT 0,
    active_sessions_count INTEGER DEFAULT 0,
    capabilities TEXT[] DEFAULT '{}',
    specs JSONB NOT NULL DEFAULT '{}'::jsonb,
    config JSONB NOT NULL DEFAULT '{}'::jsonb,
    versions JSONB NOT NULL DEFAULT '[]'::jsonb,
    github_url TEXT,
    docs_url TEXT,
    docker_image TEXT,
    supports_mcp BOOLEAN DEFAULT FALSE,
    mcp_details TEXT,
    security_badges TEXT[] DEFAULT '{}',
    is_open_source BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'pending', 'rejected', 'archived')),
    creator_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 4. Environment Collections Table
CREATE TABLE IF NOT EXISTS public.collections (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    cover_accent TEXT NOT NULL,
    environment_slugs TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    environment_id UUID REFERENCES public.environments(id) ON DELETE CASCADE,
    environment_slug TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    framework_used TEXT,
    verified_user BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. User Bookmarks / Saved Environments
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    environment_slug TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, environment_slug)
);

-- 7. Runtime Sandbox Execution Sessions (Decoupled execution layer audit)
CREATE TABLE IF NOT EXISTS public.execution_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    environment_slug TEXT NOT NULL,
    status TEXT DEFAULT 'PROVISIONING' CHECK (status IN ('PROVISIONING', 'RUNNING', 'READY', 'TERMINATED', 'FAILED')),
    ephemeral_token TEXT NOT NULL,
    connect_url TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    terminated_at TIMESTAMPTZ,
    memory_used_mb INTEGER DEFAULT 0,
    cpu_cores_allocated NUMERIC(3,1) DEFAULT 1.0,
    egress_traffic_kb INTEGER DEFAULT 0,
    audit_logs JSONB DEFAULT '[]'::jsonb
);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_sessions ENABLE ROW LEVEL SECURITY;

-- 9. Row Level Security Policies
-- Public Read for Published Environments, Categories, Collections, and Reviews
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Public can view published environments" ON public.environments FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (true);

-- Authenticated Users can submit environments
CREATE POLICY "Users can insert environments" ON public.environments FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_user_id);
CREATE POLICY "Users can update their own environments" ON public.environments FOR UPDATE TO authenticated USING (auth.uid() = creator_user_id);

-- Authenticated Users can create reviews
CREATE POLICY "Users can insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Bookmarks: Users can only see and manage their own bookmarks
CREATE POLICY "Users can view own bookmarks" ON public.user_bookmarks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON public.user_bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON public.user_bookmarks FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Execution Sessions: Users can manage their own sandbox sessions
CREATE POLICY "Users can view own execution sessions" ON public.execution_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own execution sessions" ON public.execution_sessions FOR ALL TO authenticated USING (auth.uid() = user_id);

-- 10. Supabase Storage Setup (Buckets for Logos and Screenshots)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('environment-logos', 'environment-logos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('environment-screenshots', 'environment-screenshots', true)
ON CONFLICT (id) DO NOTHING;

