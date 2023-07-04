"use client";

import {
  Box,
  Text,
  Image,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { Button } from "@/app/components/Button";

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
        {/* <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
        No spam, our promise 🤝
      </Text> */}
      </Box>
      {/* <FormControl mb="10px">
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
      </FormControl> */}
      <Button variant={"clear"} width={"100%"} onClick={handleSignInGoogle}>
        <Image
          src={"/images/google.svg"}
          alt={"Google"}
          height={"20px"}
          mr={"10px"}
        />
        Continue with Google
      </Button>
      {/* <Button width={"100%"} onClick={() => setCurrentCard("enter-code")}>
        Continue
      </Button> */}
    </Box>
  );
};

export default Login;
