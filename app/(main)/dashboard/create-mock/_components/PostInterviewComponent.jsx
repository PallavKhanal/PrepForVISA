"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PostInterviewComponent = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Interview Finished </h2>

      <div className="flex space-x-4">
        <Button
          className="border border-black bg-white text-black hover:bg-black hover:text-white"
          onClick={() => router.refresh()} // restart interview
        >
          Take Interview Again
        </Button>

        <Button
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PostInterviewComponent;
