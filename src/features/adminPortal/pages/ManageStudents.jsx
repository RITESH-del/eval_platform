// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Group,
//   Select,
//   TextInput,
// } from "@mantine/core";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   Search,
//   Plus,
// } from "lucide-react";

// import UploadStudentModal from "../components/uploadStudentModal.jsx";
// import StudentTable from "../components/StudentTable.jsx";

// import {
//   fetchStudentsThunk,
//   createStudentThunk,
//   importStudentsThunk,
// } from "../thunks/adminThunks.js";

// export default function ManageStudents() {
//   const [search, setSearch] = useState("");
//   const [department, setDepartment] = useState(null);
//   const [graduationYear, setGraduationYear] =
//     useState(null);

//   const [uploadModalOpened, setUploadModalOpened] =
//     useState(false);

//   const dispatch = useDispatch();

//  const {
//   students,
//   loadingStudents,
//   creatingStudent,
//   importingStudents,
// } = useSelector((state) => state.admin);

//   /*
//   |--------------------------------------------------------------------------
//   | Fetch Students
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     dispatch(fetchStudentsThunk());
//   }, [dispatch]);

//   /*
//   |--------------------------------------------------------------------------
//   | Filter Students
//   |--------------------------------------------------------------------------
//   */

//   const filteredStudents =
//     students?.filter((student) => {
//       const query = search.toLowerCase();

//       const matchesSearch =
//         student.name
//           ?.toLowerCase()
//           .includes(query) ||
//         student.email
//           ?.toLowerCase()
//           .includes(query) ||
//         student.student_id
//           ?.toLowerCase()
//           .includes(query);

//       const matchesDepartment =
//         !department ||
//         student.department === department;

//       const matchesGraduation =
//         !graduationYear ||
//         String(student.graduation_year) ===
//           graduationYear;

//       return (
//         matchesSearch &&
//         matchesDepartment &&
//         matchesGraduation
//       );
//     }) || [];

//   /*
//   |--------------------------------------------------------------------------
//   | Import Students
//   |--------------------------------------------------------------------------
//   */

//   const handleImportStudents = async (file) => {
//     console.log("Uploading:", file);

//     if (!file) {
//       return;
//     }

//     const result = await dispatch(
//       importStudentsThunk(file)
//     );

//     /*
//      * Only close the modal and refresh the table
//      * if the import was successful.
//      */
//     if (
//       importStudentsThunk.fulfilled.match(result)
//     ) {
//       setUploadModalOpened(false);

//       /*
//        * Fetch the latest students from the backend.
//        */
//       dispatch(fetchStudentsThunk());
//     }
//   };

//   const handleCreateStudent = async (student) => {
//   console.log("Creating student:", student);

//   const result = await dispatch(
//     createStudentThunk(student)
//   );

//   console.log("Create student result:", result);

//   if (createStudentThunk.fulfilled.match(result)) {
//     setUploadModalOpened(false);
//   }
// };

// const departmentOptions = [
//   ...new Set(
//     students
//       ?.map((student) => student.department)
//       .filter(Boolean)
//   ),
// ].map((department) => ({
//   value: department,
//   label: department.toUpperCase(),
// }));

// const graduationYearOptions = [
//   ...new Set(
//     students
//       ?.map((student) => student.graduation_year)
//       .filter(Boolean)
//   ),
// ]
//   .sort((a, b) => a - b)
//   .map((year) => ({
//     value: String(year),
//     label: String(year),
//   }));

//   return (
//     <Box mt={50}>

//       {/* -------------------------------------------------
//           Filters
//       -------------------------------------------------- */}

//       <Group
//         mb="md"
//         wrap="nowrap"
//       >
//         <TextInput
//           flex={1}
//           radius="xl"
//           value={search}
//           onChange={(e) =>
//             setSearch(
//               e.currentTarget.value
//             )
//           }
//           placeholder="Search students..."
//           leftSection={
//             <Search size={18} />
//           }
//         />

//         <Select
//           radius="xl"
//           w={180}
//           placeholder="All Departments"
//           value={department}
//           onChange={setDepartment}
//           data={departmentOptions}
//           clearable
//         />

//         <Select
//           radius="xl"
//           w={150}
//           placeholder="Graduation Year"
//           value={graduationYear}
//           onChange={setGraduationYear}
//           data={graduationYearOptions}
//           clearable
//         />

//         <Button
//           radius="xl"
//           leftSection={
//             <Plus size={17} />
//           }
//           onClick={() =>
//             setUploadModalOpened(true)
//           }
//         >
//           Add Students
//         </Button>
//       </Group>

//       {/* -------------------------------------------------
//           Table
//       -------------------------------------------------- */}

//       <StudentTable
//         students={filteredStudents}
//       />

//       {/* -------------------------------------------------
//           Upload Student Modal
//       -------------------------------------------------- */}

//       <UploadStudentModal
//   opened={uploadModalOpened}
//   onClose={() => setUploadModalOpened(false)}
//   onCreate={handleCreateStudent}
//   onUpload={handleImportStudents}
//   loading={creatingStudent || importingStudents}
// />

//     </Box>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Group,
  Select,
  Text,
  TextInput,
  Paper,
  SimpleGrid,
  ThemeIcon,
  Stack,
} from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";

