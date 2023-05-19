import { BackgroundContext } from "hooks/useBackgroundColor";
import { BoxTokens, useResolveBoxTokens } from "hooks/useResolveBoxTokens";
import React, { useContext } from "react";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import type { RemoveStyle } from "tools/useStyle";

// If an emtpy SafeAreaView is placed to handle insets then its ignored, this ensures the insets area always applied
const styleFix = { minHeight: 1 };
type Props = BoxTokens & RemoveStyle<SafeAreaViewProps>;
export const SafeAreaBox = ({ style, children, ...props }: Props) => {
  const { tokenStyles, ...rest } = useResolveBoxTokens(props);
  const color = useContext(BackgroundContext);

  return (
    <BackgroundContext.Provider value={tokenStyles.backgroundColor ?? color}>
      <SafeAreaView style={[tokenStyles, styleFix, style]} {...rest}>
        {children}
      </SafeAreaView>
    </BackgroundContext.Provider>
  );
};
