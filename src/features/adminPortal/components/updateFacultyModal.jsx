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
//   Phone,
//   BriefcaseBusiness,
//   Hash,
//   X,
//   Save,
// } from "lucide-react";

// export default function UpdateFacultyModal({
//   opened,
//   onClose,
//   faculty,
//   onUpdate,
//   loading = false,
// }) {
//   const [name, setName] = useState("");
//   const [employeeId, setEmployeeId] = useState("");
//   const [department, setDepartment] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

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

//   /*
//    * Populate the form whenever a different
//    * faculty member is selected.
//    */
//   useEffect(() => {
//     if (!faculty) return;

//     setName(faculty.name ?? "");
//     setEmployeeId(faculty.employee_id ?? "");
//     setDepartment(faculty.department ?? "");
//     setEmail(faculty.email ?? "");
//     setPhoneNumber(faculty.phone_number ?? "");
//   }, [faculty]);

//   const handleSubmit = () => {
//     if (!faculty) return;

//     onUpdate?.({
//       id: faculty.id,
//       name: name.trim(),
//       employeeId: employeeId.trim(),
//       department,
//       email: email.trim(),
//       phoneNumber: phoneNumber.trim(),
//     });
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   const isValid =
//     name.trim() &&
//     employeeId.trim() &&
//     department &&
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
//       overlayProps={{
//         backgroundOpacity: 0.45,
//         blur: 2,
//       }}
//     >
//       {/* Header */}
//       <Box
//         px="xl"
//         py="lg"
//         style={{
//           borderBottom:
//             "1px solid var(--mantine-color-gray-2)",
//           background:
//             "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
//         }}
//       >
//         <Group justify="space-between" align="flex-start">
//           <Box>
//             <Text
//               fw={650}
//               size="lg"
//               style={{
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Update Faculty
//             </Text>

//             <Text size="sm" c="dimmed" mt={3}>
//               Update the faculty member's account
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
//       <Box px="xl" py="lg">
//         <Stack gap="md">

//           {/* Name */}
//           <TextInput
//             label="Full Name"
//             placeholder="e.g. Dr. Sarah Jenkins"
//             leftSection={<UserRound size={16} />}
//             value={name}
//             onChange={(e) =>
//               setName(e.currentTarget.value)
//             }
//             radius="sm"
//           />

//           {/* Employee ID + Department */}
//           <Group grow align="flex-start">
//             <TextInput
//               label="Employee ID"
//               placeholder="FAC-8924-M"
//               leftSection={<Hash size={16} />}
//               value={employeeId}
//               onChange={(e) =>
//                 setEmployeeId(e.currentTarget.value)
//               }
//               radius="sm"
//             />

//             <Select
//               label="Department"
//               placeholder="Select department"
//               leftSection={
//                 <BriefcaseBusiness size={16} />
//               }
//               data={departments}
//               value={department}
//               onChange={setDepartment}
//               radius="sm"
//             />
//           </Group>

//           {/* Email */}
//           <TextInput
//             label="Institutional Email"
//             placeholder="sarah.jenkins@institution.edu"
//             leftSection={<Mail size={16} />}
//             value={email}
//             onChange={(e) =>
//               setEmail(e.currentTarget.value)
//             }
//             radius="sm"
//           />

//           {/* Phone */}
//           <TextInput
//             label="Phone Number"
//             placeholder="e.g. +91 98765 43210"
//             leftSection={<Phone size={16} />}
//             value={phoneNumber}
//             onChange={(e) =>
//               setPhoneNumber(e.currentTarget.value)
//             }
//             radius="sm"
//           />

//           {/* Security information */}
//           <Box
//             p="md"
//             style={{
//               background: "#f3f7ff",
//               border: "1px solid #dce8ff",
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
//                 <UserRound size={17} />
//               </ThemeIcon>

//               <Box>
//                 <Text size="sm" fw={600}>
//                   Account Security
//                 </Text>

//                 <Text
//                   size="xs"
//                   c="dimmed"
//                   mt={3}
//                   lh={1.5}
//                 >
//                   Password and authentication settings
//                   are not changed here. The faculty member
//                   can change their password from their
//                   account settings.
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
//           borderTop:
//             "1px solid var(--mantine-color-gray-2)",
//           background:
//             "var(--mantine-color-gray-0)",
//         }}
//       >
//         <Group justify="flex-end">
//           <Button
//             variant="default"
//             radius="sm"
//             onClick={handleClose}
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
} from "@mantine/core";

import {
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  Hash,
  LockKeyhole,
  X,
  Save,
} from "lucide-react";

