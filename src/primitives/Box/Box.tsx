import { BoxTokens, useResolveBoxTokens } from "hooks/useResolveBoxTokens";
import type { RemoveStyle } from "tools/useStyle";
import React, { forwardRef, useContext } from "react";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { BackgroundContext } from "hooks/useBackgroundColor";
import { View } from "react-native";

export type BoxProps = BoxTokens & RemoveStyle<SafeAreaViewProps>;
export const Box = forwardRef<View, BoxProps>(({ style, children, ...props }, ref) => {
  const { tokenStyles, style: updatedStyle, ...rest } = useResolveBoxTokens(props);
  const color = useContext(BackgroundContext);
  return (
    <BackgroundContext.Provider value={tokenStyles.backgroundColor ?? color}>
      <View ref={ref} style={[tokenStyles, style, updatedStyle]} {...rest}>
        {children}
      </View>
    </BackgroundContext.Provider>
  );
});
