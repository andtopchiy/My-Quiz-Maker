import React, { useState } from "react";
import QuestionCard from "./component/QuizCard";
import Loader from "./component/Loader";

function App() {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [quizCreated, setQuizCreated] = useState(false);
  const [answerDetail, setAnswerDetail] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showNewQuiz, setShowNewQuiz] = useState(false);
  const [isQuizLoading, setIsQuizLoading] = useState(false);


  const handleCreateQuiz = () => {
    const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    setIsQuizLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q) => ({
          question: q.question,
          answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
          correctAnswer: q.correct_answer,
          selectedAnswer: null,
        }));
        setIsQuizLoading(false);
        setQuestions(formattedQuestions);
        setQuizCreated(true);
      })
      .catch((error) => {
        setIsQuizLoading(false);
        console.log(error);
      });
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleSelectAnswer = (answer, questionIndex) => {
    const updatedQuestions = questions.map((q, index) =>
      index === questionIndex ? { ...q, selectedAnswer: answer } : q
    );
    setQuestions(updatedQuestions);

    const allAnswered = updatedQuestions.every(
      (q) => q.selectedAnswer !== null
    );
    setShowSubmit(allAnswered);
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, q) => {
      if (q.selectedAnswer === q.correctAnswer) {
        acc += 1;
      }
      return acc;
    }, 0);
    setShowSubmit(false);
    setQuizSubmitted(true);

    let answerDetail = `You scored ${score} out of ${questions.length}`;
    let resultClass = "";

    if (score <= 1) {
      resultClass = "red"; 
    } else if (score <= 3) {
      resultClass = "yellow"; 
    } else {
      resultClass = "green"; 
    }

    setAnswerDetail({ text: answerDetail, color: resultClass });
    setShowNewQuiz(true);
  };

  const handleCreateNewQuiz = () => {
    setQuizCreated(false);
    setQuizSubmitted(false);
    setQuestions([]);
    setCategory(null);
    setDifficulty(null);
    setShowSubmit(false);
    setAnswerDetail(null);
    setCategory(null);
    setDifficulty(null);
    setShowNewQuiz(false);
  };

  const trivia_categories = [
    {
      id: 9,
      name: "General Knowledge",
    },
    {
      id: 10,
      name: "Entertainment: Books",
    },
    {
      id: 11,
      name: "Entertainment: Film",
    },
    {
      id: 12,
      name: "Entertainment: Music",
    },
    {
      id: 13,
      name: "Entertainment: Musicals & Theatres",
    },
    {
      id: 14,
      name: "Entertainment: Television",
    },
    {
      id: 15,
      name: "Entertainment: Video Games",
    },
    {
      id: 16,
      name: "Entertainment: Board Games",
    },
    {
      id: 17,
      name: "Science & Nature",
    },
    {
      id: 18,
      name: "Science: Computers",
    },
    {
      id: 19,
      name: "Science: Mathematics",
    },
    {
      id: 20,
      name: "Mythology",
    },
    {
      id: 21,
      name: "Sports",
    },
    {
      id: 22,
      name: "Geography",
    },
    {
      id: 23,
      name: "History",
    },
    {
      id: 24,
      name: "Politics",
    },
    {
      id: 25,
      name: "Art",
    },
    {
      id: 26,
      name: "Celebrities",
    },
    {
      id: 27,
      name: "Animals",
    },
    {
      id: 28,
      name: "Vehicles",
    },
    {
      id: 29,
      name: "Entertainment: Comics",
    },
    {
      id: 30,
      name: "Science: Gadgets",
    },
    {
      id: 31,
      name: "Entertainment: Japanese Anime & Manga",
    },
    {
      id: 32,
      name: "Entertainment: Cartoon & Animations",
    },
  ];
  return (
    <div className="quiz-app container">
      <h1>Quiz Maker</h1>

      {!quizSubmitted && (
        <div className="quiz-dropdown-container">
          <div className="dropdowns">
            <div className="dropdown-lable">
              <labe htmlFor="Category"> Category:</labe>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={""}> Select Category </option>
                {trivia_categories.map((categoryItem, index) => (
                  <option key={index} value={categoryItem.id}>
                    {categoryItem.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-lable">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value={""}> Select Difficulty </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <button
            disabled={!category || !difficulty}
            onClick={handleCreateQuiz}
          >
            Create Quiz
          </button>
        </div>
      )}

      {isQuizLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {quizCreated && (
            <div className="question-container">
              {questions.length > 0 &&
                questions.map((q, index) => (
                  <QuestionCard
                    key={index}
                    question={q}
                    index={index}
                    onSelectAnswer={(answer) =>
                      handleSelectAnswer(answer, index)
                    }
                    isSubmitted={quizSubmitted}
                  />
                ))}

              {showSubmit && (
                <div>
                  <button className="submit-button" onClick={handleSubmit}>
                    Submit Quiz
                  </button>
                </div>
              )}

              {answerDetail && (
                <div className={`answer-detail ${answerDetail.color}`}>
                  {answerDetail.text}
                </div>
              )}

              {showNewQuiz && (
                <button className="submit-button" onClick={handleCreateNewQuiz}>
                  Create New Quiz
                </button>
              )}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
