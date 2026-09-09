"use client";

import { useEffect } from "react";

export function DisableInteraction() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLVideoElement) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none; /* iOS Safari long press */
      }
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
        -webkit-touch-callout: default;
      }
      img, video {
        -webkit-user-drag: none;
        pointer-events: auto;
      }
    `}} />
  );
}
