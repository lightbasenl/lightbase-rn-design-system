import { FontMetrics, precomputeValues } from "@capsizecss/core";
import { PixelRatio, StyleProp, StyleSheet, TextStyle } from "react-native";

import { FontSizes, FontType, FontWeights, ThemeConfig } from "../types";

const capsize = (options: Parameters<typeof precomputeValues>[0]) => {
  const values = precomputeValues(options);
  const fontSize = parseFloat(values.fontSize);
  const baselineTrimEm = parseFloat(values.baselineTrim);
  const capHeightTrimEm = parseFloat(values.capHeightTrim);
  const fontScale = PixelRatio.getFontScale();

  return {
    fontSize,
    lineHeight: values.lineHeight !== "normal" ? parseFloat(values.lineHeight) : undefined,
    marginBottom: baselineTrimEm * fontSize * fontScale,
    marginTop: capHeightTrimEm * fontSize * fontScale,
  } as const;
};

export const createTextSize = ({
  fontMetrics,
  fontSize,
  lineHeight: leading,
}: {
  fontMetrics: FontMetrics;
  fontSize: number;
  lineHeight: number | undefined;
}) => {
  const sizes = capsize({ fontMetrics, fontSize, leading });

  return {
    ...sizes,
    marginTop: PixelRatio.roundToNearestPixel(sizes.marginTop),
    marginBottom: PixelRatio.roundToNearestPixel(sizes.marginBottom),
  } as const;
};

export const weights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900",
} as const;

type GetFontStyles = {
  italic?: boolean;
  size: FontSizes;
  weight: FontWeights;
  type: FontType;
  config: ThemeConfig;
  style: StyleProp<TextStyle>;
  ignoreTrimming?: boolean;
};

export function getFontStyles({ weight, type, size, italic, config, style, ignoreTrimming }: GetFontStyles) {
  const fontConfig = config.typography.fontConfig;
  const styles = StyleSheet.flatten(style);
  // @ts-ignore
  const fontFamily = italic ? fontConfig?.[type]?.[weight]?.italic : fontConfig?.[type]?.[weight]?.normal;
  if (!fontFamily) {
    throw new Error(`${italic ? "italic" : ""} Font type "${type}" of weight "${weight} does not exist`);
  }

  // Adjust the top and bottom margins of the text blocks using Capsize
  const metrics = config.typography.fontMetrics[type];
  const sizes = config.typography.sizes[size];

  if (ignoreTrimming) {
    // we can ignore the capsize cap trimming entirely by passing in the above flag.
    // May be useful for single line text for fonts that are rendering/positioned incorrectly
    // for single line text nodes, we will also want to ignore the custom lineheights so ensure the node is vertically centered correctly
    return { fontFamily, fontSize: sizes.fontSize };
  }
  if (metrics) {
    const Fontsizes = createTextSize({
      fontMetrics: metrics,
      fontSize: styles?.fontSize ?? config.typography?.sizes?.[size].fontSize,
      lineHeight: styles?.lineHeight ?? config.typography?.sizes?.[size].lineHeight,
    });
    return { fontFamily, ...Fontsizes };
  }
  return { fontFamily, ...sizes };
}

export function getTextDecoration({
  underline,
  strikeThrough,
}: {
  strikeThrough?: boolean;
  underline?: boolean;
}) {
  let textDecorationLine = "none" as TextStyle["textDecorationLine"];
  if (underline && strikeThrough) {
    textDecorationLine = "underline line-through";
  } else if (underline) {
    textDecorationLine = "underline";
  } else if (strikeThrough) {
    textDecorationLine = "line-through";
  }
  return textDecorationLine;
}
