import {
  Paper,
  Group,
  Stack,
  Text,
  Button,
  Divider,
  Badge,
} from "@mantine/core";

export default function QuizFooter({
  onPublish,
  onDiscard,
  lastModified = "2 minutes ago",
  status = "Drafting Mode",
}) {
  return (
    <Paper
      withBorder
      px="xl"
      py="md"
      radius={0}
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 100,
        backgroundColor: "white",
      }}
    >
      <Group justify="space-between">
        <Group gap="xl">
          <Stack gap={2}>
            <Text
              size="10px"
              fw={700}
              c="dimmed"
              tt="uppercase"
              style={{
                letterSpacing: "0.15em",
              }}
            >
              Current Status
            </Text>

            <Badge
              variant="light"
              color="yellow"
              radius="xl"
              size="lg"
            >
              {status}
            </Badge>
          </Stack>

          <Divider
            orientation="vertical"
          />

          <Stack gap={2}>
            <Text
              size="10px"
              fw={700}
              c="dimmed"
              tt="uppercase"
              style={{
                letterSpacing: "0.15em",
              }}
            >
              Last Modified
            </Text>

            <Text
              size="sm"
              fw={600}
            >
              {lastModified}
            </Text>
          </Stack>
        </Group>

        <Group>
          <Button
            variant="subtle"
            color="gray"
            onClick={onDiscard}
          >
            Discard changes
          </Button>

          <Button
            radius="xl"
            size="md"
            onClick={onPublish}
          >
            Publish Quiz
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}