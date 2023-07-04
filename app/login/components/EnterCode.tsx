"use client";

import {
  Box,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { LoginCardsType } from "../page";

type EnterCodeType = {
  setCurrentCard: (card: keyof LoginCardsType) => void;
};

const EnterCode = ({ setCurrentCard }: EnterCodeType) => {
  return (
    <Box>
      <Text
        fontWeight={"medium"}
        mb={"5px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
        What&apos;s your code?
      </Text>
      <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
        We sent you a temporary login code.
        <br />
        Please check your inbox.
      </Text>
      <FormControl mb="10px">
        <FormLabel>Login Code</FormLabel>
        <Input placeholder="Paste login code" />
      </FormControl>
      <Button width={"100%"} onClick={() => {}}>
        Continue
      </Button>
    </Box>
  );
};

export default EnterCode;
