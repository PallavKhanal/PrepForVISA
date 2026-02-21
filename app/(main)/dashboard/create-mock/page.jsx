"use client";
import InterviewIntro from "@/components/features/create-mock/InterviewIntro";

// This page renders as a fixed full-screen overlay so it escapes
// the dashboard sidebar + header + content padding layout entirely.
const CreateMock = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <InterviewIntro />
    </div>
  );
};

export default CreateMock;