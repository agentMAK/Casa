"use client";

import { Box, Text, FormControl } from "@chakra-ui/react";
import { SignUpCardsType } from "../page";
import { Input } from "../../components/Input";
import { FormLabel } from "../../components/FormLabel";
import { Button } from "@/app/components/Button";

type CreateProfileType = {
  setCurrentCard: (card: keyof SignUpCardsType) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setUsername: (username: string) => void;
  firstName: string;
  lastName: string;
  username: string;
};

const CreateProfile = ({
  setCurrentCard,
  setFirstName,
  setLastName,
  setUsername,
  firstName,
  lastName,
  username,
}: CreateProfileType) => {
  return (
    <Box>
      <Box mb={"32px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"28px"}
          textAlign={"center"}
        >
          Let&apos;s get personal
        </Text>
        <Text fontSize={"14px"} textAlign={"center"} mx={"10px"}>
          This is a opportunity to authentically express you
        </Text>
      </Box>

      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input
          onChange={(e: any) => setFirstName(e.target.value)}
          value={firstName}
          mb={"16px"}
        />
        <FormLabel>Last Name</FormLabel>
        <Input
          onChange={(e: any) => setLastName(e.target.value)}
          value={lastName}
          mb={"32px"}
        />
        <FormLabel>Claim username</FormLabel>
        <Input
          onChange={(e: any) => setUsername(e.target.value)}
          value={username}
          mb={"32px"}
        />
        <Button width={"100%"} onClick={() => setCurrentCard("add-photo")}>
          Continue
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateProfile;
