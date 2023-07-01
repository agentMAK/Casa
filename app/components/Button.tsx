"use client";

import { Button as CharkaButton } from "@chakra-ui/react";

export function Button(props: any) {
  if (props.variant === "clear") {
    return (
      <CharkaButton
        backgroundColor={"none"}
        border={'1px solid #e0e0e0'}
        paddingY={"12px"}
        height={'fit-content'}
        fontWeight={"500"}
        width={"100%"}
        _hover={{ opacity: "80%" }}
        {...props}
      >
        {props.children}
      </CharkaButton>
    );
  }

  return (
    <CharkaButton
      backgroundColor={"#14213D"}
      color={"white"}
      height={'fit-content'}
    paddingY={"12px"}
      width={"100%"}
      fontWeight={"500"}
      _hover={{ backgroundColor: "#14213D", opacity: "90%" }}
      {...props}
    >
      {props.children}
    </CharkaButton>
  );
}
