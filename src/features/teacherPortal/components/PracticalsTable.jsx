import { useState } from "react";
import { Badge, Button, Paper, Text, Menu, ActionIcon } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import TableFooter from "../../../shared/components/CustomTableFooter.jsx";
import { useDispatch } from "react-redux";
import { setSelectedExam } from "../models/facultySlice";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from 'lucide-react';


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
                              onClick={() => {
                                navigate(`/Faculty/edit-quiz/${practical.id}`);
                              }}
                            >
                              Edit
                            </Menu.Item>
            
                            <Menu.Item
                            color="red">
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