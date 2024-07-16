import { Group, Stack, Text, Title } from "@mantine/core";

export type AdminAreaData = {
  id: number;
  name: string;
};

export type Country = {
  id: number;
  name: string;
  code: string;
};

export type AutocompleteOptionProps = {
  item: {
    id: number;
    name: string;
    adminAreas: Array<AdminAreaData | undefined>;
    longitude: number;
    latitude: number;
    country: Country;
  };
};

export const AutocompleteOption = ({ item }: AutocompleteOptionProps) => {
  return (
    <Stack align="stretch" justify="flex-start" gap="xs">
      <Group gap="md" justify="space-between" grow>
        <Title order={3}>{item?.name}</Title>
        <Text>
          {item?.latitude}, {item?.longitude}
        </Text>
      </Group>
      <Group gap="xs">
        {item?.adminAreas.toReversed().map((area, idx) => {
          if (area) {
            return (
              <Text key={area?.id}>
                {area?.name}
                {idx < item.adminAreas.length - 1 ? "," : ""}
              </Text>
            );
          }
        })}
      </Group>
    </Stack>
  );
};
