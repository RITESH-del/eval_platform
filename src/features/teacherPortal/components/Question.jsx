import { useState, useEffect } from 'react';
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
  Badge,
  NativeSelect
} from "@mantine/core";
import MarkdownEditor from '../../../shared/components/MDEditor.jsx';
import {
  Trash2,
  Plus,
  Upload,
  FileCode,
  CloudUpload
} from "lucide-react";
import { apiClient } from '../../../shared/api/apiClient.js';
import UploadCard from '../../../shared/components/UploadCard.jsx';
import { useDispatch } from "react-redux";
export default function Question({
  question,
  index,
  onRemoveQuestion,
  onUpdateQuestion,

  onAddTestCase,
  onUpdateTestCase,
  onRemoveTestCase,

  onUploadTestCaseFile,
  setTestCaseFile,  
  onRemoveTestCaseFile,
}) {
  const [currentTestCase, setCurrentTestCase] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
  if (currentTestCase >= question.testCases.length) {
    setCurrentTestCase(
      Math.max(0, question.testCases.length - 1)
    );
  }
}, [question.testCases.length, currentTestCase]);

  const tc = question.testCases[currentTestCase];

  const handleImageUpload = async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await apiClient.post(
        "/faculty/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const imageMarkdown = `\n\n![${file.name}](${data.url})\n`;
      const htmlImage = `\n\n<img  src="${data.url}"  alt="${file.name}"  width="400"/>\n`;

      onUpdateQuestion(question.id, "statement",  (question.statement ?? "") + htmlImage);
};

