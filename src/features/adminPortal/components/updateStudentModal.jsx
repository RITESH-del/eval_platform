// import { useEffect, useState } from "react";
// import {
//   Modal,
//   TextInput,
//   Select,
//   Button,
//   Group,
//   Stack,
//   Text,
//   Box,
//   ThemeIcon,
// } from "@mantine/core";

// import {
//   UserRound,
//   Mail,
//   Hash,
//   GraduationCap,
//   Layers3,
//   X,
//   Save,
// } from "lucide-react";

// export default function UpdateStudentModal({
//   opened,
//   onClose,
//   student,
//   onUpdate,
//   loading = false,
// }) {
//   const [name, setName] = useState("");
//   const [studentId, setStudentId] = useState("");
//   const [department, setDepartment] = useState("");
//   const [graduationYear, setGraduationYear] = useState("");
//   const [section, setSection] = useState("");
//   const [email, setEmail] = useState("");

//   const departments = [
//     {
//       value: "cse",
//       label: "Computer Science & Engineering",
//     },
//     {
//       value: "ece",
//       label: "Electronics & Communication",
//     },
//     {
//       value: "me",
//       label: "Mechanical Engineering",
//     },
//     {
//       value: "civil",
//       label: "Civil Engineering",
//     },
//     {
//       value: "eee",
//       label: "Electrical Engineering",
//     },
//   ];

//   const graduationYears = [
//     { value: "2026", label: "2026" },
//     { value: "2027", label: "2027" },
//     { value: "2028", label: "2028" },
//     { value: "2029", label: "2029" },
//     { value: "2030", label: "2030" },
//   ];

//   const sections = [
//     { value: "A", label: "Section A" },
//     { value: "B", label: "Section B" },
//     { value: "C", label: "Section C" },
//     { value: "D", label: "Section D" },
//   ];

//   useEffect(() => {
//     if (!student) return;

//     setName(student.name ?? "");
//     setStudentId(student.student_id ?? "");
//     setDepartment(student.department ?? "");
//     setGraduationYear(
//       student.graduation_year
//         ? String(student.graduation_year)
//         : ""
//     );
//     setSection(student.section ?? "");
//     setEmail(student.email ?? "");
//   }, [student]);

//   const handleSubmit = () => {
//     if (!student) return;

//     onUpdate?.({
//       id: student.id,
//       name: name.trim(),
//       student_id: studentId.trim(),
//       department,
//       graduation_year: Number(graduationYear),
//       section,
//       email: email.trim(),
//     });
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   const isValid =
//     name.trim() &&
//     studentId.trim() &&
//     department &&
//     graduationYear &&
//     section &&
//     email.trim();

//   return (
//     <Modal
//       opened={opened}
//       onClose={handleClose}
//       centered
//       size={600}
//       padding={0}
//       radius="md"
//       withCloseButton={false}
//       styles={{
//         content: {
//           backgroundColor: "#1f1f1f",
//           color: "#f5f5f5",
//         },
//         header: {
//           backgroundColor: "#1f1f1f",
//           color: "#f5f5f5",
//         },
//         body: {
//           padding: 0,
//           backgroundColor: "#1f1f1f",
//         },
//       }}
//       overlayProps={{
//         backgroundOpacity: 0.65,
//         blur: 4,
//       }}
//     >
//       {/* Header */}
//       <Box
//         px="xl"
//         py="lg"
//         style={{
//           borderBottom: "1px solid #303030",
//           background: "#1f1f1f",
//         }}
//       >
//         <Group justify="space-between" align="flex-start">
//           <Box>
//             <Text
//               fw={650}
//               size="lg"
//               c="gray.0"
//               style={{
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Update Student
//             </Text>

//             <Text size="sm" c="gray.5" mt={3}>
//               Update the student's academic and account
//               information.
//             </Text>
//           </Box>

//           <Button
//             variant="subtle"
//             color="gray"
//             size="sm"
//             p={5}
//             onClick={handleClose}
//           >
//             <X size={18} />
//           </Button>
//         </Group>
//       </Box>

//       {/* Form */}
//       <Box
//         px="xl"
//         py="lg"
//         style={{
//           background: "#1f1f1f",
//         }}
//       >
//         <Stack gap="md">

//           {/* Full Name */}
//           <TextInput
//             label="Full Name"
//             placeholder="e.g. Aarav Sharma"
//             leftSection={<UserRound size={16} />}
//             value={name}
//             onChange={(e) =>
//               setName(e.currentTarget.value)
//             }
//             radius="sm"
//             styles={{
//               label: {
//                 color: "#e5e5e5",
//                 fontWeight: 600,
//                 marginBottom: 6,
//               },
//               input: {
//                 backgroundColor: "#292929",
//                 borderColor: "#404040",
//                 color: "#f5f5f5",
//               },
//               section: {
//                 color: "#929292",
//               },
//             }}
//           />

