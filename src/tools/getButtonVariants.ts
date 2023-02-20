import tinycolor from "@ctrl/tinycolor";
import type { ColorThemeKeys, DefaultButton } from "types";
import type { ButtonProps, Variants } from "components/Button";
import type { TextProps } from "components/Text";
import { merge } from "lodash";

export type ButtonVariants = "solid" | "soft" | "outline" | "link" | "icon" | "unstyled";

export type ButtonVariantProps = Record<
  ButtonVariants,
  Partial<ButtonProps> & {
    backgroundColor?: ColorThemeKeys;
    borderColor?: ColorThemeKeys;
    textVariant?: TextProps["variant"];
  }
>;

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
      backgroundColor: {
        custom: tinycolor(resolveThemeColor(themeColor)).tint(85).toHexString(),
      },
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
  const defaults = merge({}, defaultProps, variants[variant]);
  return merge({}, defaults, overrides[variant]);
}
