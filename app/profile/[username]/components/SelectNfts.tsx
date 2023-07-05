"use client";

import { Box, Text, Image, SimpleGrid } from "@chakra-ui/react";
import { NftCardsType } from "./AddNftModal";
import useFetchNftsOwner from "@/app/hooks/useFetchNftsOwner";
import { useState } from "react";
import DisplayNft from "./DisplayNft";
import { Button } from "@/app/components/Button";
import { useAccount } from "wagmi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type SelectNftsType = {
  setCurrentCard: (card: keyof NftCardsType) => void;
  onClose: () => void;
};
export type Selected = "default" | "selected" | "not-selected";

const SelectNfts = ({ setCurrentCard, onClose }: SelectNftsType) => {

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { address } = useAccount()
  const { data, loading, error } = useFetchNftsOwner(address as '0x${string}');
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

    const nft = data?.ownedNfts[selectedNftKey as number]

    const { data:{session}, error:sessionSrror } = await supabase.auth.getSession();
    const { status, error } = await supabase
      .from("nfts")
      .insert({
        user_id: session?.user.id as string,
        contract_address:nft?.contract.address as string,
        token_id:parseInt(nft?.tokenId as string),
        metadata:nft?.rawMetadata,
        media:nft?.media[0] as unknown as any
      });
    console.log(status)
    console.log(error)

    if(status === 201) {
      onClose()
      router.refresh()
    }
  }

  return (
    <Box paddingY={"50px"}>
      <Text fontWeight={"semibold"} mb={"20px"} fontSize={"24px"}>
        Finally, take you pick
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <SimpleGrid columns={3} spacing={2} width={"100%"}>
          {data?.ownedNfts.map(
            (nft, index) =>
              nft.media[0] && (
                <DisplayNft
                  key={index}
                  index={index}
                  alt={nft.rawMetadata?.name as string}
                  imageSrc={nft.media[0].gateway as string}
                  selected={
                    getSelected(index)
                  }
                  setSelected={setSelectedNftKey}
                />
              )
          )}
        </SimpleGrid>
      )}
      {selectedNftKey != null &&
       <Button
        position={"fixed"}
        bottom={"40px"}
        left={"50%"}
        ml={"-52.5px"}
        width={"fit-content"}
        padding={"10px 20px"}
        onClick={handleSubmit}
      >
        Add to profile
      </Button>}
    </Box>
  );
};

export default SelectNfts;
