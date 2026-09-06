import { useEffect, useState } from "react";
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
  useMantineColorScheme,
} from "@mantine/core";

import {
  BookOpen,
  Hash,
  GraduationCap,
  Layers3,
  Clock,
  X,
  Save,
} from "lucide-react";

export default function UpdateCourseModal({
  opened,
  onClose,
  course,
  onUpdate,
  loading = false,
}) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  // =========================================================
  // FORM STATE
  // =========================================================

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [credits, setCredits] = useState(3);
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");

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
  // LOAD COURSE
  // =========================================================

  useEffect(() => {
    if (!course) return;

    setCode(course.code ?? "");
    setName(course.name ?? "");
    setDepartment(course.department ?? "");
    setCredits(course.credits ?? 3);
    setSemester(
      course.semester
        ? String(course.semester)
        : ""
    );
    setDescription(course.description ?? "");
  }, [course]);

  // =========================================================
  // COLORS
  // =========================================================

  const colors = {
    background: isDark ? "#1f1f1f" : "#ffffff",
    input: isDark ? "#292929" : "#ffffff",
    border: isDark ? "#404040" : "#ced4da",
    text: isDark ? "#f5f5f5" : "#212529",
    muted: isDark ? "#929292" : "#868e96",
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
  // VALIDATION
  // =========================================================

  const isValid =
    code.trim().length >= 2 &&
    name.trim().length >= 2;

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = () => {
    if (!course || !isValid) return;

    onUpdate?.({
      id: course.id,
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
  };

  // =========================================================
  // MODAL
  // =========================================================

  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
          <Group gap="sm">
            <ThemeIcon
              size={40}
              radius="md"
              variant="light"
              color="blue"
            >
              <BookOpen size={20} />
            </ThemeIcon>

            <Box>
              <Text
                fw={700}
                size="md"
                c={colors.text}
              >
                Edit Course
              </Text>

              <Text
                size="xs"
                c={colors.muted}
                mt={2}
              >
                Update course information and metadata
              </Text>
            </Box>
          </Group>

          <Button
            variant="subtle"
            color="gray"
            size="sm"
            p={5}
            onClick={onClose}
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
            placeholder="e.g. Data Structures and Algorithms"
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

          {/* COURSE DESCRIPTION */}

          <Textarea
            label="Course Description"
            placeholder="Brief overview or syllabus description..."
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
            onClick={onClose}
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