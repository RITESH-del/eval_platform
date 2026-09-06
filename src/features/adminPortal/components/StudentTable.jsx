// import { useState } from "react";
// import {
//   Paper,
//   Text,
//   Menu,
//   ActionIcon,
//   Badge,
// } from "@mantine/core";
// import { DataTable } from "mantine-datatable";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   EllipsisVertical,
//   GraduationCap,
// } from "lucide-react";
// import { modals } from "@mantine/modals";

// import TableFooter from "../../../shared/components/CustomTableFooter.jsx";
// import { deleteStudentThunk, updateStudentThunk } from "../thunks/adminThunks.js";
// import UpdateStudentModal from "./updateStudentModal.jsx";

// const confirmDelete = (dispatch, studentId) => {
//   modals.openConfirmModal({
//     title: "Remove Student",
//     centered: true,

//     children: (
//       <Text size="sm">
//         Are you sure you want to remove this student?
//         <br />
//         This action cannot be undone.
//       </Text>
//     ),

//     labels: {
//       confirm: "Remove",
//       cancel: "Cancel",
//     },

//     confirmProps: {
//       color: "red",
//     },

//     onConfirm: () => {
//       dispatch(deleteStudentThunk(studentId));
//     },
//   });
// };

// export default function StudentTable({ students = [] }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { updatingStudent } = useSelector((state) => state.admin);

//   const [editModalOpened, setEditModalOpened] =
//   useState(false);

// const [selectedStudent, setSelectedStudent] =
//   useState(null);

//   const PAGE_SIZE = 10;

//   const [page, setPage] = useState(1);

//   const from = (page - 1) * PAGE_SIZE;
//   const to = from + PAGE_SIZE;

//   const records = students.slice(from, to);

//   const columns = [
//     {
//       accessor: "name",
//       title: "Name",

//       render: (student) => (
//         <Text fw={600} size="sm">
//           {student.name}
//         </Text>
//       ),
//     },

//     {
//       accessor: "student_id",
//       title: "Student ID",

//       render: (student) => (
//         <Text size="sm" c="dimmed">
//           {student.student_id}
//         </Text>
//       ),
//     },

//     {
//       accessor: "email",
//       title: "Email",

//       render: (student) => (
//         <Text size="sm">
//           {student.email}
//         </Text>
//       ),
//     },

//     {
//       accessor: "department",
//       title: "Department",

//       render: (student) => (
//         <Badge
//           variant="light"
//           leftSection={<GraduationCap size={13} />}
//         >
//           {student.department}
//         </Badge>
//       ),
//     },

//     {
//       accessor: "graduation_year",
//       title: "batch",

//       render: (student) => (
//         <Text size="sm">
//           {student.graduation_year}
//         </Text>
//       ),
//     },

//     {
//       accessor: "section",
//       title: "Section",

//       render: (student) => (
//         <Text size="sm">
//           {student.section}
//         </Text>
//       ),
//     },

//     {
//       accessor: "actions",
//       title: "Actions",

//       render: (student) => (
//         <Menu shadow="md">
//           <Menu.Target>
//             <ActionIcon
//               variant="subtle"
//               color="gray"
//               onClick={(e) =>
//                 e.stopPropagation()
//               }
//             >
//               <EllipsisVertical size={18} />
//             </ActionIcon>
//           </Menu.Target>

//           <Menu.Dropdown
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//           >
//             {/* <Menu.Item
//               onClick={() => {
//                 navigate(
//                   `/Students/${student.id}`
//                 );
//               }}
//             >
//               View
//             </Menu.Item> */}

//             <Menu.Item
//   onClick={() => {
//     setSelectedStudent(student);
//     setEditModalOpened(true);
//   }}
// >
//   Edit
// </Menu.Item>

//             <Menu.Item
//               color="red"
//               onClick={() => {
//                 confirmDelete(
//                   dispatch,
//                   student.id
//                 );
//               }}
//             >
//               Delete
//             </Menu.Item>
//           </Menu.Dropdown>
//         </Menu>
//       ),
//     },
//   ];

