import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Badge,
  Code,
  Menu,
  Paper,
  Text,
  Title,
  Anchor
} from "@mantine/core";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  FileText,
  Lock,
} from "lucide-react";
import { DataTable } from "mantine-datatable";
import TableFooter from "../../../shared/components/CustomTableFooter";

const PAGE_SIZE = 10;

const getStatusColor = (pending) => {
  if (pending) return "yellow";
  return "green";
};

export default function StudentExamResultsPage({
  records = [],
}) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const paginatedRecords = records.slice(from, to);

  const columns = [
    {
      accessor: "title",
      title: "Exam",
      render: (exam) => (
        <div className="flex items-center gap-3">
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <FileText size={18} />
          </div> */}

          <div>
            <Text fw={600}>{exam.title}</Text>

            <Text size="xs" c="dimmed">
              {exam.submittedAt
                ? new Date(
                    exam.submittedAt
                  ).toLocaleDateString("en-IN")
                : "Not Available"}
            </Text>
          </div>
        </div>
      ),
    },

    {
      accessor: "score",
      title: "Score",
      textAlign: "center",
      render: (exam) =>
        exam.isPending ? (
          <Code>-- / {exam.total_marks}</Code>
        ) : (
          <Code>
            {Math.round(exam.total_manual_score)}/{exam.total_marks}
          </Code>
        ),
    },

    {
      accessor: "percentage",
      title: "Percentage",
      textAlign: "center",
      render: (exam) => {
        if (exam.isPending)
          return "-";

        const percentage = Math.round(
          (exam.total_manual_score /
            exam.total_marks) *
            100
        );

        return (
          <Badge
            color={
              percentage >= 75
                ? "green"
                : percentage >= 50
                ? "yellow"
                : "red"
            }
            variant="light"
          >
            {percentage}%
          </Badge>
        );
      },
    },

    {
      accessor: "status",
      title: "Status",
      textAlign: "center",
      render: (exam) => (
        <Badge
          color={getStatusColor(
            exam.isPending
          )}
          variant="light"
        >
          {exam.status === "submitted"
            ? "Pending"
            : "Evaluated"}
        </Badge>
      ),
    },
{
  accessor: "actions",
  title: "Actions",
  textAlign: "right",
  render: (exam) =>
    exam.status === "submitted" ? (
      <Anchor
        fw={600}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/student/submission/${exam.exam_id}/session/${exam.session_id}`);
        }}
        pr={10}
        
      >
        View
      </Anchor>
    ) : (
      <Text c="dimmed" size="sm">
        Awaiting Evaluation
      </Text>
    ),
}
  ];

  return (
    <>
 
        <DataTable
          withTableBorder
          borderRadius="md"
          p={5}
          striped
          highlightOnHover
          records={paginatedRecords}
          totalRecords={records.length}
          columns={columns}
          minHeight={500}
        />

      {/* Pagination */}

      <TableFooter
        page={page}
        totalPages={Math.ceil(
          records.length /
            PAGE_SIZE
        )}
        totalRecords={records.length}
        recordsShown={
          paginatedRecords.length
        }
        onPageChange={setPage}
        label="results"
      />
    </>
  );
}