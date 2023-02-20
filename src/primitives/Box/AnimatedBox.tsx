import { BoxTokens, useResolveBoxTokens } from "hooks/useResolveBoxTokens";
import type { RemoveStyle } from "tools/useStyle";
import React, { forwardRef, useContext } from "react";
import Animated from "react-native-reanimated";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { BackgroundContext } from "hooks/useBackgroundColor";

// Make sure to use the default style prop to allow any animation
export type BoxProps = RemoveStyle<BoxTokens> & SafeAreaViewProps;
export const AnimatedBox = forwardRef<Animated.View, BoxProps>(({ style, children, ...props }, ref) => {
  const { tokenStyles, ...rest } = useResolveBoxTokens(props);
  const color = useContext(BackgroundContext);

  return (
    <BackgroundContext.Provider value={tokenStyles.backgroundColor ?? color}>
      <Animated.View ref={ref} style={[tokenStyles, style]} {...rest}>
        {children}
      </Animated.View>
    </BackgroundContext.Provider>
  );
});
