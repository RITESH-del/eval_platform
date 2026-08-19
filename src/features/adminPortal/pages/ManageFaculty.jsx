import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFacultiesThunk, createFacultyThunk, importFacultiesThunk } from "../thunks/adminThunks.js";
import { Group, TextInput,Button } from "@mantine/core";
import { Search, Calendar } from "lucide-react";
import FacultyTable from "../components/FacultyTable.jsx";
import { Plus } from "lucide-react";
import CreateFacultyModal from "../components/CreateFacultyModal.jsx";

export default function ManageFaculty() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const [modalOpened, setModalOpened] = useState(false);

  const { faculties, loadingFaculties, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchFacultiesThunk());
  }, [dispatch]);

  const filteredUsers = faculties?.filter((user) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.department?.toLowerCase().includes(searchValue) ||
      user.phone_number?.toLowerCase().includes(searchValue);

    return matchesSearch;
  }) || [];

  return (
    <>
      <Group mb="xs" wrap="nowrap" mt={50}>
        <TextInput
          flex={1}
          radius="xl"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search faculty..."
          leftSection={<Search size={18} />}
        />

         <Button
    radius="xl"
    leftSection={<Plus size={17} />}
    onClick={() => setModalOpened(true)}
  >
    Add Faculty
  </Button>
      </Group>

      <FacultyTable users={filteredUsers} />

      <CreateFacultyModal
  opened={modalOpened}
  onClose={() => setModalOpened(false)}
  onCreate={(data) => {
    console.log("Create faculty:", data);

    dispatch(createFacultyThunk(data));
  }}
  onUploadExcel={(file) => {
    console.log("Excel file:", file);

    dispatch(importFacultiesThunk(file));
  }}
/>
    </>
  );
}