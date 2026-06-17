import {
  Group,
  Text,
  Breadcrumbs,
//   Anchor,
  ActionIcon,
} from "@mantine/core";

import { Bell, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

export default function FacultyHeader({location}) {
    const date = new Date();
    const year = date.getFullYear();


    const params = useParams();

    const paramValues = Object.values(params);

    const items = location
    .split("/")
    .filter(Boolean)
    .filter(segment => !paramValues.includes(segment))
    .map((segment) => (
      <Text key={segment}>
        {segment
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Text>
    ));


//     const items = [
//     <Text key="faculty">Faculty</Text>,
//     <Text key="current">Past Practicals</Text>,
//   ];

  return (
    <Group justify="space-between" mb="md">
      <div>
        <Breadcrumbs
        c={"dimmed"}
        separator={<ChevronRight size={16} />}
        // separatorMargin={"xs"}
        styles={{
            separator: {
            color: "var(--mantine-color-dimmed)",
            margin: "4px"
            },
        }}
>
  {items}
</Breadcrumbs>
      </div>

      <Group>
        <Text size="sm" c="dimmed">
          Academic Year {year-1} - {year}
        </Text>

        <ActionIcon variant="subtle">
          <Bell size={18} />
        </ActionIcon>
      </Group>
    </Group>
  );
}