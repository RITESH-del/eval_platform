// import React, { useState, useEffect } from 'react';
// // import { fetchTeacherProfile, fetchPastPracticals, fetchQuizConfig } from '../api/teacherApi';
// import Spinner from '../../../shared/components/Spinner';
// import TeacherHomePageHeader from '../components/TeacherHomePageHeader';
// import TeacherHomePageMiddleware from '../components/TeacherHomePageMiddleware';
// import TeacherHomePageFooter from '../components/TeacherHomePageFooter';
// import CreateQuizModal from '../components/CreateQuizModal';
// import { useSelector, useDispatch } from 'react-redux';

// import { fetchFacultyProfile, fetchPastPracticals, fetchQuizConfig } from '../models/facultyThunks';


// const TeacherHomePage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const dispatch = useDispatch();

//   const practicals = useSelector((state) => state.faculty.pastPracticals);
//   const loading = useSelector((state) => state.faculty.loading);
//   const profile = useSelector((state) => state.faculty.profile);
//   const quizConfig = useSelector((state) => state.faculty.quizConfig);


//   useEffect(()=>{
//     dispatch(fetchFacultyProfile())
//     dispatch(fetchPastPracticals())
//     dispatch(fetchQuizConfig())
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-[#f8fafc] py-8 px-6 box-border">
//       <div className="w-full flex flex-col gap-6">
        
//         {/* Pass down setIsModalOpen trigger modifier if button lives inside header element layout */}
//         <TeacherHomePageHeader profile={profile} onOpenModal={() => setIsModalOpen(true)} />
//         <TeacherHomePageMiddleware practicals={practicals} />
//         <TeacherHomePageFooter />
        
//         {/* 5. Mounted the overlay container portal right at the very base layer */}
//         <CreateQuizModal 
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           configData={quizConfig}
//         />

//       </div>
//     </div>
//   );
// };

// export default TeacherHomePage;


import { useEffect, useState } from "react";
import PracticalsTable from "../components/PracticalsTable";
import { useSelector, useDispatch } from 'react-redux';
import { Group, TextInput, Select } from "@mantine/core";
import { Search, Calendar } from "lucide-react";
import { fetchPastPracticals } from '../models/facultyThunks';
import Spinner from '../../../shared/components/Spinner.jsx';

export default function TeacherHomePage() {
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState(null);
  const [date, setDate] = useState("");
  
  const dispatch = useDispatch();
  const practicals = useSelector((state) => state.faculty.pastPracticals);
  const loading = useSelector((state) => state.faculty.loading);
 

  useEffect(()=>{
    dispatch(fetchPastPracticals())
  }, [dispatch]);

  if (loading) {
      return (
          <Spinner />
      );
    }

  const uniqueGraduationYears = Array.from(
    new Set((practicals || []).map((p) => p.target_graduation_year))
  )
    .filter(Boolean)
    .sort();

  const dropdownData = uniqueGraduationYears.map((year) => ({
    value: String(year),
    label: `${year - 4}-${year}`,
  }));

  const filteredPracticals = (practicals || []).filter((p) => {
    // 1. Search filter
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.target_section?.toLowerCase().includes(search.toLowerCase());

    // 2. Batch filter
    const matchesBatch = !batch || String(p.target_graduation_year) === String(batch);

    // 3. Date filter
    let matchesDate = true;
    if (date) {
      const pDate = new Date(p.start_time).toISOString().split("T")[0];
      matchesDate = pDate === date;
    }

    return matchesSearch && matchesBatch && matchesDate;
  });

  return (
  <>
  {/* Filter & Search bar */}
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

          <Group>
                  <Select
                    radius="xl"
                    w={120}
                    placeholder="All Batches"
                    value={batch}
                    onChange={setBatch}
                    data={dropdownData}
                    clearable
                  />
                </Group>
  
          <TextInput
            type="date"
            radius="xl"
            w={150}
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
            leftSection={<Calendar size={18} />}
          />
        </Group>

    {/* Practical Table */}
    <PracticalsTable
      practicals={filteredPracticals}
    />
  </>
  );
}