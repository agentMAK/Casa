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
  Icon,
} from "@chakra-ui/react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { AddNftModal } from "./components/AddNftModal";
import { Bold } from "@/app/components/Bold";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { MdEdit } from "react-icons/Md";
import { useState } from "react";

type ProfileType = {
  profile: Profiles | undefined;
  session: Session | null;
  nfts: any[];
};

export default function Profile({ profile, session, nfts }: ProfileType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);

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
      <Flex
        flexDirection={"column"}
        // maxWidth={"524px"}
        maxWidth={"800px"}
        margin={"auto"}
        minHeight={"100vh"}
        paddingBottom={"75px"}
        paddingX={["10px", "10px", "0px", "0px"]}
        paddingTop={"32px"}
        alignItems={"center"}
      >
        <Box mb={"24px"} alignSelf={"flex-start"}>
          <Image
            src={avatar.publicUrl}
            boxSize={"88px"}
            alt={"profile-picture"}
            borderRadius={"88px"}
            mb={"12px"}
          />
          <Box>
            <Bold fontSize={"18px"}>
              {profile.first_name} {profile.last_name}{" "}
            </Bold>
            <Text fontSize={"14px"} mb={"12px"}>
              @{profile.username}
            </Text>
            {/* <Text fontSize={"14px"}>
              writer, designer, and occasional model
            </Text> */}
          </Box>
        </Box>
        {session && nfts.length === 0 && (
          <Box
            padding={"20px"}
            borderRadius={"16px"}
            border={"1px solid #e6e6e6"}
            width={"400px"}
            position={"fixed"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
          >
            <Text fontWeight={"medium"} mb={"10px"}>
              Welcome to your digital home
            </Text>
            <Text mb={"10px"}>
              Let&apos;s start adding on-chain nfts to spice up your profile
              🌶️️️🌶️️️🌶️️️
            </Text>
            <Button variant={"clear"} onClick={onOpen}>
              Add
            </Button>
          </Box>
        )}

        <SimpleGrid
          columns={2}
          spacingX={["10px", "10px", "24px", "24px"]}
          spacingY={["10px", "10px", "24px", "24px"]}
        >
          {nfts.map((nft, index) => {
            return (
              <Image
                key={index}
                src={nft.media.gateway}
                alt={"nft"}
                borderRadius={"12px"}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
      <Flex
        paddingY="75px"
        backgroundColor={"#F5F5F5"}
        justifyContent={"center"}
      >
        <Text>Casa</Text>
      </Flex>
      {editMode && (
        <Button
          position={"fixed"}
          bottom={"40px"}
          left={"50%"}
          transform={"translate(0%, -50%%)"}
          ml={"-52.5px"}
          width={"fit-content"}
          fontWeight={"medium"}
          onClick={onOpen}
          boxShadow={"sm"}
        >
          Add NFT
        </Button>
      )}
      {session &&
        nfts.length > 0 &&
        (editMode ? (
          <Button
            position={"fixed"}
            bottom={"20px"}
            left={"20px"}
            width={"fit-content"}
            height={"fit-content"}
            onClick={() => setEditMode(!editMode)}
            variant={"clear"}
            leftIcon={<Icon as={MdEdit} boxSize={"16px"} />}
            fontSize={"14px"}
            boxShadow={"sm"}
          >
            Exit
          </Button>
        ) : (
          <Button
            position={"fixed"}
            bottom={"20px"}
            left={"20px"}
            width={"fit-content"}
            height={"fit-content"}
            onClick={() => setEditMode(!editMode)}
            variant={"clear"}
            leftIcon={<Icon as={MdEdit} boxSize={"16px"} />}
            fontSize={"14px"}
            boxShadow={"sm"}
          >
            Edit Profile
          </Button>
        ))}
      <AddNftModal
        onClose={onClose}
        isOpen={isOpen}
        address={profile.linked_wallet_address as string}
      />
    </Box>
  );
}
