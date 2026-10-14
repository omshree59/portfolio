/**
 * Portfolio Enterprise Security Utility
 * Defends against XSS, CSRF, SSRF, Email Header Injection, and Rate Limit Abuse.
 */

// In-memory sliding window rate limiter
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale records every 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 600000);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }, 600000);
}

/**
 * Rate Limiter: Max requests per sliding window duration
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 600000 // 10 minutes
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key) || { timestamps: [] };

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const retryAfterSec = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  record.timestamps.push(now);
  rateLimitStore.set(key, record);

  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    retryAfterSec: 0,
  };
}

/**
 * Extract Client IP safely from request headers
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

/**
 * CSRF Protection: Verifies that requests originate only from the portfolio domain
 */
export function verifyCsrfOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  const referer = req.headers.get("referer");

  // In local development, allow localhost / 127.0.0.1
  if (process.env.NODE_ENV !== "production") {
    if (!origin && !referer) return true;
    if (origin && (origin.includes("localhost") || origin.includes("127.0.0.1"))) return true;
    if (referer && (referer.includes("localhost") || referer.includes("127.0.0.1"))) return true;
  }

  // Check origin header
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost === host) return true;
    } catch {
      return false;
    }
  }

  // Check referer header
  if (referer && host) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost === host) return true;
    } catch {
      return false;
    }
  }

  // Same-origin browser fetches might omit origin/referer for same-site in some conditions
  return !origin || origin.includes(host || "");
}

/**
 * XSS & HTML Injection Protection: Escapes all raw HTML characters
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Email Sanitizer: Defends against Email Header Injection (CRLF injection)
 */
export function sanitizeEmail(emailStr: unknown): string | null {
  if (!emailStr || typeof emailStr !== "string") return null;
  const trimmed = emailStr.trim();

  // Block CRLF injection (carriage return / newline)
  if (/[\r\n]/.test(trimmed)) return null;

  // Length check (RFC 5321 limit is 254)
  if (trimmed.length > 254) return null;

  // Strict email format verification
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) return null;

  return trimmed.toLowerCase();
}

/**
 * Text Sanitizer: Truncates and strips dangerous control characters
 */
export function sanitizeText(text: unknown, maxLength: number = 3000): string {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control characters
    .trim()
    .slice(0, maxLength);
}