//   return (
//     <Paper
//       withBorder
//       radius="lg"
//       style={{
//         overflow: "hidden",
//       }}
//     >
//       <DataTable
//         records={records}
//         totalRecords={students.length}
//         highlightOnHover
//         striped
//         borderRadius="md"
//         columns={columns}
//         minHeight={200}
//         noRecordsText="No students found"
//       />

//       <TableFooter
//         page={page}
//         totalPages={Math.ceil(
//           students.length / PAGE_SIZE
//         )}
//         totalRecords={students.length}
//         recordsShown={records.length}
//         onPageChange={setPage}
//         label="students"
//       />

//       <UpdateStudentModal
//   opened={editModalOpened}
//   onClose={() => {
//     setEditModalOpened(false);
//     setSelectedStudent(null);
//   }}
//   student={selectedStudent}
//   loading={updatingStudent}
//   onUpdate={async (data) => {
//     console.log("Updating student:", data);
//     const result = await dispatch(
//       updateStudentThunk({
//         id: data.id,
//         data,
//       })
//     );
//     if (updateStudentThunk.fulfilled.match(result)) {
//       setEditModalOpened(false);
//       setSelectedStudent(null);
//     }
//   }}
// />
//     </Paper>
//   );
// }


import { useState } from "react";
import {
  Paper,
  Text,
  Menu,
  ActionIcon,
  Badge,
  Avatar,
  Group,
  Box,
} from "@mantine/core";

import { DataTable } from "mantine-datatable";

import { useDispatch, useSelector } from "react-redux";

import {
  EllipsisVertical,
  GraduationCap,
} from "lucide-react";

import { modals } from "@mantine/modals";

import TableFooter from "../../../shared/components/CustomTableFooter.jsx";

import {
  deleteStudentThunk,
  updateStudentThunk,
} from "../thunks/adminThunks.js";

import UpdateStudentModal from "./updateStudentModal.jsx";


// ============================================================
// DELETE CONFIRMATION
// ============================================================

const confirmDelete = (dispatch, studentId) => {
  modals.openConfirmModal({
    title: "Remove Student",
    centered: true,

    children: (
      <Text size="sm">
        Are you sure you want to remove this student?
        <br />
        This action cannot be undone.
      </Text>
    ),

    labels: {
      confirm: "Remove",
      cancel: "Cancel",
    },

    confirmProps: {
      color: "red",
    },

    onConfirm: () => {
      dispatch(deleteStudentThunk(studentId));
    },
  });
};


// ============================================================
// AVATAR HELPERS
// ============================================================

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
};


const getAvatarColor = (name = "") => {
  const colors = [
    "blue",
    "violet",
    "green",
    "orange",
    "pink",
    "cyan",
  ];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};


// ============================================================
// STUDENT TABLE
// ============================================================

