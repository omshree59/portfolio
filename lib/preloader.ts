/**
 * Non-blocking Background Asset Preloader & Local Cache Layer
 * Caches assets smoothly in the background without stealing CPU frames from animations.
 */

export const CACHE_NAME = 'omshree-portfolio-v1';
export const CACHE_STORAGE_KEY = 'omshree_portfolio_cache_active';

export const CRITICAL_ASSETS: string[] = [
  "/track.jpg",
  "/brand-icon.svg",
  "/omshree-guitar.webp",
  "/scan-pay-go.png",
  "/civic-fix-ai.png",
  "/cloud5bot.png",
  "/sign-lang-detector.png",
  "/eco.png",
  "/neural.png",
  "/timer.png",
  "/aws-academy-graduate-cloud-architecting-training-ba.webp",
  "/gemini.webp",
  "/oacle badge.webp",
  "/deloitte technology job simulation.webp",
  "/aws prompt.webp",
  "/IBM AI fundamnentals badge.webp",
  "/linkedin .webp",
  "/Jio Ai Foundations.webp",
  "/deloitte data analytics job simulation.webp",
  "/HCD ASSOCIATE.webp",
  "/HC FOUNDATION.webp",
  "/databricks ai fundamentals badge .webp",
  "/7d551976-310f-4397-a1ec-f10388701bc4.webp",
  "/databricks genai.webp",
  "/aws-academy-graduate-cloud-foundations-training-bad (3).webp",
  "/iit.webp",
  "/tcs.webp",
  "/googlecloud.webp",
  "/neo4j.webp",
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt1.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt2.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt3.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt4.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt5.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt6.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt7.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt8.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt9.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt10.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt11.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt12.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about1.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about2.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about3.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about4.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/slide1.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/slide2.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/slide3.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/slide4.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/slide5.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/slide6.webp",
  "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/slide7.webp"
];

export function checkDeviceCache(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(CACHE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Silky smooth background preloader:
 * Runs caching in the background with small batches so animations stay 60-120fps.
 */
export function startSmoothPreload() {
  if (typeof window === 'undefined') return;

  // Register service worker quietly
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .catch(() => {});
  }

  const runIdle = (task: () => void) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(task, { timeout: 1500 });
    } else {
      setTimeout(task, 300);
    }
  };

  runIdle(async () => {
    let cache: Cache | null = null;
    if ('caches' in window) {
      try {
        cache = await window.caches.open(CACHE_NAME);
      } catch {
        cache = null;
      }
    }

    // Process assets in small delayed bursts to avoid CPU thread blocking
    for (let i = 0; i < CRITICAL_ASSETS.length; i++) {
      const url = CRITICAL_ASSETS[i];
      try {
        if (cache) {
          const match = await cache.match(url);
          if (!match) {
            const resp = await fetch(url, { mode: 'cors' });
            if (resp.ok) {
              await cache.put(url, resp);
            }
          }
        }
      } catch {}

      // Slight breather every 4 assets to yield CPU time back to the browser
      if (i % 4 === 0) {
        await new Promise((r) => setTimeout(r, 40));
      }
    }

    try {
      localStorage.setItem(CACHE_STORAGE_KEY, 'true');
    } catch {}
  });
}
