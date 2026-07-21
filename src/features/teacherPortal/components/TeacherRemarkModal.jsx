import { useState } from "react";
import {
  Modal,
  Stack,
  Group,
  Text,
  Title,
  Textarea,
  Button,
} from "@mantine/core";
import {
  Pencil
} from "lucide-react";

export default function TeacherRemarksModal({
  opened,
  onClose,
  onSave,
  loading,
  initialRemark = "",
}) {
  const [remark, setRemark] = useState(initialRemark);



  const appendRemark = (text) => {
    if (!remark.trim()) {
      setRemark(text);
    } else {
      setRemark((prev) => `${prev}\n• ${text}`);
    }
  };

  const handleSave = () => {
    onSave?.(remark);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      w={300}
      h={400}
      radius="md"
      withCloseButton
      title={
        <Group gap="xs">
          {/* <MessageSquare size={18} /> */}
          <Title order={3} fw={600}>
          Add Remarks
          </Title>
        </Group>
      }
    >
      <Stack gap="lg">
        <Textarea
          // label="Teacher Remarks"
          // withAsterisk
          placeholder="Explain what the student did well, what needs improvement, and provide actionable feedback..."
          value={remark}
          onChange={(e) => setRemark(e.currentTarget.value)}
          autosize
          minRows={12}
          maxRows={16}
          maxLength={1000}
        />

        <Group justify="space-between">

          <Text
            size="xs"
            c="dimmed"
          >
            {remark ? remark.length : 0} / 1000 characters
          </Text>

          <Group>

            <Button
              onClick={handleSave}
              loading={loading}
              leftSection={<Pencil size={16}/>}
            >
              Save
            </Button>

          </Group>

        </Group>

      </Stack>
    </Modal>
  );
}