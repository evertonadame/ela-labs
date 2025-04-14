import React, { useLayoutEffect, useRef, useState, type JSX } from "react";
import { styleToObject } from "@ela-labs/core";

type SmartSkeletonProps = {
  loading: boolean;
  children: React.ReactElement;
  block?: boolean;
};

function cloneSkeletonChildren(
  node: HTMLElement,
  block?: boolean
): JSX.Element[] {
  const children = Array.from(node.children)
    .filter((child) => child instanceof HTMLElement)
    .map((child, i) => {
      const rect = child.getBoundingClientRect();
      const styles = getComputedStyle(child);
      const styleObj = styleToObject(styles);

      const nested = cloneSkeletonChildren(child as HTMLElement);

      const hasVisualContent = block
        ? true
        : child.children.length === 0 || child.tagName === "IMG";

      return (
        <div
          key={i}
          style={{
            ...styleObj,
            width: rect.width,
            height: rect.height,
            borderRadius: styleObj.borderRadius || 4,
            overflow: "hidden",
          }}
          className={hasVisualContent ? "skeleton-shimmer" : undefined}
        >
          {nested}
        </div>
      );
    });

  return children;
}

export function SmartSkeleton({
  loading,
  children,
  block,
}: SmartSkeletonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [skeletons, setSkeletons] = useState<JSX.Element[] | null>(null);

  useLayoutEffect(() => {
    if (!loading || !ref.current) return;

    const container = ref.current;
    const skeletonTree = cloneSkeletonChildren(container, block);
    setSkeletons(skeletonTree);
  }, [block, loading]);

  if (typeof window === "undefined") return children;

  if (!loading) return children;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {loading && skeletons ? skeletons : children}
    </div>
  );
}
