import React, { useState, useEffect } from 'react';
import { fetchLabDetails, fetchLabSubmissions } from '../api/teacherApi.js';
import Spinner from '../../../shared/components/Spinner.jsx';

import LabDetailsHeader from '../components/LabDetailsHeader.jsx';
import LabDetailsMiddleware from '../components/LabDetailsMiddleware.jsx';
import LabDetailsFooter from '../components/LabDetailsFooter.jsx';

const LabDetails = () => {
  const [details, setDetails] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPageData() {
      try {
        const [detailsRes, submissionsRes] = await Promise.all([
          fetchLabDetails(),
          fetchLabSubmissions()
        ]);
        
        setDetails(detailsRes);
        setSubmissions(submissionsRes);
      } catch (error) {
        console.error("Failed to load lab details data", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPageData();
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
        
        <LabDetailsHeader details={details} />
        <LabDetailsMiddleware submissions={submissions} />
        <LabDetailsFooter />
        
      </div>
    </div>
  );
};

export default LabDetails;