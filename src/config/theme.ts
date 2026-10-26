import type { CSSProperties } from "react";

/**
 * ALL designer-provided sizes live here (values are px).
 * Change a number -> every card updates. For a single card, use `sizes`
 * in dashboard.config.ts instead.
 */
export interface CardSizes {
  width: number;
  minHeight: number;
  padding: number;
  radius: number;
  iconBox: number;
  titleSize: number;
  valueSize: number;
  deltaSize: number;
  captionSize: number;
  rowHeight: number;
  rowGap: number;
}

export const dashboardTheme = {
  gridGap: 20,
  cardSizes: {
    width: 128,
    minHeight: 320,
    padding: 10,
    radius: 16,
    iconBox: 28,
    titleSize: 12,
    valueSize: 28,
    deltaSize: 11,
    captionSize: 10,
    rowHeight: 22,
    rowGap: 8,
  } satisfies CardSizes,
} as const;

export function sizesToCssVars(sizes: CardSizes): CSSProperties {
  return {
    "--card-w": `${sizes.width}px`,
    "--card-h": `${sizes.minHeight}px`,
    "--card-p": `${sizes.padding}px`,
    "--card-r": `${sizes.radius}px`,
    "--icon-box": `${sizes.iconBox}px`,
    "--card-title": `${sizes.titleSize}px`,
    "--card-value": `${sizes.valueSize}px`,
    "--card-delta": `${sizes.deltaSize}px`,
    "--card-caption": `${sizes.captionSize}px`,
    "--row-h": `${sizes.rowHeight}px`,
    "--row-gap": `${sizes.rowGap}px`,
  } as CSSProperties;
}
