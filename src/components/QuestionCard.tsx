import { Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { AnswerObject } from "../App";

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
    <Flex>
      <Text>
        Question: {questionNr} / {totalQuestions}
      </Text>
      <Text dangerouslySetInnerHTML={{ __html: question }}></Text>
      <Text>
        {answers.map((answer) => (
          <Flex key={answer}>
            <Button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            />
            <Text as="span" dangerouslySetInnerHTML={{ __html: answer }} />
          </Flex>
        ))}
      </Text>
    </Flex>
  );
};

export default QuestionCard;
