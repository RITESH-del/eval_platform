// import React, { useState, useEffect } from 'react';
// import { fetchStudentSubmissionDetail } from '../models/facultyThunks.js';
// import Spinner from '../../../shared/components/Spinner.jsx';

// import StudentDetailsHeader from '../components/StudentDetailsHeader.jsx';
// import StudentDetailsMiddleware from '../components/StudentDetailsMiddleware.jsx';
// import StudentDetailsFooter from '../components/StudentDetailsFooter.jsx';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';


// const StudentDetails = () => {
//   const { examId, sessionId } = useParams();
//   const dispatch = useDispatch();

//   const {studentSubmissionDetail, loading} = useSelector((state) => state.faculty);


//   useEffect(() => {
//     dispatch(fetchStudentSubmissionDetail({examId, sessionId}));
//   }, [examId, sessionId]);

//   if (loading) {
//     return (
//         <Spinner />
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-[#f8fafc] py-8 px-6 box-border">
//       <div className="w-full flex flex-col gap-6">
        
//         <StudentDetailsHeader data={studentSubmissionDetail} />
//         <StudentDetailsMiddleware data={studentSubmissionDetail} />
//         <StudentDetailsFooter />
        
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;


import {
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useState, useEffect } from 'react';
import { ChevronLeft } from "lucide-react";
import Spinner from '../../../shared/components/Spinner.jsx';
import QuestionCard from "../components/QuestionCard.jsx";
import CodeSubmissionCard from "../components/CodeBox.jsx";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentSubmissionDetail } from '../models/facultyThunks.js';



export default function ReviewSubmissionPage() {

  const { examId, sessionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {studentSubmissionDetail: data, loading} = useSelector((state) => state.faculty);


  useEffect(() => {
    dispatch(fetchStudentSubmissionDetail({examId, sessionId}));
  }, [examId, sessionId]);

  const student_name = data?.student_details?.name || 'Loading Name...';
  const university_id = data?.student_details?.university_id || '------';
  const exam_title = data?.exam_details?.title || 'Loading Exam Title...';


  const code = `
#include <iostream>
using namespace std;

int main() {
    int queue[100];
    int front = 0;
    int rear = 0;

    queue[rear++] = 10;

    cout << queue[front];

    return 0;
}
`;

if (loading) {
    return (
        <Spinner />
    );
  }

  return (
    <Container size="xl" py="lg">
      <Stack gap="lg">

        <Button
          variant="subtle"
          leftSection={<ChevronLeft size={18} />}
          w="fit-content"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <div>
          <Title order={1}>
            Review Submission:
            <Text component="span" c="blue" inherit>
              {" "}
              {student_name}
            </Text>
          </Title>

          <Group mt={6}>
            <Text ff="monospace">{university_id}</Text>

            <Text c="dimmed">
              {exam_title}
            </Text>
          </Group>
        </div>

        {data?.responses?.map((res) => (
  <React.Fragment key={res.question_id}>
    <QuestionCard
      title={res.title}
      question={res.description}
    />

    <CodeSubmissionCard
      submissionHistory={res.submission_history}
    />
  </React.Fragment>
))}


      </Stack>
    </Container>
  );
}

