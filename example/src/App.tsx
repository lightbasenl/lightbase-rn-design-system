import * as React from "react";

import { Box, Row, Stack, Text, ThemeProvider } from "lightbase-rn-design-system";
import { customTheme } from "../theme.config";

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Row space="20px">
        <Text>Hello</Text>
      </Row>

      <Stack space="20px">
        <Box flex={1} backgroundColor="bottom-nav-active">
          <Text flex={1} variant="buttonLight" color="accent">
            Gelo
          </Text>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