export default function StudentTable({
  students = [],
}) {
  const dispatch = useDispatch();

  const {
    updatingStudent,
  } = useSelector(
    (state) => state.admin
  );

  // ----------------------------------------------------------
  // EDIT MODAL
  // ----------------------------------------------------------

  const [
    editModalOpened,
    setEditModalOpened,
  ] = useState(false);

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  // ----------------------------------------------------------
  // PAGINATION
  // ----------------------------------------------------------

  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);

  const from =
    (page - 1) * PAGE_SIZE;

  const to =
    from + PAGE_SIZE;

  const records =
    students.slice(from, to);

  // ----------------------------------------------------------
  // TABLE COLUMNS
  // ----------------------------------------------------------

  const columns = [
    // ========================================================
    // NAME
    // ========================================================

    {
      accessor: "name",
      title: "Name",

      render: (student) => (
        <Group
          gap="sm"
          wrap="nowrap"
        >
          <Avatar
            size={34}
            radius="xl"
            color={getAvatarColor(
              student.name
            )}
            variant="light"
          >
            {getInitials(
              student.name
            )}
          </Avatar>

          <Box>
            <Text
              fw={600}
              size="sm"
              style={{
                lineHeight: 1.2,
              }}
            >
              {student.name}
            </Text>
          </Box>
        </Group>
      ),
    },

    // ========================================================
    // STUDENT ID
    // ========================================================

    {
      accessor: "student_id",
      title: "Student ID",

      render: (student) => (
        <Text
          size="sm"
          c="dimmed"
          style={{
            fontFamily:
              "monospace",
            fontSize: 13,
          }}
        >
          {student.student_id}
        </Text>
      ),
    },

    // ========================================================
    // EMAIL
    // ========================================================

    {
      accessor: "email",
      title: "Email",

      render: (student) => (
        <Text
          size="sm"
          style={{
            maxWidth: 280,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={student.email}
        >
          {student.email}
        </Text>
      ),
    },

    // ========================================================
    // DEPARTMENT
    // ========================================================

    {
      accessor: "department",
      title: "Department",

      render: (student) => (
        <Badge
          variant="light"
          color="blue"
          radius="xl"
          size="sm"
          leftSection={
            <GraduationCap
              size={13}
            />
          }
          styles={{
            root: {
              textTransform:
                "uppercase",
              paddingLeft: 9,
              paddingRight: 9,
            },
          }}
        >
          {student.department}
        </Badge>
      ),
    },

    // ========================================================
    // BATCH
    // ========================================================

    {
      accessor: "graduation_year",
      title: "Batch",

      render: (student) => (
        <Text
          size="sm"
          fw={500}
        >
          {student.graduation_year}
        </Text>
      ),
    },

    // ========================================================
    // SECTION
    // ========================================================

    {
      accessor: "section",
      title: "Section",

      render: (student) => (
        <Badge
          variant="light"
          color="green"
          radius="xl"
          size="sm"
        >
          {student.section}
        </Badge>
      ),
    },

    // ========================================================
    // ACTIONS
    // ========================================================

    {
      accessor: "actions",
      title: "Actions",
      textAlign: "center",

      render: (student) => (
        <Menu
          shadow="md"
          width={150}
          position="bottom-end"
          withArrow
        >
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              radius="md"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <EllipsisVertical
                size={18}
              />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <Menu.Item
              onClick={() => {
                setSelectedStudent(
                  student
                );

                setEditModalOpened(
                  true
                );
              }}
            >
              Edit
            </Menu.Item>

            <Menu.Item
              color="red"
              onClick={() => {
                confirmDelete(
                  dispatch,
                  student.id
                );
              }}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <Paper
        withBorder
        radius="lg"
        style={{
          overflow: "hidden",
          backgroundColor:
            "var(--mantine-color-body)",
        }}
      >
        <DataTable
          records={records}
          columns={columns}

          totalRecords={
            students.length
          }

          minHeight={200}

          noRecordsText="No students found"

          highlightOnHover

          striped={false}

          borderRadius="md"

          verticalSpacing="sm"

          horizontalSpacing="md"

          styles={{
  table: {
    backgroundColor: "transparent",
  },

  header: {
    backgroundColor:
      "var(--mantine-color-default-hover)",
  },

  headerCell: {
    color:
      "var(--mantine-color-text)",
    fontWeight: 600,
    fontSize: 13,
    height: 44,
    borderBottom:
      "1px solid var(--mantine-color-default-border)",
  },

  row: {
    height: 52,
    borderBottom:
      "1px solid var(--mantine-color-default-border)",
  },

  cell: {
    fontSize: 14,
  },
}}
        />

        {/* ====================================================
            PAGINATION
        ===================================================== */}

        <TableFooter
          page={page}
          totalPages={Math.ceil(
            students.length /
              PAGE_SIZE
          )}
          totalRecords={
            students.length
          }
          recordsShown={
            records.length
          }
          onPageChange={setPage}
          label="students"
        />
      </Paper>

      {/* ======================================================
          UPDATE STUDENT MODAL
      ======================================================= */}

      <UpdateStudentModal
        opened={editModalOpened}

        onClose={() => {
          setEditModalOpened(false);
          setSelectedStudent(null);
        }}

        student={selectedStudent}

        loading={updatingStudent}

        onUpdate={async (data) => {
          console.log(
            "Updating student:",
            data
          );

          const result =
            await dispatch(
              updateStudentThunk({
                id: data.id,
                data,
              })
            );

          if (
            updateStudentThunk.fulfilled.match(
              result
            )
          ) {
            setEditModalOpened(
              false
            );

            setSelectedStudent(
              null
            );
          }
        }}
      />
    </>
  );
}