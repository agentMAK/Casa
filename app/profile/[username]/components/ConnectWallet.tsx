"use client";

import { Box, Text, FormControl, Flex } from "@chakra-ui/react";
import { Button } from "@/app/components/Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { NftCardsType } from "./AddNftModal";

type ConnectWalletType = {
  setCurrentCard: (card: keyof NftCardsType) => void;
};

const ConnectWallet = ({
  setCurrentCard,
}: ConnectWalletType) => {
  const { openConnectModal } = useConnectModal();
  
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
        setCurrentCard('sign-to-verify')
    },
  })
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Box mb={"50px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"24px"}
          textAlign={"center"}
        >
         Connect your wallet
        </Text>
        <Text fontSize={"12px"} textAlign={"center"} mx={"10px"}>
          So we can fetch your on-chain music
        </Text>
      </Box>
      <Button onClick={openConnectModal}>Connect Wallet</Button>
    </Flex>
  );
};

export default ConnectWallet;
