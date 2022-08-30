import { Button } from "@chakra-ui/react";

type ButtonWrapperProps = {
  children: React.ReactNode;
  correct: boolean;
  userClicked: boolean;
  disabled: boolean;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  children,
  correct,
  userClicked,
  disabled,
  value,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      value={value}
      isDisabled={disabled}
      transition="all 0.3s ease"
      _hover={{
        opacity: "0.8",
      }}
      cursor="pointer"
      userSelect="none"
      fontSize="0.8rem"
      w="100%"
      h="40px"
      margin="5px 0"
      background={
        correct
          ? "linear-gradient(90deg, #56FFA4, #59BC86)"
          : !correct && userClicked
          ? "linear-gradient(90deg, #FF5656, #C16868)"
          : "linear-gradient(90deg, #56ccff, #6eafb4)"
      }
      border="3px solid #ffffff"
      boxShadow="1px 2px 0px rgba(0, 0, 0, 0.1)"
      borderRadius="10px"
      color="#fff"
      textShadow="0px 1px 0px rgba(0, 0, 0, 0.25)"
    >
      {children}
    </Button>
  );
};
