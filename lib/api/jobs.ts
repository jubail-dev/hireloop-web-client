const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';


export const getJobs = async () => {
    const response = await fetch(`${BASE_URL}/jobs`,{});
    return response.json();
};