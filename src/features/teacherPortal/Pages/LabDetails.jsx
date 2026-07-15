import React, { useState, useEffect } from 'react';
import Spinner from '../../../shared/components/Spinner.jsx';
import { Box, Stack, Group, TextInput, Button, Badge, Select } from '@mantine/core';
import LabDetailsHeader from '../components/LabDetailsHeader.jsx';
import LabSubmissionTable from '../components/LabSubmissionTable.jsx';
import { fetchLabSubmissions } from '../thunks/facultyThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Search, Calendar, RefreshCw } from 'lucide-react';


const LabDetails = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const { examId } = useParams();


  const dispatch = useDispatch();

  const loading = useSelector((state) => state.faculty.loading);
  const details = useSelector((state) => state.faculty.selectedExam);
  const submissions = useSelector((state) => state.faculty.labSubmissions);
  
    useEffect(() => {
      dispatch(fetchLabSubmissions(examId));
    }, [dispatch]);


  if (loading) {
    return (
        <Spinner />
    );
  }

  const filteredSubmissions = (submissions || []).filter((sub) => {
    // 1. Search filter
    const matchesSearch =
      !search ||
      sub.name?.toLowerCase().includes(search.toLowerCase()) ||
      sub.university_id?.toLowerCase().includes(search.toLowerCase());

    // 2. Status filter
    let matchesStatus = true;
    if (status) {
      const subStatus = sub.status?.toLowerCase();
      if (status === "ongoing") {
        matchesStatus = subStatus === "ongoing" || subStatus === "allocated";
      } else if (status === "submitted") {
        matchesStatus = subStatus === "submitted";
      } else if (status === "evaluated") {
        matchesStatus =
          subStatus === "evaluated" ||
          (sub.total_manual_score !== null && sub.total_manual_score !== undefined);
      }
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc', padding: '2rem 1.5rem' }}>
      <Stack spacing="md">
        <LabDetailsHeader details={details} />
        <Group mb="xs" wrap="nowrap">
        <TextInput
          flex={1}
          radius="xl"
          value={search}
          onChange={(e) =>
            setSearch(e.currentTarget.value)
          }
          placeholder="Search student submissions..."
          leftSection={<Search size={18} />}
        />

        <Select
            radius="xl"
            w={120}
            placeholder="All Statuses"
            value={status}
            onChange={setStatus}
            clearable
            data={[
              { value: "ongoing", label: "Ongoing" },
              { value: "submitted", label: "Submitted" },
              { value: "evaluated", label: "Evaluated" },
            ]}
          />
      </Group>


        <LabSubmissionTable records = {filteredSubmissions} examId={examId}/>
        {/* <LabDetailsFooter /> */}
      </Stack>
    </Box>
  );
};

export default LabDetails;


