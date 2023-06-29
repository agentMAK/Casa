"use client";

import {
  Box,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { SignUpCardsType } from "../page";

type CreateProfileType = {
  setCurrentCard: (card: keyof SignUpCardsType) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setUsername: (username: string) => void;
};

const CreateProfile = ({
  setCurrentCard,
  setFirstName,
  setLastName,
  setUsername,
}: CreateProfileType) => {
  return (
    <Box>
      <Text
        fontWeight={"medium"}
        mb={"5px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
        Let&apos;s get personal
      </Text>

      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input onChange={(e) => setFirstName(e.target.value)} />
        <FormLabel>Last Name</FormLabel>
        <Input onChange={(e) => setLastName(e.target.value)} />
        <FormLabel>Claim username</FormLabel>
        <Input mb={"5px"} onChange={(e) => setUsername(e.target.value)} />
        <Button width={"100%"} onClick={() => setCurrentCard("add-photo")}>
          Continue
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateProfile;
