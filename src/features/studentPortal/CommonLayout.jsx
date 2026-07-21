
import { useState, useEffect } from "react";
import { AppShell, Container } from "@mantine/core";
// import Sidebar from "../../shared/components/Layout/Sidebar.jsx";
// import Header from "../../shared/components/Layout/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from './models/studentThunks.js';
import { FileText, ListTodo, CircleHelp } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import Header from "./components/Header.jsx";
import { useNavigate } from 'react-router';
import { logout } from "../auth/models/authSlice";


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
  const navigate = useNavigate();

  const profile = useSelector((state) => state.student.profile);

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, []);

    const handleLogout = () => {
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
    };

  return (
    <AppShell
     padding="md"
     header={{ height: 70 }}
  //     navbar={
  //   isMobile
  //     ? undefined
  //     : {
  //         width: collapsed ? 80 : 280,
  //         breakpoint: 0,
  //       }
  // }
  // padding={isMobile ? "xl" : "lg"}
    >
      {/* {!isMobile && (
          <Sidebar
            profile={profile}
            collapsed={collapsed}
            toggleSidebar={() =>
              setCollapsed((prev) => !prev)
            }
            sidebarConfig={sidebarConfig}
          />
        )} */}

    <AppShell.Header>
    <Header
      user={profile}
      onSupport={() => navigate("/student/support")}
      onLogout={handleLogout}
    />
    </AppShell.Header>

      <AppShell.Main>
        {/* {!isMobile && (
          // <Header location={pathname} />
        )} */}
      {!isMobile ? (
      <Container
        size="xl"
        py="md"
        px="3xl"
      > <Outlet />
        </Container>
      ) : (
      <Outlet />
      )}
      </AppShell.Main>
    </AppShell>
  );
}