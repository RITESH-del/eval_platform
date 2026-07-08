import { Paper, Stack, Text, Title, Group } from "@mantine/core";
import { CircleHelp } from "lucide-react";

export default function QuestionCard({ title, question }) {
  return (
    <Paper p="lg" radius="lg" withBorder>
      <Stack gap="sm">
        <Group>
          <CircleHelp size={20} /> 
          <Title order={3}>{title}</Title>
        </Group>

        <Text c="dimmed">{question}</Text>
      </Stack>
    </Paper>
  );
}