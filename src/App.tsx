import {
  AppShell,
  Burger,
  Center,
  Container,
  Flex,
  MantineProvider,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CurrentTime from "./components/CurrentTime/CurrentTime";
import Geocoding from "./components/Geocoding/Geocoding";
import { ThemeToggleButton } from "./components/ThemeToggleButton/ThemeToggleButton";
import { Weather } from "./components/Weather/Weather";
import { theme } from "./theme";

export default function App() {
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
        padding="xl"
        withBorder={false}
        transitionDuration={350}
      >
        <AppShell.Header>
          <Flex align="center" h="100%" px="md">
            <Flex align="center">
              <Burger opened={navbarOpened} onClick={toggleNavbar} size="sm" />
              <Title order={3} ml="sm" mr="md">
                AtmoScout
              </Title>
            </Flex>
            <Space w="lg" />
            <Flex direction="column" style={{ flexGrow: 1 }}>
              <Geocoding onSetGeocode={setGeocode} />
            </Flex>
            <Space w="xl" />
            <Flex align="center" justify="flex-end">
              <CurrentTime />
              <Space w="sm" />
              <ThemeToggleButton />
            </Flex>
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Settings
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>
          <Center>
            <Flex direction="column">
              {geocode && <Weather geocode={geocode} />}
            </Flex>
          </Center>
        </AppShell.Main>
        <AppShell.Footer>
          <Container>
            <Text p="xs" c="dimmed" ta="center">
              {`Made with 💖 by `}
              <a href="https://github.com/aelshinawy" target="_blank">
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
