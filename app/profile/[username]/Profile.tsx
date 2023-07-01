"use client";

import { Button } from "@/app/components/Button";
import { Database } from "@/types/supabase";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type ProfileType = {
  profile: Profile | undefined;
  session: Session | null;
};

export default function Profile({ profile, session }: ProfileType) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (profile === undefined) {
    return <Box>User Not Found</Box>;
  }

  return (
    <Flex
      flexDirection={"column"}
      maxWidth={"400px"}
      margin={"auto"}
      height={"100vh"}
    >
      <Flex flexDirection={'column'} marginX={"50px"} mt={"50px"} gap={'10px'}>
        <Box paddingTop={'36px'} paddingBottom={'16px'} mb={'10px'}>
          <Image
            src={"/images/profile.jpg"}
            boxSize={"115px"}
            alt={"profile-picture"}
            marginX={"auto"}
            borderRadius={'115px'}
            mb={'8px'}
          />
          <Box textAlign={'center'}>
            <Text fontSize={'32px'} fontWeight={'semibold'}>{profile.first_name} {profile.last_name[0]} </Text>
            <Text fontSize={'14px'}>@{profile.username}</Text>
          </Box>
        </Box>
        <Box textAlign={'center'} fontSize={'24px'} fontWeight={'medium'}>
          <Text>Welcome to your new</Text>
          <Text>digital home</Text>
        </Box>
        {/* <Box mb={"50px"}>
          <Text>Username: {profile.username} </Text>
          <Text>First Name: {profile.first_name} </Text>
          <Text>Last Name: {profile.last_name} </Text>
          <Text>id: {profile.user_id} </Text>
        </Box> */}
        <Box mt={'300px'}>
          <Text>
            {session ? `Logged in as:${session.user.email}` : "Signed out"}
          </Text>
          {session ? (
            <Button width={"100%"} onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button width={"100%"} onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
