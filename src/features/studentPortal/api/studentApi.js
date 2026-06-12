import headerMock from '../data/headerData.json';
import middlewareMock from '../data/middlewareData.json';

// Simulates a backend network delay to test loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getStudentHeaderContext() 
{
    await delay(300); // 300ms simulated network latency
    return headerMock;
}

export async function getStudentDashboardResults() 
{
    await delay(500); // 500ms simulated network latency
    return middlewareMock;
}