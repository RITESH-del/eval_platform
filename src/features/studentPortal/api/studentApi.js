import headerMock from '../data/headerData.json';
import middlewareMock from '../data/middlewareData.json';
import submissionMock from '../data/submissionData.json'; // Import your new mock file

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getStudentHeaderContext() 
{
    await delay(300); 
    return headerMock;
}

export async function getStudentDashboardResults() 
{
    await delay(500); 
    return middlewareMock;
}

// Fetch practical exam results by examId
export async function getStudentSubmissionDetails(examId) 
{
    await delay(500); // 500ms simulated latency
    
    // Grab the specific exam from the nested "submissions" map
    const submission = submissionMock.submissions[examId];
    
    if (!submission) {
        return null;
    }
    
    return submission;
}