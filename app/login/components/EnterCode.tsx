"use client";

import {
  Box,
  Text,
  FormControl,
  Link,
  Flex,
} from "@chakra-ui/react";
import { LoginCardsType } from "../page";
import { FormLabel } from "@/app/components/FormLabel";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";

type EnterCodeType = {
  setCurrentCard: (card: keyof LoginCardsType) => void;
};

const EnterCode = ({ setCurrentCard }: EnterCodeType) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Text
        fontWeight={"medium"}
        mb={"50px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
        Enter the code we just texted you
      </Text>
      {/* <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
        We sent you a temporary login code.
        <br />
        Please check your inbox.
      </Text> */}
      <FormControl mb="25px">
        <FormLabel>Login Code</FormLabel>
        <Input placeholder="Paste login code" mb={'2px'}/>
        <Text fontSize={'11px'} textAlign={'center'}>Didn&apos;t get it? <Link as={'span'} fontWeight={'medium'}>Tap to resend</Link></Text>
      </FormControl>
      <Button onClick={() => {}}>
        Continue
      </Button>
    </Flex>
  );
};

export default EnterCode;
