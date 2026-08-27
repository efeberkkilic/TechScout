# TechScout

TechScout is a React and TypeScript dashboard for following recent releases from popular software projects. It fetches release data from GitHub, organizes it by ecosystem, and optionally uses Google Gemini for Turkish translations and practical code examples.

> Türkçe dokümantasyon için [aşağıya geçin](#türkçe).

## Features

- Releases published during the last 90 days
- Stable and pre-release filtering
- Category, technology, importance, and keyword filters
- English and Turkish interface
- Light and dark themes
- Optional Gemini translations and code examples
- Five-minute browser cache for release data

## Requirements

- Node.js 18 or newer
- npm
- Optional: a GitHub personal access token for a higher API rate limit
- Optional: a Google Gemini API key for AI features

## Quick start

```bash
git clone https://github.com/efeberkkilic/TechScout.git
cd TechScout
npm install
npm run dev
```

Open the URL printed by Vite, normally <http://localhost:5173>.

The application works without API credentials. It uses GitHub's unauthenticated public API limits, while Gemini-powered features remain disabled.

## Optional environment variables

Create a local environment file only if you need authenticated GitHub requests or Gemini features.

macOS/Linux:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then fill in only the values you need:

```dotenv
VITE_GITHUB_TOKEN=
VITE_GEMINI_API_KEY=
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_GITHUB_TOKEN` | No | Raises the GitHub API rate limit for local use. |
| `VITE_GEMINI_API_KEY` | No | Enables AI translation and code-example generation. |

Environment files are ignored by Git. Never commit `.env`, `.env.local`, tokens, or API keys.

## Commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build locally
```

## Public deployment and security

For a credential-free public deployment, build the project without an environment file. Release browsing will continue to work through GitHub's unauthenticated public API, but Gemini features will be unavailable.

Variables prefixed with `VITE_` are embedded in the browser bundle. They are not secrets after a build. Do not configure a GitHub token or Gemini API key in GitHub Pages, Vercel, Netlify, or another public frontend host.

If a public deployment needs authenticated GitHub access or Gemini features, move those API requests behind a backend or serverless endpoint. Store credentials only in that server-side environment and add rate limiting before exposing the endpoint.

## Project structure

```text
src/
  components/   UI components
  config/       Repository and API endpoint configuration
  context/      Language and theme state
  services/     GitHub and Gemini clients
  types/        TypeScript types
  utils/        Date and Markdown helpers
public/         Static assets
```

## Data and privacy

Release and translation caches are stored in the browser's `localStorage`. The project does not send user data to its own server. When enabled, GitHub and Gemini requests are sent directly from the browser to those providers.

## License

No open-source license has been selected yet. A public GitHub repository is viewable, but that alone does not grant permission to reuse, modify, or redistribute the code. Add a license before presenting the project as open source.

---

## Türkçe

TechScout, popüler yazılım projelerinin güncel sürümlerini takip etmeyi sağlayan React ve TypeScript tabanlı bir geliştirici panosudur. Sürüm verilerini GitHub'dan alır, ekosistemlere göre düzenler ve isteğe bağlı olarak Türkçe çeviri ile pratik kod örnekleri için Google Gemini kullanır.

## Özellikler

- Son 90 günde yayımlanan sürümler
- Kararlı ve önizleme sürümü filtreleri
- Kategori, teknoloji, önem seviyesi ve anahtar kelime filtreleri
- Türkçe ve İngilizce arayüz
- Açık ve koyu tema
- İsteğe bağlı Gemini çevirileri ve kod örnekleri
- Sürüm verileri için beş dakikalık tarayıcı önbelleği

## Gereksinimler

- Node.js 18 veya üzeri
- npm
- İsteğe bağlı: daha yüksek API limiti için GitHub personal access token
- İsteğe bağlı: yapay zekâ özellikleri için Google Gemini API anahtarı

## Hızlı başlangıç

```bash
git clone https://github.com/efeberkkilic/TechScout.git
cd TechScout
npm install
npm run dev
```

Vite'ın terminalde gösterdiği adresi açın; bu adres normalde <http://localhost:5173> olur.

Uygulama API anahtarı olmadan çalışır. GitHub'ın kimlik doğrulamasız public API limitini kullanır; Gemini destekli özellikler ise devre dışı kalır.

## İsteğe bağlı ortam değişkenleri

Yalnızca kimlik doğrulamalı GitHub isteklerine veya Gemini özelliklerine ihtiyacınız varsa yerel bir ortam dosyası oluşturun.

macOS/Linux:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Ardından yalnızca ihtiyaç duyduğunuz değerleri doldurun:

```dotenv
VITE_GITHUB_TOKEN=
VITE_GEMINI_API_KEY=
```

| Değişken | Zorunlu | Amaç |
| --- | --- | --- |
| `VITE_GITHUB_TOKEN` | Hayır | Yerel kullanımda GitHub API istek limitini yükseltir. |
| `VITE_GEMINI_API_KEY` | Hayır | Yapay zekâ çevirilerini ve kod örneği üretimini etkinleştirir. |

Ortam dosyaları Git tarafından yok sayılır. `.env`, `.env.local`, token veya API anahtarlarını asla commit etmeyin.

## Komutlar

```bash
npm run dev      # Geliştirme sunucusunu başlatır
npm run build    # Tip kontrolü yapar ve production çıktısı oluşturur
npm run preview  # Production çıktısını yerelde önizler
```

## Public yayın ve güvenlik

Anahtarsız bir public yayın için projeyi ortam dosyası olmadan derleyin. Sürüm görüntüleme GitHub'ın kimlik doğrulamasız public API'si üzerinden çalışmaya devam eder; Gemini özellikleri kullanılamaz.

`VITE_` önekli değişkenler tarayıcı paketine gömülür. Derlemeden sonra gizli değildir. GitHub Pages, Vercel, Netlify veya başka bir public frontend servisinde GitHub token ya da Gemini API anahtarı tanımlamayın.

Public yayında kimlik doğrulamalı GitHub erişimi veya Gemini özellikleri gerekiyorsa bu API çağrılarını bir backend ya da serverless endpoint arkasına taşıyın. Anahtarları yalnızca sunucu ortamında saklayın ve endpoint'i yayımlamadan önce istek sınırlaması ekleyin.

## Proje yapısı

```text
src/
  components/   Arayüz bileşenleri
  config/       Repository ve API endpoint yapılandırması
  context/      Dil ve tema durumu
  services/     GitHub ve Gemini istemcileri
  types/        TypeScript tipleri
  utils/        Tarih ve Markdown yardımcıları
public/         Statik dosyalar
```

## Veri ve gizlilik

Sürüm ve çeviri önbellekleri tarayıcının `localStorage` alanında tutulur. Proje kendi sunucusuna kullanıcı verisi göndermez. Etkinleştirildiğinde GitHub ve Gemini istekleri tarayıcıdan doğrudan ilgili sağlayıcılara gönderilir.

## Lisans

Henüz bir açık kaynak lisansı seçilmemiştir. Bir GitHub reposunun public olması kodun yeniden kullanılması, değiştirilmesi veya dağıtılması için tek başına izin vermez. Projeyi açık kaynak olarak sunmadan önce bir lisans ekleyin.
