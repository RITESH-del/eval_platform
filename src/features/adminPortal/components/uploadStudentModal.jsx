// import { useState } from "react";
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
//   FileSpreadsheet,
//   Upload,
//   X,
//   Users,
//   UserRound,
//   Mail,
//   Hash,
//   GraduationCap,
//   Layers3,
//   ShieldCheck,
// } from "lucide-react";

// export default function UploadStudentModal({
//   opened,
//   onClose,
//   onCreate,
//   onUpload,
//   loading = false,
// }) {
//   const [mode, setMode] = useState("single");

//   // Single student fields
//   const [name, setName] = useState("");
//   const [studentId, setStudentId] = useState("");
//   const [department, setDepartment] = useState("");
//   const [graduationYear, setGraduationYear] =
//     useState("");
//   const [section, setSection] = useState("");
//   const [email, setEmail] = useState("");

//   // Excel
//   const [excelFile, setExcelFile] = useState(null);

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

//   const inputStyles = {
//     label: {
//       color: "#e5e5e5",
//       fontWeight: 600,
//       marginBottom: 6,
//     },

//     input: {
//       backgroundColor: "#292929",
//       borderColor: "#404040",
//       color: "#f5f5f5",
//     },

//     section: {
//       color: "#929292",
//     },
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     setExcelFile(file);
//   };

//   const handleSubmit = () => {
//     if (mode === "excel") {
//       if (!excelFile) return;

//       onUpload?.(excelFile);
//       return;
//     }

//     if (
//       !name.trim() ||
//       !studentId.trim() ||
//       !department ||
//       !graduationYear ||
//       !section ||
//       !email.trim()
//     ) {
//       return;
//     }

//     onCreate?.({
//       name: name.trim(),
//       student_id: studentId.trim(),
//       department,
//       graduation_year: Number(graduationYear),
//       section,
//       email: email.trim(),
//     });
//   };

//   const handleClose = () => {
//     setMode("single");

//     setName("");
//     setStudentId("");
//     setDepartment("");
//     setGraduationYear("");
//     setSection("");
//     setEmail("");

//     setExcelFile(null);

//     onClose();
//   };

//   const isSingleStudentValid =
//     name.trim() &&
//     studentId.trim() &&
//     department &&
//     graduationYear &&
//     section &&
//     email.trim();

//   const isValid =
//     mode === "excel"
//       ? !!excelFile
//       : !!isSingleStudentValid;

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
//       {/* =========================
//           HEADER
//       ========================= */}

//       <Box
//         px="xl"
//         py="lg"
//         style={{
//           borderBottom: "1px solid #303030",
//           background: "#1f1f1f",
//         }}
//       >
//         <Group
//           justify="space-between"
//           align="flex-start"
//         >
//           <Box>
//             <Text
//               fw={650}
//               size="lg"
//               c="gray.0"
//               style={{
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Add Students
//             </Text>

//             <Text
//               size="sm"
//               c="gray.5"
//               mt={3}
//             >
//               Add a single student or import multiple
//               students from an Excel file.
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

//       {/* =========================
//           CONTENT
//       ========================= */}

//       <Box
//         px="xl"
//         py="lg"
//         style={{
//           background: "#1f1f1f",
//         }}
//       >
//         <Stack gap="lg">

//           {/* Mode Selector */}

//           <Group grow gap="xs">
//             <Button
//               variant={
//                 mode === "single"
//                   ? "filled"
//                   : "subtle"
//               }
//               color={
//                 mode === "single"
//                   ? "blue"
//                   : "gray"
//               }
//               radius="sm"
//               leftSection={
//                 <UserRound size={15} />
//               }
//               onClick={() =>
//                 setMode("single")
//               }
//             >
//               Single Student
//             </Button>

//             <Button
//               variant={
//                 mode === "excel"
//                   ? "filled"
//                   : "subtle"
//               }
//               color={
//                 mode === "excel"
//                   ? "blue"
//                   : "gray"
//               }
//               radius="sm"
//               leftSection={
//                 <FileSpreadsheet
//                   size={15}
//                 />
//               }
//               onClick={() =>
//                 setMode("excel")
//               }
//             >
//               Excel Upload
//             </Button>
//           </Group>

//           {/* =========================
//               SINGLE STUDENT
//           ========================= */}

//           {mode === "single" && (
//             <Stack gap="md">

//               {/* Full Name */}

//               <TextInput
//                 label="Full Name"
//                 placeholder="e.g. Aarav Sharma"
//                 leftSection={
//                   <UserRound size={16} />
//                 }
//                 value={name}
//                 onChange={(e) =>
//                   setName(
//                     e.currentTarget.value
//                   )
//                 }
//                 radius="sm"
//                 styles={inputStyles}
//               />

