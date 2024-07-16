import { GeocodeResponseItem } from "./GeocodeResponseItem.type";

export type GeocodeData = {
  country_id: number;
  country: string;
  country_code: string;
  places: Array<GeocodeResponseItem>;
};
