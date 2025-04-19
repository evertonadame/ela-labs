import React, { useRef, useState, useEffect } from "react";
import { mergeClassName } from "@ela-labs/core/utils";

type SmartTextProps = {
  children: React.ReactNode;
  maxLines?: number;
  expandable?: boolean;
  readMoreLabel?: string;
  readLessLabel?: string;
  className?: string;
  childrenClassName?: string;
  expandablePlacement?: "outside-top" | "outside-bottom";
  expandableButton?:
    | React.ReactNode
    | ((props: {
        expanded: boolean;
        setExpanded: (expanded: boolean) => void;
        hasOverflow: boolean;
      }) => React.ReactNode);
  expandableClassName?: string;
};

export function SmartText({
  children,
  maxLines = 3,
  expandable = false,
  readMoreLabel = "More",
  readLessLabel = "Less",
  expandableButton,
  expandableClassName,
  expandablePlacement = "outside-bottom",
  childrenClassName,
  className,
}: SmartTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!el) return;
      setHasOverflow(el.scrollHeight > el.clientHeight + 1);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  const style: React.CSSProperties = !expanded
    ? {
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }
    : {};

  const showExpandableButton = expandable && (hasOverflow || expanded);

  const showExpandableButtonOnTop =
    showExpandableButton && expandablePlacement === "outside-top";
  const showExpandableButtonOnBottom =
    showExpandableButton && expandablePlacement === "outside-bottom";

  return (
    <div className={mergeClassName("relative", className)}>
      {showExpandableButtonOnTop &&
        (expandableButton ? (
          typeof expandableButton === "function" ? (
            expandableButton({
              expanded,
              setExpanded,
              hasOverflow,
            })
          ) : (
            expandableButton
          )
        ) : (
          <button
            className={mergeClassName("", expandableClassName)}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? readLessLabel : readMoreLabel}
          </button>
        ))}
      <div
        ref={containerRef}
        style={style}
        className={mergeClassName("", childrenClassName)}
      >
        {children}
      </div>
      {showExpandableButtonOnBottom &&
        (expandableButton ? (
          typeof expandableButton === "function" ? (
            expandableButton({
              expanded,
              setExpanded,
              hasOverflow,
            })
          ) : (
            expandableButton
          )
        ) : (
          <button
            className={mergeClassName("", expandableClassName)}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? readLessLabel : readMoreLabel}
          </button>
        ))}
    </div>
  );
}
