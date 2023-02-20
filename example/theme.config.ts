import montserratMetrics from "@capsizecss/metrics/montserrat";
import robotoMetrics from "@capsizecss/metrics/roboto";

import {
  createButtonVariantOverrides,
  createDefaults,
  createTextVariants,
  createTheme,
  createThemeColors,
  createThemeConfig,
  transparentize,
} from "lightbase-rn-design-system";

const componentDefaults = createDefaults({
  Button: {
    height: 44,
    variant: "solid",
    textVariant: "button",
    themeColor: "primary",
    paddingHorizontal: "24px",
    onPressAnimatedScale: 1,
    borderWidth: 0,
    borderRadius: "button",
  },
  Text: { variant: "paragraph", color: "text-base" },
  Screen: {
    paddingHorizontal: "16px",
    paddingVertical: "40px",
    backgroundColor: "canvas-base",
  },
});

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  "azure.500": "#007BFF",
  "azure.300": "#A5CBF1",
  "azure.100": "#DDE9F6",
  "bitterLemon.500": "#CAD400",
  "bitterLemon.100": "#ECEEC4",
  "russianViolet.500": "#1E0F49",
  "russianViolet.400": "#534874",
  "russianViolet.300": "#786F92",
  "russianViolet.100": "#BCB7C8",
  "mediumPersianBlue.600": "#204D8D",
  "mediumPersianBlue.500": "#005BA2",
  "neutral.600": "#4A5568",
  "neutral.500": "#718096",
  "neutral.400": "#A0AEC0",
  "neutral.300": "#CED4DA",
  "neutral.200": "#EDECF0",
  "neutral.100": "#F0F2F6",
  "ueRed.700": "#B20000",
  "ueRed.500": "#FF0000",
  "ueRed.100": "#F6E7E7",
  "northTexasGreen.500": "#079228",
  "northTexasGreen.100": "#E4EEE7",
};

export type ThemeColors = typeof themeColors;
export const themeColors = createThemeColors({
  light: {
    // General
    primary: colors["azure.500"],
    primaryLight: colors["azure.100"],
    accent: colors["bitterLemon.500"],
    divider: colors["neutral.200"],
    backdrop: transparentize(colors["russianViolet.400"], 0.75),

    // bottom navigation
    "bottom-nav-border": colors["neutral.200"],
    "bottom-nav-background": colors.white,
    "bottom-nav-active": colors["azure.500"],
    "bottom-nav-inactive": colors["neutral.500"],

    // Canvas
    "canvas-base": colors["neutral.100"],
    "canvas-card": colors.white,

    // Text
    "text-base": colors["russianViolet.500"],
    "text-contrast": colors.white,
    "text-secondary": colors["neutral.500"],
    "text-disabled": colors["neutral.300"],
    "text-link": colors["azure.500"],
    "text-error": colors["ueRed.700"],
    "text-success": colors["northTexasGreen.500"],

    // Input
    "input-border": colors["neutral.300"],
    "input-border-focused": colors["russianViolet.500"],
    "input-border-error": colors["ueRed.500"],
    "input-background": colors.white,
    "input-background-disabled": colors["ueRed.500"],

    // Select Input
    "select-input-background-focused": colors["azure.100"],
    "select-input-border-focused": colors["azure.500"],
    "select-input-button-focused": transparentize(colors["azure.100"], 0),

    // Primary button
    "primary-button-background": colors["azure.500"],
    "primary-button-background-focused": colors["mediumPersianBlue.500"],
    "primary-button-background-disabled": colors["neutral.300"],
    "primary-button-border": colors["mediumPersianBlue.500"],
    "primary-button-border-disabled": colors["neutral.300"],

    // Secondary button
    "secondary-button-background": colors.white,
    "secondary-button-border": colors["neutral.300"],

    icon: colors["russianViolet.300"],
    negative: colors["ueRed.500"],
  },
  // dark: {},
});

