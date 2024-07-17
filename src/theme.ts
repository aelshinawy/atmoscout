import { createTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

export const theme = createTheme({
  fontFamily: "Quicksand, sans-serif",
  primaryColor: "dark",
});
export const vars = themeToVars(theme);
