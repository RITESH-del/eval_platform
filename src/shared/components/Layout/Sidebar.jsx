// import {
//   AppShell,
//   NavLink,
//   Button,
//   Stack,
//   Group,
//   Text,
//   Avatar,
//   Divider,
//   ActionIcon,
// } from "@mantine/core";

// import {
//   GraduationCap,
//   FileText,
//   ListTodo,
//   CircleHelp,
//   LogOut,
//   Menu,
// } from "lucide-react";

// import { logout } from '../../../features/auth/models/authSlice';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';



// export default function Sidebar({
//   collapsed,
//   toggleSidebar,
//   sidebarConfig,
//   profile,
//   children,
// }) {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const dispatch = useDispatch();

//   const { name, email, university_id, role } = profile || { name: "Loading...   ", email: "Loading...", university_id: "Loading...", role: "Loading..." };

//   const initials = name?.split(" ")?.map(word => word[0])
//   .join("").toUpperCase();

//   return (
//     <AppShell.Navbar p="md">
//       <Group justify="space-between" mb="lg">
//         {!collapsed && (
//           <Group gap="xs">
//             <GraduationCap size={24} />
//             <Text fw={700}>Brand Name</Text>
//           </Group>
//         )}

//         <ActionIcon
//           variant="subtle"
//           onClick={toggleSidebar}
//         >
//           <Menu size={20} />
//         </ActionIcon>
//       </Group>

//       <Stack gap="xs">
//         {sidebarConfig.map((item, index) => {
//             if (item === "divider") {
//                return <Divider key={index} my="sm" />;
//             }

//             return (
//           <NavLink
//             key={item.label}
//             label={!collapsed ? item.label : null}
//             leftSection={item.leftSection}
//             onClick={() => navigate(item.href)}
//             active={pathname === item.href}
            
//           />)
        
// })}

//       </Stack>

//       <Stack mt="auto">

//         { children }

//         <Button
//           variant="transparent"
//           c="dimmed"
//           leftSection={<LogOut size={18} />}
//           fullWidth={!collapsed}
//           onClick={() => {
//             localStorage.removeItem("token");
//             dispatch(logout());
//             navigate("/login");
//           }}
//         >
//           {!collapsed && "Logout"}
//         </Button>

//         {!collapsed && (
//           <>
//             <Divider />
//             <Group>
//               <Avatar radius="xl">{initials}</Avatar>

//               <div>
//                 <Text size="sm" fw={500}>
//                   {name}
//                 </Text>

//                 <Text size="xs" c="dimmed">
//                   {email}
//                 </Text>
//               </div>
//             </Group>
//           </>
//         )}
//       </Stack>
//     </AppShell.Navbar>
//   );
// }

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
    <AppShell.Navbar p="md">
      {/* Header */}
      <Group justify={collapsed ? "center" : "space-between"} mb="lg">
        {!collapsed && (
          <Group gap="xs">
            <GraduationCap size={24} />
            <Text fw={700}>Exam Portal</Text>
          </Group>
        )}

        <ActionIcon variant="subtle" onClick={toggleSidebar}>
          <Menu size={20} />
        </ActionIcon>
      </Group>

      {/* Navigation */}
      <Stack gap={6}>
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
              variant="subtle"
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
                  : undefined
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