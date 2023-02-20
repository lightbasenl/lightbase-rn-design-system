import type {
  CreateDefaultsExtends,
  CreateThemeColors,
  CreateThemeExtends,
  CreateTextVariantsExtends,
  CreateThemeConfigExtends,
} from "types";
import type { ButtonVariantProps } from "./getButtonVariants";

export const createButtonVariantOverrides = <T extends Partial<ButtonVariantProps>>(variants: T) => variants;
export const createTextVariants = <T extends CreateTextVariantsExtends>(variants: T) => variants;
export const createThemeColors = <K extends string>(config: CreateThemeColors<K>) => ({
  light: config.light,
  dark: { ...config.light, ...config.dark },
});

export const createThemeConfig = <T extends CreateThemeConfigExtends>(config: T) => config;
export const createDefaults = <T extends CreateDefaultsExtends>(config: T) => config;
export const createTheme = <T extends CreateThemeExtends>(config: T) => config;