//               {/* Student ID + Department */}

//               <Group
//                 grow
//                 align="flex-start"
//               >
//                 <TextInput
//                   label="Student ID"
//                   placeholder="BMU24CSE001"
//                   leftSection={
//                     <Hash size={16} />
//                   }
//                   value={studentId}
//                   onChange={(e) =>
//                     setStudentId(
//                       e.currentTarget.value
//                     )
//                   }
//                   radius="sm"
//                   styles={inputStyles}
//                 />

//                 <Select
//                   label="Department"
//                   placeholder="Select department"
//                   leftSection={
//                     <GraduationCap
//                       size={16}
//                     />
//                   }
//                   data={departments}
//                   value={department}
//                   onChange={setDepartment}
//                   radius="sm"
//                   styles={inputStyles}
//                 />
//               </Group>

//               {/* Graduation Year + Section */}

//               <Group
//                 grow
//                 align="flex-start"
//               >
//                 <Select
//                   label="Graduation Year"
//                   placeholder="Select year"
//                   data={graduationYears}
//                   value={graduationYear}
//                   onChange={
//                     setGraduationYear
//                   }
//                   radius="sm"
//                   styles={inputStyles}
//                 />

//                 <Select
//                   label="Section"
//                   placeholder="Select section"
//                   leftSection={
//                     <Layers3 size={16} />
//                   }
//                   data={sections}
//                   value={section}
//                   onChange={setSection}
//                   radius="sm"
//                   styles={inputStyles}
//                 />
//               </Group>

//               {/* Email */}

//               <TextInput
//                 label="Institutional Email"
//                 placeholder="aarav.sharma@bmu.edu.in"
//                 leftSection={
//                   <Mail size={16} />
//                 }
//                 value={email}
//                 onChange={(e) =>
//                   setEmail(
//                     e.currentTarget.value
//                   )
//                 }
//                 radius="sm"
//                 styles={inputStyles}
//               />

//               {/* Authentication */}

//               <Box
//                 p="md"
//                 style={{
//                   background: "#182b42",
//                   border:
//                     "1px solid #24466d",
//                   borderRadius: 8,
//                 }}
//               >
//                 <Group
//                   align="flex-start"
//                   wrap="nowrap"
//                 >
//                   <ThemeIcon
//                     variant="light"
//                     color="blue"
//                     size={34}
//                     radius="sm"
//                   >
//                     <ShieldCheck
//                       size={17}
//                     />
//                   </ThemeIcon>

//                   <Box>
//                     <Text
//                       size="sm"
//                       fw={600}
//                       c="gray.1"
//                     >
//                       Student Authentication
//                     </Text>

//                     <Text
//                       size="xs"
//                       c="gray.4"
//                       mt={3}
//                       lh={1.5}
//                     >
//                       Students do not receive
//                       local passwords. They
//                       authenticate through the
//                       university identity system.
//                     </Text>
//                   </Box>
//                 </Group>
//               </Box>

//             </Stack>
//           )}

//           {/* =========================
//               EXCEL UPLOAD
//           ========================= */}

//           {mode === "excel" && (
//             <Stack gap="md">

//               {/* Upload Area */}

//               <Box
//                 p="xl"
//                 style={{
//                   border:
//                     "1.5px dashed #454545",
//                   borderRadius: 10,
//                   background: "#242424",
//                   textAlign: "center",
//                 }}
//               >
//                 <Stack
//                   align="center"
//                   gap="xs"
//                 >
//                   <ThemeIcon
//                     size={52}
//                     radius="md"
//                     variant="light"
//                     color="green"
//                   >
//                     <FileSpreadsheet
//                       size={26}
//                     />
//                   </ThemeIcon>

//                   <Text
//                     fw={600}
//                     size="sm"
//                     mt={4}
//                     c="gray.1"
//                   >
//                     Upload Student List
//                   </Text>

//                   <Text
//                     size="xs"
//                     c="gray.5"
//                     maw={390}
//                     lh={1.5}
//                   >
//                     Select an Excel spreadsheet
//                     containing student information.
//                     Multiple student accounts can
//                     be imported at once.
//                   </Text>

//                   <Button
//                     variant="light"
//                     color="blue"
//                     leftSection={
//                       <Upload size={15} />
//                     }
//                     mt="xs"
//                     onClick={() => {
//                       document
//                         .getElementById(
//                           "student-excel-input"
//                         )
//                         ?.click();
//                     }}
//                   >
//                     Choose Excel File
//                   </Button>

//                   <input
//                     id="student-excel-input"
//                     type="file"
//                     accept=".xlsx,.xls"
//                     hidden
//                     onChange={
//                       handleFileChange
//                     }
//                   />

