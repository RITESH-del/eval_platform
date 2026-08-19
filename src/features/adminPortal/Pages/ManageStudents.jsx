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
import { fetchStudentsThunk } from "../thunks/adminThunks.js";

export default function ManageStudents() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(null);
const [graduationYear, setGraduationYear] = useState(null);

  

  const dispatch = useDispatch();

  const [uploadModalOpened, setUploadModalOpened] =
  useState(false);

  const {
    students,
    loadingStudents,
  } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchStudentsThunk());
  }, [dispatch]);

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

  return (
    <Box mt={50}>

      {/* Filters */}
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
            { value: "2026", label: "2026" },
            { value: "2027", label: "2027" },
            { value: "2028", label: "2028" },
            { value: "2029", label: "2029" },
          ]}
          clearable
        />

        <Button
  radius="xl"
  leftSection={<Plus size={17} />}
  onClick={() => setUploadModalOpened(true)}
>
  Add Students
</Button>
      </Group>

      {/* Table */}
      <StudentTable
        students={filteredStudents}
      />

      <UploadStudentModal
  opened={uploadModalOpened}
  onClose={() => setUploadModalOpened(false)}
  onUpload={(file) => {
    console.log("Uploading:", file);

    // dispatch(importStudentsThunk(file));
  }}
/>
    </Box>
  );
}