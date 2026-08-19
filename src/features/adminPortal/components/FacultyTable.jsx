// import { useState } from "react";
// import { Badge, Button, Paper, Text, Menu, ActionIcon, Tooltip } from "@mantine/core";
// import { DataTable } from "mantine-datatable";
// import TableFooter from "../../../shared/components/CustomTableFooter.jsx";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { EllipsisVertical, User2 } from 'lucide-react';
// import { deleteFacultyThunk, } from "../thunks/adminThunks.js";
// import { modals } from "@mantine/modals";

// const confirmDelete = (dispatch, facultyId) => {
//   modals.openConfirmModal({
//     title: "Remove Faculty",
//     centered: true,

//     children: (
//       <Text size="sm">
//         Are you sure you want to remove this faculty?
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
//       dispatch(deleteFacultyThunk(facultyId));
//     },
//   });
// };


// export default function FacultyTable({ users }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const PAGE_SIZE = 10;

//   const [page, setPage] = useState(1);

//   const from = (page - 1) * PAGE_SIZE;
//   const to = from + PAGE_SIZE;

//   const records = users.slice(from, to);

//     // const handleClick = (practical) => {
//     //   dispatch(setSelectedExam(practical));
//     //   navigate(`/Faculty/LabDetails/${practical.id}`);
//     // }

//     // const publishResult = (examId)=>{
//     //   dispatch(publishResultThunk(examId));
//     // }


//   const columns = [
//           {
//             accessor: "name",
//             title: "Name",
//             render: (user) => (
//               <Text fw={600}>
//                 {User2.name}
//               </Text>
//             ),
//           },
//           {
//             accessor: "email",
//             title: "Email",
//             render: (user) => (
//               <Text fw={600}>
//                 {user.email}
//               </Text>
//             ),
//           },    
//            {
//             accessor: "department",
//             title: "Department",
//             render: (user) => (
//                 <Text fw={600}>
//                     {user.department}
//                 </Text>
//             )
//           },
//           {
//             accessor: "phone_number",
//             title: "Phone Number",
//             render: (user) => (
//                 <Text fw={600}>
//                     {user.phone_number}
//                 </Text>
//             ),
//           },

//           {
//             accessor: "actions",
//             title: "Actions",
//             render: (user) => (
//   <Menu shadow="md">
//     <Menu.Target>
//       <ActionIcon
//         variant="subtle"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <EllipsisVertical size={18} />
//       </ActionIcon>
//     </Menu.Target>

//     <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
     

    

//       <Menu.Item
//         onClick={(e) => {
//           e.stopPropagation();
//           navigate(`/Faculty/edit-practical/${user.id}`);
//         }}
//       >
//         Edit
//       </Menu.Item>

//       <Menu.Item
//         color="red"
//         onClick={(e) => {
//           e.stopPropagation();
//           confirmDelete(dispatch, user.id);
//         }}
//       >
//         Delete
//       </Menu.Item>
//     </Menu.Dropdown>
//   </Menu>
// )
//           },
//         ];

//   return (
//     <Paper withBorder radius="lg">
//       <DataTable
//         records={records}
//         totalRecords={users.length}
//         my={4}
//         // recordsPerPage={PAGE_SIZE}
//         // page={page}
//         // onPageChange={setPage}
//         highlightOnHover
//         striped
//         borderRadius="md"
//         columns={columns}
//         onRowClick={({ record }) => handleClick(record)}
//   rowClassName={() => "clickable-row"}
//       />

//         <TableFooter
//             page={page}
//             totalPages={Math.ceil(
//             users.length / PAGE_SIZE
//             )}
//             totalRecords={users.length}
//             recordsShown={records.length}
//             onPageChange={setPage}
//             label="users"
//         />
//     </Paper>
//   );
// }

import { useState } from "react";
import {
  Paper,
  Text,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import TableFooter from "../../../shared/components/CustomTableFooter.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { deleteFacultyThunk } from "../thunks/adminThunks.js";
import { modals } from "@mantine/modals";
import UpdateFacultyModal from "./updateFacultyModal.jsx";

const confirmDelete = (dispatch, facultyId) => {
  modals.openConfirmModal({
    title: "Remove Faculty",
    centered: true,

    children: (
      <Text size="sm">
        Are you sure you want to remove this faculty?
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
      dispatch(deleteFacultyThunk(facultyId));
    },
  });
};

export default function FacultyTable({ users = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [editModalOpened, setEditModalOpened] = useState(false);
const [selectedFaculty, setSelectedFaculty] = useState(null);
  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const records = users.slice(from, to);

  const columns = [
    {
      accessor: "name",
      title: "Name",
      render: (user) => (
        <Text fw={600}>
          {user.name}
        </Text>
      ),
    },

    {
      accessor: "email",
      title: "Email",
      render: (user) => (
        <Text fw={600}>
          {user.email}
        </Text>
      ),
    },

    {
      accessor: "department",
      title: "Department",
      render: (user) => (
        <Text fw={600}>
          {user.department}
        </Text>
      ),
    },

    {
      accessor: "phone_number",
      title: "Phone Number",
      render: (user) => (
        <Text fw={600}>
          {user.phone_number}
        </Text>
      ),
    },

    {
      accessor: "actions",
      title: "Actions",

      render: (user) => (
        <Menu shadow="md">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVertical size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown
            onClick={(e) => e.stopPropagation()}
          >
           <Menu.Item
  onClick={() => {
    setSelectedFaculty(user);
    setEditModalOpened(true);
  }}
>
  Edit
</Menu.Item>

            <Menu.Item
              color="red"
              onClick={() => {
                confirmDelete(dispatch, user.id);
              }}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

  return (
    <Paper withBorder radius="lg">
      <DataTable
        records={records}
        totalRecords={users.length}
        my={4}
        highlightOnHover
        striped
        borderRadius="md"
        columns={columns}
        rowClassName={() => "clickable-row"}
      />

      <TableFooter
        page={page}
        totalPages={Math.ceil(users.length / PAGE_SIZE)}
        totalRecords={users.length}
        recordsShown={records.length}
        onPageChange={setPage}
        label="users"
      />

      <UpdateFacultyModal
  opened={editModalOpened}
  onClose={() => {
    setEditModalOpened(false);
    setSelectedFaculty(null);
  }}
  faculty={selectedFaculty}
  loading={false}
  onUpdate={(data) => {
    console.log("Updating faculty:", data);

    // dispatch(
    //   updateFacultyThunk({
    //     facultyId: data.id,
    //     data,
    //   })
    // );
  }}
/>
    </Paper>

    
  );
}