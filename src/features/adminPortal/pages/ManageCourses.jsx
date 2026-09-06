import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Group,
  Select,
  TextInput,
  Text,
  Badge,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, BookOpen } from "lucide-react";
import { notifications } from "@mantine/notifications";

import CourseTable from "../components/CourseTable.jsx";
import UploadCourseModal from "../components/UploadCourseModal.jsx";
import {
  fetchCoursesThunk,
  createCourseThunk,
  importCoursesThunk,
} from "../thunks/adminThunks.js";

export default function ManageCourses() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(null);
  const [semester, setSemester] = useState(null);
  const [uploadModalOpened, setUploadModalOpened] = useState(false);

  const dispatch = useDispatch();

  const {
    courses,
    loadingCourses,
    creatingCourse,
    importingCourses,
  } = useSelector((state) => state.admin);

  /*
  |--------------------------------------------------------------------------
  | Fetch Courses
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    dispatch(fetchCoursesThunk());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | Filter Courses
  |--------------------------------------------------------------------------
  */
  const filteredCourses =
    courses?.filter((course) => {
      const query = search.toLowerCase();

      const matchesSearch =
        course.code?.toLowerCase().includes(query) ||
        course.name?.toLowerCase().includes(query) ||
        course.department?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query);

      const matchesDepartment =
        !department ||
        course.department?.toLowerCase() === department.toLowerCase();

      const matchesSemester =
        !semester ||
        String(course.semester) === semester;

      return matchesSearch && matchesDepartment && matchesSemester;
    }) || [];

  /*
  |--------------------------------------------------------------------------
  | Create Course
  |--------------------------------------------------------------------------
  */
  const handleCreateCourse = async (courseData) => {
    const result = await dispatch(createCourseThunk(courseData));

    if (createCourseThunk.fulfilled.match(result)) {
      notifications.show({
        title: "Course Created",
        message: `Course ${courseData.code} has been created successfully.`,
        color: "green",
      });
      setUploadModalOpened(false);
    } else {
      notifications.show({
        title: "Failed to Create Course",
        message: result.payload || "An error occurred while creating course.",
        color: "red",
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Import Courses via Excel
  |--------------------------------------------------------------------------
  */
  const handleImportCourses = async (file) => {
    if (!file) return;

    const result = await dispatch(importCoursesThunk(file));

    if (importCoursesThunk.fulfilled.match(result)) {
      const { total, imported, skipped } = result.payload || {};
      notifications.show({
        title: "Import Complete",
        message: `Imported ${imported} of ${total} courses (${skipped} skipped/duplicates).`,
        color: "green",
      });
      setUploadModalOpened(false);
      dispatch(fetchCoursesThunk());
    } else {
      notifications.show({
        title: "Import Failed",
        message: result.payload || "Failed to process the spreadsheet.",
        color: "red",
      });
    }
  };

  const departmentOptions = [
    { value: "cse", label: "CSE" },
    { value: "ece", label: "ECE" },
    { value: "me", label: "ME" },
    { value: "civil", label: "CIVIL" },
    { value: "eee", label: "EEE" },
    { value: "general", label: "GENERAL" },
  ];

  const semesterOptions = [
    { value: "1", label: "Semester 1" },
    { value: "2", label: "Semester 2" },
    { value: "3", label: "Semester 3" },
    { value: "4", label: "Semester 4" },
    { value: "5", label: "Semester 5" },
    { value: "6", label: "Semester 6" },
    { value: "7", label: "Semester 7" },
    { value: "8", label: "Semester 8" },
  ];

  return (
    <Box mt={50}>
      {/* -------------------------------------------------
          Filters & Actions Header
      -------------------------------------------------- */}
      <Group mb="md" wrap="nowrap">
        <TextInput
          flex={1}
          radius="xl"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search courses by code, name, department..."
          leftSection={<Search size={18} />}
        />

        <Select
          radius="xl"
          w={180}
          placeholder="All Departments"
          value={department}
          onChange={setDepartment}
          data={departmentOptions}
          clearable
        />

        <Select
          radius="xl"
          w={160}
          placeholder="All Semesters"
          value={semester}
          onChange={setSemester}
          data={semesterOptions}
          clearable
        />

        <Button
          radius="xl"
          leftSection={<Plus size={17} />}
          onClick={() => setUploadModalOpened(true)}
        >
          Add Courses
        </Button>
      </Group>

      {/* -------------------------------------------------
          Course Table
      -------------------------------------------------- */}
      <CourseTable courses={filteredCourses} />

      {/* -------------------------------------------------
          Upload & Create Course Modal
      -------------------------------------------------- */}
      <UploadCourseModal
        opened={uploadModalOpened}
        onClose={() => setUploadModalOpened(false)}
        onCreate={handleCreateCourse}
        onUpload={handleImportCourses}
        loading={creatingCourse || importingCourses}
      />
    </Box>
  );
}
