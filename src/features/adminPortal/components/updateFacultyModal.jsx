import { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Text,
  Box,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { updateFacultyThunk } from "../thunks/adminThunks.js";

import {
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  LockKeyhole,
  X,
  Save,
} from "lucide-react";

export default function UpdateFacultyModal({
  opened,
  onClose,
  faculty,
  onUpdate,
  loading = false,
}) {
  const { colorScheme } = useMantineColorScheme();

  const dispatch = useDispatch();

  const isDark = colorScheme === "dark";

  const [name, setName] = useState("");
  // const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const departments = [
    {
      value: "cse",
      label: "Computer Science & Engineering",
    },
    {
      value: "ece",
      label: "Electronics & Communication",
    },
    {
      value: "me",
      label: "Mechanical Engineering",
    },
    {
      value: "civil",
      label: "Civil Engineering",
    },
    {
      value: "eee",
      label: "Electrical Engineering",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Theme Colors
  |--------------------------------------------------------------------------
  */

  const colors = {
    background: isDark ? "#1f1f1f" : "#ffffff",
    input: isDark ? "#292929" : "#ffffff",
    border: isDark ? "#404040" : "#ced4da",
    text: isDark ? "#f5f5f5" : "#212529",
    muted: isDark ? "#929292" : "#868e96",

    securityBackground: isDark
      ? "#182b42"
      : "#eef6ff",

    securityBorder: isDark
      ? "#24466d"
      : "#b8d8f8",
  };

  const inputStyles = {
    label: {
      color: colors.text,
      fontWeight: 600,
      marginBottom: 6,
    },

    input: {
      backgroundColor: colors.input,
      borderColor: colors.border,
      color: colors.text,
    },

    section: {
      color: colors.muted,
    },
  };

  /*
  |--------------------------------------------------------------------------
  | Populate Form
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!faculty) return;

    setName(faculty.name ?? "");
    // setEmployeeId(faculty.employee_id ?? "");
    setDepartment(faculty.department ?? "");
    setEmail(faculty.email ?? "");
    setPhoneNumber(faculty.phone_number ?? "");
  }, [faculty]);

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  // const handleSubmit = () => {
  //   if (!faculty) return;

  //   onUpdate?.({
  //     id: faculty.id,

  //     // IMPORTANT:
  //     // updateFacultyThunk expects the form data
  //     // inside a "data" property.
  //     data: {
  //       name: name.trim(),
  //       employee_id: employeeId.trim(),
  //       department,
  //       email: email.trim(),
  //       phone_number: phoneNumber.trim(),
  //     },
  //   });
  // };

//   const handleSubmit = async () => {
//   if (!faculty) return;

//   const result = await dispatch(
//     updateFacultyThunk({
//       id: faculty.id,
//       data: {
//         name: name.trim(),
//         employee_id: employeeId.trim(),
//         department,
//         email: email.trim(),
//         phone_number: phoneNumber.trim(),
//       },
//     })
//   );

//   if (updateFacultyThunk.fulfilled.match(result)) {
//     handleClose();
//   }
// };

//   const handleClose = () => {
//     onClose();
//   };

//   const isValid =
//     name.trim() &&
//     employeeId.trim() &&
//     department &&
//     email.trim();


const handleSubmit = async () => {
  if (!faculty) return;

  const result = await dispatch(
    updateFacultyThunk({
      id: faculty.id,
      data: {
        name: name.trim(),
        department,
        email: email.trim(),
        phone_number: phoneNumber.trim(),
      },
    })
  );

  if (updateFacultyThunk.fulfilled.match(result)) {
    handleClose();
  }
};

const handleClose = () => {
  onClose();
};

const isValid =
  name.trim() &&
  department &&
  email.trim();

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      size={600}
      padding={0}
      radius="md"
      withCloseButton={false}
      styles={{
        content: {
          backgroundColor: colors.background,
          color: colors.text,
        },

        header: {
          backgroundColor: colors.background,
          color: colors.text,
        },

        body: {
          padding: 0,
          backgroundColor: colors.background,
        },
      }}
      overlayProps={{
        backgroundOpacity: isDark ? 0.65 : 0.35,
        blur: 4,
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <Box
        px="xl"
        py="lg"
        style={{
          borderBottom: `1px solid ${colors.border}`,
          background: colors.background,
        }}
      >
        <Group
          justify="space-between"
          align="flex-start"
        >
          <Box>
            <Text
              fw={650}
              size="lg"
              c={isDark ? "gray.0" : "dark.8"}
              style={{
                letterSpacing: "-0.02em",
              }}
            >
              Update Faculty
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt={3}
            >
              Update the faculty member's account
              information.
            </Text>
          </Box>

          <Button
            variant="subtle"
            color="gray"
            size="sm"
            p={5}
            onClick={handleClose}
          >
            <X size={18} />
          </Button>
        </Group>
      </Box>

      {/* =========================
          FORM
      ========================= */}

      <Box
        px="xl"
        py="lg"
        style={{
          background: colors.background,
        }}
      >
        <Stack gap="md">

          {/* Full Name */}

          <TextInput
            label="Full Name"
            placeholder="e.g. Dr. Sarah Jenkins"
            leftSection={
              <UserRound size={16} />
            }
            value={name}
            onChange={(e) =>
              setName(e.currentTarget.value)
            }
            radius="sm"
            styles={inputStyles}
          />

          {/* Department */}

          <Select
            label="Department"
            placeholder="Select department"
            leftSection={
              <BriefcaseBusiness size={16} />
            }
            data={departments}
            value={department}
            onChange={setDepartment}
            radius="sm"
            styles={inputStyles}
          />

          {/* Institutional Email */}

          <TextInput
            label="Institutional Email"
            placeholder="sarah.jenkins@institution.edu"
            leftSection={
              <Mail size={16} />
            }
            value={email}
            onChange={(e) =>
              setEmail(e.currentTarget.value)
            }
            radius="sm"
            styles={inputStyles}
          />

          {/* Phone Number */}

          <TextInput
            label="Phone Number"
            placeholder="e.g. +91 98765 43210"
            leftSection={
              <Phone size={16} />
            }
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.currentTarget.value)
            }
            radius="sm"
            styles={inputStyles}
          />

          {/* =========================
              SECURITY INFORMATION
          ========================= */}

          <Box
            p="md"
            style={{
              background:
                colors.securityBackground,
              border: `1px solid ${colors.securityBorder}`,
              borderRadius: 8,
            }}
          >
            <Group
              align="flex-start"
              wrap="nowrap"
            >
              <ThemeIcon
                variant="light"
                color="blue"
                size={34}
                radius="sm"
              >
                <LockKeyhole size={17} />
              </ThemeIcon>

              <Box>
                <Text
                  size="sm"
                  fw={600}
                  c={
                    isDark
                      ? "gray.1"
                      : "dark.7"
                  }
                >
                  Account Security
                </Text>

                <Text
                  size="xs"
                  c="dimmed"
                  mt={3}
                  lh={1.5}
                >
                  Password and authentication
                  settings are not changed here.
                  The faculty member can change
                  their password from their account
                  settings.
                </Text>
              </Box>
            </Group>
          </Box>
        </Stack>
      </Box>

      {/* =========================
          FOOTER
      ========================= */}

      <Box
        px="xl"
        py="md"
        style={{
          borderTop: `1px solid ${colors.border}`,
          background: colors.background,
        }}
      >
        <Group justify="flex-end">

          <Button
            variant="default"
            radius="sm"
            onClick={handleClose}
            styles={{
              root: {
                backgroundColor: colors.input,
                borderColor: colors.border,
                color: colors.text,
              },
            }}
          >
            Cancel
          </Button>

          <Button
            radius="sm"
            leftSection={
              <Save size={16} />
            }
            disabled={!isValid}
            loading={loading}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>

        </Group>
      </Box>
    </Modal>
  );
}