import {
  Paper,
  Group,
  Stack,
  Text,
  Progress,
  ThemeIcon,
  Button,
  ActionIcon,
} from "@mantine/core";
import { FileArchive, X, SquareArrowOutUpRight} from "lucide-react";

export default function UploadCard({
  fileName,
  progress = 0,
  uploading,
  url,
  onRemove,
}) {
  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      style={{
        width: "100%",
      }}
    >
      <Group align="center" wrap="nowrap">
        <ThemeIcon
          size={48}
          radius="md"
          variant="light"
        >
          <FileArchive size={24} />
        </ThemeIcon>

        {uploading ? (
        <Stack
          gap={6}
          flex={1}
        >
          <Group justify="space-between">
            <Text
              fw={600}
              size="sm"
              truncate
            >
              {fileName}
            </Text>

            <Text
              size="xs"
              c="dimmed"
            >
              {progress}%
            </Text>
          </Group>

          <Progress
            value={progress}
            radius="xl"
            size="sm"
            animated={progress < 100}
          />
        </Stack>
        ) : (
          <Group flex={1} justify="space-between">
            <Text
              fw={600}
              size="sm"
              truncate
            >
              {fileName}
            </Text>

        <Button 
          component="a"
          href={url}
          target="_blank"
          leftSection={<SquareArrowOutUpRight size={16}/>}>
            Open
          </Button>
        </Group>
        )}

        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={onRemove}
        >
          <X size={18} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}