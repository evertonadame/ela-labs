import { useEffect } from "react";
import { binary } from "../constants/easter-egg";

export function useEasterEgg(container: HTMLElement | null) {
  useEffect(() => {
    if (!container) return;

    const span = document.createElement("span");
    span.textContent = binary;
    span.style.opacity = "0";
    span.style.position = "absolute";
    span.style.pointerEvents = "none";
    span.style.userSelect = "none";
    span.setAttribute("data-easteregg", "true");

    container.appendChild(span);

    return () => {
      container.removeChild(span);
    };
  }, [container]);
}
