import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum ColorTheme {
  AUTO = "auto",
  LIGHT = "light",
  DARK = "dark",
}

const colorThemeAtom = atomWithStorage("colorScheme", ColorTheme.AUTO);
//
const themeTransitions = {
  [ColorTheme.AUTO]: ColorTheme.LIGHT,
  [ColorTheme.LIGHT]: ColorTheme.DARK,
  [ColorTheme.DARK]: ColorTheme.AUTO,
};

const toggleThemeAtom = atom(
  (get) => get(colorThemeAtom),
  (get, set) => set(colorThemeAtom, themeTransitions[get(colorThemeAtom)])
);

export { colorThemeAtom, toggleThemeAtom };
