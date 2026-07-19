import { apiClient } from '../../../shared/api/apiClient.js';



export const fetchStudentSubmissionDetail = async(examId, studentId) => {
    return await apiClient.get(`/faculty/submissions/${examId}/session/${studentId}`);
}


export const fetchLabSubmissions = async(examId) => {
    const res = await apiClient.get(`/faculty/exams/${examId}`);
    return res;
}

export const fetchLabDetails = async(examId) => {
    return await apiClient.get(`/faculty/exams/${examId}`);
} 



export const fetchQuizConfig = async() => {
    return await apiClient.get(`/faculty/metadata`);
    
}


export const fetchTeacherProfile = async() => {
    return await apiClient.get('/user/profile');
}

export const fetchPastPracticals = async() => {
    return await apiClient.get('/faculty/exams');
}

export const fetchLabSessions = async() => {
    const res = await apiClient.get('/faculty/exam-sessions');
    return res;
}


export const createQuiz = async (data) => {
  try {
    const response = await apiClient.post(
      "/faculty/labs",
      data
    );

    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message ||
      "Failed to create quiz"
    );
  }
};

export const updateQuiz = async (
  Id,
  data
) => {
  const response = await apiClient.put(
    `/faculty/labs/${Id}`,
    data
  );

  return response.data;
};

export const getQuiz = async (Id) => {
  const response = await apiClient.get(
    `/faculty/labs/${Id}`
  );

  return response.data;
};

export const deleteQuiz = async(quizId) => {
    const res = await apiClient.delete(`/faculty/labs/${quizId}`);
    return res;
}

export const updateManualScore = async({payload, sessionId}) => {
    const res = await apiClient.patch(`/faculty/manual-score/${sessionId}`, 
      payload
    );
    return res;
}

export const publishResult = async(examId) => {
    const res = await apiClient.post(`/faculty/publish_result/${examId}`);
    return res.data;
}

