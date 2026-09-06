import { useState } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Button,
  Group,
  Stack,
  Text,
  Box,
  ThemeIcon,
  FileInput,
  SegmentedControl,
  Paper,
  useMantineColorScheme,
} from "@mantine/core";

import {
  BookOpen,
  Hash,
  GraduationCap,
  Layers3,
  Clock,
  FileSpreadsheet,
  Upload,
  Download,
  X,
  FileCheck,
} from "lucide-react";

import * as XLSX from "xlsx";

export default function UploadCourseModal({
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

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [credits, setCredits] = useState(3);
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");

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
    {
      value: "general",
      label: "General / Interdisciplinary",
    },
  ];

  // =========================================================
  // SEMESTERS
  // =========================================================

  const semesterOptions = [
    {
      value: "1",
      label: "Semester 1",
    },
    {
      value: "2",
      label: "Semester 2",
    },
    {
      value: "3",
      label: "Semester 3",
    },
    {
      value: "4",
      label: "Semester 4",
    },
    {
      value: "5",
      label: "Semester 5",
    },
    {
      value: "6",
      label: "Semester 6",
    },
    {
      value: "7",
      label: "Semester 7",
    },
    {
      value: "8",
      label: "Semester 8",
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

    cardBg: isDark
      ? "#262626"
      : "#f8f9fa",
  };

  // =========================================================
  // INPUT STYLES
  // =========================================================

  const inputStyles = {
    label: {
      color: colors.text,
      fontWeight: 600,
      fontSize: 13,
      marginBottom: 4,
    },

    input: {
      backgroundColor: colors.input,
      borderColor: colors.border,
      color: colors.text,
      height: 38,
      minHeight: 38,
    },

    section: {
      color: colors.muted,
    },
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setCode("");
    setName("");
    setDepartment("");
    setCredits(3);
    setSemester("");
    setDescription("");
    setExcelFile(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const isSingleValid =
    code.trim().length >= 2 &&
    name.trim().length >= 2;

  const isExcelValid = Boolean(excelFile);

  const isValid =
    mode === "single"
      ? isSingleValid
      : isExcelValid;

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = () => {
    if (mode === "single") {
      if (!isSingleValid) return;

      onCreate?.({
        code: code.trim().toUpperCase(),
        name: name.trim(),
        department: department || null,
        credits:
          credits !== "" && credits !== null
            ? Number(credits)
            : 3,
        semester: semester
          ? Number(semester)
          : null,
        description:
          description.trim() || null,
      });
    } else {
      if (!isExcelValid) return;

      onUpload?.(excelFile);
    }
  };

  // =========================================================
  // DOWNLOAD SAMPLE TEMPLATE
  // =========================================================

  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        "Course Code": "CSE201",
        "Course Name":
          "Data Structures & Algorithms",
        Department: "cse",
        Credits: 4,
        Semester: 3,
        Description:
          "Fundamental data structures and algorithmic paradigms.",
      },
      {
        "Course Code": "CSE202",
        "Course Name": "Operating Systems",
        Department: "cse",
        Credits: 4,
        Semester: 4,
        Description:
          "Processes, threads, memory management, and file systems.",
      },
      {
        "Course Code": "ECE101",
        "Course Name": "Basic Electronics",
        Department: "ece",
        Credits: 3,
        Semester: 1,
        Description:
          "Semiconductors, diodes, transistors, and logic gates.",
      },
    ];

    const worksheet =
      XLSX.utils.json_to_sheet(sampleData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Courses"
    );

    XLSX.writeFile(
      workbook,
      "courses_import_template.xlsx"
    );
  };

  // =========================================================
  // MODAL
  // =========================================================

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      centered
      size={600}
      padding={0}
      radius="md"
      overlayProps={{
        backgroundOpacity: isDark ? 0.65 : 0.35,
        blur: 4,
      }}
      styles={{
        content: {
          backgroundColor: colors.background,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },

        body: {
          padding: 0,
          backgroundColor: colors.background,
          overflowY: "auto",
          flex: 1,
        },
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
          flexShrink: 0,
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
              Add Courses
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt={4}
            >
              Add a new course manually or upload in
              bulk using Excel.
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
          SCROLLABLE BODY
      ====================================================== */}

      <Box
        px="xl"
        py="md"
        style={{
          overflowY: "auto",
          flex: 1,
        }}
      >
        <Stack gap="md">

          {/* =================================================
              MODE SWITCHER
          ================================================== */}
{/* 
          <SegmentedControl
            fullWidth
            value={mode}
            onChange={setMode}
            data={[
              {
                value: "single",
                label: (
                  <Group
                    gap={6}
                    justify="center"
                  >
                    <BookOpen size={15} />
                    <span>Single Course</span>
                  </Group>
                ),
              },
              {
                value: "excel",
                label: (
                  <Group
                    gap={6}
                    justify="center"
                  >
                    <FileSpreadsheet size={15} />
                    <span>
                      Excel / CSV Bulk Upload
                    </span>
                  </Group>
                ),
              },
            ]}
          /> */}

          <Group grow gap="xs">
  <Button
    variant={mode === "single" ? "filled" : "subtle"}
    color={mode === "single" ? "blue" : "gray"}
    radius="sm"
    leftSection={<BookOpen size={15} />}
    onClick={() => setMode("single")}
  >
    Single Course
  </Button>

  <Button
    variant={mode === "excel" ? "filled" : "subtle"}
    color={mode === "excel" ? "blue" : "gray"}
    radius="sm"
    leftSection={<FileSpreadsheet size={15} />}
    onClick={() => setMode("excel")}
  >
    Excel / CSV Bulk Upload
  </Button>
</Group>

          {/* =================================================
              SINGLE COURSE
          ================================================== */}

          {mode === "single" && (
            <Stack gap="md">

              {/* COURSE CODE + DEPARTMENT */}

              <Group
                grow
                gap="md"
                align="flex-start"
              >
                <TextInput
                  label="Course Code"
                  placeholder="e.g. CSE201"
                  required
                  value={code}
                  onChange={(e) =>
                    setCode(
                      e.currentTarget.value.toUpperCase()
                    )
                  }
                  leftSection={
                    <Hash size={16} />
                  }
                  radius="sm"
                  styles={inputStyles}
                />

                <Select
                  label="Department"
                  placeholder="Select department"
                  data={departments}
                  value={department}
                  onChange={setDepartment}
                  leftSection={
                    <GraduationCap size={16} />
                  }
                  clearable
                  searchable
                  radius="sm"
                  styles={inputStyles}
                />
              </Group>

              {/* COURSE NAME */}

              <TextInput
                label="Course Name"
                placeholder="e.g. Data Structures & Algorithms"
                required
                value={name}
                onChange={(e) =>
                  setName(e.currentTarget.value)
                }
                leftSection={
                  <BookOpen size={16} />
                }
                radius="sm"
                styles={inputStyles}
              />

              {/* CREDITS + SEMESTER */}

              <Group
                grow
                gap="md"
                align="flex-start"
              >
                <NumberInput
                  label="Credits"
                  placeholder="3"
                  min={0}
                  max={30}
                  value={credits}
                  onChange={setCredits}
                  leftSection={
                    <Clock size={16} />
                  }
                  radius="sm"
                  styles={inputStyles}
                />

                <Select
                  label="Semester"
                  placeholder="Select semester"
                  data={semesterOptions}
                  value={semester}
                  onChange={setSemester}
                  leftSection={
                    <Layers3 size={16} />
                  }
                  clearable
                  radius="sm"
                  styles={inputStyles}
                />
              </Group>

              {/* DESCRIPTION */}

              <Textarea
                label="Course Description"
                placeholder="Brief course description or syllabus details (optional)..."
                minRows={3}
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.currentTarget.value
                  )
                }
                radius="sm"
                styles={{
                  ...inputStyles,
                  input: {
                    ...inputStyles.input,
                    height: "auto",
                    minHeight: 90,
                  },
                }}
              />

            </Stack>
          )}

          {/* =================================================
              EXCEL UPLOAD
          ================================================== */}

          {mode === "excel" && (
            <Stack gap="sm">

              {/* IMPORT INSTRUCTIONS */}

              <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                }}
              >
                <Group
                  justify="space-between"
                  align="flex-start"
                  gap="md"
                >
                  <Box style={{ flex: 1 }}>
                    <Text
                      size="sm"
                      fw={600}
                      c={colors.text}
                    >
                      Excel Import Instructions
                    </Text>

                    <Text
                      size="xs"
                      c={colors.muted}
                      mt={3}
                      lh={1.5}
                    >
                      Ensure your file contains columns:
                      Course Code, Course Name, Department,
                      Credits, Semester, Description.
                    </Text>
                  </Box>

                  <Button
                    size="xs"
                    variant="light"
                    leftSection={
                      <Download size={14} />
                    }
                    onClick={
                      downloadSampleTemplate
                    }
                  >
                    Template
                  </Button>
                </Group>
              </Paper>

              {/* FILE INPUT */}

              <FileInput
                label="Select Spreadsheet File"
                placeholder="Upload .xlsx, .xls or .csv file"
                accept=".xlsx,.xls,.csv"
                value={excelFile}
                onChange={setExcelFile}
                leftSection={
                  <FileSpreadsheet size={16} />
                }
                clearable
                radius="sm"
                styles={inputStyles}
              />

              {/* SELECTED FILE */}

              {excelFile && (
                <Paper
                  p="sm"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor:
                      colors.cardBg,
                    borderColor:
                      "var(--mantine-color-blue-6)",
                  }}
                >
                  <Group justify="space-between">
                    <Group gap="xs">
                      <ThemeIcon
                        color="blue"
                        variant="light"
                        size={32}
                        radius="md"
                      >
                        <FileCheck
                          size={18}
                        />
                      </ThemeIcon>

                      <Box>
                        <Text
                          size="sm"
                          fw={600}
                          c={colors.text}
                        >
                          {excelFile.name}
                        </Text>

                        <Text
                          size="xs"
                          c={colors.muted}
                        >
                          {(
                            excelFile.size /
                            1024
                          ).toFixed(1)}{" "}
                          KB
                        </Text>
                      </Box>
                    </Group>

                    <Button
                      size="xs"
                      variant="subtle"
                      color="red"
                      onClick={() =>
                        setExcelFile(null)
                      }
                    >
                      Remove
                    </Button>
                  </Group>
                </Paper>
              )}

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
          borderTop: `1px solid ${colors.border}`,
          backgroundColor: isDark
            ? "#171717"
            : "#f8f9fa",
          flexShrink: 0,
        }}
      >
        <Group
          justify="flex-end"
          gap="sm"
        >
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
              mode === "excel" ? (
                <Upload size={16} />
              ) : (
                <BookOpen size={16} />
              )
            }
            disabled={!isValid}
            loading={loading}
            onClick={handleSubmit}
          >
            {mode === "excel"
              ? "Upload & Import Courses"
              : "Create Course"}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}