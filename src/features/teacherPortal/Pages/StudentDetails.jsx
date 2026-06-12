import React, { useState, useEffect } from 'react';
import { fetchStudentSubmissionDetail } from '../models/facultyThunks.js';
import Spinner from '../../../shared/components/Spinner.jsx';

import StudentDetailsHeader from '../components/StudentDetailsHeader.jsx';
import StudentDetailsMiddleware from '../components/StudentDetailsMiddleware.jsx';
import StudentDetailsFooter from '../components/StudentDetailsFooter.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const StudentDetails = () => {
  const { examId, sessionId } = useParams();
  const dispatch = useDispatch();

  const {studentSubmissionDetail, loading} = useSelector((state) => state.faculty);


  useEffect(() => {
    dispatch(fetchStudentSubmissionDetail({examId, sessionId}));
  }, [examId, sessionId]);



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
        
        <StudentDetailsHeader data={studentSubmissionDetail} />
        <StudentDetailsMiddleware data={studentSubmissionDetail} />
        <StudentDetailsFooter />
        
      </div>
    </div>
  );
};

export default StudentDetails;