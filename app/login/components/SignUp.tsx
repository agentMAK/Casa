"use client";

import { Box, Text, Image, FormControl, Flex, } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { Button } from "@/app/components/Button";
import { FormLabel } from "@/app/components/FormLabel";
import { Input } from "@/app/components/Input";
import { LoginCardsType } from "../page";

type SignUpType = {
  setEmail: (value: string) => void;
  setCurrentCard: (card: keyof LoginCardsType) => void;
};

const SignUp = ({ setEmail, setCurrentCard }: SignUpType) => {
  const supabase = createClientComponentClient<Database>();

  const handleSignInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Box mb={"50px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"24px"}
          textAlign={"center"}
        >
          Let&apos;s get you signed up 🥳
        </Text>
        <Text fontSize={"14px"} textAlign={"center"}>
        No spam, our promise 🤝
      </Text>
      </Box>
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input
          // onChange={(e: any) => setFirstName(e.target.value)}
          // value={firstName}
          mb={"25px"}
        />
      </FormControl>
      <Button onClick={() => setCurrentCard("enter-code")}>
          Continue
        </Button>
    </Flex>
  );
};

export default SignUp;
