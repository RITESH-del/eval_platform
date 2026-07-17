import StudentHomePageMiddleware from '../components/StudentHomePageMiddleware.jsx';
import StudentHomePageFooter from '../components/StudentHomePageFooter.jsx';
import StudentExamResultsPage from '../components/StudentResultTable.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentExams } from '../models/studentThunks.js';
import { useEffect } from 'react';
import Spinner from '../../../shared/components/Spinner.jsx'
import { Title, Text } from '@mantine/core';


export default function StudentHomePage() {
  const dispatch = useDispatch();
  const { exams, loadingExams } = useSelector((state)=>state.student);

  useEffect(()=>{
    dispatch(fetchStudentExams())
  },[])


  if(loadingExams){
    return (
      <Spinner />
    )
  }

  return (
    <div className="text-gray-900 min-h-screen font-body-lg overflow-x-hidden">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Title order={2} c="blue">
            Exam Results
          </Title>

          <Text c="dimmed" size="sm">
            View your completed and
            pending examinations.
          </Text>
        </div>
      </div>
      
        <StudentExamResultsPage records={exams} />

        {/* Footer */}
        <StudentHomePageFooter />
    </div>
  );
}
