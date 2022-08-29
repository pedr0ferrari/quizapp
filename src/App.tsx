import * as React from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import QuestionCard from "./components/QuestionCard";
import { useState } from "react";
import fetchQuizQuestions from "./API";
import { QuestionState, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setgameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      //save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setgameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <Heading>quiz app</Heading>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <Button id="start" onClick={startTrivia}>
          start
        </Button>
      ) : null}
      {!gameOver ? <Text>Score: {score}</Text> : null}
      {loading ? <Text>Loading questions...</Text> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <Button id="next" onClick={nextQuestion}>
          Next Question
        </Button>
      ) : null}
    </>
  );
};

export default App;
