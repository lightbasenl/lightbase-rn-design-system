import { useInternalTheme } from "hooks/useInternalTheme";
import React, { Fragment, ReactElement, ReactNode } from "react";
import type { ViewProps, ViewStyle } from "react-native";
import { getValidChildren } from "tools/getValidChildren";
import type { SpaceKey, Spacing } from "types";

import { Box } from "./Box/Box";

export const alignHorizontalToFlexAlign = {
  center: "center",
  justify: "space-between",
  equal: "space-evenly",
  left: "flex-start",
  right: "flex-end",
} as const;
type AlignHorizontal = keyof typeof alignHorizontalToFlexAlign;

export const alignVerticalToFlexAlign = {
  bottom: "flex-end",
  center: "center",
  top: "flex-start",
} as const;
type AlignVertical = keyof typeof alignVerticalToFlexAlign;

export type RowProps = {
  children: ReactNode;
  alignHorizontal?: AlignHorizontal;
  alignVertical?: AlignVertical;
  space?: Spacing;
  horizontalSpace?: Spacing;
  verticalSpace?: Spacing;
  testID?: ViewProps["testID"];
  flex?: ViewStyle["flex"];
  width?: ViewStyle["width"];
} & (
  | {
      separator?: undefined;
      wrap?: true;
    }
  | {
      separator?: ReactElement;
      wrap?: false;
    }
);

/**
 * @description Arranges child nodes horizontally with equal spacing between
 * them, plus an optional `separator` element. Items can optionally be aligned
 * horizontally and/or vertically with `alignHorizontal` and `alignVertical`.
 */
export function Row({
  children,
  alignHorizontal,
  alignVertical = "center",
  testID,
  flex,
  width,
  space,
  horizontalSpace: horizontalSpaceProp,
  verticalSpace: verticalSpaceProp,
  wrap,
  separator,
}: RowProps) {
  const theme = useInternalTheme();
  const validChildren = getValidChildren(children);

  const resolveToken = (value: Spacing) => {
    if (theme.config.spacing == null) {
      throw new Error("Spacing config not defiend");
    }
    if (typeof value === "object") {
      if (typeof value.custom === "string") {
        return value.custom;
      }
      if (value.custom != null) {
        return value.custom;
      }
    }
    if (typeof value !== "string") {
      return undefined;
    }
    const spacingValue = theme.config.spacing?.[value.replace("-", "") as SpaceKey];
    if (spacingValue == null) {
      return undefined;
    }
    return -1 * spacingValue;
  };

  const verticalSpace = verticalSpaceProp ?? space;
  const horizontalSpace = horizontalSpaceProp ?? space;
  return (
    <Box
      flexDirection="row"
      alignItems={alignVertical ? alignVerticalToFlexAlign[alignVertical] : undefined}
      justifyContent={alignHorizontal ? alignHorizontalToFlexAlign[alignHorizontal] : undefined}
      flexWrap={wrap ? "wrap" : undefined}
      testID={testID}
      style={{ width }}
      flex={flex}
      marginRight={wrap && horizontalSpace ? { custom: resolveToken(horizontalSpace) } : undefined}
      marginTop={wrap && verticalSpace ? { custom: resolveToken(verticalSpace) } : undefined}
    >
      {validChildren.map((child, index) => {
        const key = typeof child.key !== "undefined" ? child.key : index;
        const isLast = index + 1 === validChildren.length;
        if (wrap) {
          return (
            <Box key={key + "wrapper"} paddingRight={horizontalSpace} paddingTop={verticalSpace}>
              {child}
            </Box>
          );
        }
        return (
          <Fragment key={key + "fragment"}>
            {child}
            {!!space && !isLast && <Box paddingRight={space} />}
            {!!separator && !isLast && <Box paddingRight={space}>{separator}</Box>}
          </Fragment>
        );
      })}
    </Box>
  );
}
