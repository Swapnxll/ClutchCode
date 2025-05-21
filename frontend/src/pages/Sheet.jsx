import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard"; // Your existing QuestionCard component
import questionsData from "../assets/Q"; // Your questions JSON

const Sheet = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [questionProgress, setQuestionProgress] = useState(Array(150).fill(0)); // default 0 for all questions

  // Fetch progress from backend on mount
  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/user/question`,
          { withCredentials: true }
        );
        if (res.data?.questionProgress) {
          setQuestionProgress(res.data.questionProgress);
        }
      } catch (error) {
        console.error("Error loading question progress:", error);
      }
    }

    fetchProgress();
  }, []);

  // Toggle checked state and update backend
  const toggleQuestion = async (id) => {
    const idx = id - 1; // adjust for zero-based index

    if (idx < 0 || idx >= questionProgress.length) return;

    // Optimistically update UI
    const newProgress = [...questionProgress];
    newProgress[idx] = newProgress[idx] === 1 ? 0 : 1;
    setQuestionProgress(newProgress);

    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/user/question/${idx}`,
        { checked: newProgress[idx] === 1 },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to update progress:", error);
      // Revert UI change if API call fails
      newProgress[idx] = newProgress[idx] === 1 ? 0 : 1;
      setQuestionProgress(newProgress);
    }
  };

  // Unique categories for filter dropdown
  const categories = [
    "All",
    ...Array.from(new Set(questionsData.map((q) => q.category))),
  ];

  // Filter questions based on selected filters
  const filteredQuestions = questions.filter((q) => {
    const difficultyMatch =
      difficultyFilter === "All" ||
      q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const categoryMatch =
      categoryFilter === "All" ||
      q.category.toLowerCase() === categoryFilter.toLowerCase();
    return difficultyMatch && categoryMatch;
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
                checked={questionProgress[question.id - 1] === 1}
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
