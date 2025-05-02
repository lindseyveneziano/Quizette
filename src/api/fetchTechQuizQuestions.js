export const fetchTechQuizQuestions = async (displayCategory = "", level = "beginner") => {
  const quizCategory = categoryMap[displayCategory] || "Code";
  const url = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${quizCategory}&limit=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API fetch failed");

    const data = await response.json();

    if (!data.length) throw new Error("Empty API response");

    // Format API response
    return data.map((q) => ({
      id: q.id,
      question: q.question,
      options: Object.entries(q.answers || {})
        .filter(([_, val]) => val)
        .map(([key, val]) => ({
          text: val,
          isCorrect: q.correct_answers?.[`${key}_correct`] === "true",
        })),
    }));
  } catch (err) {
    console.warn("Using fallback questions:", err.message);

    let fallback = [];

    // Debug the displayCategory and level
    console.log("Fallback triggered. Display Category:", displayCategory);
    console.log("Fallback triggered. Level:", level);

    if (displayCategory) {
      fallback = questions[displayCategory]?.[level] || [];
      console.log(`Fallback questions for category ${displayCategory}:`, fallback);
    } else {
      Object.values(questions).forEach((cat) => {
        if (cat[level]) fallback.push(...cat[level]);
      });
      console.log("Fallback questions after merging all categories:", fallback);
    }

    // Shuffle the fallback questions
    fallback = fallback.sort(() => Math.random() - 0.5).map((q) => ({
      question: q.question,
      options: q.options.map((opt) => ({
        text: opt,
        isCorrect: opt === q.answer,
      })),
    }));

    console.log("Final fallback questions after shuffle:", fallback);

    return fallback;
  }
};
