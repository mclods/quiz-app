export default function getShuffleQuestions(questions) {
  const shuffledQuestions = [...questions].map((question) => ({
    ...question,
    answers: [...question.answers.map((answer) => ({ ...answer }))],
  }));

  // Shuffle Answers
  shuffledQuestions.forEach((question) => {
    question.answers.sort(() => Math.random() - 0.5);
  });

  // Shuffle Questions
  shuffledQuestions.sort(() => Math.random() - 0.5);

  return shuffledQuestions;
}
