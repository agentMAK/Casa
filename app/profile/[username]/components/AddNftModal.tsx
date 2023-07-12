import { Button } from "@/app/components/Button";
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
import useFetchNftsOwner from "@/app/hooks/useFetchNftsOwner";
import SelectNfts from "./SelectNfts";
import { useAccount } from "wagmi";

export type NftCardsType = {
  "connect-wallet": JSX.Element;
   "select-nfts": JSX.Element;
};

export function AddNftModal({
  onClose,
  isOpen,
  address
}: {
  onClose: () => void;
  isOpen: boolean;
  address:string
}) {
  const [currentCard, setCurrentCard] =
    useState<keyof NftCardsType>("select-nfts");

  const nftCards: NftCardsType = {
    "connect-wallet": <ConnectWallet setCurrentCard={setCurrentCard} />,
    "select-nfts":<SelectNfts address={address} onClose={onClose} />
  };

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
        setCurrentCard('select-nfts')
    },
  })

  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Box>
          <ModalCloseButton />
          <ModalBody
            width={"500px"}
            marginX={"auto"}
            minHeight={"100vh"}
            height={'fit-content'}
            padding={'0px'}
          >
            {nftCards[currentCard]}
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
}