import { useEffect, useState } from "react";
import PracticalsTable from "../components/PracticalsTable";
import { useSelector, useDispatch } from 'react-redux';
import { Group, TextInput, Select } from "@mantine/core";
import { Search, Calendar } from "lucide-react";
import { fetchPastPracticals } from '../thunks/facultyThunks.js';
import Spinner from '../../../shared/components/Spinner.jsx';

export default function TeacherHomePage() {
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState(null);
  const [date, setDate] = useState("");
  
  const dispatch = useDispatch();
  const practicals = useSelector((state) => state.faculty.pastPracticals);
  const loading = useSelector((state) => state.faculty.loading);
 
  // console.log(practicals);

  useEffect(()=>{
    dispatch(fetchPastPracticals())
  }, [dispatch]);

  if (loading) {
      return (
          <Spinner />
      );
    }

  const uniqueGraduationYears = Array.from(
    new Set((practicals || []).map((p) => p.target_graduation_year))
  )
    .filter(Boolean)
    .sort();

  const dropdownData = uniqueGraduationYears.map((year) => ({
    value: String(year),
    label: `${year - 4}-${year}`,
  }));

  const filteredPracticals = (practicals || []).filter((p) => {
    // 1. Search filter
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.target_section?.toLowerCase().includes(search.toLowerCase());

    // 2. Batch filter
    const matchesBatch = !batch || String(p.target_graduation_year) === String(batch);

    // 3. Date filter
    let matchesDate = true;
    if (date) {
      const pDate = new Date(p.start_time).toISOString().split("T")[0];
      matchesDate = pDate === date;
    }

    return matchesSearch && matchesBatch && matchesDate;
  });

  return (
  <>
  {/* Filter & Search bar */}
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

          <Group>
                  <Select
                    radius="xl"
                    w={120}
                    placeholder="All Batches"
                    value={batch}
                    onChange={setBatch}
                    data={dropdownData}
                    clearable
                  />
                </Group>
  
          <TextInput
            type="date"
            radius="xl"
            w={150}
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
            leftSection={<Calendar size={18} />}
          />
        </Group>

    {/* Practical Table */}
    <PracticalsTable
      practicals={filteredPracticals}
    />
  </>
  );
}