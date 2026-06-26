import {
  TextInput,
  NumberInput,
  Stack,
  TagsInput,
  Paper,
  Text,
  SimpleGrid,
} from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";

import { updateQuizField } from "../models/quizSlice";

export default function QuizHeader() {
  const dispatch = useDispatch();

  const currentQuiz = useSelector(
    (state) => state.quiz.currentQuiz
  );

  const formatDateTimeLocal = (date) => {
  if (!date) return "";

  return new Date(date)
    .toISOString()
    .slice(0, 16);
};

  return (
    <Stack mb="xl" gap="lg">
      <TextInput
        variant="unstyled"
        size="xl"
        fw={700}
        placeholder="Enter Quiz Title"
        value={currentQuiz.title}
        onChange={(e) =>
          dispatch(
            updateQuizField({
              field: "title",
              value: e.target.value,
            })
          )
        }
      />

      <Paper
        withBorder
        radius="md"
        p="lg"
      >
        <Stack gap="md">
          <Text fw={600} size="lg">
            Quiz Settings
          </Text>

          <SimpleGrid cols={3}>
            <TagsInput
              label="Subject"
              placeholder="Subject"
              maxTags={1}
              value={
                currentQuiz.subject
                  ? [currentQuiz.subject]
                  : []
              }
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field: "subject",
                    value: value[0] || "",
                  })
                )
              }
            />

            <NumberInput
              label="Marks"
              placeholder="Marks"
              min={1}
              value={currentQuiz.total_marks}
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field: "total_marks",
                    value,
                  })
                )
              }
            />

            <NumberInput
              label="Duration (mins)"
              placeholder="Duration"
              min={1}
              value={currentQuiz.duration_minutes}
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field: "duration_minutes",
                    value,
                  })
                )
              }
            />
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <TagsInput
              label="Target Sections"
              placeholder="Enter sections (e.g. CSE-V, CSE-3)"
              value={
                Array.isArray(currentQuiz.target_sections)
                  ? currentQuiz.target_sections
                  : []
              }
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field:
                      "target_sections",
                    value,
                  })
                )
              }
            />

            <NumberInput
                label="Target Year"
                min={2020}
                max={2100}
                value={currentQuiz.target_graduation_year}
                onChange={(value) =>
                  dispatch(
                    updateQuizField({
                      field: "target_graduation_year",
                      value,
                    })
                  )
                }
              />
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <TextInput
              type="datetime-local"
              label="Start Time"
              value={formatDateTimeLocal(currentQuiz.start_time) || ""}
              onChange={(e) =>
                dispatch(
                  updateQuizField({
                    field: "start_time",
                    value: e.target.value,
                  })
                )
              }
            />

            <TextInput
              type="datetime-local"
              label="End Time"
              value={formatDateTimeLocal(currentQuiz.end_time) || ""}
              onChange={(e) =>
                dispatch(
                  updateQuizField({
                    field: "end_time",
                    value: e.target.value,
                  })
                )
              }
            />
          </SimpleGrid>
        </Stack>
      </Paper>
    </Stack>
  );
}