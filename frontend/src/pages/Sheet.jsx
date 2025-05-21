import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard"; // Import your QuestionCard component
import questionsData from "../assets/Q"; // Import your JSON data

const Sheet = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Toggle the checked status of a question by ID
  const toggleQuestion = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, checked: !q.checked } : q
      )
    );
  };

  // Get unique categories for the dropdown (ensure "All" is first and no duplicates)
  const categories = [
    "All",
    ...Array.from(new Set(questionsData.map((q) => q.category))),
  ];

  // Filtered questions based on difficulty and category
  const filteredQuestions = questions.filter((q) => {
    const isDifficultyMatch =
      difficultyFilter === "All" ||
      q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const isCategoryMatch =
      categoryFilter === "All" ||
      q.category.toLowerCase() === categoryFilter.toLowerCase();
    return isDifficultyMatch && isCategoryMatch;
  });
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">
          LeetCode Questions
        </h1>

        {/* Filters */}
        <div className="flex gap-6 mb-8">
          {/* Difficulty Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-2">
              Difficulty
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-neutral-800 text-white border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-neutral-800 text-white border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="border border-neutral-700 rounded-lg overflow-hidden">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                link={question.link}
                difficulty={question.difficulty}
                category={question.category}
                checked={question.checked || false}
                onToggle={() => toggleQuestion(question.id)}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No questions match your filters
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredQuestions.length} of {questions.length} questions
        </div>
      </div>
    </div>
  );
};

export default Sheet;
