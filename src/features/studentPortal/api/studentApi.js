import { apiClient } from '../../../shared/api/apiClient.js';

export async function getStudentHeaderContext() {
  const response = await apiClient.get('/student/profile');
  return response.data;
}

export async function getStudentDashboardResults(page = 1) {
  const response = await apiClient.get('/student/exams', {
    params: { page },
  });
  return response.data;
}

export async function getStudentSubmissionDetails(examId) {
  const response = await apiClient.get(`/student/exams/${examId}`);
  return response.data;
}