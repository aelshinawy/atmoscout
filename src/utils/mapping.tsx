import { GeocodeData } from "../types/GeocodeData.type";
import { GeocodeResponseItem } from "../types/GeocodeResponseItem.type";

export const mapGeoItem = (value: any) => ({
  id: value.id,
  name: value.name,
  adminAreas: Array.from({ length: 4 })
    .map((_, id) =>
      value[`admin${id + 1}`]
        ? {
            id: value[`admin${id + 1}_id`],
            name: value[`admin${id + 1}`],
          }
        : undefined
    )
    .filter((area) => area !== undefined),
  longitude: value.longitude,
  latitude: value.latitude,
  country: {
    id: value.country_id,
    name: value.country,
    code: value.country_code,
  },
});

export const mapToGeocodeData = (list: Array<GeocodeResponseItem>) => {
  if (!list) return;
  const countrySet = new Map();
  const groupedList: Array<GeocodeData> = list.reduce((acc, item) => {
    const idx = countrySet.get(item.country_id);
    if (idx !== undefined) {
      acc[idx] = { ...acc[idx], places: [...acc[idx].places, item] };
    } else {
      countrySet.set(item.country_id, acc.length);
      acc.push({
        country: item.country,
        country_code: item.country_code,
        country_id: item.country_id,
        places: [{ ...item }],
      });
    }
    return acc;
  }, [] as Array<GeocodeData>);

  return groupedList;
};
