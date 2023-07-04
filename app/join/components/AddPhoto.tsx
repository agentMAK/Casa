"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { Button } from "@/app/components/Button";
import Avatar from "./Avatar";
type AddPhotoType = {
  handleSubmit: () => void;
  uid: string | undefined;
  avatarPath: string;
  setAvatarPath: (avatarPath: string) => void;
};

const AddPhoto = ({
  handleSubmit,
  uid,
  avatarPath,
  setAvatarPath,
}: AddPhotoType) => {
  return (
    <Box>
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
      <Flex alignItems={"center"} flexDirection={"column"} mb={"50px"}>
        <Avatar
          uid={uid as string}
          url={avatarPath}
          size={150}
          onUpload={(path) => {
            setAvatarPath(path);
          }}
        />
      </Flex>

      <Button width={"100%"} onClick={handleSubmit}>
        Complete Profile
      </Button>
    </Box>
  );
};

export default AddPhoto;
