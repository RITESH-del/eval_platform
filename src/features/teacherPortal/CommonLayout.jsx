
import { useState, useEffect } from "react";
import { AppShell } from "@mantine/core";
import Sidebar from "../../shared/components/Layout/Sidebar.jsx";
import Header from "../../shared/components/Layout/Header.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FileText, ListTodo, CircleHelp, Plus } from "lucide-react";
import { Button } from "@mantine/core";
import { fetchFacultyProfile } from './thunks/facultyThunks.js';

const sidebarConfig = [
  {
    label: "Practicals",
    leftSection: <FileText size={18} />,
    href: "/Faculty"
  },
  {
    label: "Live Monitoring",
    leftSection: <ListTodo size={18} />,
    href: "/Faculty/Lab-Sessions"
  },
  "divider", 
  {
    label: "Support",
    leftSection: <CircleHelp size={18} />,
    href: "/Faculty/Support"
  },
];

export default function CommonLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const profile = useSelector((state) => state.faculty.profile);

  useEffect(() => {
    dispatch(fetchFacultyProfile());
  }, []);

  return (
    <AppShell
      navbar={{
        width: collapsed ? 80 : 280,
        breakpoint: 0,
      }}
      padding="lg"
    >
      <Sidebar
        profile={profile}
        collapsed={collapsed}
        toggleSidebar={() =>
          setCollapsed((prev) => !prev)
        }
        sidebarConfig={sidebarConfig}
        children={<Button
          variant="light"
          leftSection={<Plus size={18} />}
          fullWidth={!collapsed}
          onClick={() => navigate("/Faculty/create-practical")}
        >
          {!collapsed && "New Practical"}
        </Button>}
      />
      <AppShell.Main>
        <Header location={ pathname }/>

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}