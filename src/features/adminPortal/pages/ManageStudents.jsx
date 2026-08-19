import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Group,
  Select,
  TextInput,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import {
  Search,
  Plus,
} from "lucide-react";

import UploadStudentModal from "../components/uploadStudentModal.jsx";
import StudentTable from "../components/StudentTable.jsx";

import {
  fetchStudentsThunk,
  createStudentThunk,
  importStudentsThunk,
} from "../thunks/adminThunks.js";

export default function ManageStudents() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(null);
  const [graduationYear, setGraduationYear] =
    useState(null);

  const [uploadModalOpened, setUploadModalOpened] =
    useState(false);

  const dispatch = useDispatch();

 const {
  students,
  loadingStudents,
  creatingStudent,
  importingStudents,
} = useSelector((state) => state.admin);

  /*
  |--------------------------------------------------------------------------
  | Fetch Students
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(fetchStudentsThunk());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | Filter Students
  |--------------------------------------------------------------------------
  */

  const filteredStudents =
    students?.filter((student) => {
      const query = search.toLowerCase();

      const matchesSearch =
        student.name
          ?.toLowerCase()
          .includes(query) ||
        student.email
          ?.toLowerCase()
          .includes(query) ||
        student.student_id
          ?.toLowerCase()
          .includes(query);

      const matchesDepartment =
        !department ||
        student.department === department;

      const matchesGraduation =
        !graduationYear ||
        String(student.graduation_year) ===
          graduationYear;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesGraduation
      );
    }) || [];

  /*
  |--------------------------------------------------------------------------
  | Import Students
  |--------------------------------------------------------------------------
  */

  const handleImportStudents = async (file) => {
    console.log("Uploading:", file);

    if (!file) {
      return;
    }

    const result = await dispatch(
      importStudentsThunk(file)
    );

    /*
     * Only close the modal and refresh the table
     * if the import was successful.
     */
    if (
      importStudentsThunk.fulfilled.match(result)
    ) {
      setUploadModalOpened(false);

      /*
       * Fetch the latest students from the backend.
       */
      dispatch(fetchStudentsThunk());
    }
  };

  const handleCreateStudent = async (student) => {
  console.log("Creating student:", student);

  const result = await dispatch(
    createStudentThunk(student)
  );

  console.log("Create student result:", result);

  if (createStudentThunk.fulfilled.match(result)) {
    setUploadModalOpened(false);
  }
};

  return (
    <Box mt={50}>

      {/* -------------------------------------------------
          Filters
      -------------------------------------------------- */}

      <Group
        mb="md"
        wrap="nowrap"
      >
        <TextInput
          flex={1}
          radius="xl"
          value={search}
          onChange={(e) =>
            setSearch(
              e.currentTarget.value
            )
          }
          placeholder="Search students..."
          leftSection={
            <Search size={18} />
          }
        />

        <Select
          radius="xl"
          w={180}
          placeholder="All Departments"
          value={department}
          onChange={setDepartment}
          data={[
            {
              value: "cse",
              label:
                "Computer Science & Engineering",
            },
            {
              value: "ece",
              label:
                "Electronics & Communication",
            },
            {
              value: "me",
              label:
                "Mechanical Engineering",
            },
          ]}
          clearable
        />

        <Select
          radius="xl"
          w={150}
          placeholder="Graduation Year"
          value={graduationYear}
          onChange={setGraduationYear}
          data={[
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
          ]}
          clearable
        />

        <Button
          radius="xl"
          leftSection={
            <Plus size={17} />
          }
          onClick={() =>
            setUploadModalOpened(true)
          }
        >
          Add Students
        </Button>
      </Group>

      {/* -------------------------------------------------
          Table
      -------------------------------------------------- */}

      <StudentTable
        students={filteredStudents}
      />

      {/* -------------------------------------------------
          Upload Student Modal
      -------------------------------------------------- */}

      <UploadStudentModal
  opened={uploadModalOpened}
  onClose={() => setUploadModalOpened(false)}
  onCreate={handleCreateStudent}
  onUpload={handleImportStudents}
  loading={creatingStudent || importingStudents}
/>

    </Box>
  );
}