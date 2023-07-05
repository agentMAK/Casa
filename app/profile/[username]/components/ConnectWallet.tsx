"use client";

import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { NftCardsType } from "./AddNftModal";
import { Button } from "@/app/components/Button";

type ConnectWalletType = {
  setCurrentCard: (card: keyof NftCardsType) => void;
};

const ConnectWallet = ({ setCurrentCard }: ConnectWalletType) => {
  const { openConnectModal } = useConnectModal();
  return (
    <Flex height={'100vh'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
      <Text
        fontWeight={"medium"}
        fontSize={"20px"}
        textAlign={"center"}
        mb={"20px"}
      >
        Let&apos;s connect your wallet
      </Text>
      <Button onClick={openConnectModal}>Connect Wallet</Button>
    </Flex>
  );
};

export default ConnectWallet;
