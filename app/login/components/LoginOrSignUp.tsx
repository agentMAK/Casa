"use client";

import { Box, Text, Input, InputGroup, InputLeftAddon, Heading, Flex } from "@chakra-ui/react";
import { LoginCardsType } from "../page";

import { Button } from "../../components/Button";
import { Bold } from "@/app/components/Bold";

type LoginOrSignUpType = {
  setCurrentCard: (card: keyof LoginCardsType) => void;
};

const LoginOrSignUp = ({ setCurrentCard }: LoginOrSignUpType) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'} >
      <Text
        fontWeight={"medium"}
        mb={"50px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
        Your <Bold fontWeight={'900'} color={"#44E9AD"}>digital home</Bold> for <br /> on-chain music
      </Text>
      <Button
        variant={"dark"}
        onClick={() => setCurrentCard("sign-up")}
        mb={"10px"}
      >
        Get Started
      </Button>
      <Text variant={"clear"} onClick={() => setCurrentCard("login")} fontWeight={'medium'}>
        Login
      </Text>
    </Flex>
  );
};

export default LoginOrSignUp;
