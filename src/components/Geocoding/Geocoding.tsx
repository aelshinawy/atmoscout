import { Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";
import { debounceTime, map, Subject, switchMap } from "rxjs";

const nameSubject = new Subject<string>();
const geoCoding$ = nameSubject.pipe(
  debounceTime(250),
  map((name: string) => name.replace(" ", "+")),
  switchMap((name) =>
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=20&language=en&format=json`
    ).then((response) => response.json())
  )
);

const Geocoding = () => {
  const [autoCompleteData, setAutoCompleteData] = useState<Array<any>>();
  useEffect(() => {
    const sub = geoCoding$.subscribe({
      next: (data: any) => {
        if (!data.results) setAutoCompleteData([]);
        const suggestions = data?.results?.map((v: any) => ({
          label: `${v.name}, ${v.admin1 ?? ""}, ${v.admin2 ?? ""} ${v.country}`,
          value: `${v.name}, ${v.admin1 ?? ""}, ${v.admin2 ?? ""} ${v.country}`,
          data: v,
        }));
        console.log(data, suggestions);
        setAutoCompleteData(suggestions);
      },
      error: console.error,
      complete: () => console.info("done"),
    });

    return () => sub.unsubscribe();
  }, []);

  const onTextInputChanged = (name: string) => {
    nameSubject.next(name);
  };

  return (
    <Autocomplete
      label="Location"
      placeholder="Select city"
      onChange={onTextInputChanged}
      data={autoCompleteData}
    />
  );
};

export default Geocoding;
