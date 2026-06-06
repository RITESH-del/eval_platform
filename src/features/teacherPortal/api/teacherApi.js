import createQuizConfig from "../data/createQuizConfig.json";
import profileData from "../data/profile.json";
import pastPracticalsData from "../data/pastPracticals.json";
// Simulate a network request taking 500ms
export const fetchLabSubmissions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labSubmissions);
    }, 5500);
  });
};

export const fetchQuizConfig = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createQuizConfig);
    }, 5500);
  });
};

// Fetch the teacher's profile
export const fetchTeacherProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profileData);
    }, 5400); // Simulated 400ms delay
  });
};

// Fetch the list of practicals/labs
export const fetchPastPracticals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pastPracticalsData);
    }, 5600); // Simulated 600ms delay
  });
};