"use client";

import {
  Box,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { LoginCardsType } from "../page";

type LoginOrSignUpType = {
  setCurrentCard: (card: keyof LoginCardsType) => void;
};

const LoginOrSignUp = ({ setCurrentCard }: LoginOrSignUpType) => {
  return (
    <Box>
      <Text
        fontWeight={"medium"}
        mb={"5px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
        Your digital home on the internet
      </Text>
      <Button
        width={"100%"}
        onClick={() => setCurrentCard("sign-up")}
        mb={"5px"}
      >
        Get Started
      </Button>
      <Button width={"100%"} onClick={() => setCurrentCard("login")} mb={"5px"}>
        Login
      </Button>
    </Box>
  );
};

export default LoginOrSignUp;
