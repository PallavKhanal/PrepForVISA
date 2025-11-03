import React from "react";

const QuestionListContainer = ({ questionList }) => {
  return (
    <div>
      <ul className="space-y-2">
        {questionList.map((q, i) => (
          <li
            key={i}
            className="border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition"
          >
            {i + 1}. {q}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionListContainer;