//           {/* Student ID + Department */}
//           <Group grow align="flex-start">
//             <TextInput
//               label="Student ID"
//               placeholder="BMU24CSE001"
//               leftSection={<Hash size={16} />}
//               value={studentId}
//               onChange={(e) =>
//                 setStudentId(e.currentTarget.value)
//               }
//               radius="sm"
//               styles={{
//                 label: {
//                   color: "#e5e5e5",
//                   fontWeight: 600,
//                   marginBottom: 6,
//                 },
//                 input: {
//                   backgroundColor: "#292929",
//                   borderColor: "#404040",
//                   color: "#f5f5f5",
//                 },
//                 section: {
//                   color: "#929292",
//                 },
//               }}
//             />

//             <Select
//               label="Department"
//               placeholder="Select department"
//               leftSection={
//                 <GraduationCap size={16} />
//               }
//               data={departments}
//               value={department}
//               onChange={setDepartment}
//               radius="sm"
//               styles={{
//                 label: {
//                   color: "#e5e5e5",
//                   fontWeight: 600,
//                   marginBottom: 6,
//                 },
//                 input: {
//                   backgroundColor: "#292929",
//                   borderColor: "#404040",
//                   color: "#f5f5f5",
//                 },
//                 section: {
//                   color: "#929292",
//                 },
//               }}
//             />
//           </Group>

//           {/* Graduation Year + Section */}
//           <Group grow align="flex-start">
//             <Select
//               label="Graduation Year"
//               placeholder="Select year"
//               data={graduationYears}
//               value={graduationYear}
//               onChange={setGraduationYear}
//               radius="sm"
//               styles={{
//                 label: {
//                   color: "#e5e5e5",
//                   fontWeight: 600,
//                   marginBottom: 6,
//                 },
//                 input: {
//                   backgroundColor: "#292929",
//                   borderColor: "#404040",
//                   color: "#f5f5f5",
//                 },
//                 section: {
//                   color: "#929292",
//                 },
//               }}
//             />

//             <Select
//               label="Section"
//               placeholder="Select section"
//               leftSection={<Layers3 size={16} />}
//               data={sections}
//               value={section}
//               onChange={setSection}
//               radius="sm"
//               styles={{
//                 label: {
//                   color: "#e5e5e5",
//                   fontWeight: 600,
//                   marginBottom: 6,
//                 },
//                 input: {
//                   backgroundColor: "#292929",
//                   borderColor: "#404040",
//                   color: "#f5f5f5",
//                 },
//                 section: {
//                   color: "#929292",
//                 },
//               }}
//             />
//           </Group>

//           {/* Email */}
//           <TextInput
//             label="Institutional Email"
//             placeholder="aarav.sharma@bmu.edu.in"
//             leftSection={<Mail size={16} />}
//             value={email}
//             onChange={(e) =>
//               setEmail(e.currentTarget.value)
//             }
//             radius="sm"
//             styles={{
//               label: {
//                 color: "#e5e5e5",
//                 fontWeight: 600,
//                 marginBottom: 6,
//               },
//               input: {
//                 backgroundColor: "#292929",
//                 borderColor: "#404040",
//                 color: "#f5f5f5",
//               },
//               section: {
//                 color: "#929292",
//               },
//             }}
//           />

//           {/* Authentication */}
//           <Box
//             p="md"
//             style={{
//               background: "#182b42",
//               border: "1px solid #24466d",
//               borderRadius: 8,
//             }}
//           >
//             <Group
//               align="flex-start"
//               wrap="nowrap"
//             >
//               <ThemeIcon
//                 variant="light"
//                 color="blue"
//                 size={34}
//                 radius="sm"
//               >
//                 <GraduationCap size={17} />
//               </ThemeIcon>

//               <Box>
//                 <Text
//                   size="sm"
//                   fw={600}
//                   c="gray.1"
//                 >
//                   Student Authentication
//                 </Text>

//                 <Text
//                   size="xs"
//                   c="gray.4"
//                   mt={3}
//                   lh={1.5}
//                 >
//                   Students do not use local passwords.
//                   Authentication is handled through the
//                   university identity system.
//                 </Text>
//               </Box>
//             </Group>
//           </Box>
//         </Stack>
//       </Box>

//       {/* Footer */}
//       <Box
//         px="xl"
//         py="md"
//         style={{
//           borderTop: "1px solid #303030",
//           background: "#1f1f1f",
//         }}
//       >
//         <Group justify="flex-end">
//           <Button
//             variant="default"
//             radius="sm"
//             onClick={handleClose}
//             styles={{
//               root: {
//                 backgroundColor: "#292929",
//                 borderColor: "#404040",
//                 color: "#f5f5f5",
//               },
//             }}
//           >
//             Cancel
//           </Button>