//                   {excelFile && (
//                     <Text
//                       size="xs"
//                       fw={500}
//                       c="blue"
//                       mt={4}
//                     >
//                       {excelFile.name}
//                     </Text>
//                   )}

//                   <Text
//                     size="xs"
//                     c="gray.6"
//                   >
//                     Supported formats:
//                     {" "}
//                     .xlsx, .xls
//                   </Text>
//                 </Stack>
//               </Box>

//               {/* Required Columns */}

//               <Box>
//                 <Text
//                   size="xs"
//                   fw={600}
//                   c="gray.3"
//                   mb={6}
//                 >
//                   Required columns
//                 </Text>

//                 <Group gap={6}>
//                   {[
//                     "name",
//                     "student_id",
//                     "email",
//                     "department",
//                     "graduation_year",
//                     "section",
//                   ].map((column) => (
//                     <Box
//                       key={column}
//                       px={8}
//                       py={4}
//                       style={{
//                         background:
//                           "#292929",
//                         border:
//                           "1px solid #383838",
//                         borderRadius: 5,
//                       }}
//                     >
//                       <Text
//                         size="xs"
//                         c="gray.4"
//                       >
//                         {column}
//                       </Text>
//                     </Box>
//                   ))}
//                 </Group>
//               </Box>

//               {/* Authentication Information */}

//               <Box
//                 p="md"
//                 style={{
//                   background: "#182b42",
//                   border:
//                     "1px solid #24466d",
//                   borderRadius: 8,
//                 }}
//               >
//                 <Group
//                   align="flex-start"
//                   wrap="nowrap"
//                 >
//                   <ThemeIcon
//                     variant="light"
//                     color="blue"
//                     size={34}
//                     radius="sm"
//                   >
//                     <ShieldCheck
//                       size={17}
//                     />
//                   </ThemeIcon>

//                   <Box>
//                     <Text
//                       size="sm"
//                       fw={600}
//                       c="gray.1"
//                     >
//                       Student Authentication
//                     </Text>

//                     <Text
//                       size="xs"
//                       c="gray.4"
//                       mt={3}
//                       lh={1.5}
//                     >
//                       Students do not receive
//                       local passwords. They will
//                       authenticate using the
//                       university identity system.
//                     </Text>
//                   </Box>
//                 </Group>
//               </Box>

//             </Stack>
//           )}
//         </Stack>
//       </Box>

//       {/* =========================
//           FOOTER
//       ========================= */}

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
//             leftSection={
//               mode === "excel" ? (
//                 <Upload size={16} />
//               ) : (
//                 <Users size={16} />
//               )
//             }
//             disabled={!isValid}
//             loading={loading}
//             onClick={handleSubmit}
//           >
//             {mode === "excel"
//               ? "Import Students"
//               : "Create Student"}
//           </Button>

//         </Group>
//       </Box>
//     </Modal>
//   );
// }

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

  // Single student fields
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationYear, setGraduationYear] =
    useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");

  // Excel
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

  const graduationYears = [
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "2030", label: "2030" },
  ];

