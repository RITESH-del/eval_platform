import { useState } from "react";
import { Badge, Button, Paper, Text, Menu, ActionIcon } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import TableFooter from "../../../shared/components/CustomTableFooter.jsx";
import { useDispatch } from "react-redux";
import { setSelectedExam } from "../reducers/facultySlice.js";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from 'lucide-react';
import { deleteQuizThunk, publishResultThunk } from "../thunks/facultyThunks.js";
import { modals } from "@mantine/modals";

const confirmDelete = (dispatch, examId) => {
  modals.openConfirmModal({
    title: "Delete Quiz",
    centered: true,

    children: (
      <Text size="sm">
        Are you sure you want to delete this quiz?
        <br />
        This action cannot be undone.
      </Text>
    ),

    labels: {
      confirm: "Delete",
      cancel: "Cancel",
    },

    confirmProps: {
      color: "red",
    },

    onConfirm: () => {
      dispatch(deleteQuizThunk(examId));
    },
  });
};


export default function PracticalsTable({ practicals }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const records = practicals.slice(from, to);

    const handleClick = (practical) => {
      dispatch(setSelectedExam(practical));
      navigate(`/Faculty/LabDetails/${practical.id}`);
    }

    const publishResult = (examId)=>{
      dispatch(publishResultThunk(examId));
    }

    // console.log(practicals);

  const columns = [
          {
            accessor: "title",
            title: "Title",
            render: (practical) => (
              <Text fw={600}>
                {practical.title}
              </Text>
            ),
          },
          {
            accessor: "target_section",
            title: "Section",
            render: (practical) => (
              <Badge variant="light">
                {practical.target_section}
              </Badge>
            ),
          },

          {
            accessor: "target_graduation_year",
            title: "Batch",
          },

          {
            accessor: "date",
            title: "Date",
            render: (practical) =>
              new Date(
                practical.start_time
              ).toLocaleDateString(),
          },

          {
            accessor: "time",
            title: "Time",
            render: (practical) =>
              new Date(
                practical.start_time
              ).toLocaleTimeString(),
          },

          {
            accessor: "duration",
            title: "Duration",
            render: (practical) => (
              <Badge color="dark">
                {(
                  practical.duration_minutes / 60
                ).toFixed(1)}
                {" Hrs"}
              </Badge>
            ),
          },

          {
            accessor: "actions",
            title: "Actions",
            // render: (practical) => (
            //   <Button variant="subtle"
            //   onClick={()=>{
            //     handleClick(practical)                
            //   }}>
            //     View
            //   </Button>
            // ),

             render: (practical) => (
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
                             onClick={()=>{
                                 handleClick(practical)                
                            }}
                            >
                              View Submission
                            </Menu.Item>

                            <Menu.Item
                              color={practical.result_published ? "gray" : "black"}
                              onClick={() => publishResult(practical.id)}
                            >
                              {practical.result_published ? "published" : "Publish Result"}
                            </Menu.Item>

                            <Menu.Item
                              onClick={() => {
                                navigate(`/Faculty/edit-quiz/${practical.id}`);
                              }}
                            >
                              Edit
                            </Menu.Item>
            
                            <Menu.Item
                              color="red"
                              onClick={() => confirmDelete(dispatch, practical.id)}
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
        totalRecords={practicals.length}
        my={4}
        // recordsPerPage={PAGE_SIZE}
        // page={page}
        // onPageChange={setPage}
        highlightOnHover
        striped
        borderRadius="md"
        columns={columns} />

         <TableFooter
            page={page}
            totalPages={Math.ceil(
            practicals.length / PAGE_SIZE
            )}
            totalRecords={practicals.length}
            recordsShown={records.length}
            onPageChange={setPage}
            label="practicals"
        />
    </Paper>
  );
}