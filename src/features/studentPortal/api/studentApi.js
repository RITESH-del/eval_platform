import { apiClient } from '../../../shared/api/apiClient.js';
 
/**
 * Fetches the student's profile data.
 * GET /student/profile
 * @returns {Promise<{ id, university_id, name, email, section, graduation_year, role }>}
 */
export async function getStudentHeaderContext() {
  const response = await apiClient.get('/student/profile');
  return response.data;
}
 
/**
 * Fetches a paginated list of exams with published results.
 * GET /student/exams?page=<page>
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<{ exams: Array, pagination: { page, limit, total, hasMore } }>}
 */
export async function getStudentDashboardResults(page = 1) {
  const response = await apiClient.get('/student/exams', {
    params: { page },
  });
  return response.data;
}
 
/**
 * Fetches detailed exam data including submissions and question history.
 * GET /student/exams/:id
 * @param {string|number} examId - The exam ID
 * @returns {Promise<{ session_id, student_details, exam_details, total_manual_score, total_autograding_score, responses }>}
 */
export async function getStudentSubmissionDetails(examId) {
  if (!examId && examId !== 0) {
    throw new Error('examId is required to fetch submission details');
  }
  const response = await apiClient.get(`/student/exams/${examId}`);
  return response.data;
}