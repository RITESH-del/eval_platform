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
              value={currentQuiz.totalMarks}
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field: "totalMarks",
                    value,
                  })
                )
              }
            />

            <NumberInput
              label="Duration (mins)"
              placeholder="Duration"
              min={1}
              value={currentQuiz.duration}
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field: "duration",
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
                currentQuiz.targetSections
              }
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field:
                      "targetSections",
                    value,
                  })
                )
              }
            />

            <TagsInput
              label="Target Years"
              placeholder="Enter years (e.g. 2026, 2027)"
              value={
                currentQuiz.targetYears
              }
              onChange={(value) =>
                dispatch(
                  updateQuizField({
                    field: "targetYears",
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
              value={
                currentQuiz.start_time || ""
              }
              onChange={(e) =>
                dispatch(
                  updateQuizField({
                    field: "start_time",
                    value:
                      e.target.value,
                  })
                )
              }
            />

            <TextInput
              type="datetime-local"
              label="End Time"
              value={
                currentQuiz.end_time || ""
              }
              onChange={(e) =>
                dispatch(
                  updateQuizField({
                    field: "end_time",
                    value:
                      e.target.value,
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