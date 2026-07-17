
import { useState, useEffect } from "react";
import { AppShell } from "@mantine/core";
import Sidebar from "../../shared/components/Layout/Sidebar.jsx";
import Header from "../../shared/components/Layout/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from './models/studentThunks.js';
import { FileText, ListTodo, CircleHelp } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";


const sidebarConfig = [
  {
    label: "Exam Results",
    leftSection: <ListTodo size={18} />,
    href: "/student"
  },
  {
    label: "Dashboard",
    leftSection: <FileText size={18} />,
    href: "/student/dashboard"
  },
  "divider", 
  {
    label: "Support",
    leftSection: <CircleHelp size={18} />,
    href: "/student/Support"
  },
];

export default function CommonLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const isMobile = useMediaQuery("(max-width: 48em)");


  const dispatch = useDispatch();

  const profile = useSelector((state) => state.student.profile);

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, []);

  return (
    <AppShell
      navbar={
    isMobile
      ? undefined
      : {
          width: collapsed ? 80 : 280,
          breakpoint: 0,
        }
  }
  padding={isMobile ? "xl" : "lg"}
    >
      {!isMobile && (
          <Sidebar
            profile={profile}
            collapsed={collapsed}
            toggleSidebar={() =>
              setCollapsed((prev) => !prev)
            }
            sidebarConfig={sidebarConfig}
          />
        )}
      <AppShell.Main
        px={isMobile ? "lg" : ""}
        py={isMobile ? "lg" : ""}
      >
        {!isMobile && (
          <Header location={pathname} />
        )}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}