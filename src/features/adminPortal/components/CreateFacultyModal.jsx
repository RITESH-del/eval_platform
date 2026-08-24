import { useState } from "react";
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
  FileInput,
  useMantineColorScheme,
} from "@mantine/core";

import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  FileSpreadsheet,
  Upload,
  Users,
  X,
} from "lucide-react";

export default function CreateFacultyModal({
  opened,
  onClose,
  onCreate,
  onUploadExcel,
  loading = false,
  error = null,
}) {
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  const [mode, setMode] = useState("single");

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [excelFile, setExcelFile] = useState(null);

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
  | Theme
  |--------------------------------------------------------------------------
  */

  const colors = {
    background: isDark ? "#1f1f1f" : "#ffffff",

    input: isDark
      ? "#292929"
      : "#ffffff",

    border: isDark
      ? "#404040"
      : "#ced4da",

    text: isDark
      ? "#f5f5f5"
      : "#212529",

    muted: isDark
      ? "#929292"
      : "#868e96",

    uploadBackground: isDark
      ? "#242424"
      : "#f8f9fa",

    securityBackground: isDark
      ? "#182b42"
      : "#eef6ff",

    securityBorder: isDark
      ? "#24466d"
      : "#b8d8f8",

    badgeBackground: isDark
      ? "#292929"
      : "#f1f3f5",

    badgeBorder: isDark
      ? "#383838"
      : "#dee2e6",

    errorBackground: isDark
      ? "#3b1f1f"
      : "#fff5f5",

    errorBorder: isDark
      ? "#6b3030"
      : "#ffc9c9",
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
  | Email Validation
  |--------------------------------------------------------------------------
  */

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value.trim()
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Create / Import
  |--------------------------------------------------------------------------
  */

  const handleCreate = () => {
    if (mode === "excel") {
      if (!excelFile) return;

      onUploadExcel?.(excelFile);
      return;
    }

    if (
      !name.trim() ||
      !department ||
      !email.trim() ||
      !isValidEmail(email) ||
      !phoneNumber.trim()
    ) {
      return;
    }

    onCreate?.({
      name: name.trim(),
      department,
      email: email.trim(),
      phone_number: phoneNumber.trim(),
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Close
  |--------------------------------------------------------------------------
  */

  const handleClose = () => {
    setName("");
    setDepartment("");
    setEmail("");
    setPhoneNumber("");
    setExcelFile(null);
    setMode("single");

    onClose();
  };

  const isValid =
    name.trim() &&
    department &&
    email.trim() &&
    isValidEmail(email) &&
    phoneNumber.trim();

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
      {/* =================================================
          HEADER
      ================================================= */}

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
              Create Faculty Account
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt={3}
            >
              Add a faculty member or import
              multiple accounts.
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

      {/* =================================================
          CONTENT
      ================================================= */}

      <Box
        px="xl"
        py="lg"
        style={{
          background: colors.background,
        }}
      >
        <Stack gap="lg">

          {/* Backend Error */}

          {error && mode === "single" && (
            <Box
              p="sm"
              style={{
                background:
                  colors.errorBackground,
                border:
                  `1px solid ${colors.errorBorder}`,
                borderRadius: 8,
              }}
            >
              <Text
                size="sm"
                c="red"
                fw={500}
              >
                {error}
              </Text>
            </Box>
          )}

          {/* Mode Selector */}

          <Group grow gap="xs">
            <Button
              variant={
                mode === "single"
                  ? "filled"
                  : "subtle"
              }
              color={
                mode === "single"
                  ? "blue"
                  : "gray"
              }
              radius="sm"
              leftSection={
                <UserRound size={15} />
              }
              onClick={() =>
                setMode("single")
              }
            >
              Single Faculty
            </Button>

            <Button
              variant={
                mode === "excel"
                  ? "filled"
                  : "subtle"
              }
              color={
                mode === "excel"
                  ? "blue"
                  : "gray"
              }
              radius="sm"
              leftSection={
                <FileSpreadsheet size={15} />
              }
              onClick={() =>
                setMode("excel")
              }
            >
              Excel Upload
            </Button>
          </Group>

          {/* =================================================
              SINGLE FACULTY
          ================================================= */}

          {mode === "single" && (
            <Stack gap="md">

              {/* Full Name */}

              <TextInput
                label="Full Name"
                placeholder="e.g. Dr. John Doe"
                leftSection={
                  <UserRound size={16} />
                }
                value={name}
                onChange={(e) =>
                  setName(
                    e.currentTarget.value
                  )
                }
                radius="sm"
                styles={inputStyles}
              />

              {/* Department */}

              <Select
                label="Department"
                placeholder="Select department"
                leftSection={
                  <UserRound size={16} />
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
                placeholder="faculty@bmu.edu.in"
                type="email"
                leftSection={
                  <Mail size={16} />
                }
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.currentTarget.value
                  )
                }
                error={
                  email &&
                  !isValidEmail(email)
                    ? "Enter a valid email address"
                    : null
                }
                radius="sm"
                styles={inputStyles}
              />

              {/* Phone Number */}

              <TextInput
                label="Phone Number"
                placeholder="e.g. +91 98765 43210"
                type="tel"
                leftSection={
                  <Phone size={16} />
                }
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(
                    e.currentTarget.value
                  )
                }
                radius="sm"
                styles={inputStyles}
              />

              {/* Security */}

              <Box
                p="md"
                style={{
                  background:
                    colors.securityBackground,
                  border:
                    `1px solid ${colors.securityBorder}`,
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
                      A temporary password will
                      be generated automatically
                      and sent to the faculty
                      member's institutional email.
                    </Text>

                    <Text
                      size="xs"
                      c="dimmed"
                      mt={4}
                      lh={1.5}
                    >
                      The faculty member will be
                      required to change the
                      password after their first
                      login.
                    </Text>
                  </Box>
                </Group>
              </Box>

            </Stack>
          )}

          {/* =================================================
              EXCEL UPLOAD
          ================================================= */}

          {mode === "excel" && (
            <Stack gap="md">

              {/* Upload Area */}

              <Box
                p="xl"
                style={{
                  border:
                    `1.5px dashed ${colors.border}`,
                  borderRadius: 10,
                  background:
                    colors.uploadBackground,
                  textAlign: "center",
                }}
              >
                <Stack
                  align="center"
                  gap="xs"
                >
                  <ThemeIcon
                    size={52}
                    radius="md"
                    variant="light"
                    color="green"
                  >
                    <FileSpreadsheet
                      size={26}
                    />
                  </ThemeIcon>

                  <Text
                    fw={600}
                    size="sm"
                    mt={4}
                    c={
                      isDark
                        ? "gray.1"
                        : "dark.7"
                    }
                  >
                    Import Faculty Accounts
                  </Text>

                  <Text
                    size="xs"
                    c="dimmed"
                    maw={390}
                    lh={1.5}
                  >
                    Upload an Excel spreadsheet
                    containing faculty information.
                    Multiple accounts can be
                    created at once.
                  </Text>

                  <FileInput
                    value={excelFile}
                    onChange={setExcelFile}
                    accept=".xlsx,.xls"
                    placeholder="Choose Excel file"
                    leftSection={
                      <Upload size={15} />
                    }
                    clearable
                    mt="sm"
                    w="100%"
                    styles={{
                      input: {
                        backgroundColor:
                          colors.input,
                        borderColor:
                          colors.border,
                        color:
                          colors.text,
                      },

                      placeholder: {
                        color:
                          colors.muted,
                      },

                      section: {
                        color:
                          colors.muted,
                      },
                    }}
                  />

                  <Text
                    size="xs"
                    c="dimmed"
                  >
                    Supported formats:
                    {" "}
                    .xlsx, .xls
                  </Text>
                </Stack>
              </Box>

              {/* Required Columns */}

              <Box>
                <Text
                  size="xs"
                  fw={600}
                  c="dimmed"
                  mb={6}
                >
                  Required columns
                </Text>

                <Group gap={6}>
                  {[
                    "name",
                    "department",
                    "email",
                    "phone_number",
                  ].map((column) => (
                    <Box
                      key={column}
                      px={8}
                      py={4}
                      style={{
                        background:
                          colors.badgeBackground,
                        border:
                          `1px solid ${colors.badgeBorder}`,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        size="xs"
                        c="dimmed"
                      >
                        {column}
                      </Text>
                    </Box>
                  ))}
                </Group>
              </Box>

              {/* Security Note */}

              <Box
                p="md"
                style={{
                  background:
                    colors.securityBackground,
                  border:
                    `1px solid ${colors.securityBorder}`,
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
                      Automatic Credentials
                    </Text>

                    <Text
                      size="xs"
                      c="dimmed"
                      mt={3}
                      lh={1.5}
                    >
                      A temporary password will
                      be generated for each faculty
                      member and sent to their
                      institutional email.
                    </Text>
                  </Box>
                </Group>
              </Box>

            </Stack>
          )}

        </Stack>
      </Box>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Box
        px="xl"
        py="md"
        style={{
          borderTop:
            `1px solid ${colors.border}`,
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
                backgroundColor:
                  colors.input,
                borderColor:
                  colors.border,
                color: colors.text,
              },
            }}
          >
            Cancel
          </Button>

          <Button
            radius="sm"
            leftSection={
              mode === "excel" ? (
                <Upload size={16} />
              ) : (
                <Users size={16} />
              )
            }
            disabled={
              mode === "excel"
                ? !excelFile
                : !isValid
            }
            loading={loading}
            onClick={handleCreate}
          >
            {mode === "excel"
              ? "Import Faculty"
              : "Create Account"}
          </Button>

        </Group>
      </Box>
    </Modal>
  );
}