import { Stack } from "@mantine/core";
import Question from "./Question";

export default function QuestionList({
  questions,
  onRemoveQuestion,
  onUpdateQuestion,
  onAddTestCase,
  onUpdateTestCase
}) {
  return (
    <Stack>
      {questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          index={index}
          onRemoveQuestion={onRemoveQuestion}
          onUpdateQuestion={onUpdateQuestion}
          onAddTestCase={onAddTestCase}
          onUpdateTestCase={onUpdateTestCase}
        />
      ))}
    </Stack>
  );
}