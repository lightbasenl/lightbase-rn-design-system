import React, { ReactNode } from "react";
import type { AppThemeConfig } from "types";

export const ThemeContext = React.createContext<AppThemeConfig | null>(null);

type Props<T extends AppThemeConfig> = {
  theme: T;
  children: ReactNode;
};
export function ThemeProvider<T extends AppThemeConfig>({ theme, children }: Props<T>) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
