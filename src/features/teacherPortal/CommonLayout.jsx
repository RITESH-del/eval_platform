
import { useState, useEffect } from "react";
import { AppShell } from "@mantine/core";
import FacultySidebar from "./components/Sidebar";
import FacultyHeader from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchFacultyProfile, fetchQuizConfig } from './thunks/facultyThunks.js';

export default function CommonLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();


  const profile = useSelector((state) => state.faculty.profile);

  useEffect(() => {
    dispatch(fetchFacultyProfile());
    dispatch(fetchQuizConfig());
  }, []);

  return (
    <AppShell
      navbar={{
        width: collapsed ? 80 : 280,
        breakpoint: 0,
      }}
      padding="lg"
    >
      <FacultySidebar
        profile={profile}
        collapsed={collapsed}
        toggleSidebar={() =>
          setCollapsed((prev) => !prev)
        }
      />
      <AppShell.Main>
        <FacultyHeader location={ pathname }/>

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}