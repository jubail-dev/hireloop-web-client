
import { getJobs } from '@/lib/api/jobs';
import { JobDataType } from '../types/jobdata.types';

const BrowsJobsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>).toString();
    const query = urlSearch.toString();

    console.log("query", query);

    const jobs = await getJobs(query);

    return (
        <div>
            <h1>Browse Jobs</h1>
            <ul>
                {jobs.map((job: JobDataType) => (
                    <li key={job._id}>
                        <h2>{job.title}</h2>
    
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrowsJobsPage;