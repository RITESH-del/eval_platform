import { useDispatch } from "react-redux";
import {
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { updateManualScore } from "../thunks/facultyThunks.js";
import { updateManualScoreLocal } from "../reducers/facultySlice.js";

export default function EvaluationCard({
  submission,
}) {
  const dispatch = useDispatch();

  if (!submission) {
    return (
      <Paper withBorder radius="lg" p="lg">
        <Text c="dimmed">
          No submission selected.
        </Text>
      </Paper>
    );
  }

  const handleSave = () => {
    dispatch(
      updateManualScore({
        submissionId: submission.id,
        manualScore: submission.manual_score,
      })
    );
  };

  return (

        <Group grow>

          {/* <Paper
            withBorder
            
            radius="md"
            p="md"
          >
            <Text
              size="sm"
              c="dimmed"
            >
              Auto Grading Score
            </Text>

            <Text
              fw={700}
              size="xl"
              mt={4}
            >
              {submission.autograding_score}
            </Text>
          </Paper> */}

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

    <NumberInput
      variant="unstyled"
      p={0}
      value={submission.manual_score ?? ""}
      onChange={(value) =>
        dispatch(
          updateManualScoreLocal({
            submissionId: submission.id,
            manual_score: value,
          })
        )
      }
      min={0}
      max={100}
      placeholder="Enter score"
      styles={{
        input: {
          fontSize: "1.1rem",
          fontWeight: 700,
          padding: 0,
          border: "none",
          background: "transparent",
        },
        controls: {
          borderLeft: "none",
        },
      }}
    />
  </Paper>

        <Group justify="flex-end">
          <Button onClick={handleSave}>
            Save Evaluation
          </Button>
        </Group>

        </Group>
  );
}