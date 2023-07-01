"use client";

import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { SignUpCardsType } from "../page";
import { Button } from "@/app/components/Button";

type AddPhotoType = {
  setCurrentCard: (card: keyof SignUpCardsType) => void;
  handleSubmit: () => void;
};

const AddPhoto = ({ setCurrentCard, handleSubmit }: AddPhotoType) => {
  return (
    <Box>
      <Box mb={'50px'}>
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
      <Box mb={'40px'}>
        <Flex marginX={'auto'} flexDirection={'column'} borderRadius={'200px'} backgroundColor={"#EDEDED"} boxSize={'200px'} alignItems={'center'} justifyContent={'center'}>
          <Image
            src={"/images/camera.svg"}
            alt={"upload"}
            height={"60px"}
            mb={'10px'}
          />
          <Text fontSize={'14px'} fontWeight={'medium'}>Upload Photo</Text>
        </Flex>
      </Box>

      <Button width={"100%"} onClick={handleSubmit}>
        Complete Profile
      </Button>
    </Box>
  );
};

export default AddPhoto;