export type ThemeConfig = typeof themeConfig;
const themeConfig = createThemeConfig({
  spacing: {
    "0px": 0,
    "5px": 5,
    "8px": 8,
    "9px": 9,
    "12px": 10,
    "16px": 16,
    "18px": 18,
    "20px": 20,
    "22px": 22,
    "24px": 24,
    "28px": 28,
    "32px": 32,
    "40px": 40,
    "48px": 48,
    "60px": 60,
  },
  radius: {
    "0px": 0,
    "4px": 4,
    "5px": 5,
    button: 8,
    "10px": 10,
    full: 9999,
  },
  typography: {
    fontConfig: {
      Montserrat: {
        hairline: { normal: "Montserrat-Thin", italic: "Montserrat-ThinItalic" },
        thin: { normal: "Montserrat-ExtraLight", italic: "Montserrat-ExtraLightItalic" },
        light: { normal: "Montserrat-Light", italic: "Montserrat-LightItalic" },
        normal: { normal: "Montserrat-Regular", italic: "Montserrat-RegularItalic" },
        medium: { normal: "Montserrat-Medium", italic: "Montserrat-MediumItalic" },
        semibold: { normal: "Montserrat-SemiBold", italic: "Montserrat-SemiBoldItalic" },
        bold: { normal: "Montserrat-Bold", italic: "Montserrat-BoldItalic" },
        heavy: { normal: "Montserrat-ExtraBold", italic: "Montserrat-ExtraBoldItalic" },
        black: { normal: "Montserrat-Black", italic: "Montserrat-BlackItalic" },
      },
      Roboto: {
        hairline: { normal: "Roboto-Thin", italic: "Roboto-ThinItalic" },
        light: { normal: "Roboto-Light", italic: "Roboto-LightItalic" },
        normal: { normal: "Roboto-Regular", italic: "Roboto-RegularItalic" },
        medium: { normal: "Roboto-Medium", italic: "Roboto-MediumItalic" },
        bold: { normal: "Roboto-Bold", italic: "Roboto-BoldItalic" },
        black: { normal: "Roboto-Black", italic: "Roboto-BlackItalic" },
      },
    },
    fontMetrics: {
      Montserrat: montserratMetrics,
      Roboto: robotoMetrics,
    },
    sizes: {
      "32px": { fontSize: 32, lineHeight: 36 },
      "28px": { fontSize: 28, lineHeight: 34 },
      "24px": { fontSize: 24, lineHeight: 28 },
      "20px": { fontSize: 20, lineHeight: 24 },
      "18px": { fontSize: 18, lineHeight: 16 },
      "16px": { fontSize: 16, lineHeight: 24 },
      "17px": { fontSize: 17, lineHeight: 22 },
      "15px": { fontSize: 15, lineHeight: 18 },
      "13px": { fontSize: 13, lineHeight: 17 },
      "12px": { fontSize: 12, lineHeight: 16 },
    },
  },
});

export type ButtonVariants = typeof buttonVariants;
const buttonVariants = createButtonVariantOverrides({
  link: { paddingVertical: "5px", textVariant: "paragraph", textColor: "text-link" },
  icon: {
    width: undefined,
    height: undefined,
    paddingHorizontal: "5px",
    paddingVertical: "5px",
    borderRadius: "full",
  },
});

export type TextVariants = typeof textVariant;
export const textVariant = createTextVariants({
  title: { size: "28px", family: "Montserrat", weight: "bold", color: "text-base" },
  h1: { size: "24px", family: "Montserrat", weight: "bold", color: "text-base" },
  h2: { size: "20px", family: "Montserrat", weight: "bold", color: "text-base" },
  header: { size: "17px", family: "Montserrat", weight: "bold", color: "text-base" },
  paragraph: { size: "15px", family: "Montserrat", weight: "normal", color: "text-base" },
  input: { size: "15px", family: "Montserrat", weight: "medium", color: "text-base" },
  label: { size: "15px", family: "Montserrat", weight: "bold", color: "text-base" },
  button: { size: "16px", family: "Montserrat", weight: "bold", color: "text-contrast" },
  buttonLight: { size: "16px", family: "Montserrat", weight: "normal", color: "text-base" },
  hint: { size: "13px", family: "Roboto", weight: "normal", color: "text-secondary" },
  link: { size: "16px", family: "Montserrat", weight: "normal", color: "text-link" },
  bottomNavItem: { size: "12px", family: "Roboto", weight: "medium", color: "text-base" },
});

export type CustomTheme = typeof customTheme;
export const customTheme = createTheme({
  defaults: componentDefaults,
  colors: themeColors,
  config: themeConfig,
  variants: { Text: textVariant, Button: buttonVariants },
});

declare global {
  namespace LBDesignSystem {
    interface LBTextVariants extends TextVariants {}
    interface LBThemeConfig extends ThemeConfig {}
    interface LBThemeColors extends ThemeColors {}
    interface LBTheme extends CustomTheme {}
  }
}
