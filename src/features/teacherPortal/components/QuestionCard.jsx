import { Paper, Stack, Title, Group } from "@mantine/core";
import { CircleHelp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function QuestionCard({ title, question }) {
  return (
    <Paper p="lg" radius="lg" withBorder>
      <Stack gap="sm">
        <Group>
          <CircleHelp size={20} />
          <Title order={3}>{title}</Title>
        </Group>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {question}
        </ReactMarkdown>
      </Stack>
    </Paper>
  );
}