"use client";

import {
  Box,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { LoginCardsType } from "../page";
import { useRouter } from "next/navigation";

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
        redirectTo: `${location.origin}/join`,
      },
    });
  };

  return (
    <Box>
      {/* <Text
        fontWeight={"medium"}
        mb={"5px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
        What&apos;s your email?
      </Text>
      <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
        No spam, our promise 🤝
      </Text> */}
      {/* <FormControl mb="10px">
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
      </FormControl> */}
      <Button width={"100%"} onClick={handleSignInGoogle}>Continue with Google</Button>
      {/* <Button width={"100%"} onClick={() => setCurrentCard("enter-code")}>
        Continue
      </Button> */}
    </Box>
  );
};

export default SignUp;
