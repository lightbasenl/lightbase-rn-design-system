import type { FontMetrics } from "@capsizecss/core";
import type { ButtonProps, Variants } from "components/Button";
import type { ScreenBaseProps } from "components/Screen";
import type { TextProps } from "components/Text";
import type { BoxProps } from "primitives/Box/Box";
import type { ViewStyle } from "react-native";
import type { ButtonVariantProps } from "tools/getButtonVariants";

interface CustomAppThemeconfig {}
export interface AppThemeConfig<K extends string = string>
  extends Omit<CreateThemeExtends<K>, keyof CustomAppThemeconfig>,
    CustomAppThemeconfig {}

type CreateThemeConfigExtends = {
  spacing: Record<string, number>;
  radius: Record<string, number>;
  typography: {
    sizes: Record<string, { fontSize: number; lineHeight: number }>;
    fontMetrics: Record<string, FontMetrics | undefined>;
    fontConfig: Record<string, Partial<Record<FontWeights, { normal: string; italic?: string }>>>;
  };
};

type CreateThemeConfigVariants = {
  Text: Record<string, FontTypesAndWeights & { size: FontSizes; color: ColorThemeKeys }>;
  Button: Partial<ButtonVariantProps>;
};

type CreateDefaultsExtends = {
  Button: DefaultButton;
  Text: Omit<TextProps, "children" | "variants"> & { variant: NonNullable<TextProps["variant"]> };
  Screen: Omit<BoxProps, "backgroundColor"> & { backgroundColor: ColorThemeKeys } & ScreenBaseProps;
};

type ThemeColorConfig<K extends string> = Record<K, string>;
type CreateThemeColors<K extends string> = {
  dark?: Partial<ThemeColorConfig<K>>;
  light: ThemeColorConfig<K>;
};

interface CreateThemeExtends<K extends string = string> {
  defaults: CreateDefaultsExtends;
  colors: CreateThemeColors<K>;
  config: CreateThemeConfigExtends;
  variants: CreateThemeConfigVariants;
}

type TextVariants = CreateThemeExtends["variants"]["Text"];

type DefaultButton = Omit<ButtonProps, "children" | "variants" | "themecolor"> & {
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

export type SpaceKey = keyof AppThemeConfig["config"]["spacing"];
export type Spacing = SpaceKey | { custom: ViewStyle["margin"] } | undefined;
export type NegativeSpace = `-${SpaceKey}` | { custom: ViewStyle["margin"] } | undefined;

export type ColorConfig = AppThemeConfig["colors"]["light"];

export type ColorThemeKeys = keyof ColorConfig | { custom: string };
export type Radius = keyof AppThemeConfig["config"]["radius"] | { custom: number };
export type FontSizes = keyof AppThemeConfig["config"]["typography"]["sizes"];
export type FontType = keyof AppThemeConfig["config"]["typography"]["fontConfig"];

type FontConfig = Record<FontType, Partial<Record<FontWeights, { normal: string; italic?: string }>>>;
type Sizes = Record<FontSizes, { fontSize: number; lineHeight: number | undefined }>;
type Metrics = Record<FontType, FontMetrics | undefined>;

export type TypographyConfig = {
  fontMetrics: Metrics;
  fontConfig: FontConfig;
  sizes: Sizes;
};

export type FontSpecificWeights = AppThemeConfig["config"]["typography"]["fontConfig"];

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

export type MarginValues = {
  margin?: NegativeSpace;
  marginBottom?: NegativeSpace;
  marginHorizontal?: NegativeSpace;
  marginLeft?: NegativeSpace;
  marginRight?: NegativeSpace;
  marginTop?: NegativeSpace;
  marginVertical?: NegativeSpace;
};
export type ColorValues = {
  backgroundColor?: ColorThemeKeys;
  borderBottomColor?: ColorThemeKeys;
  borderColor?: ColorThemeKeys;
  borderLeftColor?: ColorThemeKeys;
  borderRightColor?: ColorThemeKeys;
  borderTopColor?: ColorThemeKeys;
};
export type BorderRadiusValues = {
  borderBottomLeftRadius?: Radius;
  borderBottomRadius?: Radius;
  borderBottomRightRadius?: Radius;
  borderLeftRadius?: Radius;
  borderRadius?: Radius;
  borderRightRadius?: Radius;
  borderTopLeftRadius?: Radius;
  borderTopRadius?: Radius;
  borderTopRightRadius?: Radius;
};
export type PaddingValues = {
  padding?: Spacing;
  paddingBottom?: Spacing;
  paddingHorizontal?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  paddingTop?: Spacing;
  paddingVertical?: Spacing;
};
export type BorderValues = {
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderTopWidth?: number;
  borderWidth?: number;
};
export type AlignmentValues = {
  flex?: number;
  alignItems?: ViewStyle["alignItems"];
  alignSelf?: ViewStyle["alignSelf"];
  flexDirection?: ViewStyle["flexDirection"];
  flexWrap?: ViewStyle["flexWrap"];
  justifyContent?: ViewStyle["justifyContent"];
};

export { BleedProps } from "./primitives/Bleed";
export { RowProps } from "./primitives/Row";
export { StackProps } from "./primitives/Stack";
export { AnimatedBoxProps } from "./primitives/Box/AnimatedBox";
export { AnimatedFlatListBoxProps } from "./primitives/Box/AnimatedFlatListBox";
export { AnimatedScrollViewBoxProps } from "./primitives/Box/AnimatedScrollViewBox";
export { BoxProps } from "./primitives/Box/Box";
export { FlatListBoxProps } from "./primitives/Box/FlatListBox";
export { SafeAreaBoxProps } from "./primitives/Box/SafeAreaBox";
export { ScrollViewBoxProps } from "./primitives/Box/ScrollViewBox";
export { SectionListBoxProps } from "./primitives/Box/SectionListBox";
export { ButtonProps } from "./components/Button";
export { TextProps } from "./components/Text";
export { ScreenProps } from "./components/Screen";
