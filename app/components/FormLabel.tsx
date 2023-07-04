"use client";

import { FormLabel as CharkaFormLabel } from "@chakra-ui/react";

export function FormLabel(props: any) {
  return (
    <CharkaFormLabel
      fontSize={"14px"}
      marginBottom={"2px"}
      marginRight={"0px"}
      {...props}
    >
      {props.children}
    </CharkaFormLabel>
  );
}
