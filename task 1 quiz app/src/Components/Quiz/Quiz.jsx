import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "./data";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];
  const question = data[currentQuestionIndex];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const resetStyles = () => {
    option_array.forEach((option) => {
      if (option.current) {
        option.current.classList.remove("correct", "wrong");
      }
    });
    setLock(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      resetStyles();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setResult(true);
    }
  };

  const playAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setResult(false);
    resetStyles();
  };

  return (
    <div className="container">
      <h1>Simple Quiz</h1>
      {result ? (
        <div className="result-page">
          <p  className="score-text">
            Your Score: {score} Out of{data.length}!
          </p>
          <button onClick={playAgain}>Play Again</button>
        </div>
      ) : (
        <div className="content">
          <h2>{question.question}</h2>
          <ul>
            <li
              ref={Option1}
              onMouseEnter={(e) => e.target.classList.add("hover")}
              onMouseLeave={(e) => e.target.classList.remove("hover")}
              onClick={(e) => checkAns(e, 1)}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onMouseEnter={(e) => e.target.classList.add("hover")}
              onMouseLeave={(e) => e.target.classList.remove("hover")}
              onClick={(e) => checkAns(e, 2)}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onMouseEnter={(e) => e.target.classList.add("hover")}
              onMouseLeave={(e) => e.target.classList.remove("hover")}
              onClick={(e) => checkAns(e, 3)}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onMouseEnter={(e) => e.target.classList.add("hover")}
              onMouseLeave={(e) => e.target.classList.remove("hover")}
              onClick={(e) => checkAns(e, 4)}
            >
              {question.option4}
            </li>
          </ul>
          {lock && <button onClick={nextQuestion}>Next</button>}
        </div>
      )}
    </div>
  );
};

export default Quiz;
