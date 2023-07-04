"use client";

import { Database } from "@/types/supabase";
import { Button, Flex, Text } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    console.log(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log(data);
  };

  const getProfile = async () => {
    const { data, error } = await supabase.from("profiles").select();
    console.log(data);
  };

  return (
    <Flex
      mt={"50px"}
      textAlign={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Text>hello World</Text>
      <Button onClick={handleSignIn}>Sign in with Google</Button>
      <Button onClick={handleSignOut}>Sign out</Button>
      <Button onClick={handleSession}>Get Session</Button>
      <Button onClick={getProfile}>Get Profile</Button>
    </Flex>
  );
}
