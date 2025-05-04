import questions from "../data/questions";

const categoryMap = {
  "Containers & Deployment": "Docker",
  "General Programming": "Code",
  "DevOps & Security": "DevOps",
  "Linux Essentials": "Linux",
  "JavaScript Frameworks": "JavaScript",
};

// ✅ Pulling from .env instead of hardcoding
const API_KEY = import.meta.env.VITE_QUIZ_API_KEY;

export const fetchTechQuizQuestions = async (displayCategory = "", level = "beginner") => {
  const quizCategory = categoryMap[displayCategory] || "Code";
  const url = `https://quizapi.io/api/v1/questions?category=${quizCategory}&limit=10`;

  console.log("API KEY:", API_KEY);
  console.log("Fetching from:", url);

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) throw new Error("API fetch failed");

    const data = await response.json();
    console.log("Fetched data from API:", data);

    const formatted = data
      .map((q) => {
        const options = Object.entries(q.answers || {})
          .filter(([_, val]) => val)
          .map(([key, val]) => ({
            text: val,
            isCorrect: q.correct_answers?.[`${key}_correct`] === "true",
          }));

        return {
          id: q.id,
          question: q.question,
          options,
        };
      })
      .filter((q) => q.options.length > 0);

    console.log("Formatted quiz questions:", formatted);

    if (!formatted.length) throw new Error("No valid questions after formatting");

    return formatted;
  } catch (err) {
    console.warn("Using fallback questions:", err.message);
    console.log("Fallback triggered. Display Category:", displayCategory);
    console.log("Fallback triggered. Level:", level);

    let fallback = [];
    const fallbackKey =
      displayCategory ||
      Object.keys(categoryMap).find((key) => categoryMap[key] === quizCategory);

    if (fallbackKey) {
      fallback = questions[fallbackKey]?.[level] || [];
      console.log(`Fallback questions for category ${fallbackKey}:`, fallback);
    } else {
      Object.values(questions).forEach((cat) => {
        if (cat[level]) fallback.push(...cat[level]);
      });
      console.log("Fallback questions after merging all categories:", fallback);
    }

    fallback = fallback
      .sort(() => Math.random() - 0.5)
      .map((q) => ({
        question: q.question,
        options: (q.options || []).map((opt) => ({
          text: opt,
          isCorrect: opt === q.answer,
        })),
      }));

    console.log("Final fallback questions after shuffle:", fallback);
    return fallback;
  }
};
