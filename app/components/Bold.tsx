"use client";

import { Text } from "@chakra-ui/react";

export function Bold(props: any) {
  return <Text fontFamily={`'Grumpy Black 48', san-serif`} as={'span'} {...props}>{props.children}</Text>;
}
