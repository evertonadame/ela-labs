import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type JSX,
} from "react";
import { styleToObject, listeners } from "@ela-labs/core/utils";
import { useEasterEgg } from "@ela-labs/core/hooks";

type Events = "resize" | "mutation" | "mutationResize" | "scroll";

const MAX_DEPTH = 10;

type SmartSkeletonProps = {
  loading: boolean;
  keepMountOnLoading?: boolean;
  maxDepth?: number;
  debug?: boolean;
  children: React.ReactElement | React.ReactElement[];
  block?: boolean;
  mode?:
    | "performance"
    | {
        [K in Events]?: boolean;
      };
} & React.HTMLProps<HTMLDivElement>;

type SkipSmartSkeletonProps = {
  children: React.ReactNode | HTMLElement;
};

let styleCache = new WeakMap<HTMLElement, React.CSSProperties>();
const skipRegistry = new WeakSet<HTMLElement>();

function clearStyleCache() {
  styleCache = new WeakMap();
}

function markSkipSkeleton(ref: HTMLElement | null) {
  if (ref) skipRegistry.add(ref);
}

function cloneSkeletonChildren(
  node: HTMLElement,
  block?: boolean,
  depth = 0,
  maxDepth = MAX_DEPTH
): (JSX.Element | null)[] {
  if (depth > maxDepth) return [];

  const children = Array.from(node.children)
    .filter((child) => child instanceof HTMLElement)
    .map((child, i) => {
      const htmlChild = child as HTMLElement;

      if (skipRegistry.has(htmlChild)) {
        console.warn("SmartSkeleton: skipping element via ref", htmlChild);
        return null;
      }

      const styles = getComputedStyle(child);
      if (styles.display === "none") return null;

      let styleObj = styleCache.get(htmlChild);

      if (!styleObj) {
        const rect = htmlChild.getBoundingClientRect();
        styleObj = {
          ...styleToObject(styles),
          borderRadius: styles.borderRadius || "4px",
          overflow: "hidden",
          height: rect.height,
          width: rect.width,
        };
        styleCache.set(htmlChild, styleObj);
      }

      const nested = cloneSkeletonChildren(
        htmlChild,
        block,
        depth + 1,
        maxDepth
      );

      const hasVisualContent = block
        ? true
        : child.children.length === 0 || child.tagName === "IMG";

      return (
        <div
          key={i}
          aria-hidden="true"
          style={styleObj}
          className={hasVisualContent ? "skeleton-shimmer" : undefined}
        >
          {nested}
        </div>
      );
    });

  return children;
}

export function SkipSmartSkeleton({ children }: SkipSmartSkeletonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      markSkipSkeleton(ref.current);
    }
  }, []);

  return <div ref={ref}>{<>{children}</>}</div>;
}

export function SmartSkeleton({
  loading,
  children,
  mode = "performance",
  keepMountOnLoading = false,
  block = false,
  debug,
  maxDepth = MAX_DEPTH,
  ...rest
}: SmartSkeletonProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEasterEgg(contentRef.current);
  const modeRef = useRef(mode);
  const [skeletons, setSkeletons] = useState<(JSX.Element | null)[] | null>(
    null
  );
  const prevLoadingRef = useRef(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const renderSkeleton = useCallback(() => {
    if (!contentRef.current) return;
    const skeletonTree = cloneSkeletonChildren(
      contentRef.current,
      block,
      0,
      maxDepth
    );
    setSkeletons(skeletonTree);
  }, [block, maxDepth]);

  useLayoutEffect(() => {
    if (!loading || !contentRef.current) return;

    if (!prevLoadingRef.current || !skeletons) {
      renderSkeleton();
    }

    prevLoadingRef.current = loading;
  }, [block, loading, renderSkeleton, skeletons]);

  useEffect(() => {
    if (modeRef.current === "performance") return;
    if (!contentRef.current) return;
    const container = contentRef.current;

    const disposers = listeners({
      container,
      mode: modeRef.current,
      handlerOnFrame() {
        clearStyleCache();
        renderSkeleton();
      },
    });

    return () => {
      disposers.forEach((dispose) => dispose());
    };
  }, [block, modeRef, renderSkeleton]);

  if (debug) {
    console.log("props", {
      children,
      server: typeof window === "undefined",
      loading,
      modeRef,
    });
  }

  if (typeof window === "undefined") return children;

  if (!loading) return children;

  if (keepMountOnLoading || typeof modeRef.current === "object") {
    return (
      <div style={{ position: "relative" }} {...rest}>
        <div ref={contentRef}>{children}</div>
        {loading && skeletons && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
            }}
          >
            {skeletons}
          </div>
        )}
      </div>
    );
  }

  if (modeRef.current === "performance") {
    return (
      <div ref={contentRef} style={{ position: "relative" }} {...rest}>
        {loading && skeletons ? skeletons : children}
      </div>
    );
  }
}

SmartSkeleton.displayName = "SmartSkeleton";
SkipSmartSkeleton.displayName = "SkipSmartSkeleton";
