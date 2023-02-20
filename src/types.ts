import type { FontMetrics } from "@capsizecss/core";
import type { ButtonProps, Variants } from "components/Button";
import type { ScreenBaseProps } from "components/Screen";
import type { TextProps } from "components/Text";
import type { BoxProps } from "primitives/Box/Box";
import type { ViewStyle } from "react-native";
import type { ButtonVariantProps } from "tools/getButtonVariants";

export type TextVariants = LBDesignSystem.LBTextVariants extends CreateTextVariantsExtends
  ? LBDesignSystem.LBTextVariants
  : CreateTextVariantsExtends;

export type ThemeConfig = LBDesignSystem.LBThemeConfig extends CreateThemeConfigExtends
  ? LBDesignSystem.LBThemeConfig
  : CreateThemeConfigExtends;

export type ThemeColors = LBDesignSystem.LBThemeColors extends CreateThemeColors<string>
  ? LBDesignSystem.LBThemeColors
  : CreateThemeColors<string>;

export type Theme = LBDesignSystem.LBTheme extends CreateThemeExtends
  ? LBDesignSystem.LBTheme
  : CreateThemeExtends;

declare global {
  namespace LBDesignSystem {
    interface LBTextVariants {}
    interface LBThemeConfig {}
    interface LBThemeColors {}
    interface LBTheme {}
  }
}

export type CreateThemeConfigExtends = {
  spacing: Record<string, number>;
  radius: Record<string, number>;
  typography: {
    sizes: Record<string, { fontSize: number; lineHeight: number }>;
    fontMetrics: Record<string, FontMetrics | undefined>;
    fontConfig: Record<string, Partial<Record<FontWeights, { normal: string; italic?: string }>>>;
  };
};
export interface CreateThemeExtends {
  defaults: CreateDefaultsExtends;
  colors: CreateThemeColors<string>;
  config: CreateThemeConfigExtends;
  variants: { Text: CreateTextVariantsExtends; Button: Partial<ButtonVariantProps> };
}

export type CreateDefaultsExtends = {
  Button: DefaultButton;
  Text: Omit<TextProps, "children" | "variants"> & { variant: NonNullable<TextProps["variant"]> };
  Screen: Omit<BoxProps, "backgroundColor"> & { backgroundColor: ColorThemeKeys } & ScreenBaseProps;
};

export type CreateTextVariantsExtends = Record<
  string,
  FontTypesAndWeights & { size: FontSizes; color: ColorThemeKeys }
>;

export type ThemeColorConfig<K extends string> = Record<K, string>;
export type CreateThemeColors<K extends string> = {
  dark?: Partial<ThemeColorConfig<K>>;
  light: ThemeColorConfig<K>;
};

export type DefaultButton = Omit<ButtonProps, "children" | "variants" | "themecolor"> & {
  variant: Variants;
  themeColor: ColorThemeKeys;
  textVariant: TextProps["variant"];
};

export type ColorStyles =
  | "backgroundColor"
  | "borderBottomColor"
  | "borderColor"
  | "borderLeftColor"
  | "borderRightColor"
  | "borderTopColor";

export type RadiusStyles =
  | "borderBottomLeftRadius"
  | "borderBottomRadius"
  | "borderBottomRightRadius"
  | "borderLeftRadius"
  | "borderRadius"
  | "borderRightRadius"
  | "borderTopLeftRadius"
  | "borderTopRadius"
  | "borderTopRightRadius";

export type PaddingStyles =
  | "padding"
  | "paddingBottom"
  | "paddingHorizontal"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingVertical";

export type MarginStyles =
  | "margin"
  | "marginBottom"
  | "marginHorizontal"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "marginVertical";

export type BorderStyles =
  | "borderBottomColor"
  | "borderBottomWidth"
  | "borderColor"
  | "borderLeftColor"
  | "borderLeftWidth"
  | "borderRightColor"
  | "borderRightWidth"
  | "borderTopColor"
  | "borderTopWidth";

export type SpacingStyles = PaddingStyles | MarginStyles;

export type FontWeights =
  | "hairline"
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy"
  | "black";

export type SpaceKey = keyof ThemeConfig["spacing"];
export type Spacing = SpaceKey | { custom: ViewStyle["margin"] } | undefined;
export type NegativeSpace = `-${SpaceKey}` | { custom: ViewStyle["margin"] } | undefined;

export type ColorConfig = ThemeColors["light"];

export type ColorThemeKeys = keyof ColorConfig | { custom: string };
export type Radius = keyof ThemeConfig["radius"] | { custom: number };
export type FontSizes = keyof ThemeConfig["typography"]["sizes"];
export type FontType = keyof ThemeConfig["typography"]["fontConfig"];

type FontConfig = Record<FontType, Partial<Record<FontWeights, { normal: string; italic?: string }>>>;
type Sizes = Record<FontSizes, { fontSize: number; lineHeight: number | undefined }>;
type Metrics = Record<FontType, FontMetrics | undefined>;

export type TypographyConfig = {
  fontMetrics: Metrics;
  fontConfig: FontConfig;
  sizes: Sizes;
};

export type FontSpecificWeights = ThemeConfig["typography"]["fontConfig"];

export type FontTypes<T extends string = never, S extends any = never> = T extends FontType
  ? S extends keyof FontSpecificWeights[T]
    ? { family: T; weight: S }
    : never
  : never;

export type FontTypesAndWeights = {
  [T in FontType]: FontTypes<T, keyof FontSpecificWeights[T]>;
}[FontType];

export type FontVariants<T extends string = never, S extends any = never> = T extends keyof TextVariants
  ? S extends keyof FontSpecificWeights[TextVariants[T]["family"]]
    ? { variant: T; weight?: S }
    : never
  : never;

export type FontVariantsAndWeights = {
  [T in keyof TextVariants]: FontVariants<T, keyof FontSpecificWeights[TextVariants[T]["family"]]>;
}[keyof TextVariants];
