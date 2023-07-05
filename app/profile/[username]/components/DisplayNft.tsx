"use client";

import { Box, Image } from "@chakra-ui/react";
import { Selected } from "./SelectNfts";

type DisplayNftType = {
  imageSrc: string;
  alt: string;
  selected: Selected;
  setSelected: (key: number | null) => void;
  index: number;
};

const DisplayNft = ({
  selected,
  imageSrc,
  alt,
  setSelected,
  index,
}: DisplayNftType) => {
  return (
    <Box
      position={"relative"}
      onClick={() => {
        setSelected(index);
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        boxSize="150px"
        borderRadius={"14px"}
      ></Image>
      {selected === 'not-selected' && (
        <Box
          backgroundColor={"white"}
          position={"absolute"}
          borderRadius={"14px"}
          opacity={"75%"}
          top={0}
          left={0}
          boxSize={"150px"}
        ></Box>
      )}
    </Box>
  );
};

export default DisplayNft;
