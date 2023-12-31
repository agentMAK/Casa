"use client";

import { Box, Text, FormControl, Flex } from "@chakra-ui/react";
import { SignUpCardsType } from "../page";
import { Input } from "../../components/Input";
import { FormLabel } from "../../components/FormLabel";
import { Button } from "@/app/components/Button";

type CreateProfileType = {
  setCurrentCard: (card: keyof SignUpCardsType) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  firstName: string;
  lastName: string;
};

const CreateProfile = ({
  setCurrentCard,
  setFirstName,
  setLastName,
  firstName,
  lastName,
}: CreateProfileType) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Box mb={"32px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"24px"}
          textAlign={"center"}
        >
          What&apos;s your full name?
        </Text>
        <Text fontSize={"12px"} textAlign={"center"} mx={"10px"}>
          People use real names on Casa
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
      </FormControl>
      <Button onClick={() => setCurrentCard("username")}>
          Continue
        </Button>
    </Flex>
  );
};

export default CreateProfile;
