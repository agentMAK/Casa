"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

export type SignUpCardsType = {
  "create-profile": JSX.Element;
  "add-photo":JSX.Element;
};

import CreateProfile from "./components/CreateProfile";
import AddPhoto from "./components/AddPhoto";

export default function Home() {
  const [currentCard, setCurrentCard] =
    useState<keyof SignUpCardsType>("create-profile");

  const [username, setUsername] = useState<string>("");
  const [firstName,setFirstName] = useState<string>("");
  const [lastName,setLastName] = useState<string>("");

  const handleSubmit = async () => {
  };

  const signUpCards: SignUpCardsType = {
    "create-profile": (
      <CreateProfile
        setCurrentCard={setCurrentCard}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setUsername={setUsername}

      />
    ),
    "add-photo": (<AddPhoto setCurrentCard={setCurrentCard} handleSubmit={handleSubmit} />)
  };

  return (
    <Flex
      mt={"50px"}
      justifyContent={"center"}
      flexDirection={"column"}
      maxWidth={"400px"}
      margin={"auto"}
      height={"100vh"}
    >
      <Box marginX={"50px"}>{signUpCards[currentCard]}</Box>
    </Flex>
  );
}