export default function UpdateFacultyModal({
  opened,
  onClose,
  faculty,
  onUpdate,
  loading = false,
}) {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  useEffect(() => {
    if (!faculty) return;

    setName(faculty.name ?? "");
    setEmployeeId(faculty.employee_id ?? "");
    setDepartment(faculty.department ?? "");
    setEmail(faculty.email ?? "");
    setPhoneNumber(faculty.phone_number ?? "");
  }, [faculty]);

  const handleSubmit = () => {
    if (!faculty) return;

    onUpdate?.({
      id: faculty.id,
      name: name.trim(),
      employee_id: employeeId.trim(),
      department,
      email: email.trim(),
      phone_number: phoneNumber.trim(),
    });
  };

  const handleClose = () => {
    onClose();
  };

  const isValid =
    name.trim() &&
    employeeId.trim() &&
    department &&
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
          backgroundColor: "#1f1f1f",
          color: "#f5f5f5",
        },

        header: {
          backgroundColor: "#1f1f1f",
          color: "#f5f5f5",
        },

        body: {
          padding: 0,
          backgroundColor: "#1f1f1f",
        },
      }}
      overlayProps={{
        backgroundOpacity: 0.65,
        blur: 4,
      }}
    >
      {/* Header */}
      <Box
        px="xl"
        py="lg"
        style={{
          borderBottom: "1px solid #303030",
          background: "#1f1f1f",
        }}
      >
        <Group justify="space-between" align="flex-start">
          <Box>
            <Text
              fw={650}
              size="lg"
              c="gray.0"
              style={{
                letterSpacing: "-0.02em",
              }}
            >
              Update Faculty
            </Text>

            <Text size="sm" c="gray.5" mt={3}>
              Update the faculty member's account
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
          background: "#1f1f1f",
        }}
      >
        <Stack gap="md">

          {/* Full Name */}
          <TextInput
            label="Full Name"
            placeholder="e.g. Dr. Sarah Jenkins"
            leftSection={<UserRound size={16} />}
            value={name}
            onChange={(e) =>
              setName(e.currentTarget.value)
            }
            radius="sm"
            styles={{
              label: {
                color: "#e5e5e5",
                fontWeight: 600,
                marginBottom: 6,
              },

              input: {
                backgroundColor: "#292929",
                borderColor: "#404040",
                color: "#f5f5f5",
              },

              section: {
                color: "#929292",
              },
            }}
          />

          {/* Employee ID + Department */}
          <Group grow align="flex-start">
            {/* <TextInput
              label="Employee ID"
              placeholder="FAC-8924-M"
              leftSection={<Hash size={16} />}
              value={employeeId}
              onChange={(e) =>
                setEmployeeId(e.currentTarget.value)
              }
              radius="sm"
              styles={{
                label: {
                  color: "#e5e5e5",
                  fontWeight: 600,
                  marginBottom: 6,
                },

                input: {
                  backgroundColor: "#292929",
                  borderColor: "#404040",
                  color: "#f5f5f5",
                },

                section: {
                  color: "#929292",
                },
              }}
            /> */}

            <Select
              label="Department"
              placeholder="Select department"
              leftSection={
                <BriefcaseBusiness size={16} />
              }
              data={departments}
              value={department}
              onChange={setDepartment}
              radius="sm"
              styles={{
                label: {
                  color: "#e5e5e5",
                  fontWeight: 600,
                  marginBottom: 6,
                },

                input: {
                  backgroundColor: "#292929",
                  borderColor: "#404040",
                  color: "#f5f5f5",
                },

                section: {
                  color: "#929292",
                },
              }}
            />
          </Group>

          {/* Institutional Email */}
          <TextInput
            label="Institutional Email"
            placeholder="sarah.jenkins@institution.edu"
            leftSection={<Mail size={16} />}
            value={email}
            onChange={(e) =>
              setEmail(e.currentTarget.value)
            }
            radius="sm"
            styles={{
              label: {
                color: "#e5e5e5",
                fontWeight: 600,
                marginBottom: 6,
              },

              input: {
                backgroundColor: "#292929",
                borderColor: "#404040",
                color: "#f5f5f5",
              },

              section: {
                color: "#929292",
              },
            }}
          />

          {/* Phone Number */}
          <TextInput
            label="Phone Number"
            placeholder="e.g. +91 98765 43210"
            leftSection={<Phone size={16} />}
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.currentTarget.value)
            }
            radius="sm"
            styles={{
              label: {
                color: "#e5e5e5",
                fontWeight: 600,
                marginBottom: 6,
              },

              input: {
                backgroundColor: "#292929",
                borderColor: "#404040",
                color: "#f5f5f5",
              },

              section: {
                color: "#929292",
              },
            }}
          />

          {/* Security Information */}
          <Box
            p="md"
            style={{
              background: "#182b42",
              border: "1px solid #24466d",
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
                  c="gray.1"
                >
                  Account Security
                </Text>

                <Text
                  size="xs"
                  c="gray.4"
                  mt={3}
                  lh={1.5}
                >
                  Password and authentication settings
                  are not changed here. The faculty member
                  can change their password from their
                  account settings.
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
          borderTop: "1px solid #303030",
          background: "#1f1f1f",
        }}
      >
        <Group justify="flex-end">
          <Button
            variant="default"
            radius="sm"
            onClick={handleClose}
            styles={{
              root: {
                backgroundColor: "#292929",
                borderColor: "#404040",
                color: "#f5f5f5",
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