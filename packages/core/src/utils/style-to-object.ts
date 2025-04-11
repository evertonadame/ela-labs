import React from "react";
import { IGNORE_STYLE_KEYS } from "../constants/ignore-style-key";
import { toCamelCase } from "./to-camel-case";

export function styleToObject(
  styles: CSSStyleDeclaration
): React.CSSProperties {
  const styleObj: Record<string, string> = {};

  for (let i = 0; i < styles.length; i++) {
    const key = styles[i] || "";
    const camelKey = toCamelCase(key);
    if (IGNORE_STYLE_KEYS.includes(camelKey)) continue;

    try {
      styleObj[camelKey] = styles.getPropertyValue(key);
    } catch (err) {
      console.warn(`Unsupported style: ${camelKey}`, err);
    }
  }

  return styleObj;
}
