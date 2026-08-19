import { useState } from "react";
import {
  Paper,
  Text,
  Menu,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  EllipsisVertical,
  GraduationCap,
} from "lucide-react";
import { modals } from "@mantine/modals";

import TableFooter from "../../../shared/components/CustomTableFooter.jsx";
import { deleteStudentThunk } from "../thunks/adminThunks.js";
import UpdateStudentModal from "./updateStudentModal.jsx";

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

export default function StudentTable({ students = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editModalOpened, setEditModalOpened] =
  useState(false);

const [selectedStudent, setSelectedStudent] =
  useState(null);

  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const records = students.slice(from, to);

  const columns = [
    {
      accessor: "name",
      title: "Name",

      render: (student) => (
        <Text fw={600} size="sm">
          {student.name}
        </Text>
      ),
    },

    {
      accessor: "student_id",
      title: "Student ID",

      render: (student) => (
        <Text size="sm" c="dimmed">
          {student.student_id}
        </Text>
      ),
    },

    {
      accessor: "email",
      title: "Email",

      render: (student) => (
        <Text size="sm">
          {student.email}
        </Text>
      ),
    },

    {
      accessor: "department",
      title: "Department",

      render: (student) => (
        <Badge
          variant="light"
          leftSection={<GraduationCap size={13} />}
        >
          {student.department}
        </Badge>
      ),
    },

    {
      accessor: "graduation_year",
      title: "Graduation",

      render: (student) => (
        <Text size="sm">
          {student.graduation_year}
        </Text>
      ),
    },

    {
      accessor: "section",
      title: "Section",

      render: (student) => (
        <Text size="sm">
          {student.section}
        </Text>
      ),
    },

    {
      accessor: "actions",
      title: "Actions",

      render: (student) => (
        <Menu shadow="md">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <EllipsisVertical size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* <Menu.Item
              onClick={() => {
                navigate(
                  `/Students/${student.id}`
                );
              }}
            >
              View
            </Menu.Item> */}

            <Menu.Item
  onClick={() => {
    setSelectedStudent(student);
    setEditModalOpened(true);
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

  return (
    <Paper
      withBorder
      radius="lg"
      style={{
        overflow: "hidden",
      }}
    >
      <DataTable
        records={records}
        totalRecords={students.length}
        highlightOnHover
        striped
        borderRadius="md"
        columns={columns}
        minHeight={200}
        noRecordsText="No students found"
      />

      <TableFooter
        page={page}
        totalPages={Math.ceil(
          students.length / PAGE_SIZE
        )}
        totalRecords={students.length}
        recordsShown={records.length}
        onPageChange={setPage}
        label="students"
      />

      <UpdateStudentModal
  opened={editModalOpened}
  onClose={() => {
    setEditModalOpened(false);
    setSelectedStudent(null);
  }}
  student={selectedStudent}
  loading={false}
  onUpdate={(data) => {
    console.log("Updating student:", data);

    // dispatch(
    //   updateStudentThunk({
    //     studentId: data.id,
    //     data,
    //   })
    // );
  }}
/>
    </Paper>
  );
}