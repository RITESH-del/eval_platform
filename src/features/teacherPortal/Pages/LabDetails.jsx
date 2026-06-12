import React, { useEffect } from 'react';
import { fetchLabSubmissions } from '../models/facultyThunks.js';
import Spinner from '../../../shared/components/Spinner.jsx';
import { Box, Stack } from '@mantine/core';
import LabDetailsHeader from '../components/LabDetailsHeader.jsx';
import LabDetailsMiddleware from '../components/LabDetailsMiddleware.jsx';
import LabDetailsFooter from '../components/LabDetailsFooter.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const LabDetails = () => {
  const { examId } = useParams();

  const dispatch = useDispatch();
  
  const loading = useSelector((state) => state.faculty.loading);
  const details = useSelector((state) => state.faculty.selectedExam);
  const submissions = useSelector((state) => state.faculty.labSubmissions);

  useEffect(() => {
    dispatch(fetchLabSubmissions(examId));
  }, [examId]);


  if (loading) {
    return (
      <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc', padding: '2rem 1.5rem' }}>
      <Stack spacing="md">
        <LabDetailsHeader details={details} />
        <LabDetailsMiddleware submissions={submissions} />
        <LabDetailsFooter />
      </Stack>
    </Box>
  );
};

export default LabDetails;