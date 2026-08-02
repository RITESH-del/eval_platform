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
  Tooltip,
} from "@mantine/core";

import {
  GraduationCap,
  CircleHelp,
  LogOut,
  Menu,
} from "lucide-react";

import { logout } from "../../../features/auth/models/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

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

  const { name, email } = profile || {
    name: "Loading...",
    email: "Loading...",
  };

  const initials = name
    ?.split(" ")
    ?.map((word) => word[0])
    .join("")
    .toUpperCase();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppShell.Navbar >
      {/* Header */}
      <Group justify={collapsed ? "center" : "space-between"} p="md">
        {!collapsed && (
          <Group gap="xs">
            <GraduationCap size={40} color="white" strokeWidth={1.5} style={{
              background: "var(--mantine-color-blue-6)",
              borderRadius: 999,
              padding: "4px"
            }}/>
            <Text fw={700} fz={22} component="h1">Exam Portal</Text>
          </Group>
        )}

        <ActionIcon variant="subtle" onClick={toggleSidebar}>
          <Menu size={20} />
        </ActionIcon>
      </Group>

      <Divider />

      {/* Navigation */}
      <Stack gap={6} p="md">
        {sidebarConfig.map((item, index) => {
          if (item === "divider") {
            return collapsed ? null : <Divider key={index} my="sm" />;
          }

          const link = (
            <NavLink
              key={item.label}
              label={collapsed ? undefined : item.label}
              leftSection={item.leftSection}
              active={pathname === item.href}
              onClick={() => navigate(item.href)}
              variant="filled"
              styles={
                collapsed
                  ? {
                      root: {
                        width: 48,
                        height: 48,
                        margin: "0 auto",
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      section: {
                        margin: 0,
                      },
                    }
                  : {root: {
                        borderRadius: 6
                  }}
              }
            />
          );

          return collapsed ? (
            <Tooltip
              key={item.label}
              label={item.label}
              position="right"
              withArrow
            >
              {link}
            </Tooltip>
          ) : (
            link
          );
        })}
      </Stack>

      {/* Bottom */}
      <Stack mt="auto" gap="sm">
        {children}

        {collapsed ? (
          <Tooltip label="Logout" position="right" withArrow>
            <ActionIcon
              variant="subtle"
              size={42}
              mx="auto"
              onClick={logoutHandler}
            >
              <LogOut size={18} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Button
            variant="transparent"
            c="dimmed"
            leftSection={<LogOut size={18} />}
            fullWidth
            justify="center"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        )}

        {collapsed ? (
          <Tooltip label={name} position="right" withArrow>
            <Avatar mx="auto" radius="xl">
              {initials}
            </Avatar>
          </Tooltip>
        ) : (
          <>
            <Divider />
            <Group p="sm">
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
