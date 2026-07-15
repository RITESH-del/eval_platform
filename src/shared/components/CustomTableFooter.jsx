// i didn't like how the in-built pagination looks

import { Button, Group, Paper, Text } from "@mantine/core";

export default function TableFooter({
  page,
  totalPages,
  totalRecords,
  recordsShown,
  onPageChange,
  label = "practicals",
}) {
  return (
    <Paper
      px={"xs"}
      py={"xs"}
      my={0}
      withBorder
      radius="md"
      className="!border-t-0"
    >
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          Showing {recordsShown} of {totalRecords} {label}
        </Text>

        <Group gap="xs">
          <Button
            variant="default"
            radius="xl"
            size="sm"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>

          <Button
            radius="xl"
            size="sm"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}