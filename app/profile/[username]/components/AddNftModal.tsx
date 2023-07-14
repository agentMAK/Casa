import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
} from "@chakra-ui/react";
import ConnectWallet from "./ConnectWallet";
import { useState } from "react";
import SelectNfts from "./SelectNfts";
import SignToVerify from "./SignToVerify";

export type NftCardsType = {
  "connect-wallet": JSX.Element;
  "select-nfts": JSX.Element;
  "sign-to-verify": JSX.Element;
};

export function AddNftModal({
  onClose,
  isOpen,
  address,
}: {
  onClose: () => void;
  isOpen: boolean;
  address: string;
}) {

  const [currentCard, setCurrentCard] =
     useState<keyof NftCardsType>(address ? "select-nfts" : "connect-wallet");

  const nftCards: NftCardsType = {
    "connect-wallet": <ConnectWallet setCurrentCard={setCurrentCard} />,
    "select-nfts": (
      <SelectNfts
        setCurrentCard={setCurrentCard}
        address={"0x5b93ff82faaf241c15997ea3975419dddd8362c5"}
        onClose={onClose}
      />
    ),
    "sign-to-verify": <SignToVerify setCurrentCard={setCurrentCard} />,
  };

  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Box>
          <ModalCloseButton />
          <ModalBody
            marginX={"auto"}
            minHeight={"100vh"}
            height={"fit-content"}
            padding={"0px"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            maxWidth={"400px"}
            margin={"auto"}
          >
            {nftCards[currentCard]}
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
}
