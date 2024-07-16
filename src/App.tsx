import {
  Container,
  Flex,
  MantineProvider,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useViewportSize } from "@mantine/hooks";
import Geocoding from "./components/Geocoding/Geocoding";
import { theme } from "./theme";

export default function App() {
  const { height } = useViewportSize();
  return (
    <MantineProvider theme={theme}>
      <Container fluid h={height}>
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Title>Weather Forecast</Title>

          <Geocoding />

          <Paper shadow="md" radius="md" withBorder p="xl">
            <Text>Paper is the most basic ui component</Text>
          </Paper>
        </Flex>
      </Container>
    </MantineProvider>
  );
}
