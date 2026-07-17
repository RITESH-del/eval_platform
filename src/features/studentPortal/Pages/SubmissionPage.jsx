import {
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
  Progress,
  Paper,
  Accordion,
  Divider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../../../shared/components/Spinner.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import CodeSubmissionCard from "../components/CodeBox.jsx";
import EvaluationCard from "../components/EvaluationCard.jsx";
import { CircleCheck, ChevronLeft } from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  fetchStudentSubmissionDetail,
} from "../../teacherPortal/thunks/facultyThunks.js";

export default function ReviewSubmissionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { examId, sessionId } = useParams();

  const {
    studentSubmissionDetail: data,
    loading,
  } = useSelector(
    (state) => state.faculty
  );

  const isMobile = useMediaQuery("(max-width: 48em)");

  const [selectedQuestion, setSelectedQuestion] =
    useState(0);

  const [
    selectedSubmissionIndex,
    setSelectedSubmissionIndex,
  ] = useState(0);

  const [
    sidebarOpened,
    setSidebarOpened,
  ] = useState(false);

  useEffect(() => {
    dispatch(
      fetchStudentSubmissionDetail({
        examId,
        sessionId,
      })
    );
  }, [dispatch, examId, sessionId]);

  const responses =
    data?.responses ?? [];

  const total_q = responses.length;

  useEffect(() => {
    setSelectedQuestion(0);
  }, [responses.length]);

  const currentResponse =
    responses[selectedQuestion] ?? null;

  const currentSubmission =
    useMemo(() => {
      if (!currentResponse)
        return null;

      return (
        currentResponse
          .submission_history?.[
          selectedSubmissionIndex
        ] ??
        currentResponse
          .submission_history?.[0] ??
        null
      );
    }, [
      currentResponse,
      selectedSubmissionIndex,
    ]);

  useEffect(() => {
    if (
      !currentResponse?.submission_history
        ?.length
    )
      return;

    const bestIndex =
      currentResponse.submission_history.reduce(
        (
          best,
          submission,
          index,
          arr
        ) =>
          submission.autograding_score >
          arr[best]
            .autograding_score
            ? index
            : best,
        0
      );

    setSelectedSubmissionIndex(
      bestIndex
    );
  }, [currentResponse]);

  const autoGradingMarks =
    useMemo(() => {
      return responses.reduce(
        (total, response) =>
          total +
          (response.autograding_score ??
            0),
        0
      );
    }, [responses]);

  const manualScore = useMemo(() => {
    return responses.reduce(
      (total, response) => {
        const submission =
          response.submission_history.find(
            (s) =>
              s.manual_score != null
          ) ??
          response.submission_history.reduce(
            (
              best,
              current
            ) =>
              current.autograding_score >
              best.autograding_score
                ? current
                : best
          );

        return (
          total +
          (submission.manual_score ??
            submission.autograding_score)
        );
      },
      0
    );
  }, [responses]);

  if (loading) {
    return <Spinner />;
  }

  const student_name =
    data?.student_details?.name ??
    "Loading Name...";

  const university_id =
    data?.student_details
      ?.university_id ??
    "------";

  const exam_title =
    data?.exam_details?.title ??
    "Loading Exam Title...";

    return (
  <Container size="xl" py="lg">
    <Stack gap="lg">
      <div>
        <Title order={1}>{exam_title}</Title>

        <Group mt={6}>
          <Text ff="monospace">{university_id}</Text>

          <Text c="dimmed">
            {student_name}
          </Text>
        </Group>
      </div>

      {/* ===========================
          Desktop Layout
      ============================ */}
      {!isMobile ? (
        <Group align="flex-start" wrap="nowrap">

          <Paper
            w={240}
            p="sm"
            withBorder
            radius="md"
            style={{
              position: "sticky",
              top: 20,
              alignSelf: "flex-start",
            }}
          >
            <Stack gap="sm">

              <Text fw={600}>
                Questions
              </Text>

              {responses.map(
                (question, index) => (
                  <Button
                    key={
                      question.question_id
                    }
                    fullWidth
                    justify="space-between"
                    variant={
                      selectedQuestion ===
                      index
                        ? "filled"
                        : "subtle"
                    }
                    rightSection={
                      question.submission_history?.some(
                        (submission) =>
                          submission.manual_score !=
                          null
                      ) ? (
                        <CircleCheck
                          size={14}
                        />
                      ) : null
                    }
                    onClick={() =>
                      setSelectedQuestion(
                        index
                      )
                    }
                  >
                    Question {index + 1}
                  </Button>
                )
              )}

              <Divider my="xs" />

              <Stack gap={4}>
                <Group justify="space-between">
                  <Text fw={600}>
                    Auto Grade
                  </Text>

                  <Text>
                    {autoGradingMarks}
                  </Text>
                </Group>

                <Progress
                  value={
                    total_q
                      ? (autoGradingMarks /
                          total_q) *
                        100
                      : 0
                  }
                />
              </Stack>

              <Stack gap={4}>
                <Group justify="space-between">
                  <Text fw={600}>
                    Manual Score
                  </Text>

                  <Text>
                    {manualScore}
                  </Text>
                </Group>

                <Progress
                  value={
                    total_q
                      ? (manualScore /
                          total_q) *
                        100
                      : 0
                  }
                />
              </Stack>
            </Stack>
          </Paper>

          <Stack flex={1} gap="md">

            {currentResponse &&
              currentSubmission && (
                <>
                  <Stack
                    gap="md"
                    style={{
                      minHeight: 800,
                    }}
                  >
                    <QuestionCard
                      title={
                        currentResponse.title
                      }
                      question={
                        currentResponse.description
                      }
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
                  </Stack>

                  <div
                    style={{
                      position:
                        "sticky",
                      bottom: 0,
                      zIndex: 20,
                      background:
                        "var(--mantine-color-body)",
                      paddingTop: 8,
                    }}
                  >
                    <EvaluationCard
                      submission={
                        currentSubmission
                      }
                    />
                  </div>
                </>
              )}
          </Stack>
        </Group>
      ) : (
        /* ===========================
             Mobile Layout
        ============================ */
        <Stack gap="md">

          {/* <Paper
            withBorder
            radius="md"
            p="sm"
          >
            <Group justify="space-between">

              <Text fw={600}>
                Questions
              </Text>

              <Burger
                opened={
                  sidebarOpened
                }
                onClick={() =>
                  setSidebarOpened(
                    (o) => !o
                  )
                }
                size="sm"
              />
            </Group>

            <Collapse
              in={sidebarOpened}
            >
              <Stack mt="md">

                {responses.map(
                  (
                    question,
                    index
                  ) => (
                    <Button
                      key={
                        question.question_id
                      }
                      fullWidth
                      justify="space-between"
                      variant={
                        selectedQuestion ===
                        index
                          ? "filled"
                          : "subtle"
                      }
                      rightSection={
                        question.submission_history?.some(
                          (
                            submission
                          ) =>
                            submission.manual_score !=
                            null
                        ) ? (
                          <CircleCheck
                            size={14}
                          />
                        ) : null
                      }
                      onClick={() => {
                        setSelectedQuestion(
                          index
                        );

                        setSidebarOpened(
                          false
                        );
                      }}
                    >
                      Question{" "}
                      {index + 1}
                    </Button>
                  )
                )}

                <Divider />

                <Group justify="space-between">
                  <Text fw={600}>
                    Auto Grade
                  </Text>

                  <Text>
                    {autoGradingMarks}
                  </Text>
                </Group>

                <Progress
                  value={
                    total_q
                      ? (autoGradingMarks /
                          total_q) *
                        100
                      : 0
                  }
                />

                <Group justify="space-between">
                  <Text fw={600}>
                    Manual Score
                  </Text>

                  <Text>
                    {manualScore}
                  </Text>
                </Group>

                <Progress
                  value={
                    total_q
                      ? (manualScore /
                          total_q) *
                        100
                      : 0
                  }
                />
              </Stack>
            </Collapse>
          </Paper> */}

          <Accordion
  variant="contained"
  radius="md"
  defaultValue="questions"
>
  <Accordion.Item value="questions">
    <Accordion.Control>
      <Text fw={600}>Questions</Text>
    </Accordion.Control>

    <Accordion.Panel>
      <Stack>

        {responses.map((question, index) => (
          <Button
            key={question.question_id}
            fullWidth
            justify="space-between"
            variant={
              selectedQuestion === index
                ? "filled"
                : "subtle"
            }
            rightSection={
              question.submission_history?.some(
                (submission) =>
                  submission.manual_score != null
              ) ? (
                <CircleCheck size={14} />
              ) : null
            }
            onClick={() => {
              setSelectedQuestion(index);
            }}
          >
            Question {index + 1}
          </Button>
        ))}

        <Divider />

        <Group justify="space-between">
          <Text fw={600}>Auto Grade</Text>
          <Text>{autoGradingMarks}</Text>
        </Group>

        <Progress
          value={
            total_q
              ? (autoGradingMarks / total_q) * 100
              : 0
          }
        />

        <Group justify="space-between">
          <Text fw={600}>Manual Score</Text>
          <Text>{manualScore}</Text>
        </Group>

        <Progress
          value={
            total_q
              ? (manualScore / total_q) * 100
              : 0
          }
        />

      </Stack>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>

          {currentResponse &&
            currentSubmission && (
              <>
                <QuestionCard
                  title={
                    currentResponse.title
                  }
                  question={
                    currentResponse.description
                  }
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

                <EvaluationCard
                  submission={
                    currentSubmission
                  }
                />
              </>
            )}
        </Stack>
      )}
    </Stack>
  </Container>
);
}