import {
  Card,
  Textarea,
  TextInput,
  NumberInput,
  Button,
  Group,
  ActionIcon,
  Text,
  Select,
  Paper,
  ThemeIcon,
  Stack,
  SimpleGrid,
} from "@mantine/core";

import {
  Trash2,
  Plus,
  Upload,
  FileCode,
} from "lucide-react";

export default function Question({
  question,
  index,
  onRemoveQuestion,
  onUpdateQuestion,
  onAddTestCase,
  onUpdateTestCase,
  onRemoveTestCase,
}) {
  return (
    <Card
      radius="lg"
      withBorder
      p={20}
      bg="white"
      shadow="xs"
    >
      <Card.Section
        p="lg"
        withBorder
      >
        <Group justify="space-between">
          <Group gap="md">
            <Paper
              w={44}
              h={44}
              radius="md"
              bg="gray.1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text fw={700}>
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </Text>
            </Paper>

            <Stack gap={0}>
              <TextInput 
              variant="unstyled"
              size="xl"
              fw={500}
              w="600px"
              placeholder="Question Title"
              value={question.title}
              onChange={(e) =>
                onUpdateQuestion(
                  question.id,
                  "title",
                  e.target.value
                )
              }
              
              />
            </Stack>
          </Group>

          <Group gap="md">


          <Select
          w={110}
          placeholder="difficulty"
          data={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          value={question.difficulty}
          onChange={(value) =>
            onUpdateQuestion(
              question.id,
              "difficulty",
              value
            )
          }
          />

          <Group>
            <Paper
              px="md"
              radius="md"
              shadow="xs"
              bg="blue.0"
            >
              <Group gap={6}>
                <Text
                  size="xs"
                  fw={700}
                  c="dimmed"
                >
                  points
                </Text>

                <NumberInput
                  variant="unstyled"
                  hideControls
                  w={15}
                  value={question.marks}
                  onChange={(value) =>
                    onUpdateQuestion(
                      question.id,
                      "marks",
                      value
                    )
                  }
                />
              </Group>
            </Paper>

            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() =>
                onRemoveQuestion(
                  question.id
                )
              }
            >
              <Trash2 size={16} />
            </ActionIcon>
          </Group>
        </Group>
        
        </Group>
      </Card.Section>

      <Stack p="lg">
        <Textarea
          minRows={2}
          autosize
          variant="filled"
          placeholder="Enter question statement..."
          value={question.statement}
          onChange={(e) =>
            onUpdateQuestion(
              question.id,
              "statement",
              e.target.value
            )
          }
          styles={{
            input: {
              background:
                "#f8f9fb",
              border: "none",
              borderRadius:
                "10px",
              fontSize: "16px",
              padding: "20px",
            },
          }}
        />

        <Paper
          p="md"
          radius="lg"
          bg="gray.0"
          withBorder
        >
          <Group justify="space-between">
            <Group>
              <ThemeIcon
                size={42}
                radius="xl"
                variant="light"
              >
                <Upload size={18} />
              </ThemeIcon>

              <Stack gap={0}>
                <Text fw={600}>
                  Upload Diagram
                </Text>

                <Text
                  size="xs"
                  c="dimmed"
                >
                  PDF, PNG OR JPG
                  UP TO 10MB
                </Text>
              </Stack>
            </Group>

            <Button
              variant="white"
              radius="md"
              component="label"
            >
              Browse Files

              <input
                hidden
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  onUpdateQuestion(
                    question.id,
                    "diagram",
                    e.target.files?.[0]
                  )
                }
              />
            </Button>
          </Group>
        </Paper>

        <Group
          justify="space-between"
          mt="md"
        >
          <Group gap={8}>
            <FileCode size={16} />

            <Text
              size="xs"
              fw={700}
              c="dimmed"
              tt="uppercase"
              style={{
                letterSpacing: 2,
              }}
            >
              Test Cases
            </Text>
          </Group>

          <Button
            variant="subtle"
            size="xs"
            leftSection={
              <Plus size={14} />
            }
            onClick={() =>
              onAddTestCase(
                question.id
              )
            }
          >
            Add Case
          </Button>
        </Group>

        {question.testCases.map(
          (tc) => (
            <Paper
              key={tc.id}
              p="lg"
              radius="md"
              bg="gray.0"
            >
              <SimpleGrid
                cols={{
                  base: 1,
                  md: 2,
                }}
              >
                <Textarea
                  label="INPUT"
                  placeholder="e.g. root = [2,1,3]"
                  autosize
                  minRows={1}
                  maxRows={5}
                  value={tc.input}
                  onChange={(e) =>
                    onUpdateTestCase(
                      question.id,
                      tc.id,
                      "input",
                      e.target.value
                    )
                  }
                />

                <Group
                  align="end"
                  gap="xs"
                >
                  <Textarea
                    flex={1}
                    label="EXPECTED OUTPUT"
                    placeholder="e.g. true"
                    autosize
                    minRows={1}
                    maxRows={5}
                    value={tc.output}
                    onChange={(e) =>
                      onUpdateTestCase(
                        question.id,
                        tc.id,
                        "output",
                        e.target.value
                      )
                    }
                  />

                  <ActionIcon
                    color="red"
                    variant="light"
                    mb={2}
                    onClick={() =>
                      onRemoveTestCase(
                        question.id,
                        tc.id
                      )
                    }
                  >
                    <Trash2 size={14} />
                  </ActionIcon>
                </Group>
              </SimpleGrid>
            </Paper>
          )
        )}
      </Stack>
    </Card>
  );
}