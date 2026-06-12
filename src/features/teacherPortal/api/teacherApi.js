// 1. Keep your existing imports and add the missing lab JSON imports
import createQuizConfig from "../data/createQuizConfig.json";
import profileData from "../data/profile.json";
import pastPracticalsData from "../data/pastPracticals.json";
import labDetailsData from "../data/labDetails.json";       // Added
import labSubmissionsData from "../data/labSubmissions.json"; // Added

// 1. Change the import path to match your exact filename: reviewSubmission.json
import reviewSubmissionData from "../data/reviewSubmission.json";

import { apiClient } from '../../../shared/api/apiClient.js';

// 2. Keep the export function name identical so your pages don't crash
// export const fetchStudentSubmissionDetail = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // 3. Resolve the correctly imported data object variable
//       resolve(reviewSubmissionData);
//     }, 400);
//   });
// };

export const fetchStudentSubmissionDetail = async(examId, studentId) => {
    return await apiClient.get(`/faculty/submissions/${examId}/session/${studentId}`);
}




// 2. Fixed to resolve labSubmissionsData correctly with a snappier delay
// export const fetchLabSubmissions = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(labSubmissionsData); 
//     }, 500); // 500ms instead of 5500ms
//   });
// };

export const fetchLabSubmissions = async(examId) => {
    return await apiClient.get(`/faculty/exams/${examId}`);
}

// 3. ADDED THIS MISSING FUNCTION that the LabDetails page was crashing on:
// export const fetchLabDetails = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(labDetailsData);
//     }, 400);
//   });
// };

export const fetchLabDetails = async(examId) => {
    return await apiClient.get(`/faculty/exams/${examId}`);
} 

// export const fetchQuizConfig = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(createQuizConfig);
//     }, 500);
//   });
// };

export const fetchQuizConfig = async() => {
    return await apiClient.get(`/faculty/metadata`);
    
}

// Fetch the teacher's profile
// export const fetchTeacherProfile = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(profileData);
//     }, 400); 
//   });
// };

export const fetchTeacherProfile = async() => {
    return await apiClient.get('/user/profile');
}

// Fetch the list of practicals/labs
// export const fetchPastPracticals = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(pastPracticalsData);
//     }, 600); 
//   });
// };

export const fetchPastPracticals = async() => {
    return await apiClient.get('/faculty/exams');
}


