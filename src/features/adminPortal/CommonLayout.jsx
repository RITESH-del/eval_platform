
import { useState, useEffect } from "react";
import { AppShell } from "@mantine/core";
import Sidebar from "../../shared/components/Layout/Sidebar.jsx";
import Header from "../../shared/components/Layout/Header.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserRoundPen, Plus } from "lucide-react";
import { Button } from "@mantine/core";
import { fetchProfile } from './thunks/adminThunks.js';

const sidebarConfig = [

  {
    label: "Manage Faculty",
    leftSection: <UserRoundPen />,
    href: "/admin"
  },
  {
    label: "Manage Students",
    leftSection: <Plus size={18} />,
    href: "/admin/manage-students"
  },
  // {
  //   label: "Manage Support",
  //   leftSection: <Plus size={18} />,
  //   href: "/admin/support"
  // },
  // {
  //   label: "Support",
  //   leftSection: <CircleHelp size={18} />,
  //   href: "/admin/support"
  // },
  // {
  //   label: "Logout",
  //   leftSection: <LogOut size={18}/>,
  //   onClick: () => {
  //     localStorage.removeItem("token");
  //     navigate("/login");
  //   }
  // }

];

export default function CommonLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const profile = useSelector((state) => state.admin.profile);

  useEffect(() => {
    dispatch(fetchProfile());
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
        // children={<Button
        //   variant="light"
        //   leftSection={<Plus size={18} />}
        //   fullWidth={!collapsed}
        //   onClick={() => navigate("/Faculty/create-practical")}
        // >
        //   {!collapsed && "New Practical"}
        // </Button>}
      />
      <AppShell.Main>
        <Header location={ pathname }/>

        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}