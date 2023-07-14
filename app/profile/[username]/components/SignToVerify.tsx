"use client";

import { Box, Text, FormControl, Flex } from "@chakra-ui/react";
import { Button } from "@/app/components/Button";
import { useAccount, useSignMessage } from "wagmi";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { NftCardsType } from "./AddNftModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

type SignToVerifyType = {
  setCurrentCard: (card: keyof NftCardsType) => void;
};

const SignToVerify = ({ setCurrentCard }: SignToVerifyType) => {
  const [verifed, setVerifed] = useState(false);
  const message = "Thank you for verifying your ethereum wallet with Casa!";
  const supabase = createClientComponentClient<Database>();

  const { address } = useAccount();
  const { data, error, isLoading, signMessage, variables } = useSignMessage({
    message: message,
    onSuccess(data) {
      setLinkedWallet(address as string);
    },
  });

  const setLinkedWallet = async (address: string) => {
    const {
      data: { session },
      error: sessionSrror,
    } = await supabase.auth.getSession();

    console.log(session?.user.id as string);
    const { error, status } = await supabase
      .from("profiles")
      .update({ linked_wallet_address: address })
      .eq("user_id", session?.user.id as string)

    if(status === 204) {
      setVerifed(true)
      }
  };

  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Box mb={"50px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"24px"}
          textAlign={"center"}
        >
          Sign to verify
        </Text>
        <Text fontSize={"12px"} textAlign={"center"} mx={"10px"}>
          Sign a message to verify your own this wallet. This won`&apos;t cost
          you anything
        </Text>
      </Box>
      <Flex
        width={"100%"}
        justifyContent={verifed ? "space-between" : "center"}
        fontWeight={"medium"}
        mb={"25px"}
      >
        <Text>0x1d0e8...f4E47c2d3bC</Text>

        {verifed && (
          <Flex alignItems={"center"}>
            <Text mr={"5px"}>Connected</Text>
            <CheckCircleIcon color={"#44E9AD"} />
          </Flex>
        )}
      </Flex>

      {verifed ? (
        <Button onClick={() => setCurrentCard("select-nfts")}>Continue</Button>
      ) : (
        <Button onClick={() => signMessage()}>Sign to verify</Button>
      )}
    </Flex>
  );
};

export default SignToVerify;
