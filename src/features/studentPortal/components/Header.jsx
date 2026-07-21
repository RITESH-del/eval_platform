import {
  AppShell,
  Avatar,
  Button,
  Group,
  Menu,
  Text,
  ActionIcon,
} from "@mantine/core";

import {
  CircleHelp,
  GraduationCap,
  LogOut,
  EllipsisVertical,
  ChevronLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Header({
  user,
  onSupport,
  onLogout,
}) {
  const navigate = useNavigate();

  return (
    <AppShell.Header
      h={70}
      px="sm"
      style={{
        borderBottom:
          "1px solid var(--mantine-color-default-border)",
      }}
    >
      {/* Desktop */}
      <Group
        h="100%"
        justify="space-between"
        visibleFrom="sm"
      >
        <Group gap="sm">
          <GraduationCap size={28} />

          <Text fw={700} size="lg">
            Student Portal
          </Text>
        </Group>

        <Group gap="xs">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<CircleHelp size={18} />}
            onClick={onSupport}
          >
            Support
          </Button>

          <Button
            variant="subtle"
            color="red"
            leftSection={<LogOut size={18} />}
            onClick={onLogout}
          >
            Logout
          </Button>

          <Avatar radius="xl" color="blue">
            {user?.name?.[0]?.toUpperCase() ?? "S"}
          </Avatar>
        </Group>
      </Group>

      {/* Mobile */}
      <Group
        h="100%"
        justify="space-between"
        hiddenFrom="sm"
      >
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={22} />
          </ActionIcon>

        </Group>

          <Text fw={700}>
            Student Portal
          </Text>
        <Menu
          shadow="md"
          width={180}
          position="bottom-end"
        >
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              size="lg"
            >
              <EllipsisVertical size={22} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>
              {user?.name ?? "Student"}
            </Menu.Label>

            <Menu.Item
              leftSection={<CircleHelp size={16} />}
              onClick={onSupport}
            >
              Support
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              color="red"
              leftSection={<LogOut size={16} />}
              onClick={onLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </AppShell.Header>
  );
}