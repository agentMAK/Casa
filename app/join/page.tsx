"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type SignUpCardsType = {
  "create-profile": JSX.Element;
  "add-photo": JSX.Element;
};

import CreateProfile from "./components/CreateProfile";
import AddPhoto from "./components/AddPhoto";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentCard, setCurrentCard] =
    useState<keyof SignUpCardsType>("create-profile");

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  const [username, setUsername] = useState<string>("martinkaby");
  const [firstName, setFirstName] = useState<string>("Martin");
  const [lastName, setLastName] = useState<string>("K");
  const [avatarPath, setAvatarPath] = useState<string>("");

  useEffect(() => {
    async function getSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(data.session);
      } catch (error) {
        console.log("Error loading session: ", error);
      }
    }
    getSession();
  }, [supabase.auth]);

  const handleSubmit = async () => {
    const { status, error } = await supabase
      .from("profiles")
      .insert({
        user_id: session?.user.id as string,
        first_name: firstName,
        last_name: lastName,
        username: username,
        avatar_path: avatarPath,
      });
    console.log(status);
    if (status === 201) {
      router.push(`/profile/${username}`);
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
      <AddPhoto
        handleSubmit={handleSubmit}
        uid={session?.user.id}
        avatarPath={avatarPath}
        setAvatarPath={setAvatarPath}
      />
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
