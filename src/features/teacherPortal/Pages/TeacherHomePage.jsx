import React, { useState, useEffect } from 'react';
import { fetchTeacherProfile, fetchPastPracticals } from '../api/teacherApi';
import Spinner from '../../../shared/components/Spinner';

import TeacherHomePageHeader from '../components/TeacherHomePageHeader';
import TeacherHomePageMiddleware from '../components/TeacherHomePageMiddleware';
import TeacherHomePageFooter from '../components/TeacherHomePageFooter';

const TeacherHomePage = () => {
  const [profile, setProfile] = useState(null);
  const [practicals, setPracticals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [profileRes, practicalsRes] = await Promise.all([
          fetchTeacherProfile(),
          fetchPastPracticals()
        ]);
        setProfile(profileRes);
        setPracticals(practicalsRes);
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
    // Changed px-12 to px-6 to maximize screen space, and removed max-w restriction
    <div className="min-h-screen w-full bg-[#f8fafc] py-8 px-6 box-border">
      <div className="w-full flex flex-col gap-6">
        
        <TeacherHomePageHeader profile={profile} />
        <TeacherHomePageMiddleware practicals={practicals} />
        <TeacherHomePageFooter />
        
      </div>
    </div>
  );
};

export default TeacherHomePage;