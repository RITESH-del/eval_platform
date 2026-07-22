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

// import {
//   AppShell,
//   ActionIcon,
//   Avatar,
//   Group,
//   Text,
//   ThemeIcon,
//   Tooltip,
//   Title,
//   Switch,
// } from "@mantine/core";

// import {
//   GraduationCap,
//   Menu,
//   Search,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Moon,
// } from "lucide-react";

// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";

// import { logout } from "../../../features/auth/models/authSlice";

// import SidebarItem from "./SidebarItem";
// import styles from "./Sidebar.module.css";
// import { motion } from "motion/react";

// export default function Sidebar({
//   collapsed,
//   toggleSidebar,
//   sidebarConfig,
//   profile,
//   children,
// }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { pathname } = useLocation();

//   const { name, email } = profile || {
//     name: "Loading...",
//     email: "Loading...",
//   };

//   const initials = name
//     .split(" ")
//     .map((word) => word[0])
//     .join("")
//     .toUpperCase();

//   const logoutHandler = () => {
//     localStorage.removeItem("token");
//     dispatch(logout());
//     navigate("/login");
//   };

//     const darkMode = true;


//   return (
//     <AppShell.Navbar p={0}>
//       <div
//         className={`${styles.sidebar} ${
//           collapsed ? styles.collapsed : ""
//         }`}
//       >
//         {/* ---------- Header ---------- */}

//         <Group justify="space-between" mb="lg">
//           {!collapsed && (
//               <Group justify="space-between" flex={1} w="100%">
//                 <Title fw={600}  order={2} c="blue">
//                   Exam Portal
//                 </Title>

//           <ActionIcon
//             variant="subtle"
//             radius="md"
//             onClick={toggleSidebar}
//           >
//             <ChevronLeft size={18} />
//           </ActionIcon>
//               </Group>
//           )}

//         </Group>

//         {/* ---------- Search ---------- */}

//         {!collapsed && (
//           <div className={styles.search}>
//             <Search size={13} />

//             <input
//               placeholder="Search..."
//               type="text"
//             />
//           </div>
//         )}

//         {/* ---------- Navigation ---------- */}

//         <div className={styles.nav}>
//           {sidebarConfig.map((item, index) => {
//             if (item === "divider") {
//               return (
//                 !collapsed && (
//                   <div
//                     key={index}
//                     className={styles.section}
//                   />
//                 )
//               );
//             }

//             const navItem = (
//               <SidebarItem
//                 key={item.label}
//                 icon={item.leftSection}
//                 label={item.label}
//                 collapsed={collapsed}
//                 active={pathname === item.href}
//                 onClick={() =>
//                   navigate(item.href)
//                 }
//               />
//             );

//             if (collapsed) {
//               return (
//                 <Tooltip
//                   key={item.label}
//                   label={item.label}
//                   position="right"
//                   withArrow
//                 >
//                   {navItem}
//                 </Tooltip>
//               );
//             }

//             return navItem;
//           })}
//         </div>

//         <div className={styles.spacer} />

//         {children}

//          <div
//               className={styles.theme}
//             >
//               <Group justify="space-between">
//                 <Group gap="sm">
//                   <Moon size={18} />

//                   <Text fw={500}>
//                     Dark Mode
//                   </Text>
//                 </Group>

//                 <Switch
//                   checked={darkMode}
//                 />

//               </Group>
//             </div>

//         {/* ---------- Profile ---------- */}

//         {/* <div className={styles.profile}>
//           <div className={styles.profileButton}>
//             <Avatar radius="xl">
//               {initials}
//             </Avatar>

//             {!collapsed && (
//               <div className={styles.profileInfo}>
//                 <div className={styles.profileName}>
//                   {name}
//                 </div>

//                 <div className={styles.profileEmail}>
//                   {email}
//                 </div>
//               </div>
//             )}
//           </div>

//           {collapsed ? (
//             <Tooltip
//               label="Logout"
//               position="right"
//               withArrow
//             >
//               <div
//                 className={styles.logout}
//                 onClick={logoutHandler}
//               >
//                 <LogOut size={18} />
//               </div>
//             </Tooltip>
//           ) : (
//             <div
//               className={styles.logout}
//               onClick={logoutHandler}
//             >
//               <LogOut size={18} />

//               <span>Logout</span>
//             </div>
//           )}
//         </div> */}

//         <Group
//                 justify="space-between"
//                 wrap="nowrap"
//               >
//                 <Group gap="sm">
//                   <Avatar radius="xl">
//                     {initials}
//                   </Avatar>

//                   <div>
//                     <Text fw={600}>
//                       {name}
//                     </Text>

//                     <Text
//                       size="xs"
//                       c="dimmed"
//                     >
//                       {email}
//                     </Text>
//                   </div>
//                 </Group>

//                                 <motion.div
//                   whileHover={{ x: 2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <ActionIcon
//                     variant="subtle"
//                     radius="xl"
//                     color="gray"
//                     onClick={logoutHandler}
//                   >
//                     <LogOut size={18} />
//                   </ActionIcon>
//                 </motion.div>
//               </Group>
//       </div>
//     </AppShell.Navbar>
//   );
// }