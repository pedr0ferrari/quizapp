import * as React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
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
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);
  const toast = useToast();

  const startTrivia = async () => {
    try {
      setLoading(true);
      setgameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setQuestionNumber(0);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! An error has happened...",
        status: "error",
        description: `Error: ${error.message}`,
      });
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[questionNumber].correct_answer === answer;
      //add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      //save answer in the array for user answers
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //move on to the next question if not the last question
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setgameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };

  return (
    <>
      <Container
        centerContent
        background="#99ccdd"
        minWidth="100%"
        minHeight="100vh"
      >
        <Heading
          padding={6}
          size="2xl"
          color="white"
          textShadow="2px 2px 1px #000000"
        >
          quiz app
        </Heading>
        <Flex
          as="section"
          minHeight="max-content"
          width="100px"
          marginBottom="4"
          direction="column"
          align="center"
        >
          {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
            <Button
              id="start"
              onClick={startTrivia}
              backgroundColor="white"
              background="#ebfeff"
              borderRadius="10px"
              border="2px solid #0085a3"
              boxShadow="0px 5px 10px rgba(0, 0, 0, 0.25)"
              margin={2}
              minHeight="50px"
              minWidth="100%"
              fontSize="lg"
              fontWeight="medium"
            >
              start
            </Button>
          ) : null}
          {!gameOver ? (
            <Text
              margin={2}
              fontWeight="medium"
              fontSize="lg"
              background="#ebfeff"
              borderRadius="10px"
              border="2px solid #0085a3"
              boxShadow="0px 5px 10px rgba(0, 0, 0, 0.25)"
              minHeight="50px"
              minWidth="100%"
              display="grid"
              placeItems="center"
            >
              Score: {score}
            </Text>
          ) : null}
        </Flex>
        {loading ? <Text>Loading questions...</Text> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswer ? userAnswer[questionNumber] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswer.length === questionNumber + 1 &&
        questionNumber !== TOTAL_QUESTIONS - 1 ? (
          <Button
            id="next"
            onClick={nextQuestion}
            backgroundColor="white"
            margin={6}
            background="#ebfeff"
            borderRadius="10px"
            border="2px solid #0085a3"
            boxShadow="0px 5px 10px rgba(0, 0, 0, 0.25)"
          >
            Next Question
          </Button>
        ) : null}
      </Container>
    </>
  );
};

export default App;
