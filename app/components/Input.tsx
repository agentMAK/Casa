"use client";

import { Input as CharkaInput } from "@chakra-ui/react";

export function Input(props: any) {
  return (
        <CharkaInput backgroundColor={'#EDEDED'} border={'none'} _focusVisible={{border:'2px solid #14213D'}} height={'fit-content'} paddingY='12px' {...props} />
  );
}
