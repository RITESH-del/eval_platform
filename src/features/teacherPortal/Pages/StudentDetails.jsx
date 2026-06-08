import React, { useState, useEffect } from 'react';
import { fetchStudentSubmissionDetail } from '../api/teacherApi.js';
import Spinner from '../../../shared/components/Spinner.jsx';

import StudentDetailsHeader from '../components/StudentDetailsHeader.jsx';
import StudentDetailsMiddleware from '../components/StudentDetailsMiddleware.jsx';
import StudentDetailsFooter from '../components/StudentDetailsFooter.jsx';

const StudentDetails = () => {
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const response = await fetchStudentSubmissionDetail();
        setSubmissionData(response);
      } catch (error) {
        console.error("Error reading submission schema data", error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkspace();
  }, []);

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
        
        <StudentDetailsHeader data={submissionData} />
        <StudentDetailsMiddleware data={submissionData} />
        <StudentDetailsFooter />
        
      </div>
    </div>
  );
};

export default StudentDetails;