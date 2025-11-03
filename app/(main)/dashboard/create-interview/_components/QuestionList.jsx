"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import supabase from "@/services/supabaseClient";
import { useUser } from "@/app/Provider";
import { v4 as uuidv4 } from "uuid";

const QuestionList = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (formData?.country && formData?.description && formData?.duration) {
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
        console.error(" Failed to parse response:", err);
        parsedData = { interviewQuestions: [] };
      }

      setQuestionList(parsedData.interviewQuestions || []);
    } catch (e) {
      console.error("Error generating questions:", e);
      setQuestionList([]);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    const interview_id = uuidv4();

    
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          country: formData.country,
          description: formData.description,
          duration: formData.duration,
          questions: questionList,  
          user_email: user?.email,  
          interview_id: interview_id,
        },
      ])
      .select();

    if (error) {
      console.error(" Supabase insert error:", error);
      alert("Failed to save interview. Check console for details.");
      return;
    }

    console.log("Interview saved:", data);
    alert("Interview saved successfully!");
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
                <Button onClick={onFinish}>Finish</Button>
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
