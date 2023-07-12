import { Network, Alchemy, OwnedNftsResponse, NftOrdering } from "alchemy-sdk";

const alchemy = new Alchemy({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.OPT_MAINNET,
  });

import { useState, useEffect } from 'react';

const useFetchNftsOwner = (address:string) => {
  const [data, setData] = useState<OwnedNftsResponse|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchNftsOwner = async () => {
      try {
        const nftsForOwner = await alchemy.nft.getNftsForOwner(address,{
            pageSize:30,
            orderBy:NftOrdering.TRANSFERTIME
        });
        setData(nftsForOwner);
      } catch (error) {
        setError("Error fetching owner nfts "+error);
      } finally {
        setLoading(false);
      }
    };

    fetchNftsOwner();
  }, [address]);

  return { data, loading, error };
};

export default useFetchNftsOwner;