import { atom } from "jotai";
import { atomWithObservable, loadable } from "jotai/utils";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { mapToGeocodeData } from "../utils/mapping";
import { GeocodeResponseItem } from "../types/GeocodeResponseItem.type";

export const locationSearchSubject = new Subject<string>();
const locationSearch$ = locationSearchSubject.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  map((value: string) => value.replace(" ", "+")),
  switchMap((search: string) =>
    fromFetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`
    ).pipe(
      switchMap((response: Response) =>
        response.ok
          ? response.json()
          : of({ error: true, message: `Error ${response.status}` })
      ),
      map(
        (response) => (response?.results ?? []) as Array<GeocodeResponseItem>
      ),
      catchError((err) => {
        console.error(err);
        return of({ error: true, message: err.message });
      })
    )
  )
);

export const locationListAtom = atomWithObservable(() => locationSearch$);

export const locationListByCountryAtom = loadable(
  atom(async (get) => {
    const locationList = await get(locationListAtom);
    if (Array.isArray(locationList)) return mapToGeocodeData(locationList);
    if (locationList.error) {
      console.error(locationList.message);
      return [];
    }
  })
);

export const selectedLocationIdAtom = atom<string>("");

export const selectedLocationAtom = loadable(
  atom(async (get) => {
    const selectedLocationId = get<string>(selectedLocationIdAtom);
    const locationList = await get(locationListAtom);

    if (!Array.isArray(locationList)) return {};

    const selectedLocation = locationList.find(
      (item) => item.id === +selectedLocationId
    );
    return selectedLocation;
  })
);
