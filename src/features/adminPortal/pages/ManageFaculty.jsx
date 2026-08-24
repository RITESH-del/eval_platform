// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFacultiesThunk, createFacultyThunk, importFacultiesThunk } from "../thunks/adminThunks.js";
// import { Group, TextInput,Button } from "@mantine/core";
// import { Search, Calendar } from "lucide-react";
// import FacultyTable from "../components/FacultyTable.jsx";
// import { Plus } from "lucide-react";
// import CreateFacultyModal from "../components/CreateFacultyModal.jsx";

// export default function ManageFaculty() {
//   const [search, setSearch] = useState("");
//   const [date, setDate] = useState("");

//   const dispatch = useDispatch();

//   const [modalOpened, setModalOpened] = useState(false);

//   const { faculties, loadingFaculties, error } = useSelector(
//     (state) => state.admin
//   );

//   useEffect(() => {
//     dispatch(fetchFacultiesThunk());
//   }, [dispatch]);

//   const filteredUsers = faculties?.filter((user) => {
//     const searchValue = search.toLowerCase();

//     const matchesSearch =
//       user.name?.toLowerCase().includes(searchValue) ||
//       user.email?.toLowerCase().includes(searchValue) ||
//       user.department?.toLowerCase().includes(searchValue) ||
//       user.phone_number?.toLowerCase().includes(searchValue);

//     return matchesSearch;
//   }) || [];

//   return (
//     <>
//       <Group mb="xs" wrap="nowrap" mt={50}>
//         <TextInput
//           flex={1}
//           radius="xl"
//           value={search}
//           onChange={(e) => setSearch(e.currentTarget.value)}
//           placeholder="Search faculty..."
//           leftSection={<Search size={18} />}
//         />

//          <Button
//     radius="xl"
//     leftSection={<Plus size={17} />}
//     onClick={() => setModalOpened(true)}
//   >
//     Add Faculty
//   </Button>
//       </Group>

//       <FacultyTable users={filteredUsers} />

//       <CreateFacultyModal
//   opened={modalOpened}
//   onClose={() => setModalOpened(false)}
//   onCreate={(data) => {
//     console.log("Create faculty:", data);

//     dispatch(createFacultyThunk(data));
//   }}
//   onUploadExcel={(file) => {
//     console.log("Excel file:", file);

//     dispatch(importFacultiesThunk(file));
//   }}
// />
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchFacultiesThunk,
  createFacultyThunk,
  updateFacultyThunk,
  importFacultiesThunk,
} from "../thunks/adminThunks.js";

import {
  Group,
  TextInput,
  Button,
} from "@mantine/core";

import {
  Search,
  Plus,
} from "lucide-react";

import FacultyTable from "../components/FacultyTable.jsx";
import CreateFacultyModal from "../components/CreateFacultyModal.jsx";
import UpdateFacultyModal from "../components/UpdateFacultyModal.jsx";

export default function ManageFaculty() {
  const [search, setSearch] = useState("");

  // Create modal
  const [createModalOpened, setCreateModalOpened] =
    useState(false);

  // Update modal
  const [updateModalOpened, setUpdateModalOpened] =
    useState(false);

  const [selectedFaculty, setSelectedFaculty] =
    useState(null);

  const dispatch = useDispatch();

  const {
    faculties,
    loadingFaculties,
    creatingFaculty,
    updatingFaculty,
    importingFaculties,
    error,
  } = useSelector((state) => state.admin);

  /*
  |--------------------------------------------------------------------------
  | Fetch Faculties
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(fetchFacultiesThunk());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const filteredUsers =
    faculties?.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue) ||
        user.department
          ?.toLowerCase()
          .includes(searchValue) ||
        user.phone_number
          ?.toLowerCase()
          .includes(searchValue);

      return matchesSearch;
    }) || [];

  /*
  |--------------------------------------------------------------------------
  | Create Faculty
  |--------------------------------------------------------------------------
  */

  const handleCreateFaculty = async (data) => {
    console.log("Create faculty:", data);

    const result = await dispatch(
      createFacultyThunk(data)
    );

    if (
      createFacultyThunk.fulfilled.match(result)
    ) {
      setCreateModalOpened(false);
    } else {
      console.error(
        "Create faculty failed:",
        result.payload || result.error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Import Faculty
  |--------------------------------------------------------------------------
  */

  const handleImportFaculty = async (file) => {
    console.log("Excel file:", file);

    const result = await dispatch(
      importFacultiesThunk(file)
    );

    if (
      importFacultiesThunk.fulfilled.match(result)
    ) {
      setCreateModalOpened(false);

      // Refresh the list because the backend may
      // return an import summary rather than
      // the complete faculty list.
      dispatch(fetchFacultiesThunk());
    } else {
      console.error(
        "Faculty import failed:",
        result.payload || result.error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Edit Faculty
  |--------------------------------------------------------------------------
  */

  const handleEditFaculty = (faculty) => {
    console.log("Editing faculty:", faculty);

    setSelectedFaculty(faculty);
    setUpdateModalOpened(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Update Faculty
  |--------------------------------------------------------------------------
  */

  const handleUpdateFaculty = async (facultyData) => {
    // console.log(
    //   "Updating faculty:",
    //   facultyData
    // );

    const result = await dispatch(
      updateFacultyThunk(facultyData)
    );

    // console.log(
    //   "Update faculty result:",
    //   result
    // );

    if (
      updateFacultyThunk.fulfilled.match(result)
    ) {
      setUpdateModalOpened(false);
      setSelectedFaculty(null);
    } else {
      console.error(
        "Update faculty failed:",
        result.payload || result.error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <Group
        mb="xs"
        wrap="nowrap"
        mt={50}
      >
        <TextInput
          flex={1}
          radius="xl"
          value={search}
          onChange={(e) =>
            setSearch(
              e.currentTarget.value
            )
          }
          placeholder="Search faculty..."
          leftSection={
            <Search size={18} />
          }
        />

        <Button
          radius="xl"
          leftSection={
            <Plus size={17} />
          }
          onClick={() =>
            setCreateModalOpened(true)
          }
        >
          Add Faculty
        </Button>
      </Group>

      <FacultyTable
        users={filteredUsers}
        onEdit={handleEditFaculty}
      />

      {/* =================================================
          CREATE / IMPORT FACULTY
      ================================================= */}

      <CreateFacultyModal
        opened={createModalOpened}
        onClose={() =>
          setCreateModalOpened(false)
        }
        onCreate={handleCreateFaculty}
        onUploadExcel={handleImportFaculty}
        loading={
          creatingFaculty ||
          importingFaculties
        }
      />

      {/* =================================================
          UPDATE FACULTY
      ================================================= */}

      <UpdateFacultyModal
        opened={updateModalOpened}
        onClose={() => {
          setUpdateModalOpened(false);
          setSelectedFaculty(null);
        }}
        faculty={selectedFaculty}
        onUpdate={handleUpdateFaculty}
        loading={updatingFaculty}
      />
    </>
  );
}