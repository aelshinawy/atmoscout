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
