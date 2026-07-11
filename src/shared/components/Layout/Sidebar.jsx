import {
  AppShell,
  NavLink,
  Button,
  Stack,
  Group,
  Text,
  Avatar,
  Divider,
  ActionIcon,
} from "@mantine/core";

import {
  GraduationCap,
  FileText,
  ListTodo,
  CircleHelp,
  LogOut,
  Menu,
} from "lucide-react";

import { logout } from '../../../features/auth/models/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const sidebarConfig = [
  {
    label: "Dashboard",
    leftSection: <FileText size={18} />,
    href: "/student/dashboard"
  },
  {
    label: "Exam Results",
    leftSection: <ListTodo size={18} />,
    href: "/student/results"
  },
  "divider", 
  {
    label: "Support",
    leftSection: <CircleHelp size={18} />,
    href: "/student/Support"
  },
];

export default function Sidebar({
  collapsed,
  toggleSidebar,
  sidebarConfig,
  profile,
  children,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { name, email, university_id, role } = profile || { name: "Loading...   ", email: "Loading...", university_id: "Loading...", role: "Loading..." };

  const initials = name?.split(" ")?.map(word => word[0])
  .join("").toUpperCase();

  return (
    <AppShell.Navbar p="md">
      <Group justify="space-between" mb="lg">
        {!collapsed && (
          <Group gap="xs">
            <GraduationCap size={24} />
            <Text fw={700}>Brand Name</Text>
          </Group>
        )}

        <ActionIcon
          variant="subtle"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </ActionIcon>
      </Group>

      <Stack gap="xs">
        {sidebarConfig.map((item, index) => {
            if (item === "divider") {
               return <Divider key={index} my="sm" />;
            }

            return (
          <NavLink
            key={item.label}
            label={!collapsed ? item.label : null}
            leftSection={item.leftSection}
            onClick={() => navigate(item.href)}
            active={pathname === item.href}
            
          />)
        
})}

      </Stack>

      <Stack mt="auto">

        { children }

        <Button
          variant="transparent"
          c="dimmed"
          leftSection={<LogOut size={18} />}
          fullWidth={!collapsed}
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(logout());
            navigate("/login");
          }}
        >
          {!collapsed && "Logout"}
        </Button>

        {!collapsed && (
          <>
            <Divider />
            <Group>
              <Avatar radius="xl">{initials}</Avatar>

              <div>
                <Text size="sm" fw={500}>
                  {name}
                </Text>

                <Text size="xs" c="dimmed">
                  {email}
                </Text>
              </div>
            </Group>
          </>
        )}
      </Stack>
    </AppShell.Navbar>
  );
}