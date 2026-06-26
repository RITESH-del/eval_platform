import { useEffect, useState } from "react"
import { getStudentDashboardResults } from "../api/studentApi";
import {useNavigate} from 'react-router-dom';
    
import Spinner from '../../../shared/components/Spinner';

export default function StudentHomePageMiddleware() {

    const navigate = useNavigate();
    const [data , setData] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{

        async function fetchResults(params) {
            const result = await getStudentDashboardResults();
            if(result) setData(result);
            setLoading(false);
        }

        fetchResults();

    },[]);

    if(loading)
    {
        return(
            <Spinner/>
            )
    }

    if(!data)
    {
        return
        <>
            <p>UNABLE TO FETCH DATA</p>
        </>
    }

    return (
    <section className="min-h-[90vh] bg-[#121212] text-white p-8 max-w-5xl mx-auto">
        
        <h2 className="text-2xl font-semibold mb-6 tracking-wide">
            RECENT EXAMS
        </h2>
        
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-y border-dashed border-gray-600 text-gray-300">
                    <th className="py-4 px-2 font-medium">Exam Name</th>
                    <th className="py-4 px-2 font-medium">Score</th>
                    <th className="py-4 px-2 font-medium">Rank</th>
                    <th className="py-4 px-2 font-medium">Date</th>
                    <th className="py-4 px-2 font-medium text-center">View</th>
                </tr>
            </thead>
            <tbody>
                {data.examResults.map((exam) => (
                    <tr 
                        key={exam.id} 
                        className="border-b border-dashed border-gray-800 hover:bg-[#1e1e1e] transition-colors"
                    >
                        <td className="py-4 px-2">{exam.name}</td>
                        <td className="py-4 px-2 text-[#4edf7a] font-semibold">{exam.score}</td>
                        <td className="py-4 px-2">{exam.rank}</td>
                        <td className="py-4 px-2 text-gray-400 text-sm">{exam.date}</td>
                        <td className="py-4 px-2 text-center">
                            <button 
                                className="px-3 py-1 rounded bg-[#333] hover:bg-[#4edf7a] hover:text-[#121212] transition-all font-bold"
                                onClick={() => navigate(`/student/submission`)}

                                //yaha pe button click hone pe student ko uske submission page pe le jaane ka code likhna hai, jisme exam.id ko pass karna hoga taki uske submission details fetch ho sake
                            >
                                &rarr;
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </section>
);
}
