import { useState } from "react";
import questions from "../questions";
import Score from "./Score";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

function Questionpart() {
  const [questionNumber, setNumber] = useState(0);
  const [isFinishQuiz, setFinishQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  function handleClick(isCorrect) {
    if (isCorrect === true) {
      setScore(score + 1);
    }
    setShowAnswers(true);
  }

  function playPre() {
    if (questionNumber === 0) {
      setNumber(0);
      setShowAnswers(false);
    } else if (questionNumber < questions.length) {
      setNumber(questionNumber - 1);
      setShowAnswers(true);
    }
  }

  function playNext() {
    if (showAnswers) {
      if (questionNumber < questions.length - 1) {
        setNumber(questionNumber + 1);
        setShowAnswers(false);
      } else {
        setFinishQuiz(true);
        setShowAnswers(false);
      }
    }
  }

  return (
    <>
      {isFinishQuiz ? (
        <Score point={score} />
      ) : (
        <>
          <div className="questionspart">
            <h1 className="questionnumber">
              Question {questionNumber + 1}/{questions.length}
            </h1>
            <p className="question">{questions[questionNumber].question}</p>
          </div>
          <div className="answerpart">
            {questions[questionNumber].answeroptions.map((item, index) => {
              const specialClassName = showAnswers
                ? item.isCorrect
                  ? "correctanswer"
                  : "wronganswer"
                : "";
              return (
                <button
                  key={index}
                  id={index}
                  className={`button ${specialClassName}`}
                  onClick={() => {
                    handleClick(item.isCorrect);
                  }}
                >
                  {item.answerText}
                </button>
              );
            })}
          </div>
          <>
            <MobileStepper
              variant="dots"
              steps={6}
              position="static"
              activeStep={questionNumber}
              sx={{ maxWidth: 500, flexGrow: 1 }}
              nextButton={
                <Button size="small" onClick={playNext}>
                  Next
                </Button>
              }
              backButton={
                <Button size="small" onClick={playPre}>
                  Back
                </Button>
              }
            />
          </>
        </>
      )}
    </>
  );
}

export default Questionpart;
