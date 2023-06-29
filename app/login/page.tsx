"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type LoginCardsType = {
  "login-or-signup": JSX.Element;
  "sign-up": JSX.Element;
  "enter-code": JSX.Element;
  login: JSX.Element;
};

import LoginOrSignUp from "./components/LoginOrSignUp";
import EnterCode from "./components/EnterCode";
import SignUp from "./components/SignUp";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import Login from "./components/Login";

export default function Home() {
  const [currentCard, setCurrentCard] =
    useState<keyof LoginCardsType>("login-or-signup");

  const supabase = createClientComponentClient<Database>();
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log(event, session);
        router.refresh();
      }
    });
  }, [router, supabase.auth]);

  const handleSubmit = async () => {};

  const loginCards: LoginCardsType = {
    "login-or-signup": <LoginOrSignUp setCurrentCard={setCurrentCard} />,
    login: <Login setEmail={setEmail} />,
    "enter-code": <EnterCode setCurrentCard={setCurrentCard} />,
    "sign-up": <SignUp setEmail={setEmail} />,
  };

  return (
    <Flex
      mt={"50px"}
      justifyContent={"center"}
      flexDirection={"column"}
      maxWidth={"400px"}
      margin={"auto"}
      height={"100vh"}
    >
      <Box marginX={"50px"}>{loginCards[currentCard]}</Box>
    </Flex>
  );
}
