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
  useMantineColorScheme,
} from "@mantine/core";

import {
  FileSpreadsheet,
  Upload,
  X,
  Users,
  UserRound,
  Mail,
  Hash,
  GraduationCap,
  Layers3,
  ShieldCheck,
} from "lucide-react";

export default function UploadStudentModal({
  opened,
  onClose,
  onCreate,
  onUpload,
  loading = false,
}) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [mode, setMode] = useState("single");

  // =========================================================
  // FORM STATE
  // =========================================================

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationYear, setGraduationYear] =
    useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");

  const [excelFile, setExcelFile] = useState(null);

  // =========================================================
  // DEPARTMENTS
  // =========================================================

  const departments = [
    {
      value: "cse",
      label: "Computer Science & Engineering",
    },
    {
      value: "ece",
      label: "Electronics & Communication Engineering",
    },
    {
      value: "me",
      label: "Mechanical Engineering",
    },
    {
      value: "ce",
      label: "Civil Engineering",
    },
    {
      value: "eee",
      label: "Electrical & Electronics Engineering",
    },
    {
      value: "bba",
      label: "Bachelor of Business Administration",
    },
  ];

  // =========================================================
  // SECTIONS
  // =========================================================

  const sections = [
    {
      value: "csei",
      label: "CSE I",
    },
    {
      value: "cseii",
      label: "CSE II",
    },
    {
      value: "cseiii",
      label: "CSE III",
    },
    {
      value: "cseiv",
      label: "CSE IV",
    },
    {
      value: "ecei",
      label: "ECE I",
    },
    {
      value: "eceii",
      label: "ECE II",
    },
    {
      value: "eceiii",
      label: "ECE III",
    },
    {
      value: "mei",
      label: "ME I",
    },
    {
      value: "meii",
      label: "ME II",
    },
    {
      value: "cei",
      label: "CE I",
    },
    {
      value: "ceii",
      label: "CE II",
    },
    {
      value: "eeei",
      label: "EEE I",
    },
    {
      value: "eeeii",
      label: "EEE II",
    },
  ];

  // =========================================================
  // GRADUATION YEARS
  // =========================================================

  const graduationYears = [
    {
      value: "2026",
      label: "2026",
    },
    {
      value: "2027",
      label: "2027",
    },
    {
      value: "2028",
      label: "2028",
    },
    {
      value: "2029",
      label: "2029",
    },
    {
      value: "2030",
      label: "2030",
    },
  ];

  // =========================================================
  // COLORS
  // =========================================================

  const colors = {
    background: isDark ? "#1f1f1f" : "#ffffff",
    input: isDark ? "#292929" : "#ffffff",
    border: isDark ? "#404040" : "#ced4da",
    text: isDark ? "#f5f5f5" : "#212529",
    muted: isDark ? "#929292" : "#868e96",

    authBackground: isDark
      ? "#182b42"
      : "#eef6ff",

    authBorder: isDark
      ? "#24517f"
      : "#b8d8f8",

    uploadBackground: isDark
      ? "#242424"
      : "#f8f9fa",

    badgeBackground: isDark
      ? "#292929"
      : "#f1f3f5",

    badgeBorder: isDark
      ? "#383838"
      : "#dee2e6",
  };

  // =========================================================
  // INPUT STYLES
  // =========================================================

  const inputStyles = {
    label: {
      color: colors.text,
      fontWeight: 600,
      fontSize: 14,
      marginBottom: 6,
    },

    input: {
      backgroundColor: colors.input,
      borderColor: colors.border,
      color: colors.text,
      height: 45,
    },

    section: {
      color: colors.muted,
    },
  };

  // =========================================================
  // FILE HANDLER
  // =========================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setExcelFile(file);
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const isSingleStudentValid =
    name.trim().length > 0 &&
    studentId.trim().length > 0 &&
    department.length > 0 &&
    graduationYear.length > 0 &&
    section.length > 0 &&
    email.trim().length > 0;

  const isValid =
    mode === "single"
      ? isSingleStudentValid
      : Boolean(excelFile);

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = () => {
    if (mode === "excel") {
      if (!excelFile) return;

      onUpload?.(excelFile);
      return;
    }

    if (!isSingleStudentValid) {
      return;
    }

    onCreate?.({
      name: name.trim(),
      student_id: studentId.trim(),
      department,
      graduation_year: Number(graduationYear),
      section,
      email: email.trim(),
    });
  };

  // =========================================================
  // CLOSE / RESET
  // =========================================================

  const handleClose = () => {
    setMode("single");

    setName("");
    setStudentId("");
    setDepartment("");
    setGraduationYear("");
    setSection("");
    setEmail("");

    setExcelFile(null);

    onClose();
  };

  // =========================================================
  // MODAL
  // =========================================================

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

         content: {
      backgroundColor: colors.background,
      color: colors.text,

      // Hide scrollbar
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },

    content: {
      backgroundColor: colors.background,
      color: colors.text,

      scrollbarWidth: "none",
      msOverflowStyle: "none",

      "&::-webkit-scrollbar": {
        display: "none",
      },
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
      {/* =====================================================
          HEADER
      ====================================================== */}

      <Box
        px="xl"
        py="lg"
        style={{
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Group
          justify="space-between"
          align="flex-start"
        >
          <Box>
            <Text
              fw={700}
              size="lg"
              c={isDark ? "gray.0" : "dark.8"}
              style={{
                fontSize: 24,
                letterSpacing: "-0.02em",
              }}
            >
              Add Students
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt={4}
            >
              Add a single student or import multiple
              students from an Excel file.
            </Text>
          </Box>

          <Button
            variant="subtle"
            color="gray"
            size="sm"
            p={5}
            onClick={handleClose}
          >
            <X size={19} />
          </Button>
        </Group>
      </Box>

      {/* =====================================================
          BODY
      ====================================================== */}

      <Box
        px="xl"
        py="lg"
      >
        <Stack gap="md">

          {/* =================================================
              MODE TABS
          ================================================== */}

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
                <UserRound size={16} />
              }
              onClick={() =>
                setMode("single")
              }
            >
              Single Student
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
                <FileSpreadsheet
                  size={16}
                />
              }
              onClick={() =>
                setMode("excel")
              }
            >
              Excel Upload
            </Button>

          </Group>

          {/* =================================================
              SINGLE STUDENT
          ================================================== */}

          {mode === "single" && (
            <Stack gap="lg">

              {/* FULL NAME */}

              <TextInput
                label="Full Name"
                placeholder="e.g. Aarav Sharma"
                
                leftSection={
                  <UserRound size={16} />
                }
                value={name}
                onChange={(event) =>
                  setName(
                    event.currentTarget.value
                  )
                }
                radius="sm"
                // 
              />

              {/* ENROLLMENT + DEPARTMENT */}

              <Group
                grow
                gap="md"
                align="flex-start"
              >
                <TextInput
                  label="Enrollment Number"
                  placeholder="e.g. 240001"
                  leftSection={
                    <Hash size={16} />
                  }
                  value={studentId}
                  onChange={(event) =>
                    setStudentId(
                      event.currentTarget.value
                    )
                  }
                  radius="sm"
                  
                />

                <Select
                  label="Department"
                  placeholder="Select department"
                  leftSection={
                    <GraduationCap
                      size={16}
                    />
                  }
                  data={departments}
                  value={department}
                  onChange={(value) => {
                    setDepartment(
                      value || ""
                    );

                    // Reset section when
                    // department changes.
                    setSection("");
                  }}
                  radius="sm"
                  searchable
                  nothingFoundMessage="No departments found"
                  
                />
              </Group>

              {/* GRADUATION + SECTION */}

              <Group
                grow
                gap="md"
                align="flex-start"
              >
                <Select
                  label="Graduation Year"
                  placeholder="Select year"
                  data={graduationYears}
                  value={graduationYear}
                  onChange={(value) =>
                    setGraduationYear(
                      value || ""
                    )
                  }
                  radius="sm"
                  
                />

                <Select
                  label="Section"
                  placeholder="Select section"
                  leftSection={
                    <Layers3 size={16} />
                  }
                  data={sections}
                  value={section}
                  onChange={(value) =>
                    setSection(value || "")
                  }
                  radius="sm"
                  searchable
                  nothingFoundMessage="No sections found"
                  
                />
              </Group>

              {/* EMAIL */}

              <TextInput
                label="Institutional Email"
                placeholder="aarav.sharma@bmu.edu.in"
                leftSection={
                  <Mail size={16} />
                }
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.currentTarget.value
                  )
                }
                radius="sm"
                
              />

              {/* =================================================
                  AUTHENTICATION CARD
              ================================================== */}

              <Box
                p="md"
                style={{
                  backgroundColor:
                    colors.authBackground,

                  border:
                    `1px solid ${colors.authBorder}`,

                  borderRadius: 8,
                }}
              >
                <Group
                  align="flex-start"
                  wrap="nowrap"
                  gap="md"
                >
                  <ThemeIcon
                    variant="light"
                    color="blue"
                    size={36}
                    radius="sm"
                  >
                    <ShieldCheck
                      size={18}
                    />
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
                      Student Authentication
                    </Text>

                    <Text
                      size="xs"
                      c="dimmed"
                      mt={3}
                      lh={1.5}
                    >
                                            Students recieve temporary password on thier email. They can change it later.

                    </Text>
                  </Box>
                </Group>
              </Box>

            </Stack>
          )}

          {/* =================================================
              EXCEL UPLOAD
          ================================================== */}

          {mode === "excel" && (
            <Stack gap="lg">

              {/* UPLOAD AREA */}

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
                    size={50}
                    radius="md"
                    variant="light"
                    color="green"
                  >
                    <FileSpreadsheet
                      size={25}
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
                    Upload Student List
                  </Text>

                  <Text
                    size="xs"
                    c="dimmed"
                    maw={400}
                    lh={1.5}
                  >
                    Select an Excel spreadsheet
                    containing student information.
                    Multiple student accounts can be
                    imported at once.
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    leftSection={
                      <Upload size={15} />
                    }
                    mt="xs"
                    onClick={() =>
                      document
                        .getElementById(
                          "student-excel-input"
                        )
                        ?.click()
                    }
                  >
                    Choose Excel File
                  </Button>

                  <input
                    id="student-excel-input"
                    type="file"
                    accept=".xlsx,.xls"
                    hidden
                    onChange={
                      handleFileChange
                    }
                  />

                  {excelFile && (
                    <Text
                      size="xs"
                      fw={500}
                      c="blue"
                      mt={4}
                    >
                      {excelFile.name}
                    </Text>
                  )}

                  <Text
                    size="xs"
                    c="dimmed"
                  >
                    Supported formats: .xlsx, .xls
                  </Text>

                </Stack>
              </Box>

              {/* REQUIRED COLUMNS */}

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
                    "student_id",
                    "email",
                    "department",
                    "graduation_year",
                    "section",
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

              {/* AUTHENTICATION */}

               <Box
                p="md"
                style={{
                  background:
                    colors.authBackground,

                  border:
                    `1px solid ${colors.authBorder}`,

                  borderRadius: 8,
                }}
              >
                <Group
                  align="flex-start"
                  wrap="nowrap"
                  gap="md"
                >
                  <ThemeIcon
                    variant="light"
                    color="blue"
                    size={36}
                    radius="sm"
                  >
                    <ShieldCheck
                      size={18}
                    />
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
                      Student Authentication
                    </Text>

                    <Text
                      size="xs"
                      c="dimmed"
                      mt={3}
                      lh={1.5}
                    >
                      Students recieve temporary password on thier email. They can change it later.
                    </Text>
                  </Box>
                </Group>
              </Box> 

            </Stack>
          )}

        </Stack>
      </Box>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Box
        px="xl"
        py="md"
        style={{
          borderTop:
            `1px solid ${colors.border}`,
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
            disabled={!isValid}
            loading={loading}
            onClick={handleSubmit}
          >
            {mode === "excel"
              ? "Add Students"
              : "Create Student"}
          </Button>

        </Group>
      </Box>
    </Modal>
  );
}