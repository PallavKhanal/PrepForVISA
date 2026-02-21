"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon, ArrowRight } from "lucide-react";
import QuestionListContainer from "./QuestionListContainer";
import supabase from "@/lib/supabase";
import { useUser } from "@/app/Provider";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const QuestionList = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (formData?.description) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      let parsedData;
      try {
        parsedData = JSON.parse(result.data.result);
      } catch (err) {
        console.error("Failed to parse response:", err);
        parsedData = { interviewQuestions: [] };
      }

      const questions = parsedData.interviewQuestions || [];
      setQuestionList(questions);

      // Auto-save immediately after generation
      if (questions.length > 0 && user?.email) {
        await supabase.from("Interviews").insert([{
          country: formData.country,
          description: formData.description,
          questions: questions,
          user_email: user.email,
          interview_id: uuidv4(),
        }]);
      }
    } catch (e) {
      console.error("Error generating questions:", e);
      setQuestionList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <Loader2Icon className="animate-spin w-8 h-8 mb-3 text-gray-700" />
          <h2 className="font-semibold text-lg">Generating Interview Questions</h2>
          <p className="text-gray-500 text-sm">
            Our AI is crafting personalized questions tailored to your profile.
          </p>
        </div>
      ) : (
        <div className="space-y-3 mt-5">
          <h2 className="text-xl font-bold">Sample Interview Questions</h2>

          {questionList.length > 0 ? (
            <>
              <QuestionListContainer questionList={questionList} />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => router.push("/previous-interviews")}
                  className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
                >
                  View in History
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 italic">
              No questions found. Try again or check your API connection.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionList;
