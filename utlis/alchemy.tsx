import { Network, Alchemy } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

const fetchNftsForOwner = async (address: string) => {
  const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
  return nftsForOwner.ownedNfts;
};
