import { useInternalTheme } from "hooks/useInternalTheme";
import * as React from "react";
import { Platform, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import { getFontStyles, getTextDecoration } from "theme/typography";
import { ColorThemeKeys, FontSizes, FontTypesAndWeights, FontVariantsAndWeights } from "types";

export type TextProps = RNTextProps & {
  color?: ColorThemeKeys;
  italic?: boolean;
  textAlign?: TextStyle["textAlign"];
  underline?: boolean;
  strikeThrough?: boolean;
  animated?: boolean;
  children: React.ReactNode;
  textTransform?: TextStyle["textTransform"];
  size?: FontSizes;
  ignoreTrimming?: boolean;
  flex?: TextStyle["flex"];
} & (
    | {
        family?: never;
        variant?: FontVariantsAndWeights["variant"];
        weight?: FontVariantsAndWeights["weight"];
      }
    | ({
        variant?: never;
        family?: FontTypesAndWeights["family"];
        weight?: FontTypesAndWeights["weight"];
      } & FontTypesAndWeights)
  );

export function Text({ variant, ...props }: TextProps) {
  const { variants, colors, defaults, config } = useInternalTheme();
  const variantType = variants.Text[variant ?? defaults.Text.variant];
  const combined = { ...variantType, ...props };
  const {
    family,
    size,
    weight,
    color,
    italic,
    textAlign,
    underline,
    strikeThrough,
    children,
    style,
    animated,
    textTransform,
    ignoreTrimming,
    flex,
    ...rest
  } = combined;
  if (!size) {
    throw new Error("Font size has not been defined as a variant or prop");
  }

  const fontStyles = getFontStyles({
    weight,
    type: family,
    italic,
    size,
    config,
    style,
    ignoreTrimming,
  });

  if (!fontStyles) {
    return null;
  }
  let Component = RNText as typeof RNText;
  if (animated) {
    Component = Animated.Text as typeof RNText;
  }
  let customColor;
  if (typeof color === "object") {
    customColor = color.custom;
  }
  if (typeof color === "string") {
    customColor = colors[color];
  }

  return (
    <Component
      style={[
        {
          textTransform,
          textDecorationLine: getTextDecoration({ underline, strikeThrough }),
          textAlign,
          color: customColor,
          flex,
        },
        fontStyles,
        style,
      ]}
      allowFontScaling={false}
      {...rest}
    >
      {children}
      {/* https://github.com/facebook/react-native/issues/29232#issuecomment-889767516 */}
      {Platform.OS === "android" && "lineHeight" in fontStyles && !!fontStyles.lineHeight && (
        <RNText style={{ lineHeight: fontStyles?.lineHeight + 0.001 }} />
      )}
    </Component>
  );
}
