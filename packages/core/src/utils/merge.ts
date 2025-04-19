import merge from "classnames";

export function mergeClassName(
  ...classNames: (string | undefined | null)[]
): string {
  return merge(classNames);
}
