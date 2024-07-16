import { Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { filter, from, of, switchMap, tap } from "rxjs";

type ForecastApiParams = {
  latitude: number;
  longitude: number;
};
const requestForecast = (
  params: ForecastApiParams = { latitude: 31.5625, longitude: 30 }
) =>
  from(
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature`
    ).then((resp) => resp.json())
  );

export const Weather = ({ geocode }: any) => {
  const [response, setResponse] = useState<any>();
  useEffect(() => {
    const sub = of(geocode)
      .pipe(
        filter((val) => val !== undefined),
        switchMap((val) => requestForecast(val)),
        tap(setResponse)
      )
      .subscribe({ next: console.log, error: console.error });
    return () => sub.unsubscribe();
  }, [geocode]);
  return response ? (
    <Stack>
      <Text>{response?.current?.time}</Text>
      <Title order={1}>
        {response?.current?.temperature_2m}
        {response?.current_units?.temperature_2m}
      </Title>
      <Text>
        feels like: {response?.current?.apparent_temperature}
        {response?.current_units?.apparent_temperature}
      </Text>

      <Text>
        Humidity: {response?.current?.relative_humidity_2m}
        {response?.current_units?.relative_humidity_2m}
      </Text>
    </Stack>
  ) : null;
};
