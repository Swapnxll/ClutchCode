import React from "react";
import { FaExternalLinkAlt, FaCheck } from "react-icons/fa";

const QuestionCard = ({
  id,
  title,
  link,
  difficulty,
  category,
  checked,
  onToggle,
}) => {
  // Difficulty color mapping
  const difficultyColors = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-700 hover:border-blue-500 hover:bg-neutral-800 rounded transition-all duration-200 mb-3 shadow-sm">
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
          checked ? "bg-blue-500 border-blue-500" : "border-neutral-500"
        }`}
      >
        {checked && <FaCheck className="text-white text-xs" />}
      </button>

      {/* Question Name */}
      <div className="flex-1 ml-4">
        <p className="text-base font-medium text-white">
          {id}.<span> </span>
          {title}
        </p>
      </div>

      {/* External Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 text-sm flex items-center mr-4"
      >
        <FaExternalLinkAlt className="mr-1" />
        View
      </a>

      {/* Difficulty */}
      <span
        className={`text-sm font-medium capitalize mr-4 ${
          difficultyColors[difficulty] || "text-neutral-400"
        }`}
      >
        {difficulty}
      </span>

      {/* Category */}
      <span className="px-3 py-1 rounded-3xl bg-neutral-700 text-white text-sm capitalize border border-neutral-600">
        {category}
      </span>
    </div>
  );
};

export default QuestionCard;
