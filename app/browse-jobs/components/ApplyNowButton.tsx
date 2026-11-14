"use client"

import { JobDataType } from "@/app/types/jobdata.types";
import { applyToJob } from "@/lib/actions/jobs";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ApplyNowButton = ({job}: {job: JobDataType}) => {

    const router = useRouter()
    const {data:session} = useSession()
    const user = session?.user
    
    const handleApplyNow = async () => {
        if(!user) {
            router.push(`/signin?redirectTo=/browse-jobs/${job._id}`)
            return
        }
        else if(user.role === "seeker") {
            const application ={
                jobId: job._id,
                userId: user.id,
                email: user.email,
                name: user.name,
                jobTitle: job.title,
                company: job.company,
                location: job.location,
            }

            const result = await applyToJob(application);
            if (result.insertedId){
                router.push("/browse-jobs")
                toast.success("Application submitted successfully!")
            }

        } else{
            console.log("user is not a job Seeker");
        }
    }

    return (
        <button
                onClick={handleApplyNow}
                type="button"
                className="flex-1 sm:flex-none rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
              >
                Apply Now
              </button>
    );
};

export default ApplyNowButton;