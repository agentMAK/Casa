"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { Button } from "@/app/components/Button";
import Avatar from "./Avatar";
import { SignUpCardsType } from "../page";
type AddPhotoType = {
  handleSubmit: () => void;
  uid: string | undefined;
  avatarPath: string;
  setAvatarPath: (avatarPath: string) => void;
  setCurrentCard: (card: keyof SignUpCardsType) => void;
  
};

const AddPhoto = ({
  handleSubmit,
  uid,
  avatarPath,
  setAvatarPath,
  setCurrentCard
}: AddPhotoType) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Box mb={"50px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"28px"}
          textAlign={"center"}
        >
          Add a photo
        </Text>
        <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
          Showcase yourself
        </Text>
      </Box>
      <Flex alignItems={"center"} flexDirection={"column"} mb={"25px"}>
        <Avatar
          uid={uid as string}
          url={avatarPath}
          size={150}
          onUpload={(path) => {
            setAvatarPath(path);
          }}
        />
      </Flex>

      <Button onClick={handleSubmit}>
        Complete Profile
      </Button>
    </Flex>
  );
};

export default AddPhoto;
