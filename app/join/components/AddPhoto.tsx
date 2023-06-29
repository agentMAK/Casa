"use client";

import {
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { SignUpCardsType } from "../page";

type AddPhotoType = {
  setCurrentCard: (card: keyof SignUpCardsType) => void;
  handleSubmit: () => void;
};

const AddPhoto = ({ setCurrentCard, handleSubmit }: AddPhotoType) => {
  return (
    <Box>
      <Text
        fontWeight={"medium"}
        mb={"5px"}
        fontSize={"24px"}
        textAlign={"center"}
      >
       Add a photo
      </Text>
      <Text fontSize={"14px"} textAlign={"center"} mb={"5px"}>
        Showcase yourself
      </Text>
      <Button mb={'5px'}>Upload Image</Button>
      <Button width={"100%"} onClick={handleSubmit}>
        Complete Profile
      </Button>
    </Box>
  );
};

export default AddPhoto;
