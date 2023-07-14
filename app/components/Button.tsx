"use client";

import { Button as CharkaButton } from "@chakra-ui/react";

export function Button(props: any) {
  if (props.variant === "clear") {
    return (
      <CharkaButton
        backgroundColor={"white"}
        border={"1px solid #e6e6e6"}
        paddingY={"12px"}
        height={"fit-content"}
        fontWeight={"500"}
        width={"100%"}
        borderRadius={"16px"}
        _hover={{ backgroundColor:'#f8f8f8' }}
        {...props}
      >
        {props.children}
      </CharkaButton>
    );
  }

  return (
    <CharkaButton
      backgroundColor={"#44E9AD"}
      color={"white"}
      height={"fit-content"}
      paddingY={"12px"}
      paddingX={'50px'}
      fontWeight={"500"}
      borderRadius={"16px"}
      _hover={{ backgroundColor: "#23996F" }}
      {...props}
    >
      {props.children}
    </CharkaButton>
  );
}
