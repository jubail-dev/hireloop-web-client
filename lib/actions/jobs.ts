import { JobDataType } from "@/app/types/jobdata.types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const createJob = async (data : JobDataType) => {
  
     const response = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json()
}