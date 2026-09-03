"use client";

import { useEffect, useState } from "react";

export function StartupLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let pageLoaded = document.readyState === "complete";
    let readySources = 0;

    const hideWhenReady = () => {
      if (pageLoaded && readySources === 2) {
        window.setTimeout(() => setVisible(false), 250);
      }
    };

    const handleWindowLoad = () => {
      pageLoaded = true;
      hideWhenReady();
    };

    const handleContentReady = () => {
      readySources += 1;
      hideWhenReady();
    };

    if (!pageLoaded) {
      window.addEventListener("load", handleWindowLoad, { once: true });
    } else {
      handleWindowLoad();
    }
    window.addEventListener("portfolio-ready", handleContentReady, { once: true });
    window.addEventListener("blog-ready", handleContentReady, { once: true });

    const fallback = window.setTimeout(() => setVisible(false), 4000);
    return () => {
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("portfolio-ready", handleContentReady);
      window.removeEventListener("blog-ready", handleContentReady);
      window.clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="startup-loader" role="status" aria-label="Loading Azee Studios">
      <div className="startup-loader__content">
        <img src="/logo.png" alt="Azee Studios" className="startup-loader__logo" />
        <div className="startup-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}