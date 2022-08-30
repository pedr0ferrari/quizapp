import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AnswerObject } from "../App";
import { ButtonWrapper } from "./ButtonWrapper";
import { Wrapper } from "./Wrapper";

interface QuestionCardProps {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <Text fontWeight="medium" fontSize="lg" marginBottom={2}>
        Question: {questionNr} / {totalQuestions}
      </Text>
      <Text
        dangerouslySetInnerHTML={{ __html: question }}
        fontSize="lg"
        marginBottom="2"
      ></Text>

      {answers.map((answer) => (
        <Flex key={answer}>
          <ButtonWrapper
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <Text
              fontSize="md"
              as="span"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </ButtonWrapper>
        </Flex>
      ))}
    </Wrapper>
  );
};

export default QuestionCard;
