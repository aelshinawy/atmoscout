import { Container, Flex, MantineProvider, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { useViewportSize } from "@mantine/hooks";
import Geocoding from "./components/Geocoding/Geocoding";
import { theme } from "./theme";

export default function App() {
  const { height } = useViewportSize();

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container fluid h={height}>
        <Flex mih={50} gap="xs" justify="center" direction="column" wrap="wrap">
          <Title>Weather Forecast</Title>
          <Geocoding />
        </Flex>
      </Container>
    </MantineProvider>
  );
}