const handleTestCasesUpload = async (file) => {
  try {
    setUploading(true);

    setUploadProgress({
      fileName: file.name,
      progress: 0,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("question_id", question.id);

    const { data } = await apiClient.post(
      "/faculty/upload-test-cases",
      formData,
      {
        onUploadProgress: (event) => {
          const progress = Math.round(
            (event.loaded * 100) / event.total
          );

          setUploadProgress({
            fileName: file.name,
            progress,
          });
        },
      }
    );

    setUploadProgress({
      fileName: file.name,
      progress: 100,
    });

    // dispatch(
    //   setUpdateProgress({
    //     questionId: question.id,
    //     filename: file.name,
    //     url: data.url,
    //     public_id: data.public_id,
    //   })
    // );

    onUploadTestCaseFile(question.id, {
  filename: file.name,
  url: data.url,
  public_id: data.public_id,
  testCases: data.testCases
});

// dispatch(
//   setTestCaseFile({
//     questionId: question.id,
//     filename: file.name,
//     url: data.url,
//     public_id: data.public_id,
//     testCases: data.testCases,
//   })
// );
  } catch (err) {
    console.error(err);
  } finally {
    setUploading(false);
  }
};



  return (
    <Card
      radius="lg"
      withBorder
      bg="var(--mantine-color-body)"
      p={20}
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
              bg="var(--mantine-color-default)"
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
              fw={400}
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
          placeholder="Difficulty"
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

          <Select
  w={150}
  placeholder="Output type"
  value={question.output_type}
  onChange={(value) =>
    onUpdateQuestion(
      question.id,
      "output_type",
       Number(value)
    )
  }
  data={[
    {
      group: "Standard One-Line Outputs",
      items: [
        { value: "3", label: "Exact Text Match (Standard)" },
        { value: "1", label: "Decimal Match (with Tolerance)" },
        { value: "2", label: "Strict Number/String Match" },
        { value: "4", label: "Unordered List / Array" },
      ],
    },
    {
      group: "Multi-line / Matrix Outputs",
      items: [
        { value: "5", label: "Exact Multi-line (Matrix)" },
        { value: "6", label: "Unordered Rows" },
        { value: "7", label: "Unordered Items in Strict Rows" },
        { value: "8", label: "Fully Unordered Multi-line" },
      ],
    },
  ]}
/>

          <Group>
              {/* <Group gap={6}>
                <Text
                  size="xs"
                  fw={700}
                  c="dimmed"
                >
                  Points
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
              </Group> */}

          <NumberInput
            value={question.marks}
            min={1}
            w={100}
            rightSection={
              <Text size="xs" c="dimmed" pr={10}>
                PTS
              </Text>
            }
            onChange={(value) =>
              onUpdateQuestion(question.id, "marks", value)
            }
          />

            <ActionIcon
  color="red"
  variant="light"
  mb={2}
  onClick={() => {
    onRemoveTestCase(question.id, tc.id);
  }}
>
  <Trash2 size={14} />
</ActionIcon>
          </Group>
        </Group>
        
        </Group>
      </Card.Section>

      <Stack p="lg">
        <MarkdownEditor
          value={question.statement}
          onChange={(markdown) =>
            onUpdateQuestion(
              question.id,
              "statement",
              markdown
            )
          }
        />



        <Paper
          p="md"
          radius="lg"
          bg="var(--mantine-color-default)"
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
                  PNG OR JPG UP TO 10MB
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
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
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

          {/* <Button
          variant=""
          leftSection={<CloudUpload size={16}/>}
          component="label">
            Upload
            <input
                hidden
                type="file"
                accept=".txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleTestCasesUpload(file);
                  }
                }}
              />
          </Button> */}

          {/* {!uploadProgress ? (
  <Button
    leftSection={<CloudUpload size={16} />}
    component="label"
  >
    Upload TXT

    <input
      hidden
      type="file"
      accept=".txt"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleTestCasesUpload(file);
      }}
    />
  </Button>
) : (
  <UploadCard
    fileName={uploadProgress.fileName}
    progress={uploadProgress.progress}
    uploading={uploading}
    onRemove={() => {
      setUploadProgress(null);
    }}
  />
)} */}

{question.testCaseFile?.url ? (
  <UploadCard
    fileName={question.testCaseFile.filename}
    uploading={uploading}
    url={question.testCaseFile.url}
    onRemove={() => { // Later, add a delete api
      onRemoveTestCaseFile(question.id);
      setUploadProgress(null);
    }}
  />
) : uploading ? (
  <UploadCard
    fileName={uploadProgress.fileName}
    progress={uploadProgress.progress}
    uploading={uploading}
    onRemove={() => {
      setUploadProgress(null);
    }}
  />
) : (
  <Group>
  <Button
    leftSection={<CloudUpload size={16} />}
    component="label"
  >
    Upload
    <input
      hidden
      type="file"
      accept=".pdf"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleTestCasesUpload(file);
      }}
    />
  </Button>

          <Button
            variant="subtle"
            // size="xs"
            leftSection={
              <Plus size={18} />
            }
            onClick={() =>
              onAddTestCase(
                question.id
              )
            }
          >
            Add
          </Button>
  </Group>
)}

          
            


        </Group>

 {tc && (
  <Paper
    p="lg"
    radius="md"
    bg="var(--mantine-color-default)"
  >
    <Group justify="space-between" mb="md">
      <Button
        variant="subtle"
        disabled={currentTestCase === 0}
        onClick={() =>
          setCurrentTestCase((i) => i - 1)
        }
      >
        Previous
      </Button>

      <Text fw={600}>
        Test Case {currentTestCase + 1} / {question.testCases.length}
      </Text>

      <Button
        variant="subtle"
        disabled={
          currentTestCase ===
          question.testCases.length - 1
        }
        onClick={() =>
          setCurrentTestCase((i) => i + 1)
        }
      >
        Next
      </Button>
    </Group>

    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Textarea
        label="INPUT"
        autosize
        minRows={5}
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

      <Group align="end">
        <Textarea
          flex={1}
          label="EXPECTED OUTPUT"
          autosize
          minRows={5}
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
)}
      </Stack>
    </Card>
  );
}
