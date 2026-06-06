// 1. Keep your existing imports and add the missing lab JSON imports
import createQuizConfig from "../data/createQuizConfig.json";
import profileData from "../data/profile.json";
import pastPracticalsData from "../data/pastPracticals.json";
import labDetailsData from "../data/labDetails.json";       // Added
import labSubmissionsData from "../data/labSubmissions.json"; // Added

// 2. Fixed to resolve labSubmissionsData correctly with a snappier delay
export const fetchLabSubmissions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labSubmissionsData); 
    }, 500); // 500ms instead of 5500ms
  });
};

// 3. ADDED THIS MISSING FUNCTION that the LabDetails page was crashing on:
export const fetchLabDetails = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labDetailsData);
    }, 400);
  });
};

export const fetchQuizConfig = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createQuizConfig);
    }, 500);
  });
};

// Fetch the teacher's profile
export const fetchTeacherProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profileData);
    }, 400); 
  });
};

// Fetch the list of practicals/labs
export const fetchPastPracticals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pastPracticalsData);
    }, 600); 
  });
};