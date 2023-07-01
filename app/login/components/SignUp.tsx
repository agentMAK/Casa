"use client";

import {
  Box,
  Text,
  Input,
  FormControl,
  Image,
  FormLabel,
} from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { LoginCardsType } from "../page";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { Icon, createIcon } from '@chakra-ui/react'

type SignUpType = {
  setEmail: (value: string) => void;
};

const SignUp = ({ setEmail }: SignUpType) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      }
    });
  };



  return (
    <Box>
      <Box mb={'32px'}>
      <Text
        fontWeight={"medium"}
        mb={"5px"}
        fontSize={"28px"}
        textAlign={"center"}
      >
        Join us 🥳
      </Text>
      {/* <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
        No spam, our promise 🤝
      </Text> */}
      </Box>
      {/* <FormControl mb="10px">
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
      </FormControl> */}
      <Button variant={'clear'} width={"100%"} onClick={handleSignInGoogle}><Image src={'/images/google.svg'} alt={'Google'} height={'20px'} mr={'10px'} />Continue with Google</Button>
      {/* <Button width={"100%"} onClick={() => setCurrentCard("enter-code")}>
        Continue
      </Button> */}
    </Box>
  );
};

export default SignUp;
