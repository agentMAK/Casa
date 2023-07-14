"use client";

import { Box, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import useFetchNftsOwner from "@/app/hooks/useFetchNftsOwner";
import { useState } from "react";
import DisplayNft from "./DisplayNft";
import { Button } from "@/app/components/Button";
import { useAccount } from "wagmi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { NftCardsType } from "./AddNftModal";

type SelectNftsType = {
  address: string;
  setCurrentCard: (card: keyof NftCardsType) => void;
  onClose: () => void;
};
export type Selected = "default" | "selected" | "not-selected";

const SelectNfts = ({ address, onClose, setCurrentCard }: SelectNftsType) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { data, loading, error } = useFetchNftsOwner(address as "0x${string}");
  const [selectedNftKey, setSelectedNftKey] = useState<number | null>(null);

  const getSelected = (index: number): Selected => {
    if (selectedNftKey === null) {
      return "default";
    } else if (selectedNftKey === index) {
      return "selected";
    } else {
      return "not-selected";
    }
  };

  const handleSubmit = async () => {
    const nft = data?.ownedNfts[selectedNftKey as number];

    const {
      data: { session },
      error: sessionSrror,
    } = await supabase.auth.getSession();
    const { status, error } = await supabase.from("nfts").insert({
      user_id: session?.user.id as string,
      contract_address: nft?.contract.address as string,
      token_id: parseInt(nft?.tokenId as string),
      metadata: nft?.rawMetadata,
      media: nft?.media[0] as unknown as any,
    });
    console.log(status);
    console.log(error);

    if(status === 201) {
      onClose()
      router.refresh()
    }
  };

  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Box mb={"32px"}>
        <Text
          fontWeight={"medium"}
          mb={"5px"}
          fontSize={"24px"}
          textAlign={"center"}
        >
          Pick on-chain music
        </Text>
        <Text fontSize={"12px"} textAlign={"center"} mx={"10px"}>
          Choose music nfts you&apos;d like to add to your profile
        </Text>
      </Box>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Flex flexDirection={'column'} justifyContent={'center'}>
        <SimpleGrid columns={2} spacing={2} width={"100%"} mb={'25px'}>
          {data?.ownedNfts.map(
            (nft, index) =>
              index < 7 &&
              nft.media[0] && (
                <DisplayNft
                  key={index}
                  index={index}
                  alt={nft.rawMetadata?.name as string}
                  imageSrc={nft.media[0].gateway as string}
                  selected={getSelected(index)}
                  setSelected={setSelectedNftKey}
                />
              )
          )}
        </SimpleGrid>
        <Button
          onClick={handleSubmit}
          isDisabled={selectedNftKey === null}
          mx={'auto'}
        >
          Add to profile
        </Button>
        </Flex>
      )}

    </Flex>
  );
};

export default SelectNfts;
