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
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

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

  const { data: avatar } = supabase.storage
    .from("profiles")
    .getPublicUrl(profile?.avatar_path);

  return (
    // <Box backgroundColor={'#43324E'} color={'#E17E65'}>
    <Box>
      <Flex
        paddingY={"20px"}
        width={"100%"}
        justifyContent={"space-between"}
        paddingX={"50px"}
        alignItems={"center"}
      >
        <Text>Campfire</Text>
        {session ? (
          <Button
            width={"fit-content"}
            padding={"8px 16px"}
            fontSize={"14px"}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            width={"fit-content"}
            padding={"8px 16px"}
            fontSize={"14px"}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}
      </Flex>
      <Flex
        flexDirection={"column"}
        maxWidth={"500px"}
        margin={"auto"}
        minHeight={"100vh"}
      >
        <Flex flexDirection={"column"} mt={"50px"} gap={"10px"}>
          <Box paddingTop={"36px"} paddingBottom={"16px"} mb={"10px"}>
            <Image
              src={avatar.publicUrl}
              boxSize={"115px"}
              alt={"profile-picture"}
              marginX={"auto"}
              borderRadius={"115px"}
              mb={"10px"}
            />
            <Box textAlign={"center"}>
              <Text fontSize={"18px"} fontWeight={"semibold"}>
                {profile.first_name} {profile.last_name}{" "}
              </Text>
              <Text fontSize={"14px"}>@{profile.username}</Text>
            </Box>
          </Box>
          {/* <Box textAlign={"center"} fontSize={"24px"} fontWeight={"medium"}>
            <Text>Welcome to your new</Text>
            <Text >digital home</Text>
          </Box> */}
          {/* <Image src={'/images/purple.png'} alt={'nft'} />
          <Image src={'/images/turk.png'} alt={'nft'} /> */}
          {/* <Box mb={"50px"}>
          <Text>Username: {profile.username} </Text>
          <Text>First Name: {profile.first_name} </Text>
          <Text>Last Name: {profile.last_name} </Text>
          <Text>id: {profile.user_id} </Text>
        </Box> */}
        </Flex>
      </Flex>
      <Button
        position={"fixed"}
        bottom={"40px"}
        left={"50%"}
        ml={"-52.5px"}
        width={"fit-content"}
        padding={"10px 20px"}
      >
        Add NFT
      </Button>
    </Box>
  );
}
function useState<T>(url: any): [any, any] {
  throw new Error("Function not implemented.");
}

function useEffect(arg0: () => void, arg1: any[]) {
  throw new Error("Function not implemented.");
}
