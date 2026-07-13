import { useState } from "react";
import {
  ActionIcon,
  Badge,
  Code,
  Menu,
  Text,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { EllipsisVertical } from 'lucide-react';
import TableFooter from "../../../shared/components/CustomTableFooter";
import { setSelectedSubmission } from '../reducers/facultySlice.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const PAGE_SIZE = 10;

export default function SubmissionTable({
  records,
  examId,
}) {
  const [page, setPage] = useState(1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const paginatedRecords = records.slice(
    from,
    to
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
        {
          accessor: "university_id",
          title: "Roll No.",
          render: ({ university_id }) => (
            <Code>{university_id}</Code>
          ),
        },
        {
          accessor: "section",
          title: "Section",
          render: ({ section }) => (
            <Badge variant="light">
              {section}
            </Badge>
          ),
        },

        {
          accessor: "name",
          title: "Student",
          render: ({ name }) => (
            <Text fw={600}>
              {name}
            </Text>
          ),
        },

        {
          accessor: "language",
          title: "Language",
          render: ({ language }) => (
            <Code>{language}</Code>
          ),
        },

        {
          accessor: "total_autograding_score",
          title: "App Marks",
          render: ({ total_autograding_score }) => (
            <Code>{total_autograding_score ?? 0}</Code>
          ),
          textAlign: "center",
        },

        {
          accessor: "total_manual_score",
          title: "Teacher Marks",
          textAlign: "center",
          render: ({ total_manual_score }) =>
            total_manual_score ?? "-",
        },

        {
          accessor: "status",
          title: "Status",
          textAlign: "right",
          render: ({ status }) => (
            <Badge
              color= {
                status?.toLowerCase() === "ongoing"
                ? "green"
                : "blue"
  }
            >
              {status}
            </Badge>
          ),
        },

        {
          accessor: "actions",
          title: "Actions",
          textAlign: "right",
          render: (student) => (
            <Menu shadow="md">
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                >
                  <EllipsisVertical
                    size={18}
                  />
                </ActionIcon>
              </Menu.Target>

            


              <Menu.Dropdown>
                <Menu.Item
                 onClick={() => {
                const isAbsent = student.status === 'absent';
                if (!isAbsent) {
                  dispatch(setSelectedSubmission(student))
                  navigate(`/Faculty/LabDetails/${examId}/StudentDetails/${student.session_id}`);
                }
              }}
                >
                  View Evaluation
                </Menu.Item>

                {/* <Menu.Item>
                  Evaluate
                </Menu.Item> */}
              </Menu.Dropdown>
            </Menu>
          ),
        },
      ];

  return (
    <>
    <DataTable
      withTableBorder
      borderRadius="md"
      my={4}
      striped
      highlightOnHover
      records={paginatedRecords}
      totalRecords={records.length}
    //   recordsPerPage={PAGE_SIZE}
    //   page={page}
    //   onPageChange={setPage}
      columns={columns}
    />

     <TableFooter
    page={page}
    totalPages={Math.ceil(
      records.length / PAGE_SIZE
    )}
    totalRecords={records.length}
    recordsShown={records.length}
    onPageChange={setPage}
    label="practicals"
  /> 
  </>
  );
}