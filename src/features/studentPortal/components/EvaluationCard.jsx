import { Group, Paper, Stack, Text } from "@mantine/core";

export default function EvaluationCard({submission}) {

  if (!submission) {
    return (
      <Paper withBorder radius="lg" p="lg">
        <Text c="dimmed">
          No submission selected.
        </Text>
      </Paper>
    );
  }

  return (
        <Group grow>
<Paper withBorder radius="md" p="xs">
  <Stack gap={2}>
    <Text size="sm" c="dimmed">
      Auto Grading Score
    </Text>

    <Text fw={700} size="lg">
      {submission.autograding_score}
    </Text>
  </Stack>
</Paper>

           <Paper
    withBorder
    radius="md"
    p="xs"
  >
    <Text
      size="sm"
      c="dimmed"
    >
      Manual Score
    </Text>
    <Text fw={700} size="lg">
      {submission.manual_score ?? "-"}
    </Text>
  </Paper>
</Group>
  );
}