"use client";

import { Box, Text, FormControl, Flex } from "@chakra-ui/react";
import { SignUpCardsType } from "../page";
import { Input } from "../../components/Input";
import { FormLabel } from "../../components/FormLabel";
import { Button } from "@/app/components/Button";

type UsernameType = {
  setCurrentCard: (card: keyof SignUpCardsType) => void;
  setUsername: (username: string) => void;
  username: string;
};

const Username = ({
  setCurrentCard,
  setUsername,
  username,
}: UsernameType) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Box mb={"32px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"24px"}
          textAlign={"center"}
        >
         Choose a username
        </Text>
        {/* <Text fontSize={"12px"} textAlign={"center"} mx={"10px"}>
          People use real names on Casa
        </Text> */}
      </Box>

      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          onChange={(e: any) => setUsername(e.target.value)}
          value={username}
          mb={"32px"}
        />
      </FormControl>
      <Button onClick={() => setCurrentCard("add-photo")}>
          Continue
        </Button>
    </Flex>
  );
};

export default Username;
