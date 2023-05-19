import React, { ReactNode } from "react";
import type { Theme } from "types";

export const ThemeContext = React.createContext<Theme | null>(null);

type Props<T extends Theme> = {
  theme: T;
  children: ReactNode;
};
export function ThemeProvider<T extends Theme>({ theme, children }: Props<T>) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