import {
  Search,
  Plus,
  Users,
  GraduationCap,
  CalendarDays,
  Layers3,
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

  const [
    uploadModalOpened,
    setUploadModalOpened,
  ] = useState(false);

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
  | Analytics
  |--------------------------------------------------------------------------
  */

  const analytics = useMemo(() => {
    const studentList = students || [];

    const departments = new Set(
      studentList
        .map((student) => student.department)
        .filter(Boolean)
    );

    const graduationYears = new Set(
      studentList
        .map(
          (student) =>
            student.graduation_year
        )
        .filter(Boolean)
    );

    const sections = new Set(
      studentList
        .map((student) => student.section)
        .filter(Boolean)
    );

    return {
      totalStudents: studentList.length,
      totalDepartments: departments.size,
      totalBatches: graduationYears.size,
      totalSections: sections.size,
    };
  }, [students]);

  /*
  |--------------------------------------------------------------------------
  | Filter Students
  |--------------------------------------------------------------------------
  */

  const filteredStudents =
    students?.filter((student) => {
      const query =
        search.toLowerCase().trim();

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
        String(
          student.graduation_year
        ) === graduationYear;

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

    if (
      importStudentsThunk.fulfilled.match(
        result
      )
    ) {
      setUploadModalOpened(false);

      dispatch(fetchStudentsThunk());
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Create Student
  |--------------------------------------------------------------------------
  */

  const handleCreateStudent = async (
    student
  ) => {
    console.log(
      "Creating student:",
      student
    );

    const result = await dispatch(
      createStudentThunk(student)
    );

    console.log(
      "Create student result:",
      result
    );

    if (
      createStudentThunk.fulfilled.match(
        result
      )
    ) {
      setUploadModalOpened(false);

      // Refresh the table and analytics
      dispatch(fetchStudentsThunk());
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Department Options
  |--------------------------------------------------------------------------
  */

  const departmentOptions = [
    ...new Set(
      students
        ?.map(
          (student) =>
            student.department
        )
        .filter(Boolean)
    ),
  ].map((department) => ({
    value: department,
    label: department.toUpperCase(),
  }));

  /*
  |--------------------------------------------------------------------------
  | Graduation Year Options
  |--------------------------------------------------------------------------
  */

  const graduationYearOptions = [
    ...new Set(
      students
        ?.map(
          (student) =>
            student.graduation_year
        )
        .filter(Boolean)
    ),
  ]
    .sort((a, b) => a - b)
    .map((year) => ({
      value: String(year),
      label: String(year),
    }));

  /*
  |--------------------------------------------------------------------------
  | Analytics Card
  |--------------------------------------------------------------------------
  */

  const AnalyticsCard = ({
    icon,
    title,
    value,
    description,
    color,
  }) => {
    return (
      <Paper
        withBorder
        radius="lg"
        p="md"
        style={{
          backgroundColor:
            "var(--mantine-color-body)",
          height: "100%",
        }}
      >
        <Group
          justify="space-between"
          align="flex-start"
        >
          <Stack gap={2}>
            <Text
              size="xs"
              fw={600}
              c="dimmed"
              tt="uppercase"
              style={{
                letterSpacing:
                  "0.04em",
              }}
            >
              {title}
            </Text>

            <Text
              fw={700}
              size="xl"
              style={{
                fontSize: 26,
                lineHeight: 1.2,
              }}
            >
              {value}
            </Text>

            <Text
              size="xs"
              c="dimmed"
            >
              {description}
            </Text>
          </Stack>

          <ThemeIcon
            size={42}
            radius="md"
            variant="light"
            color={color}
          >
            {icon}
          </ThemeIcon>
        </Group>
      </Paper>
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <Box mt={50}>

      {/* ==================================================
          ANALYTICS
      =================================================== */}

      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 4,
        }}
        spacing="md"
        mb="lg"
      >
        <AnalyticsCard
          title="Total Students"
          value={
            loadingStudents
              ? "—"
              : analytics.totalStudents
          }
          description="Registered students"
          color="blue"
          icon={
            <Users size={21} />
          }
        />

        <AnalyticsCard
          title="Departments"
          value={
            loadingStudents
              ? "—"
              : analytics.totalDepartments
          }
          description="Active departments"
          color="violet"
          icon={
            <GraduationCap
              size={21}
            />
          }
        />

        <AnalyticsCard
          title="Batches"
          value={
            loadingStudents
              ? "—"
              : analytics.totalBatches
          }
          description="Graduation years"
          color="orange"
          icon={
            <CalendarDays
              size={21}
            />
          }
        />

        <AnalyticsCard
          title="Sections"
          value={
            loadingStudents
              ? "—"
              : analytics.totalSections
          }
          description="Active sections"
          color="green"
          icon={
            <Layers3 size={21} />
          }
        />
      </SimpleGrid>

      {/* ==================================================
          FILTERS
      =================================================== */}

      <Group
        mb="md"
        wrap="nowrap"
        align="center"
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
          data={departmentOptions}
          clearable
        />

        <Select
          radius="xl"
          w={150}
          placeholder="Graduation Year"
          value={graduationYear}
          onChange={setGraduationYear}
          data={graduationYearOptions}
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

      {/* ==================================================
          TABLE
      =================================================== */}

      <StudentTable
        students={filteredStudents}
      />

      {/* ==================================================
          UPLOAD STUDENT MODAL
      =================================================== */}

      <UploadStudentModal
        opened={uploadModalOpened}
        onClose={() =>
          setUploadModalOpened(false)
        }
        onCreate={
          handleCreateStudent
        }
        onUpload={
          handleImportStudents
        }
        loading={
          creatingStudent ||
          importingStudents
        }
      />
    </Box>
  );
}