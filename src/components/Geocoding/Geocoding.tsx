import {
  Avatar,
  Combobox,
  Group,
  Loader,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  from,
  map,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { GeocodeData } from "../../types/GeocodeData.type";
import { GeocodeResponseItem } from "../../types/GeocodeResponseItem.type";
import { mapGeoItem } from "../../utils/mapping";
import { AutocompleteOption } from "../AutocompleteOption/AutocompleteOption";

const nameSubject = new Subject<string>();
const requestGeoData = (name: string) =>
  from(
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`
    ).then((resp) => resp.json())
  );

const Geocoding = ({ onSetGeocode }: any) => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [resp, setResp] = useState<Array<GeocodeData>>();
  const [list, setList] = useState<any>();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    const sub = nameSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        map((name: string) => name.replace(" ", "+")),
        tap(() => setLoading(true)),
        switchMap((name) =>
          requestGeoData(name).pipe(
            finalize(() => setLoading(false)),
            tap((resp) => {
              if (!resp.results) setEmpty(true);
              else {
                setEmpty(false);
                setList(resp.results);
              }
            }),
            filter((resp) => resp.results),
            map((resp) => resp.results),
            map(groupByCountry)
          )
        )
      )
      .subscribe({
        next: (v) => {
          setResp(v);
        },
        error: console.error,
      });

    return () => sub.unsubscribe();
  }, []);

  const groupByCountry = (list: Array<GeocodeResponseItem>) => {
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

  const onTextInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    setResp(undefined);
    if (event.currentTarget.value.trim() !== "") {
      nameSubject.next(event.currentTarget.value);
      combobox.resetSelectedOption();
      combobox.openDropdown();
    }
  };

  const onFocused = () => {
    combobox.openDropdown();
    if (resp === undefined) {
      nameSubject.next(value);
    }
  };

  const options = (item: GeocodeResponseItem) => (
    <Combobox.Option
      key={item.id}
      value={item.id.toString()}
      active={item.id.toString() === value}
    >
      <AutocompleteOption item={mapGeoItem(item)} />
    </Combobox.Option>
  );

  const groupLabel = (item: GeocodeData) => (
    <Group key={item.country_code}>
      <Avatar className="ml-auto" alt={item?.country_code} size="sm">
        <CircleFlag
          countryCode={item?.country_code.toLowerCase()}
          height="24"
        />
      </Avatar>

      <Text>{item?.country}</Text>
    </Group>
  );

  const comboOptions = (resp || []).map((item, id) => (
    <Combobox.Group
      key={`${item.country}${item.country_id}`}
      label={groupLabel(item)}
    >
      {item.places.map(options)}
    </Combobox.Group>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        onSetGeocode(
          list.find((v: GeocodeResponseItem) => (v.id = +optionValue))
        );
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Location"
          placeholder="Search a location"
          value={value}
          onChange={onTextInputChanged}
          onClick={() => combobox.openDropdown()}
          onFocus={onFocused}
          onBlur={() => combobox.closeDropdown()}
          rightSection={loading && <Loader size={18} type="bars" />}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={resp === undefined}>
        <Combobox.Options mah={500} style={{ overflowY: "auto" }}>
          {comboOptions}
          {empty && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Geocoding;
