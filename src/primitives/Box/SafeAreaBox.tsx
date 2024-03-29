import { BackgroundContext } from "hooks/useBackgroundColor";
import { BoxTokens, useResolveBoxTokens } from "hooks/useResolveBoxTokens";
import React, { useContext } from "react";
import { View } from "react-native";
import { SafeAreaViewProps, useSafeAreaInsets } from "react-native-safe-area-context";
import { RemoveStyle } from "tools/useStyle";

// If an emtpy SafeAreaView is placed to handle insets then its ignored, this ensures the insets area always applied
const styleFix = { minHeight: 1 };
export type SafeAreaBoxProps = BoxTokens & RemoveStyle<SafeAreaViewProps>;
export const SafeAreaBox = ({ children, edges, ...props }: SafeAreaBoxProps) => {
  const { tokenStyles, paddingValues, style, ...rest } = useResolveBoxTokens(props);
  const color = useContext(BackgroundContext);

  // SafeAreaView cannot be used as it causes flickering of insets for nested navigators
  // https://reactnavigation.org/docs/handling-safe-area/#summary
  const insets = useSafeAreaInsets();
  if (edges?.includes("top")) {
    const top = paddingValues.paddingTop ?? paddingValues.paddingVertical ?? 0;
    if (typeof top !== "number") {
      throw new Error("vertical padding must be a number when used within a safe area");
    }
    paddingValues.paddingTop = insets.top + top;
  }
  if (edges?.includes("bottom")) {
    const bottom = paddingValues.paddingBottom ?? paddingValues.paddingVertical ?? 0;
    if (typeof bottom !== "number") {
      throw new Error("vertical padding must be a number when used within a safe area");
    }
    paddingValues.paddingBottom = insets.bottom + bottom;
  }
  return (
    <BackgroundContext.Provider value={tokenStyles.backgroundColor ?? color}>
      <View style={[tokenStyles, paddingValues, styleFix, style]} {...rest}>
        {children}
      </View>
    </BackgroundContext.Provider>
  );
};
