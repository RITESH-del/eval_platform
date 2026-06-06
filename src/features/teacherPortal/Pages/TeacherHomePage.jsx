import React, { useState, useEffect } from 'react';
// 1. Added fetchQuizConfig to your API imports list
import { fetchTeacherProfile, fetchPastPracticals, fetchQuizConfig } from '../api/teacherApi';
import Spinner from '../../../shared/components/Spinner';

import TeacherHomePageHeader from '../components/TeacherHomePageHeader';
import TeacherHomePageMiddleware from '../components/TeacherHomePageMiddleware';
import TeacherHomePageFooter from '../components/TeacherHomePageFooter';
// 2. Import your new modal layout component
import CreateQuizModal from '../components/CreateQuizModal';

const TeacherHomePage = () => {
  const [profile, setProfile] = useState(null);
  const [practicals, setPracticals] = useState([]);
  // 3. Added local states to handle the popup visibility and track option lists
  const [quizConfig, setQuizConfig] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 4. Added fetchQuizConfig() into Promise.all to fetch all assets concurrently
        const [profileRes, practicalsRes, configRes] = await Promise.all([
          fetchTeacherProfile(),
          fetchPastPracticals(),
          fetchQuizConfig()
        ]);
        
        setProfile(profileRes);
        setPracticals(practicalsRes);
        setQuizConfig(configRes); // Store JSON configuration array properties
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
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