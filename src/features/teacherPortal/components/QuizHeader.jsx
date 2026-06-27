import {
  TextInput,
  NumberInput,
  Stack,
  TagsInput,
  Paper,
  Text,
  SimpleGrid,
  Button,
  Group
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from 'lucide-react';
import { updateQuizField } from "../models/quizSlice";
import { useNavigate } from "react-router";

export default function QuizHeader() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentQuiz = useSelector(
    (state) => state.quiz.currentQuiz
  );

  return (
    <Stack mb="xl" gap="lg">

      <Group justify="space-between" wrap="nowrap">
         <TextInput
        variant="unstyled"
        size="xl"
        fw={700}
        w="80%"
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

      <Button 
      onClick={() => {
        // navigate(`/Faculty/questions`);
      }}
      leftSection={<Plus size={18}/>}
      >
        Add Questions
      </Button>
      </Group>
     

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
            <TextInput
              label="Password"
              placeholder="Start Password"
              value={
                currentQuiz.start_password
                  ? [currentQuiz.start_password]
                  : []
              }
              onChange={(e) =>
                dispatch(
                  updateQuizField({
                    field: "start_password",
                    value: e.target.value || "",
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

          <SimpleGrid cols={3}>
            <TextInput
              type="datetime-local"
              label="Start Time"
              value={currentQuiz.start_time ?? ""}
              onChange={(e) =>
                dispatch(
                  updateQuizField({
                    field: "start_time",
                    value: e.target.value,
                  })
                )
              }
            />

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
        </Stack>
      </Paper>
    </Stack>
  );
}