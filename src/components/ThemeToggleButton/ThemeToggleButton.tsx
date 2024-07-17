import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import {
  IconBrightnessAutoFilled,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ColorTheme, toggleThemeAtom } from "../../atoms/interface";

export const ThemeToggleButton = () => {
  const [theme, toggleTheme] = useAtom(toggleThemeAtom);

  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const mapThemeToIcon = (th: ColorTheme) => {
    const iconMap = {
      [ColorTheme.AUTO]: <IconBrightnessAutoFilled />,
      [ColorTheme.LIGHT]: <IconSun />,
      [ColorTheme.DARK]: <IconMoon />,
    };
    return iconMap[th];
  };

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  return (
    <ActionIcon variant="subtle" size="lg" radius="md" onClick={toggleTheme}>
      {mapThemeToIcon(theme)}
    </ActionIcon>
  );
};
