import React from "react";
import { Container } from "@chakra-ui/react";

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container
      maxWidth="md"
      background="#ebfeff"
      borderRadius="10px"
      border="2px solid #0085a3"
      padding="7"
      boxShadow="0px 5px 10px rgba(0, 0, 0, 0.25)"
      textAlign="center"
    >
      {children}
    </Container>
  );
};
