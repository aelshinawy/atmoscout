import { em, Text, Flex, Tooltip } from "@mantine/core";
import {
  IconDroplets,
  IconGauge,
  IconRipple,
  IconWind,
} from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { weatherDataAtom } from "../../atoms/weather";
import useLoadableAtom from "../../hooks/useLoadableAtom";

export const Weather = () => {
  const {
    isLoading,
    hasData,
    data: response,
  } = useLoadableAtom(useAtomValue(weatherDataAtom));

  return hasData && !isLoading && response ? (
    <Flex direction="column">
      <Flex direction="row">
        <Text size={em(200)} lh={1} fw={700}>
          {response?.current?.temperature_2m}
        </Text>
        <Text component="span" size={em(40)} lh={1} fw={400}>
          {response?.current_units?.temperature_2m}
        </Text>
      </Flex>
      <Flex direction="row" justify="center">
        <Text c="dimmed" size={em(30)} mb={em(20)} fw={400}>
          it feels like {response?.current?.apparent_temperature}{" "}
        </Text>
        <Text c="dimmed" component="span" size={em(20)} lh={1} fw={400}>
          {response?.current_units?.apparent_temperature}
        </Text>
      </Flex>

      <Flex direction="row" justify="space-between">
        <Tooltip.Group openDelay={500}>
          <Tooltip
            label="Humidity"
            transitionProps={{ transition: "pop", duration: 300 }}
            openDelay={500}
          >
            <Flex direction="column" align="center" gap="sm">
              <IconDroplets />
              <Text size="xl">
                {response?.current?.relative_humidity_2m}
                <Text c="dimmed" component="span" size="md">
                  {response?.current_units?.relative_humidity_2m}
                </Text>
              </Text>
            </Flex>
          </Tooltip>

          <Tooltip
            label="Wind"
            transitionProps={{ transition: "pop", duration: 300 }}
            openDelay={500}
          >
            <Flex direction="column" align="center" gap="sm">
              <IconWind />
              <Text size="xl">
                {response?.current?.wind_speed_10m}
                <Text c="dimmed" component="span" size="md">
                  {response?.current_units?.wind_speed_10m}
                </Text>
              </Text>
            </Flex>
          </Tooltip>

          <Tooltip
            label="Sealevel pressure"
            transitionProps={{ transition: "pop", duration: 300 }}
            openDelay={500}
          >
            <Flex direction="column" align="center" gap="sm">
              <IconRipple />
              <Text size="xl">
                {response?.current?.pressure_msl}
                <Text c="dimmed" component="span" size="md">
                  {response?.current_units?.pressure_msl}
                </Text>
              </Text>
            </Flex>
          </Tooltip>

          <Tooltip
            label="Surface pressure"
            transitionProps={{ transition: "pop", duration: 300 }}
            openDelay={500}
          >
            <Flex direction="column" align="center" gap="sm">
              <IconGauge />
              <Text size="xl">
                {response?.current?.surface_pressure}
                <Text c="dimmed" component="span" size="md">
                  {response?.current_units?.surface_pressure}
                </Text>
              </Text>
            </Flex>
          </Tooltip>
        </Tooltip.Group>
      </Flex>

      {/* <IconDroplets />
      <Text>
        {response?.current?.relative_humidity_2m}
        {response?.current_units?.relative_humidity_2m}
      </Text> */}
    </Flex>
  ) : null;
};
