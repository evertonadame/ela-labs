type Events = "resize" | "mutation" | "mutationResize" | "scroll";

type Listeners = {
  mode: "performance" | { [K in Events]?: boolean };
  container: HTMLDivElement;
  handlerOnFrame: () => void;
};

export function listeners({ container, handlerOnFrame, mode }: Listeners) {
  const disposers: (() => void)[] = [];

  let frame: number | null = null;

  const recalc = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => handlerOnFrame());
  };

  if (typeof mode === "object") {
    if (mode.resize) {
      const resizeListener = () => recalc();
      window.addEventListener("resize", resizeListener);
      disposers.push(() =>
        window.removeEventListener("resize", resizeListener)
      );
    }

    if (mode.scroll) {
      const scrollListener = () => recalc();
      window.addEventListener("scroll", scrollListener, true);
      disposers.push(() =>
        window.removeEventListener("scroll", scrollListener, true)
      );
    }

    if (mode.mutation) {
      const observer = new MutationObserver(() => {
        recalc();
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      disposers.push(() => observer.disconnect());
    }

    if (mode.mutationResize) {
      const observer = new ResizeObserver((e) => {
        recalc();
      });

      observer.observe(container);

      disposers.push(() => observer.disconnect());
    }
  }

  return disposers;
}
