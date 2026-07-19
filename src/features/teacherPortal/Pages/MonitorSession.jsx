// For active exam sessions
import {
  Button,
  Group,
  Select,
  TextInput,
  Badge,
} from "@mantine/core";

import {
  Search,
  Calendar,
  RefreshCw,
} from "lucide-react";

import { useState, useEffect } from "react";
import { fetchLabSessions } from '../thunks/facultyThunks.js';
import { useDispatch, useSelector } from 'react-redux';

import {
  Paper,
} from "@mantine/core";

import SubmissionTable from "../components/SessionTable.jsx";
import Spinner from '../../../shared/components/Spinner.jsx';

const getLocalDateString = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export default function LabDetails() {
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState(null);
  const [status, setStatus] = useState(null);
  const [exam, setExam] = useState(null);
  const [date, setDate] = useState("");

  //   const records = [
  //   {
  //     rollNo: "STU-2027A",
  //     section: "SEC-A",
  //     studentName: "Aman Verma",
  //     language: "cpp",
  //     appMarks: 10,
  //     teacherMarks: null,
  //     status: "ONGOING",
  //   },
  //   {
  //     rollNo: "STU-2028B",
  //     section: "SEC-B",
  //     studentName: "Priya Sharma",
  //     language: "python",
  //     appMarks: 8,
  //     teacherMarks: 7,
  //     status: "SUBMITTED",
  //   },
  // ];

  const dispatch = useDispatch();
  
  const loading = useSelector((state) => state.faculty.loading);
  const sessions = useSelector((state) => state.faculty.labSessions);

  useEffect(() => {
    dispatch(fetchLabSessions());
  }, [dispatch]);

  if (loading) {
      return (
          <Spinner />
      );
    }

  // Extract unique batches dynamically
  const uniqueGraduationYears = Array.from(
    new Set((sessions || []).map((s) => s.graduation_year))
  )
    .filter(Boolean)
    .sort();

  const batchDropdownData = uniqueGraduationYears.map((year) => ({
    value: String(year),
    label: `${year - 4}-${year}`,
  }));

  // Extract unique exams dynamically
  const uniqueExams = Array.from(
    new Set((sessions || []).map((s) => s.title))
  )
    .filter(Boolean)
    .sort();

  const filteredSessions = (sessions || []).filter((s) => {
    // 1. Search filter
    const matchesSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.university_id?.toLowerCase().includes(search.toLowerCase());

    // 2. Batch filter
    const matchesBatch = !batch || String(s.graduation_year) === String(batch);

    // 3. Status filter
    let matchesStatus = true;
    if (status) {
      const sStatus = s.status?.toLowerCase();
      if (status === "ongoing") {
        matchesStatus = sStatus === "ongoing" || sStatus === "allocated";
      } else if (status === "submitted") {
        matchesStatus = sStatus === "submitted";
      } else if (status === "evaluated") {
        matchesStatus = sStatus === "evaluated";
      } else if (status === "absent") {
        matchesStatus = sStatus === "absent";
      }
    }

    // 4. Exam filter
    const matchesExam = !exam || s.title === exam;

    // 5. Date filter
    let matchesDate = true;
    if (date) {
      const sDate = s.start_time ? getLocalDateString(s.start_time) : null;
      matchesDate = sDate === date;
    }

    return matchesSearch && matchesBatch && matchesStatus && matchesExam && matchesDate;
  });

  return (
    <>
    {/* Filter_start */}
      <Group mb="xs" wrap="nowrap">
        <TextInput
          flex={1}
          radius="xl"
          value={search}
          onChange={(e) =>
            setSearch(e.currentTarget.value)
          }
          placeholder="Search student submissions..."
          leftSection={<Search size={18} />}
        />

        <TextInput
          type="date"
          radius="xl"
          w={150}
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
          leftSection={<Calendar size={18} />}
        />
      </Group>

      <Group justify="space-between">
        <Group>
          <Select
            radius="xl"
             w={120}
            placeholder="All Batches"
            value={batch}
            onChange={setBatch}
            data={batchDropdownData}
            clearable
          />

          <Select
            radius="xl"
            placeholder="All Statuses"
            w={150}
            value={status}
            onChange={setStatus}
            data={[
              { value: "ongoing", label: "Ongoing" },
              { value: "submitted", label: "Submitted" },
              { value: "evaluated", label: "Evaluated" },
              { value: "absent", label: "Absent"}
            ]}
            clearable
          />

          <Select
            radius="xl"
            placeholder="All Exams"
            w={150}
            value={exam}
            onChange={setExam}
            data={uniqueExams}
            clearable
          />
        </Group>

        <Badge
          size="lg"
          color="green"
          variant="light"
          leftSection={<RefreshCw size={14} />}
        >
          Live Syncing
        </Badge>
      </Group>
    {/* Filters_end  */}

{/* Table */}
      <Paper
        // radius="xl"
        // withBorder
        mt="lg"
      >
        <SubmissionTable
          records={filteredSessions}
        />
      </Paper>
    </>
  );
}