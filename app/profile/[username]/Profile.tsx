"use client";

import { Button } from "@/app/components/Button";
import { Database } from "@/types/supabase";
import {
  Box,
  Flex,
  Text,
  Image,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
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
  nfts: any[];
};

export default function Profile({ profile, session, nfts }: ProfileType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    // <Box backgroundColor={'black'} color={'white'}>
    // <Box backgroundColor={'#43324E'} color={'#E17E65'}>
    <Box>
      {/* <Flex
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
      </Flex> */}
      <Flex
        flexDirection={"column"}
        maxWidth={"524px"}
        margin={"auto"}
        minHeight={"100vh"}
        paddingBottom={"50px"}
        paddingX={"24px"}
        paddingTop={"32px"}
      >
        <Box mb={"24px"}>
          <Image
            src={avatar.publicUrl}
            boxSize={"88px"}
            alt={"profile-picture"}
            borderRadius={"88px"}
            mb={"12px"}
          />
          <Box>
            <Text fontSize={"18px"} fontWeight={"semibold"}>
              {profile.first_name} {profile.last_name}{" "}
            </Text>
            <Text fontSize={"14px"} mb={"12px"}>
              @{profile.username}
            </Text>
            <Text fontSize={"14px"}>
              writer, designer, and occasional model
            </Text>
          </Box>
        </Box>

        <Flex flexDirection={"column"} gap={"24px"}>
        {nfts.map((nft, index) => {
              if (index === 5) {
                return (
                  <Image
                    key={index}
                    src={nft.media.gateway}
                    alt={"nft"}
                    borderRadius={"24px"}
                  />
                );
              }
            })}
          <SimpleGrid columns={2} spacing={"16px"}>
            {nfts.map((nft, index) => {
              if (index < 4) {
                return (
                  <Image
                    key={index}
                    src={nft.media.gateway}
                    alt={"nft"}
                    borderRadius={"24px"}
                  />
                );
              }
            })}
          </SimpleGrid>
          {nfts.map((nft, index) => {
            return (
              <Image
                key={index}
                src={nft.media.gateway}
                alt={"nft"}
                borderRadius={"24px"}
              />
            );
          })}
        </Flex>
      </Flex>
      {session && (
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
        </Button>
      )}
      <AddNftModal
        onClose={onClose}
        isOpen={isOpen}
        address={profile.linked_wallet_address as string}
      />
    </Box>
  );
}
