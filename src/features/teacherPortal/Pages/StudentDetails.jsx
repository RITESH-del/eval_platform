import {
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Spinner from "../../../shared/components/Spinner.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import CodeSubmissionCard from "../components/CodeBox.jsx";
import EvaluationCard from "../components/EvaluationCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSubmissionDetail } from "../thunks/facultyThunks.js";

export default function ReviewSubmissionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { examId, sessionId } = useParams();

  const {
    studentSubmissionDetail: data,
    loading,
  } = useSelector((state) => state.faculty);

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] =
    useState(0);

  useEffect(() => {
    dispatch(fetchStudentSubmissionDetail({ examId, sessionId }));
  }, [dispatch, examId, sessionId]);

  const responses = data?.responses ?? [];

  useEffect(() => {
    setSelectedQuestion(0);
    setSelectedSubmissionIndex(0);
  }, [responses.length]);

  useEffect(() => {
    setSelectedSubmissionIndex(0);
  }, [selectedQuestion]);

  const currentResponse =
    responses[selectedQuestion] ?? null;

  const currentSubmission = useMemo(() => {
    if (!currentResponse) return null;

    return (
      currentResponse.submission_history?.[
        selectedSubmissionIndex
      ] ??
      currentResponse.submission_history?.[0] ??
      null
    );
  }, [currentResponse, selectedSubmissionIndex]);



  const student_name = data?.student_details?.name || 'Loading Name...';
  const university_id = data?.student_details?.university_id || '------';
  const exam_title = data?.exam_details?.title || 'Loading Exam Title...';


  if (loading) {
    return <Spinner />;
  }

  return (
    <Container size="xl" py="lg">
      <Stack gap="lg">

        {/* <Button
          variant="subtle"
          leftSection={<ChevronLeft size={18} />}
          w="fit-content"
          onClick={() => navigate(-1)}
        >
          Back
        </Button> */}

        <div>
          <Title order={1}>
            Review Submission:
            <Text component="span" c="blue" inherit>
              {" "}
              {data?.student_details?.name}
            </Text>
          </Title>

          <Group mt={6}>
            <Text ff="monospace">
              {data?.student_details?.university_id}
            </Text>

            <Text c="dimmed">
              {data?.exam_details?.title}
            </Text>
          </Group>
        </div>

        <Group align="flex-start" wrap="nowrap">

          <Stack
            w={220}
            p="sm"
            style={{
              border:
                "1px solid var(--mantine-color-gray-3)",
              borderRadius: 12,
              position: 'sticky',
              top: '20px',
            }}
          >
            <Text fw={600}>
              Questions
            </Text>

            {responses.map((question, index) => (
              <Button
                key={question.question_id}
                 fullWidth
                 justify="flex-start"
                variant={
                  selectedQuestion === index
                    ? "filled"
                    : "subtle"
                }
                onClick={() =>
                  setSelectedQuestion(index)
                }
              >
                Q{index + 1}
              </Button>
            ))}
          </Stack>

          <Stack flex={1}>

            {currentResponse && currentSubmission && (
              <>
              <div style={{
                overflowY: "auto",
                minHeight: 800,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                // hide scroll bar
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}>
                <QuestionCard
                  title={currentResponse.title}
                  question={currentResponse.description}
                />

                <CodeSubmissionCard
                  submissionHistory={
                    currentResponse.submission_history
                  }
                  selectedIndex={
                    selectedSubmissionIndex
                  }
                  onSubmissionChange={
                    setSelectedSubmissionIndex
                  }
                />
</div>

                <div
                  style={{
                    position: "sticky",
                    bottom: 0,
                    zIndex: 20,
                    background:
                      "var(--mantine-color-body)",
                    paddingTop: 8,
                  }}
                >
                <EvaluationCard
                  response={currentResponse}
                  submission={currentSubmission}
                />
                </div>
                </>
            )}

          </Stack>

        </Group>

      </Stack>
    </Container>
  );
}
