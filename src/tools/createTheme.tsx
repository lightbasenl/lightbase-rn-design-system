import type { AppThemeConfig } from "types";

import type { ButtonVariantProps } from "./getButtonVariants";

export const createButtonVariantOverrides = <T extends Partial<ButtonVariantProps>>(variants: T) => variants;
export const createTextVariants = <T extends AppThemeConfig["variants"]["Text"]>(variants: T) => variants;
export const createThemeColors = <K extends string>(config: AppThemeConfig<K>["colors"]) => ({
  light: config.light,
  dark: { ...config.light, ...config.dark },
});

export const createThemeConfig = <T extends AppThemeConfig["config"]>(config: T) => config;
export const createDefaults = <T extends AppThemeConfig["defaults"]>(config: T) => config;
export const createTheme = <T extends AppThemeConfig>(config: T) => config;
