import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuizHeader from "../components/QuizHeader";
import QuestionList from "../components/QuestionList";
import Spinner from "../../../shared/components/Spinner";
import { notifications } from "@mantine/notifications";
import { addQuestion, removeQuestion, updateQuestion, addTestCase, updateTestCase, setQuiz, resetQuiz, setTestCaseFile, removeTestCaseFile,} from "../reducers/quizSlice.js";
import { Paper, Stack, Text, ActionIcon, Group, Button, Center, } from "@mantine/core";
import { Plus } from "lucide-react";
import { createQuizThunk, fetchQuizThunk, updateQuizThunk } from "../thunks/facultyThunks.js";

export default function CreateQuizPage() {
  const { quizId } = useParams();
  const isEditMode = Boolean(quizId);
  const dispatch = useDispatch();

  const { currentQuiz, saving, loading, } = useSelector((state) => state.quiz);


  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchQuizThunk(quizId));
    }

    return () => {
      dispatch(resetQuiz());
    };
  }, [quizId, dispatch, isEditMode]);



  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleRemoveQuestion = (
    questionId
  ) => {
    dispatch(
      removeQuestion(questionId)
    );
  };

  const handleUpdateQuestion = (questionId, field, value) => {
    dispatch(
      updateQuestion({
        questionId,
        field,
        value,
      })
    );
  };

  // const handleAddTestCase = (questionId) => {
  //   dispatch(addTestCase({questionId}))
  // };

  // const handleUpdateTestCase = (questionId, testCaseId, field, value) => {
  //   dispatch(updateTestCase({questionId, testCaseId, field, value}));
  // };

  
  
  const handleAddTestCase = (questionId) => {
    dispatch(addTestCase({ questionId }));
  };
  
  const handleUpdateTestCase = (
    questionId,
    testCaseId,
    field,
    value
  ) => {
    dispatch(
      updateTestCase({
        questionId,
        testCaseId,
        field,
        value,
      })
    );
  };
  
  const handleUploadTestCaseFile = (questionId, file) => {
  dispatch(
    setTestCaseFile({
      questionId,
      ...file,
    })
  );
};

const handleRemoveTestCaseFile = (
  questionId
) => {
  dispatch(removeTestCaseFile(questionId));
};

const handlePublishQuiz = async () => {
  try {
    await dispatch(isEditMode ? updateQuizThunk({ quizId, data: currentQuiz }) : createQuizThunk(currentQuiz)).unwrap();
    console.log(currentQuiz);
    notifications.show({
      title: "Success",
      message: "Quiz published successfully",
      color: "green",
    });
  } catch (error) {
   console.error("PUBLISH ERROR", error);
    notifications.show({
      title: "Error",
      message: error?.message || "Failed to publish quiz",
      color: "red",
    });
  }
};

const handleDiscardChanges = () => {
  dispatch(resetQuiz());
};

if (loading){
  return (
    <Spinner />
  )
}

  return (
    <>
      <QuizHeader />

      {/* <QuestionList
        questions={
          currentQuiz.questions
        }
        onRemoveQuestion={
          handleRemoveQuestion
        }
        onUpdateQuestion={
          handleUpdateQuestion
        }
        onAddTestCase={
          handleAddTestCase
        }
        onUpdateTestCase={
          handleUpdateTestCase
        }
      /> */}

      <QuestionList
  questions={currentQuiz.questions}
  onRemoveQuestion={handleRemoveQuestion}
  onUpdateQuestion={handleUpdateQuestion}

  onAddTestCase={handleAddTestCase}
  onUpdateTestCase={handleUpdateTestCase}

  onUploadTestCaseFile={
    handleUploadTestCaseFile
  }

  onRemoveTestCaseFile={
    handleRemoveTestCaseFile
  }
/>

      <Paper
        withBorder
        mt={50}
        radius="xl"
        p={50}
        onClick={handleAddQuestion}
        style={{
          cursor: "pointer",
          borderStyle: "dashed",
          borderWidth: "2px",
          transition:
            "all 0.2s ease",
        }}
      >
        <Center>
          <Stack
            gap="md"
            align="center"
          >
            <ActionIcon
              size={60}
              radius="lg"
              variant="light"
            >
              <Plus size={30} />
            </ActionIcon>

            <Stack
              gap={4}
              align="center"
            >
              <Text
                size="xl"
                fw={700}
                c="blue"
              >
                Add New Question
              </Text>

              <Text
                size="sm"
                c="dimmed"
              >
                Define a new technical
                problem for this
                assessment
              </Text>
            </Stack>
          </Stack>
        </Center>
      </Paper>

        <Group
    justify="flex-end"
    mt="xl"
    style={{
      position: 'sticky',
      bottom: '10px'
    }}
  >
    <Button
      variant="default"
      onClick={handleDiscardChanges}
    >
      Discard Changes
    </Button>

    <Button
      loading={saving}
      onClick={handlePublishQuiz}
    >
      Publish Quiz
    </Button>
  </Group>
    </>
  );
}