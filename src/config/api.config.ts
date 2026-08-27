import { Category, RepositoryConfig } from '../types/release';

export const API_CONFIG = {
  // Defaults
  DEFAULT_THEME: "dark" as const,
  DEFAULT_LANGUAGE: "en" as const,
  RELEASES_PER_REPO: 10,

  // Categorized Target Repositories (Ordered as requested)
  CATEGORIES: [
    { id: "all", nameEn: "All News", nameTr: "Bütün Haberler", iconName: "Globe" },
    { id: "frontend", nameEn: "Web & Front-End", nameTr: "Web & Ön Yüz", iconName: "Layout" },
    { id: "backend", nameEn: "Back-End & Languages", nameTr: "Arka Yüz & Diller", iconName: "Server" },
    { id: "ai", nameEn: "AI & Machine Learning", nameTr: "Yapay Zeka & ML", iconName: "Brain" },
    { id: "devops", nameEn: "DevOps & Cloud", nameTr: "DevOps & Bulut", iconName: "Cloud" },
    { id: "database_data", nameEn: "Database & Data", nameTr: "Veritabanı & Veri", iconName: "Database" },
    { id: "editors_ai", nameEn: "Editors & AI Tools", nameTr: "Editörler & AI Araçları", iconName: "Wand2" },
    { id: "security", nameEn: "Security & SecOps", nameTr: "Siber Güvenlik", iconName: "ShieldCheck" },
    { id: "game_dev", nameEn: "Game Development", nameTr: "Oyun Geliştirme", iconName: "Gamepad2" },
    { id: "systems", nameEn: "Systems & Tools", nameTr: "Sistem & Araçlar", iconName: "Terminal" }
  ] as Category[],

  REPOSITORIES: [
    // --- 1. WEB & ÖN YÜZ ---
    { 
      owner: "facebook", 
      repo: "react", 
      category: "frontend", 
      name: "React", 
      tag: "UI Library", 
      color: "#61DAFB",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    { 
      owner: "vercel", 
      repo: "next.js", 
      category: "frontend", 
      name: "Next.js", 
      tag: "React Framework", 
      color: "#000000",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
    },
    { 
      owner: "vuejs", 
      repo: "core", 
      category: "frontend", 
      name: "Vue.js", 
      tag: "Progressive Framework", 
      color: "#42B883",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
    },
    { 
      owner: "angular", 
      repo: "angular", 
      category: "frontend", 
      name: "Angular", 
      tag: "Enterprise Web Framework", 
      color: "#DD0031",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
    },
    { 
      owner: "sveltejs", 
      repo: "svelte", 
      category: "frontend", 
      name: "Svelte", 
      tag: "Reactive Web UI", 
      color: "#FF3E00",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg"
    },
    { 
      owner: "vitejs", 
      repo: "vite", 
      category: "frontend", 
      name: "Vite", 
      tag: "Next-Gen Tooling & Bundler", 
      color: "#646CFF",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
    },
    { 
      owner: "flutter", 
      repo: "flutter", 
      category: "frontend", 
      name: "Flutter", 
      tag: "Multi-Platform UI Toolkit", 
      color: "#02569B",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
    },
    { 
      owner: "facebook", 
      repo: "react-native", 
      category: "frontend", 
      name: "React Native", 
      tag: "Cross-Platform Mobile/Web", 
      color: "#61DAFB",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    { 
      owner: "microsoft", 
      repo: "playwright", 
      category: "frontend", 
      name: "Playwright", 
      tag: "End-to-End Testing", 
      color: "#2EAD33",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg"
    },
    { 
      owner: "tailwindlabs", 
      repo: "tailwindcss", 
      category: "frontend", 
      name: "Tailwind CSS", 
      tag: "Utility CSS", 
      color: "#38BDF8",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    },
    { 
      owner: "microsoft", 
      repo: "TypeScript", 
      category: "frontend", 
      name: "TypeScript", 
      tag: "Typed JavaScript", 
      color: "#3178C6",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },

    // --- 2. ARKA YÜZ & DİLLER ---
    { 
      owner: "python", 
      repo: "cpython", 
      category: "backend", 
      name: "Python", 
      tag: "General Purpose", 
      color: "#3776AB",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    },
    { 
      owner: "golang", 
      repo: "go", 
      category: "backend", 
      name: "Go", 
      tag: "High Concurrency", 
      color: "#00ADD8",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg"
    },
    { 
      owner: "rust-lang", 
      repo: "rust", 
      category: "backend", 
      name: "Rust", 
      tag: "Memory Safe Systems", 
      color: "#DEA584",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg"
    },
    { 
      owner: "fastapi", 
      repo: "fastapi", 
      category: "backend", 
      name: "FastAPI", 
      tag: "Modern Python Web API", 
      color: "#009688",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
    },
    { 
      owner: "nodejs", 
      repo: "node", 
      category: "backend", 
      name: "Node.js", 
      tag: "JS Runtime", 
      color: "#5FA04E",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    { 
      owner: "dotnet", 
      repo: "runtime", 
      category: "backend", 
      name: ".NET", 
      tag: "Enterprise Platform", 
      color: "#512BD4",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg"
    },
    { 
      owner: "spring-projects", 
      repo: "spring-boot", 
      category: "backend", 
      name: "Spring Boot", 
      tag: "Java Framework", 
      color: "#6DB33F",
      logoUrl: "https://cdn.simpleicons.org/springboot/6DB33F"
    },

    // --- 3. YAPAY ZEKA & ML ---
    { 
      owner: "pytorch", 
      repo: "pytorch", 
      category: "ai", 
      name: "PyTorch", 
      tag: "Deep Learning", 
      color: "#EE4C2C",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"
    },
    { 
      owner: "huggingface", 
      repo: "transformers", 
      category: "ai", 
      name: "Transformers", 
      tag: "State-of-the-Art ML", 
      color: "#FFD21E",
      logoUrl: "https://cdn.simpleicons.org/huggingface/FFD21E"
    },
    { 
      owner: "ollama", 
      repo: "ollama", 
      category: "ai", 
      name: "Ollama", 
      tag: "Local LLMs", 
      color: "#FFFFFF",
      logoUrl: "https://cdn.simpleicons.org/ollama/FFFFFF"
    },
    { 
      owner: "langchain-ai", 
      repo: "langchain", 
      category: "ai", 
      name: "LangChain", 
      tag: "LLM Orchestration", 
      color: "#1C3C3C",
      logoUrl: "https://cdn.simpleicons.org/langchain/1C3C3C"
    },

    // --- 4. DEVOPS & BULUT ---
    { 
      owner: "docker", 
      repo: "cli", 
      category: "devops", 
      name: "Docker", 
      tag: "Containerization", 
      color: "#2496ED",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    },
    { 
      owner: "kubernetes", 
      repo: "kubernetes", 
      category: "devops", 
      name: "Kubernetes", 
      tag: "Container Orchestration", 
      color: "#326CE5",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
    },
    { 
      owner: "hashicorp", 
      repo: "terraform", 
      category: "devops", 
      name: "Terraform", 
      tag: "Infrastructure as Code", 
      color: "#7B42BC",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
    },
    { 
      owner: "grafana", 
      repo: "grafana", 
      category: "devops", 
      name: "Grafana", 
      tag: "Observability & Dashboards", 
      color: "#F46800",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg"
    },
    { 
      owner: "prometheus", 
      repo: "prometheus", 
      category: "devops", 
      name: "Prometheus", 
      tag: "Monitoring & Time-Series Alerting", 
      color: "#E6522C",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg"
    },
    { 
      owner: "open-telemetry", 
      repo: "opentelemetry-collector", 
      category: "devops", 
      name: "OpenTelemetry", 
      tag: "Cloud-Native Observability Standard", 
      color: "#425CC7",
      logoUrl: "https://cdn.simpleicons.org/opentelemetry/425CC7"
    },

    // --- 5. VERİTABANI & VERİ ---
    {
      owner: "postgres",
      repo: "postgres",
      category: "database_data",
      name: "PostgreSQL",
      tag: "Relational Database",
      color: "#336791",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    },
    {
      owner: "redis",
      repo: "redis",
      category: "database_data",
      name: "Redis",
      tag: "In-Memory Cache & DB",
      color: "#DC382D",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
    },
    {
      owner: "mongodb",
      repo: "mongo",
      category: "database_data",
      name: "MongoDB",
      tag: "Document Database",
      color: "#47A248",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    {
      owner: "supabase",
      repo: "supabase",
      category: "database_data",
      name: "Supabase",
      tag: "Open Source Backend",
      color: "#3ECF8E",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
    },

    // --- 6. EDİTÖRLER & AI ARAÇLARI ---
    {
      owner: "microsoft",
      repo: "vscode",
      category: "editors_ai",
      name: "VS Code",
      tag: "Code Editor",
      color: "#007ACC",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
    },
    {
      owner: "JetBrains",
      repo: "intellij-community",
      category: "editors_ai",
      name: "JetBrains IDEs",
      tag: "Polyglot IDEs",
      color: "#000000",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetbrains/jetbrains-original.svg"
    },
    {
      owner: "getcursor",
      repo: "cursor",
      category: "editors_ai",
      name: "Cursor",
      tag: "AI Code Editor",
      color: "#18181B",
      logoUrl: "https://github.com/getcursor.png"
    },
    {
      owner: "Exafunction",
      repo: "codeium",
      category: "editors_ai",
      name: "Windsurf",
      tag: "Agentic AI Editor",
      color: "#09B6A2",
      logoUrl: "https://cdn.simpleicons.org/vscodium/09B6A2"
    },
    {
      owner: "anthropics",
      repo: "claude-code",
      category: "editors_ai",
      name: "Claude Code",
      tag: "Agentic Coding CLI",
      color: "#D97706",
      logoUrl: "https://cdn.simpleicons.org/anthropic/D97706"
    },
    {
      owner: "github",
      repo: "copilot-cli",
      category: "editors_ai",
      name: "GitHub Copilot",
      tag: "AI Pair Programmer",
      color: "#18181B",
      logoUrl: "https://cdn.simpleicons.org/githubcopilot/FFFFFF"
    },
    {
      owner: "google-gemini",
      repo: "gemini-cli",
      category: "editors_ai",
      name: "Gemini CLI",
      tag: "AI Terminal Assistant",
      color: "#3B82F6",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
    },
    {
      owner: "zed-industries",
      repo: "zed",
      category: "editors_ai",
      name: "Zed",
      tag: "High-Performance Editor",
      color: "#0880FF",
      logoUrl: "https://github.com/zed-industries.png"
    },
    {
      owner: "neovim",
      repo: "neovim",
      category: "editors_ai",
      name: "Neovim",
      tag: "Extensible Vim Editor",
      color: "#57A143",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg"
    },
    {
      owner: "google",
      repo: "antigravity",
      category: "editors_ai",
      name: "Google Antigravity",
      tag: "Agentic AI IDE",
      color: "#4285F4",
      logoUrl: "/logo.png"
    },

    // --- 7. SİBER GÜVENLİK ---
    {
      owner: "aquasecurity",
      repo: "trivy",
      category: "security",
      name: "Trivy",
      tag: "Security Scanner & CVEs",
      color: "#007ACC",
      logoUrl: "https://github.com/aquasecurity.png"
    },
    {
      owner: "semgrep",
      repo: "semgrep",
      category: "security",
      name: "Semgrep",
      tag: "Static Analysis & SAST",
      color: "#13C586",
      logoUrl: "https://github.com/semgrep.png"
    },

    // --- 8. OYUN GELİŞTİRME ---
    {
      owner: "godotengine",
      repo: "godot",
      category: "game_dev",
      name: "Godot Engine",
      tag: "Open 2D/3D Game Engine",
      color: "#478CBF",
      logoUrl: "https://cdn.simpleicons.org/godotengine/478CBF"
    },
    {
      owner: "EpicGames",
      repo: "UnrealEngine",
      category: "game_dev",
      name: "Unreal Engine",
      tag: "AAA Game Engine",
      color: "#0E1128",
      logoUrl: "https://cdn.simpleicons.org/unrealengine/FFFFFF"
    },

    // --- 9. SİSTEM & ARAÇLAR ---
    { 
      owner: "oven-sh", 
      repo: "bun", 
      category: "systems", 
      name: "Bun", 
      tag: "Fast All-in-One JS", 
      color: "#FBF0DF",
      logoUrl: "https://cdn.simpleicons.org/bun/FBF0DF"
    }
  ] as RepositoryConfig[]
};
