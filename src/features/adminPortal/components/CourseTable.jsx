import { useState } from "react";
import {
  Paper,
  Text,
  Menu,
  ActionIcon,
  Badge,
  Tooltip,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useDispatch, useSelector } from "react-redux";
import {
  EllipsisVertical,
  BookOpen,
  GraduationCap,
  Clock,
  Layers3,
  Edit2,
  Trash2,
} from "lucide-react";
import { modals } from "@mantine/modals";

import TableFooter from "../../../shared/components/CustomTableFooter.jsx";
import { deleteCourseThunk, updateCourseThunk } from "../thunks/adminThunks.js";
import UpdateCourseModal from "./UpdateCourseModal.jsx";

const confirmDelete = (dispatch, course) => {
  modals.openConfirmModal({
    title: "Delete Course",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete <strong>{course.code} - {course.name}</strong>?
        <br />
        This action cannot be undone.
      </Text>
    ),
    labels: {
      confirm: "Delete Course",
      cancel: "Cancel",
    },
    confirmProps: {
      color: "red",
    },
    onConfirm: () => {
      dispatch(deleteCourseThunk(course.id));
    },
  });
};

export default function CourseTable({ courses = [] }) {
  const dispatch = useDispatch();
  const { updatingCourse } = useSelector((state) => state.admin);

  const [editModalOpened, setEditModalOpened] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const records = courses.slice(from, to);

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditModalOpened(true);
  };

  const handleUpdate = async (data) => {
    const result = await dispatch(
      updateCourseThunk({
        id: data.id,
        data,
      })
    );

    if (updateCourseThunk.fulfilled.match(result)) {
      setEditModalOpened(false);
      setSelectedCourse(null);
    }
  };

  const columns = [
    {
      accessor: "code",
      title: "Course Code",
      width: 140,
      render: (course) => (
        <Badge variant="outline" color="blue" radius="sm">
          {course.code}
        </Badge>
      ),
    },
    {
      accessor: "name",
      title: "Course Name",
      render: (course) => (
        <Text fw={600} size="sm">
          {course.name}
        </Text>
      ),
    },
    {
      accessor: "department",
      title: "Department",
      width: 160,
      render: (course) => (
        <Badge
          variant="light"
          color="cyan"
          leftSection={<GraduationCap size={13} />}
        >
          {course.department ? course.department.toUpperCase() : "GENERAL"}
        </Badge>
      ),
    },
    {
      accessor: "credits",
      title: "Credits",
      width: 110,
      render: (course) => (
        <Badge
          variant="light"
          color="violet"
          leftSection={<Clock size={12} />}
        >
          {course.credits !== null && course.credits !== undefined ? `${course.credits} Cr` : "N/A"}
        </Badge>
      ),
    },
    {
      accessor: "semester",
      title: "Semester",
      width: 120,
      render: (course) => (
        <Badge
          variant="light"
          color="teal"
          leftSection={<Layers3 size={12} />}
        >
          {course.semester ? `Sem ${course.semester}` : "N/A"}
        </Badge>
      ),
    },
    {
      accessor: "description",
      title: "Description",
      render: (course) => (
        <Tooltip
          label={course.description || "No description provided"}
          multiline
          w={260}
          withArrow
          disabled={!course.description}
        >
          <Text size="sm" c="dimmed" lineClamp={1}>
            {course.description || "-"}
          </Text>
        </Tooltip>
      ),
    },
    {
      accessor: "actions",
      title: "Actions",
      width: 80,
      render: (course) => (
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVertical size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
            <Menu.Item
              leftSection={<Edit2 size={15} />}
              onClick={() => handleEditClick(course)}
            >
              Edit Course
            </Menu.Item>

            <Menu.Item
              color="red"
              leftSection={<Trash2 size={15} />}
              onClick={() => confirmDelete(dispatch, course)}
            >
              Delete Course
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
        totalRecords={courses.length}
        highlightOnHover
        striped
        borderRadius="md"
        columns={columns}
        minHeight={200}
        noRecordsText="No courses found"
      />

      <TableFooter
        page={page}
        totalPages={Math.max(1, Math.ceil(courses.length / PAGE_SIZE))}
        totalRecords={courses.length}
        recordsShown={records.length}
        onPageChange={setPage}
        label="courses"
      />

      <UpdateCourseModal
        opened={editModalOpened}
        onClose={() => {
          setEditModalOpened(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse}
        loading={updatingCourse}
        onUpdate={handleUpdate}
      />
    </Paper>
  );
}
