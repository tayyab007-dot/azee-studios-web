"use client";

import { useEffect, useState } from "react";

export function StartupLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideLoader = () => {
      window.setTimeout(() => setVisible(false), 250);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    const fallback = window.setTimeout(() => setVisible(false), 1800);
    return () => {
      window.removeEventListener("load", hideLoader);
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