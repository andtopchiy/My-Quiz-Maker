import React from "react";

const QuestionCard = ({ question, index, onSelectAnswer, isSubmitted }) => {
  const {
    question: questionText,
    answers,
    selectedAnswer,
    correctAnswer,
  } = question;

  return (
    <div className="question-card">
      <h3
        dangerouslySetInnerHTML={{ __html: `${index + 1}. ${questionText}` }}
      />
      <div className="answers">
        {answers.map((answer, i) => {
          let buttonClass = "answer-button";
          if (isSubmitted) {
            if (answer === correctAnswer) {
              buttonClass += " correct";
            } else if (answer === selectedAnswer) {
              buttonClass += " incorrect";
            }
            buttonClass += " disabled";
          } else if (selectedAnswer === answer) {
            buttonClass += " selected";
          }

          return (
            <button
              key={i}
              className={buttonClass}
              onClick={() => {
                if (!isSubmitted) {
                  onSelectAnswer(answer);
                }
              }}
              dangerouslySetInnerHTML={{ __html: answer }}
              disabled={isSubmitted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
