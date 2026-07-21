import {
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
  Progress,
  Space
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../../../shared/components/Spinner.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import CodeSubmissionCard from "../components/CodeBox.jsx";
import { CircleCheck } from "lucide-react";
import EvaluationCard from "../components/EvaluationCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSubmissionDetail } from "../thunks/facultyThunks.js";
import { updateManualScore } from "../thunks/facultyThunks.js";
import { notifications } from "@mantine/notifications";


export default function ReviewSubmissionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { examId, sessionId } = useParams();

  const {
    studentSubmissionDetail: data,
    loading,
  } = useSelector((state) => state.faculty);

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchStudentSubmissionDetail({ examId, sessionId }));
  }, [dispatch, examId, sessionId]);

  const responses = data?.responses ?? [];

  const total_q = responses.length;
  
  const reviewed_q = useMemo(() => {
  return responses.filter((response) =>
    response.submission_history?.some(
      (submission) => submission.manual_score != null
    )
  ).length;
}, [responses]);
  
  

  useEffect(() => {
    setSelectedQuestion(0);
  }, [responses.length]);



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

  useEffect(() => {
  if (!currentResponse?.submission_history?.length) return;

  const bestIndex = currentResponse.submission_history.reduce(
    (best, submission, index, arr) =>
      submission.autograding_score >
      arr[best].autograding_score
        ? index
        : best,
    0
  );

  setSelectedSubmissionIndex(bestIndex);
}, [currentResponse]);


const handleSave = async () => {
  const payload = responses.flatMap((response) =>
    response.submission_history
      .filter((submission) => submission.manual_score != null)
      .map((submission) => ({
        submission_id: submission.id,
        manual_score: submission.manual_score,
      }))
  );

  try {
      await dispatch(updateManualScore({payload, sessionId})).unwrap();
      notifications.show({
        title: "Success",
        message: "Manual score updated successfully",
        color: "green",
      });
  } catch(error){
    console.error("Failed to update manual score", error);
    notifications.show({
          title: "Error",
          message: error?.message || "Failed to update manual score",
          color: "red",
        });
  }

};


  const student_name = data?.student_details?.name || 'Loading Name...';
  const university_id = data?.student_details?.university_id || '------';
  const exam_title = data?.exam_details?.title || 'Loading Exam Title...';

  const autoGradingMarks = useMemo(() => {
  return responses.reduce(
    (total, response) => total + (response.autograding_score ?? 0),
    0
  );
}, [responses]);

const manualScore = useMemo(() => {
  return responses.reduce((total, response) => {
    const submission =
      response.submission_history.find(
        (s) => s.manual_score != null
      ) ??
      response.submission_history.reduce(
        (best, current) =>
          current.autograding_score > best.autograding_score
            ? current
            : best
      );

    return total + (submission.manual_score ?? submission.autograding_score);
  }, 0);
}, [responses]);



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
            miw={220}
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
                 rightSection={
                   question.submission_history?.some(
                     (submission) => submission.manual_score != null
                   )
                     ? <CircleCheck size="14" />
                     : null
                 }
                 justify="space-between"
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

            <Stack>
               <Group justify="space-between">
          <Text fw={600}>
              Progress
            </Text>
            <Text fw={400}>
              {`${reviewed_q}/${total_q} Reviewed`}
            </Text>
            </Group>
            <Progress size="sm" value={reviewed_q/total_q * 100} />
          </Stack>
           
           <Stack>
             <Group justify="space-between">
          <Text fw={600}>
              Auto Graded Marks
            </Text>
            <Text fw={400}>
              {autoGradingMarks}
            </Text>
            </Group>


            <Progress size="sm" value={autoGradingMarks/total_q} />
           </Stack>

           <Stack>
             <Group justify="space-between">
          <Text fw={600}>
              Manual Score
            </Text>
            <Text fw={400}>
              {manualScore}
            </Text>
            </Group>


            <Progress size="sm" value={manualScore/total_q} />
           </Stack>


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
                  submission={currentSubmission}
                  handleSave={handleSave}
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
