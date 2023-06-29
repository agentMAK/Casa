"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

export type SignUpCardsType = {
  "create-profile": JSX.Element;
  "add-photo": JSX.Element;
};

import CreateProfile from "./components/CreateProfile";
import AddPhoto from "./components/AddPhoto";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentCard, setCurrentCard] =
    useState<keyof SignUpCardsType>("create-profile");

  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const [username, setUsername] = useState<string>("martin0044");
  const [firstName, setFirstName] = useState<string>("Martin");
  const [lastName, setLastName] = useState<string>("Kabyemela");

  const handleSubmit = async () => {
    const { data: { session }, error:sessionError } = await supabase.auth.getSession()
    const { status, error }  = await supabase
      .from("profiles")
      .insert({ user_id:session?.user.id as string, first_name:firstName,last_name:lastName,username:username });
    console.log(status)
    if(status === 201) {
      router.push(`/profile/${username}`)
    }
  };

  const signUpCards: SignUpCardsType = {
    "create-profile": (
      <CreateProfile
        setCurrentCard={setCurrentCard}
        firstName={firstName}
        lastName={lastName}
        username={username}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setUsername={setUsername}
      />
    ),
    "add-photo": (
      <AddPhoto setCurrentCard={setCurrentCard} handleSubmit={handleSubmit} />
    ),
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
      <Box marginX={"50px"}>{signUpCards[currentCard]}</Box>
    </Flex>
  );
}
