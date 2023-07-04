"use client";

import { Box, Text, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { LoginCardsType } from "../page";

import { Button } from "../../components/Button";

type LoginOrSignUpType = {
  setCurrentCard: (card: keyof LoginCardsType) => void;
};

const LoginOrSignUp = ({ setCurrentCard }: LoginOrSignUpType) => {
  return (
    <Box>
      <Text
        fontWeight={"medium"}
        mb={"50px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
        Your digital home on the internet
      </Text>
      <Button
        variant={"dark"}
        onClick={() => setCurrentCard("sign-up")}
        mb={"10px"}
      >
        Get Started
      </Button>
      <Button variant={"clear"} onClick={() => setCurrentCard("login")}>
        Login
      </Button>
    </Box>
  );
};

export default LoginOrSignUp;
