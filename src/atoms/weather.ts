import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { selectedLocationAtom } from "./geocode";
import { GeocodeResponseItem } from "../types/GeocodeResponseItem.type";

const DATA_QURERY = `current=temperature_2m,relative_humidity_2m,apparent_temperature,showers,snowfall,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=sunrise,sunset,uv_index_max`;

export const weatherDataAtom = loadable(
  atom(async (get, { signal }) => {
    const selectedLocation = get(selectedLocationAtom);

    if (
      selectedLocation.state === "loading" ||
      selectedLocation.state === "hasError" ||
      selectedLocation.state !== "hasData"
    )
      return;

    const location = selectedLocation.data as GeocodeResponseItem;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&${DATA_QURERY}`,
      { signal }
    );
    return response.json();
  })
);
