import { BackgroundContext } from "hooks/useBackgroundColor";
import { BoxTokens, useResolveBoxTokens } from "hooks/useResolveBoxTokens";
import React, { forwardRef, useContext } from "react";
import { View } from "react-native";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import type { RemoveStyle } from "tools/useStyle";

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