const sections = [
  { group: "Computer Science (CSE)", items: [
    { value: "CSE-I", label: "CSE - Section I" },
    { value: "CSE-II", label: "CSE - Section II" },
    { value: "CSE-III", label: "CSE - Section III" },
    { value: "CSE-IV", label: "CSE - Section IV" },
    { value: "CSE-V", label: "CSE - Section V" },
    { value: "CSE-VI", label: "CSE - Section VI" },
    { value: "CSE-VII", label: "CSE - Section VII" },
    { value: "CSE-VIII", label: "CSE - Section VIII" },
  ]},
  { group: "Electronics (ECOM E)", items: [
    { value: "ECOM E-I", label: "ECOM E - Section I" },
    { value: "ECOM E-II", label: "ECOM E - Section II" },
    { value: "ECOM E-III", label: "ECOM E - Section III" },
    { value: "ECOM E-IV", label: "ECOM E - Section IV" },
    { value: "ECOM E-V", label: "ECOM E - Section V" },
    { value: "ECOM E-VI", label: "ECOM E - Section VI" },
    { value: "ECOM E-VII", label: "ECOM E - Section VII" },
    { value: "ECOM E-VIII", label: "ECOM E - Section VIII" },
  ]},
  { group: "General Sections", items: [
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
    { value: "A", label: "Section A" },
    { value: "B", label: "Section B" },
    { value: "C", label: "Section C" },
    { value: "D", label: "Section D" },
  ]},
];

  /*
  |--------------------------------------------------------------------------
  | Theme colors
  |--------------------------------------------------------------------------
  */

  const colors = {
    background: isDark ? "#1f1f1f" : "#ffffff",
    surface: isDark ? "#292929" : "#f8f9fa",
    input: isDark ? "#292929" : "#ffffff",
    border: isDark ? "#404040" : "#ced4da",
    text: isDark ? "#f5f5f5" : "#212529",
    muted: isDark ? "#929292" : "#868e96",

    authBackground: isDark ? "#182b42" : "#eef6ff",
    authBorder: isDark ? "#24466d" : "#b8d8f8",

    uploadBackground: isDark ? "#242424" : "#f8f9fa",

    badgeBackground: isDark ? "#292929" : "#f1f3f5",
    badgeBorder: isDark ? "#383838" : "#dee2e6",
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

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setExcelFile(file);
  };

  const handleSubmit = () => {
    if (mode === "excel") {
      if (!excelFile) return;

      onUpload?.(excelFile);
      return;
    }

    if (
      !name.trim() ||
      !studentId.trim() ||
      !department ||
      !graduationYear ||
      !section ||
      !email.trim()
    ) {
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

  const isSingleStudentValid =
    name.trim() &&
    studentId.trim() &&
    department &&
    graduationYear &&
    section &&
    email.trim();

  const isValid =
    mode === "excel"
      ? !!excelFile
      : !!isSingleStudentValid;

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
              Add Students
            </Text>

            <Text
              size="sm"
              c="dimmed"
              mt={3}
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
            <X size={18} />
          </Button>
        </Group>
      </Box>

      {/* =========================
          CONTENT
      ========================= */}

      <Box
        px="xl"
        py="lg"
        style={{
          background: colors.background,
        }}
      >
        <Stack gap="lg">

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
                <FileSpreadsheet size={15} />
              }
              onClick={() =>
                setMode("excel")
              }
            >
              Excel Upload
            </Button>
          </Group>

          {/* =========================
              SINGLE STUDENT
          ========================= */}

          {mode === "single" && (
            <Stack gap="md">

              {/* Full Name */}

              <TextInput
                label="Full Name"
                placeholder="e.g. Aarav Sharma"
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

              {/* Student ID + Department */}

              <Group
                grow
                align="flex-start"
              >
                <TextInput
                  label="Enrollment Number"
                  placeholder="e.g. 240001"
                  leftSection={
                    <Hash size={16} />
                  }
                  value={studentId}
                  onChange={(e) =>
                    setStudentId(
                      e.currentTarget.value
                    )
                  }
                  radius="sm"
                  styles={inputStyles}
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
                  onChange={setDepartment}
                  radius="sm"
                  styles={inputStyles}
                />
              </Group>

              {/* Graduation Year + Section */}

              <Group
                grow
                align="flex-start"
              >
                <Select
                  label="Graduation Year"
                  placeholder="Select year"
                  data={graduationYears}
                  value={graduationYear}
                  onChange={
                    setGraduationYear
                  }
                  radius="sm"
                  styles={inputStyles}
                />

                <Select
                  label="Section"
                  placeholder="Select section"
                  leftSection={
                    <Layers3 size={16} />
                  }
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
                leftSection={
                  <Mail size={16} />
                }
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.currentTarget.value
                  )
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
                    <ShieldCheck
                      size={17}
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
                      Students do not receive
                      local passwords. They
                      authenticate through the
                      university identity system.
                    </Text>
                  </Box>
                </Group>
              </Box>

            </Stack>
          )}

          {/* =========================
              EXCEL UPLOAD
          ========================= */}

          {mode === "excel" && (
            <Stack gap="md">

              {/* Upload Area */}

              <Box
                p="xl"
                style={{
                  border: `1.5px dashed ${colors.border}`,
                  borderRadius: 10,
                  background: colors.uploadBackground,
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
                    Upload Student List
                  </Text>

                  <Text
                    size="xs"
                    c="dimmed"
                    maw={390}
                    lh={1.5}
                  >
                    Select an Excel spreadsheet
                    containing student information.
                    Multiple student accounts can
                    be imported at once.
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    leftSection={
                      <Upload size={15} />
                    }
                    mt="xs"
                    onClick={() => {
                      document
                        .getElementById(
                          "student-excel-input"
                        )
                        ?.click();
                    }}
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

              {/* Authentication Information */}

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
                    <ShieldCheck
                      size={17}
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
                      Students do not receive
                      local passwords. They will
                      authenticate using the
                      university identity system.
                    </Text>
                  </Box>
                </Group>
              </Box>

            </Stack>
          )}

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
              ? "Import Students"
              : "Create Student"}
          </Button>

        </Group>
      </Box>
    </Modal>
  );
}