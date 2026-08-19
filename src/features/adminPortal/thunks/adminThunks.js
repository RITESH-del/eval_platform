import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../shared/api/apiClient";

/*
|--------------------------------------------------------------------------
| Admin Profile
|--------------------------------------------------------------------------
*/

export const fetchProfile = createAsyncThunk(
  "admin/fetchProfile",
  async () => {
    const response = await apiClient.get("/user/profile");
    return response.data;

    // return {
    //   id: "0ee37bd0-67e3-4f4b-8667-73c3ad572c83",
    //   email: "admin@bmu.edu.in",
    //   name: "Admin",
    //   role: "admin",
    //   university_id: "",
    // };
  }
);


/*
|--------------------------------------------------------------------------
| FACULTY
|--------------------------------------------------------------------------
*/

/*
 * Fetch all faculty members
 */
export const fetchFacultiesThunk = createAsyncThunk(
  "admin/fetchFaculties",
  async () => {
    const response = await apiClient.get(
      "/admin/users?role=faculty"
    );
    return response.data;

    // Temporary mock data
    // return [
    //   {
    //     id: "faculty-001",
    //     name: "John Smith",
    //     employee_id: "FAC-001",
    //     email: "john.smith@bmu.edu.in",
    //     department: "cse",
    //     phone_number: "9876543210",
    //   },
    //   {
    //     id: "faculty-002",
    //     name: "Sarah Jenkins",
    //     employee_id: "FAC-002",
    //     email: "sarah.jenkins@bmu.edu.in",
    //     department: "ece",
    //     phone_number: "9876543211",
    //   },
    // ];
  }
);


/*
 * Create a single faculty account
 *
 * Backend is responsible for:
 * 1. Generating temporary password
 * 2. Hashing password
 * 3. Creating faculty account
 * 4. Sending credentials through email
 */
export const createFacultyThunk = createAsyncThunk(
  "admin/createFaculty",
  async (facultyData) => {
    const response = await apiClient.post(
      "/admin/users/faculty",
      facultyData
    );

    return response.data;
  }
);


/*
 * Import multiple faculty members from Excel
 */
export const importFacultiesThunk = createAsyncThunk(
  "admin/importFaculties",
  async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient.post(
      "/admin/users/import-faculty",
      formData
    );

    return response.data;
  }
);


/*
 * Update a faculty member
 *
 * Expected:
 *
 * dispatch(
 *   updateFacultyThunk({
 *     id: faculty.id,
 *     data: {
 *       name,
 *       employee_id,
 *       department,
 *       email,
 *       phone_number
 *     }
 *   })
 * )
 */
export const updateFacultyThunk = createAsyncThunk(
  "admin/updateFaculty",
  async ({ id, data }) => {
    const response = await apiClient.put(
      `/admin/users/${id}`,
      data
    );

    return response.data;
  }
);


/*
 * Delete faculty
 */
export const deleteFacultyThunk = createAsyncThunk(
  "admin/deleteFaculty",
  async (facultyId) => {
    const response = await apiClient.delete(
      `/admin/users/${facultyId}`
    );

    return response.data;
  }
);


/*
|--------------------------------------------------------------------------
| STUDENTS
|--------------------------------------------------------------------------
*/

/*
 * Fetch all students
 */
export const fetchStudentsThunk = createAsyncThunk(
  "admin/fetchStudents",
  async () => {
    const response = await apiClient.get(
      "/admin/users?role=student"
    );
    return response.data;

    // Temporary mock data
    // return [
    //   {
    //     id: "stu-001",
    //     name: "Aarav Sharma",
    //     student_id: "BMU24CSE001",
    //     email: "aarav.sharma@bmu.edu.in",
    //     department: "cse",
    //     graduation_year: 2028,
    //     section: "A",
    //   },
    //   {
    //     id: "stu-002",
    //     name: "Ananya Verma",
    //     student_id: "BMU24CSE002",
    //     email: "ananya.verma@bmu.edu.in",
    //     department: "cse",
    //     graduation_year: 2028,
    //     section: "A",
    //   },
    //   {
    //     id: "stu-003",
    //     name: "Rohan Mehta",
    //     student_id: "BMU24CSE003",
    //     email: "rohan.mehta@bmu.edu.in",
    //     department: "cse",
    //     graduation_year: 2028,
    //     section: "B",
    //   },
    //   {
    //     id: "stu-004",
    //     name: "Priya Nair",
    //     student_id: "BMU24ECE004",
    //     email: "priya.nair@bmu.edu.in",
    //     department: "ece",
    //     graduation_year: 2028,
    //     section: "A",
    //   },
    // ];
  }
);


/*
 * Create a single student
 *
 * Students do NOT receive a local password.
 */
export const createStudentThunk = createAsyncThunk(
  "admin/createStudent",
  async (studentData) => {
    const response = await apiClient.post(
      "/admin/users/student",
      studentData
    );

    return response.data;
  }
);


/*
 * Update a student
 *
 * Expected:
 *
 * dispatch(
 *   updateStudentThunk({
 *     id: student.id,
 *     data: {
 *       name,
 *       student_id,
 *       department,
 *       graduation_year,
 *       section,
 *       email
 *     }
 *   })
 * )
 */
export const updateStudentThunk = createAsyncThunk(
  "admin/updateStudent",
  async ({ id, data }) => {
    const response = await apiClient.put(
      `/admin/users/${id}`,
      data
    );

    return response.data;
  }
);


/*
 * Delete student
 */
export const deleteStudentThunk = createAsyncThunk(
  "admin/deleteStudent",
  async (studentId) => {
    const response = await apiClient.delete(
      `/admin/users/${studentId}`
    );

    return response.data;
  }
);


/*
 * Import students from Excel
 *
 * Students don't have local passwords.
 */
export const importStudentsThunk = createAsyncThunk(
  "admin/importStudents",
  async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient.post(
      "/admin/users/import-students",
      formData
    );

    return response.data;
  }
);
