"use client";

import { useEffect } from "react";

export default function ConsoleSecurity() {
  useEffect(() => {
    // 1. Prominent Self-XSS Warning Banner in Browser Console
    const bannerTitle = "color: #ef4444; font-size: 36px; font-weight: 900; -webkit-text-stroke: 1px black;";
    const bannerWarning = "color: #f59e0b; font-size: 14px; font-weight: bold; line-height: 1.5;";
    const bannerInfo = "color: #06b6d4; font-size: 12px; font-family: monospace;";

    console.log("%c⛔ STOP!", bannerTitle);
    console.log(
      "%cThis is a browser feature intended for developers.\nIf someone told you to copy and paste something here to 'hack' or modify this site, it is a scam (Self-XSS attack).\n\nDo NOT execute code you do not understand.",
      bannerWarning
    );
    console.log(
      "%c[SECURITY ACTIVE] Omshree Parida Portfolio • CSP, Anti-CSRF & Input Sanitization Enforced.",
      bannerInfo
    );

    // 2. Production Console Tamper Defense
    if (process.env.NODE_ENV === "production") {
      try {
        // Suppress debug and info outputs in production to prevent data inspection
        const noop = () => {};
        window.console.log = noop;
        window.console.debug = noop;
        window.console.info = noop;
        window.console.table = noop;

        // Prevent common prototype pollution
        Object.freeze(Object.prototype);
      } catch {
        // Silently continue if environment restricts freeze
      }
    }
  }, []);

  return null;
}
