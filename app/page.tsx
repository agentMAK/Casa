"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Button } from "./components/Button";

export default function Home() {
  const router = useRouter();
  return (
    <Flex
      flexDirection={"column"}
      maxWidth={"400px"}
      margin={"auto"}
      height={"100vh"}
    >
      <Box marginX={"50px"} mt={"50px"}>
        <Button width={"100%"} onClick={() => router.push("/login")}>
          Login
        </Button>
      </Box>
    </Flex>
  );
}
