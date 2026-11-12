const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';


export const getJobs = async (query: string = "") => {
    const response = await fetch(`${BASE_URL}/jobs?${query}`, {});
    return response.json();
};