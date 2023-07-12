"use client";

import { Button } from "@/app/components/Button";
import { Database } from "@/types/supabase";
import { Box, Flex, Text, Image, useDisclosure, } from "@chakra-ui/react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { AddNftModal } from "./components/AddNftModal";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

type ProfileType = {
  profile: Profiles | undefined;
  session: Session | null;
  nfts:any[]
};

export default function Profile({ profile, session, nfts }: ProfileType) {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    .getPublicUrl(profile?.avatar_path as string);

  return (
    // <Box backgroundColor={'#43324E'} color={'#E17E65'}>
     <Box>
      <Flex
        height={'50px'}
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
        paddingBottom={'50px'}
      >
        <Flex flexDirection={"column"} gap={"10px"}>
          <Box paddingTop={"10px"} paddingBottom={"16px"} mb={"10px"}>
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
          {
            nfts.map((nft,index) => {
               return <Image key={index} src={nft.media.gateway} alt={'nft'} borderRadius={'16px'} />
            })

          }
        </Flex>
      </Flex>
      {session &&
      <Button
        position={"fixed"}
        bottom={"40px"}
        left={"50%"}
        ml={"-52.5px"}
        width={"fit-content"}
        padding={"10px 20px"}
        onClick={onOpen}
      >
        Add NFT
      </Button>}
      <AddNftModal onClose={onClose} isOpen={isOpen} address={profile.linked_wallet_address as string}/>
    </Box>
  );
}