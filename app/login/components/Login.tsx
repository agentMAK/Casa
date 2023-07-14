"use client";

import {
  Box,
  Text,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

type LoginType = {
  setEmail: (value: string) => void;
};

const Login = ({ setEmail }: LoginType) => {
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
    <Box>
      <Box mb={"20px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"20px"}
          textAlign={"center"}
        >
          Join us 🥳
        </Text>
        <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
        No spam, our promise 🤝
      </Text>
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input
          // onChange={(e: any) => setFirstName(e.target.value)}
          // value={firstName}
          // mb={"16px"}
        />
        {/* <Button width={"100%"} onClick={() => setCurrentCard("add-photo")}>
          Continue
        </Button> */}
      </FormControl>
      </Box>
      {/* <Button width={"100%"} onClick={() => setCurrentCard("enter-code")}>
        Continue
      </Button> */}
    </Box>
  );
};

export default Login;
