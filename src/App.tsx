import {
  AppShell,
  Burger,
  Card,
  Container,
  Flex,
  MantineProvider,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import Geocoding from "./components/Geocoding/Geocoding";
import { ThemeToggleButton } from "./components/ThemeToggleButton/ThemeToggleButton";
import { Weather } from "./components/Weather/Weather";
import { theme } from "./theme";

export default function App() {
  const { height } = useViewportSize();

  const [geocode, setGeocode] = useState<any>();

  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !navbarOpened, desktop: !navbarOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Flex align="center" h="100%" px="md">
            <Flex align="center">
              <Burger opened={navbarOpened} onClick={toggleNavbar} size="sm" />
              <Title order={2} ml="sm" mr="xl">
                CloudScout
              </Title>
            </Flex>
            <Flex direction="column" style={{ flexGrow: 1 }}>
              <Geocoding onSetGeocode={setGeocode} />
            </Flex>
            <Flex justify="flex-end">
              <Space w="md" />
              <ThemeToggleButton />
            </Flex>
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>
          {geocode && (
            <Card>
              <Weather geocode={geocode} />
            </Card>
          )}
        </AppShell.Main>
        <AppShell.Footer>
          <Container>
            <Text p="xs" c="dimmed" ta="center">
              {`Made with 💖 by `}
              <a href="https://github.com/aelshinawy">
                <Text fs="italic" fw={700} component="span">
                  Ahmed El-Shinawy
                </Text>
              </a>
            </Text>
          </Container>
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
