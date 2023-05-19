import { useInternalTheme } from "hooks/useInternalTheme";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { mapMarginValue, mapPaddingValues, mapValues } from "tools/mapValues";
import {
  NegativeSpace,
  Spacing,
  SpacingStyles,
  RadiusStyles,
  Radius,
  ColorStyles,
  ColorThemeKeys,
} from "types";

type BoxStyleTokens = SpacingStyles | RadiusStyles | ColorStyles | "shadow";
type ViewStyleModded = StyleProp<Omit<ViewStyle, BoxStyleTokens>>;

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

export type BoxTokens = {
  style?: ViewStyleModded;
  children?: ReactNode;
  testID?: string;
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
} & MarginValues &
  ColorValues &
  BorderRadiusValues &
  PaddingValues &
  BorderValues &
  AlignmentValues;

export function useResolveBoxTokens(props: BoxTokens) {
  const {
    backgroundColor,
    borderBottomColor,
    borderBottomLeftRadius,
    borderBottomRadius,
    borderBottomRightRadius,
    borderBottomWidth,
    borderColor,
    borderLeftColor,
    borderLeftRadius,
    borderLeftWidth,
    borderRadius,
    borderRightColor,
    borderRightRadius,
    borderRightWidth,
    borderTopColor,
    borderTopLeftRadius,
    borderTopRadius,
    borderTopRightRadius,
    borderTopWidth,
    borderWidth,

    flex,
    alignItems,
    alignSelf,
    flexDirection,
    flexWrap,
    justifyContent,

    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,

    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,

    width,
    height,

    ...rest
  } = props;

  const theme = useInternalTheme();

  const marginValues = mapMarginValue(
    {
      margin,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,
    },
    theme.config.spacing
  );

  const paddingValues = mapPaddingValues(
    {
      padding,
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
    },
    theme.config.spacing
  );

  const colorValues = mapValues(
    {
      borderColor,
      borderBottomColor,
      borderLeftColor,
      borderRightColor,
      borderTopColor,
      backgroundColor,
    },
    (value) => {
      if (typeof value === "object") {
        return value.custom;
      }
      if (typeof value === "string") {
        return theme.colors[value];
      }
    }
  );

  const borderRadiusValues = mapValues(
    {
      borderBottomLeftRadius:
        borderBottomLeftRadius ?? borderBottomRadius ?? borderLeftRadius ?? borderRadius,
      borderBottomRightRadius:
        borderBottomRightRadius ?? borderBottomRadius ?? borderRightRadius ?? borderRadius,
      borderTopLeftRadius: borderTopLeftRadius ?? borderTopRadius ?? borderLeftRadius ?? borderRadius,
      borderTopRightRadius: borderTopRightRadius ?? borderTopRadius ?? borderRightRadius ?? borderRadius,
      borderRadius,
    },
    (value) => {
      if (typeof value === "object") {
        return value.custom;
      }
      if (typeof value === "string") {
        return theme.config.radius[value];
      }
    }
  );

  return {
    tokenStyles: {
      alignItems,
      alignSelf,
      flexDirection,
      flex,
      flexWrap,
      justifyContent,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      borderTopWidth,
      borderWidth,
      width,
      height,
      ...marginValues,
      ...colorValues,
      ...borderRadiusValues,
    },
    paddingValues,
    ...rest,
  };
}
