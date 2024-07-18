import {
  Avatar,
  Combobox,
  Group,
  Loader,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useAtom, useAtomValue } from "jotai";
import { ChangeEvent, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import {
  locationListByCountryAtom,
  locationSearchSubject,
  selectedLocationIdAtom,
} from "../../atoms/geocode";
import { GeocodeData } from "../../types/GeocodeData.type";
import { GeocodeResponseItem } from "../../types/GeocodeResponseItem.type";
import { mapGeoItem } from "../../utils/mapping";
import { AutocompleteOption } from "../AutocompleteOption/AutocompleteOption";
import useLoadableAtom from "../../hooks/useLoadableAtom";

const Geocoding = () => {
  const [search, setSearch] = useState("");

  const [selectedLocation, setSelectedLocation] = useAtom(
    selectedLocationIdAtom
  );

  const {
    isLoading: isLocationListLoading = false,
    hasData: hasLocationListData,
    data: locationListByCountry = [],
  } = useLoadableAtom(useAtomValue(locationListByCountryAtom));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const onTextInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    locationSearchSubject.next(event.currentTarget.value);
    combobox.resetSelectedOption();
    combobox.openDropdown();
  };

  const onFocused = () => {
    combobox.openDropdown();
  };

  const options = (item: GeocodeResponseItem) => (
    <Combobox.Option
      key={item.id}
      value={item.id.toString()}
      active={item.id.toString() === selectedLocation}
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

  const comboOptions = (locationListByCountry ?? []).map((item) => (
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
        setSelectedLocation(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconSearch />}
          variant="filled"
          size="md"
          radius="xl"
          placeholder="Search for a location"
          value={search}
          onChange={onTextInputChanged}
          onClick={() => combobox.openDropdown()}
          onFocus={onFocused}
          onBlur={() => combobox.closeDropdown()}
          rightSection={
            search && isLocationListLoading && <Loader size={18} type="bars" />
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={isLocationListLoading}>
        <Combobox.Options mah={500} style={{ overflowY: "auto" }}>
          {hasLocationListData && locationListByCountry.length > 0 ? (
            comboOptions
          ) : (
            <Combobox.Empty>No results found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Geocoding;