//           <Button
//             radius="sm"
//             leftSection={<Save size={16} />}
//             disabled={!isValid}
//             loading={loading}
//             onClick={handleSubmit}
//           >
//             Save Changes
//           </Button>
//         </Group>
//       </Box>
//     </Modal>
//   );
// }

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

import {
  UserRound,
  Mail,
  Hash,
  GraduationCap,
  Layers3,
  X,
  Save,
} from "lucide-react";

export default function UpdateStudentModal({
  opened,
  onClose,
  student,
  onUpdate,
  loading = false,
}) {
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");

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

  const graduationYears = [
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "2030", label: "2030" },
  ];

  const sections = [
    { value: "I", label: "Section I" },
    { value: "II", label: "Section II" },
    { value: "III", label: "Section III" },
    { value: "IV", label: "Section IV" },
    { value: "V", label: "Section V" },
    { value: "VI", label: "Section VI" },
    { value: "VII", label: "Section VII" },
    { value: "VIII", label: "Section VIII" },
    { value: "IX", label: "Section IX" },
    { value: "X", label: "Section X" },
  ];

  /*
  |--------------------------------------------------------------------------
  | Theme colors
  |--------------------------------------------------------------------------
  */

  const colors = {
    background: isDark ? "#1f1f1f" : "#ffffff",
    input: isDark ? "#292929" : "#ffffff",
    border: isDark ? "#404040" : "#ced4da",
    text: isDark ? "#f5f5f5" : "#212529",
    muted: isDark ? "#929292" : "#868e96",

    authBackground: isDark ? "#182b42" : "#eef6ff",
    authBorder: isDark ? "#24466d" : "#b8d8f8",
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

  useEffect(() => {
    if (!student) return;

    setName(student.name ?? "");
    setStudentId(student.student_id ?? "");
    setDepartment(student.department ?? "");

    setGraduationYear(
      student.graduation_year
        ? String(student.graduation_year)
        : ""
    );

    setSection(student.section ?? "");
    setEmail(student.email ?? "");
  }, [student]);

  const handleSubmit = () => {
    if (!student) return;

    onUpdate?.({
      id: student.id,
      name: name.trim(),
      student_id: studentId.trim(),
      department,
      graduation_year: Number(graduationYear),
      section,
      email: email.trim(),
    });
  };

  const handleClose = () => {
    onClose();
  };

  const isValid =
    name.trim() &&
    studentId.trim() &&
    department &&
    graduationYear &&
    section &&
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
      {/* Header */}

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
              Update Student
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt={3}
            >
              Update the student's academic and account
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

      {/* Form */}

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
            placeholder="e.g. Aarav Sharma"
            leftSection={<UserRound size={16} />}
            value={name}
            onChange={(e) =>
              setName(e.currentTarget.value)
            }
            radius="sm"
            styles={inputStyles}
          />

          {/* Student ID + Department */}

          <Group grow align="flex-start">
            <TextInput
              label="Enrollment Number"
              placeholder="e.g 240001"
              leftSection={<Hash size={16} />}
              value={studentId}
              onChange={(e) =>
                setStudentId(e.currentTarget.value)
              }
              radius="sm"
              styles={inputStyles}
            />

            <Select
              label="Department"
              placeholder="Select department"
              leftSection={
                <GraduationCap size={16} />
              }
              data={departments}
              value={department}
              onChange={setDepartment}
              radius="sm"
              styles={inputStyles}
            />
          </Group>

          {/* Graduation Year + Section */}

          <Group grow align="flex-start">
            <Select
              label="Batch"
              placeholder="Select Batch"
              data={graduationYears}
              value={graduationYear}
              onChange={setGraduationYear}
              radius="sm"
              styles={inputStyles}
            />

            <Select
              label="Section"
              placeholder="Select section"
              leftSection={<Layers3 size={16} />}
              data={sections}
              value={section}
              onChange={setSection}
              radius="sm"
              styles={inputStyles}
            />
          </Group>

          {/* Email */}

          <TextInput
            label="Institutional Email"
            placeholder="aarav.sharma@bmu.edu.in"
            leftSection={<Mail size={16} />}
            value={email}
            onChange={(e) =>
              setEmail(e.currentTarget.value)
            }
            radius="sm"
            styles={inputStyles}
          />

          {/* Authentication */}

          <Box
            p="md"
            style={{
              background: colors.authBackground,
              border: `1px solid ${colors.authBorder}`,
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
                <GraduationCap size={17} />
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
                  Students do not use local passwords.
                  Authentication is handled through the
                  university identity system.
                </Text>
              </Box>
            </Group>
          </Box>
        </Stack>
      </Box>

      {/* Footer */}

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
            leftSection={<Save size={16} />}
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