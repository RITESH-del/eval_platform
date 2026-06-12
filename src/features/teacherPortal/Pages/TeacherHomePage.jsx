import React, { useState, useEffect } from 'react';
// import { fetchTeacherProfile, fetchPastPracticals, fetchQuizConfig } from '../api/teacherApi';
import Spinner from '../../../shared/components/Spinner';
import TeacherHomePageHeader from '../components/TeacherHomePageHeader';
import TeacherHomePageMiddleware from '../components/TeacherHomePageMiddleware';
import TeacherHomePageFooter from '../components/TeacherHomePageFooter';
import CreateQuizModal from '../components/CreateQuizModal';
import { useSelector, useDispatch } from 'react-redux';

import { fetchFacultyProfile, fetchPastPracticals, fetchQuizConfig } from '../models/facultyThunks';


const TeacherHomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const practicals = useSelector((state) => state.faculty.pastPracticals);
  const loading = useSelector((state) => state.faculty.loading);
  const profile = useSelector((state) => state.faculty.profile);
  const quizConfig = useSelector((state) => state.faculty.quizConfig);


  useEffect(()=>{
    dispatch(fetchFacultyProfile())
    dispatch(fetchPastPracticals())
    dispatch(fetchQuizConfig())
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] py-8 px-6 box-border">
      <div className="w-full flex flex-col gap-6">
        
        {/* Pass down setIsModalOpen trigger modifier if button lives inside header element layout */}
        <TeacherHomePageHeader profile={profile} onOpenModal={() => setIsModalOpen(true)} />
        <TeacherHomePageMiddleware practicals={practicals} />
        <TeacherHomePageFooter />
        
        {/* 5. Mounted the overlay container portal right at the very base layer */}
        <CreateQuizModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          configData={quizConfig}
        />

      </div>
    </div>
  );
};

export default TeacherHomePage;