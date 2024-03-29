import tinycolor from "@ctrl/tinycolor";
import { ButtonProps, Variants } from "components/Button";
import { TextProps } from "components/Text";
import { ColorThemeKeys, DefaultButton } from "types";

import { mergeDeepRight } from "./merge";

export type ButtonVariants = "solid" | "soft" | "outline" | "link" | "icon" | "unstyled";

type ButtonVariantType = Partial<ButtonProps> & {
  backgroundColor?: ColorThemeKeys;
  borderColor?: ColorThemeKeys;
  textVariant?: TextProps["variant"];
};

export type ButtonVariantProps = Record<ButtonVariants, ButtonVariantType>;

type Props = {
  themeColor: ColorThemeKeys;
  parentBackGroundColor: string;
  resolveThemeColor: (color: ColorThemeKeys) => string;
  overrides: Partial<ButtonVariantProps>;
  defaultProps: DefaultButton;
  variant: Variants;
};
export function getButtonVariants({
  themeColor,
  parentBackGroundColor,
  resolveThemeColor,
  overrides,
  defaultProps,
  variant,
}: Props) {
  const variants: ButtonVariantProps = {
    solid: {
      backgroundColor: themeColor,
      borderColor: themeColor,
      textColor: "text-contrast",
      borderWidth: 1,
      width: "100%",
    },
    outline: {
      borderColor: themeColor,
      onPressBorderColor: themeColor,
      textColor: themeColor,
      borderWidth: 1,
      width: "100%",
    },
    soft: {
      backgroundColor: { custom: tinycolor(resolveThemeColor(themeColor)).tint(85).toHexString() },
      textColor: themeColor,
      borderWidth: 1,
      width: "100%",
    },
    link: {
      height: 30,
      textColor: themeColor,
      borderWidth: 0,
      themeColor: { custom: parentBackGroundColor },
    },
    icon: {
      backgroundColor: themeColor,
      borderColor: themeColor,
      paddingHorizontal: { custom: 0 },
      width: 30,
      height: 30,
      borderRadius: { custom: 30 },
    },
    unstyled: {
      onPressAnimatedScale: 1,
      themeColor: { custom: parentBackGroundColor },
      backgroundColor: { custom: "transparent" },
      borderRadius: { custom: 0 },
      paddingHorizontal: { custom: 0 },
      paddingVertical: { custom: 0 },
      onPressColor: { custom: "transparent" },
    },
  };
  return mergeDeepRight<Omit<ButtonVariantType, "children">>(
    defaultProps,
    variants[variant],
    overrides[variant] ?? {}
  );
}
