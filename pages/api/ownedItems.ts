import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import { fetchContracts } from "../../data/fetchContracts";

module.exports = async (req: any, res: any) => {
  const { owner } = req.query;
  
  if (!owner) {
    return res.status(403).json({ failed: true });
  }

  const contracts = await fetchContracts();

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as any
  );
/* 
  async function fetchCollectionArray() {
    let fetchedCollections = []
    
    const fetchPromises = contracts.map(async (id: any) => {
      const response = await FetchStaticData.fetchUserOwnedNFTs(
        fetchAgent,
        {
          collectionAddress: id.address as string || "",
          userAddress: owner,
          limit: 200,
          offset: 0,
        },
        true
      );
      return response
    });

    for (const fetchPromise of fetchPromises) {
      const collection = await fetchPromise
      
      fetchedCollections.push(collection)
    }
    return fetchedCollections;
  }
  
  const tokens: any[] = await fetchCollectionArray()

  */
  
  let tokens = []

  // Dain TODO - make this dynamic -> forEach async
  const loot = await FetchStaticData.fetchUserOwnedNFTs(
    fetchAgent,
    {
      collectionAddress: contracts[0].address as string || "",
      userAddress: owner,
      limit: 200,
      offset: 0,
    },
    true
  );

  const lootRealm = await FetchStaticData.fetchUserOwnedNFTs(
    fetchAgent,
    {
      collectionAddress: contracts[1].address as string || "",
      userAddress: owner,
      limit: 200,
      offset: 0,
    },
    true
  );

  const ability = await FetchStaticData.fetchUserOwnedNFTs(
    fetchAgent,
    {
      collectionAddress: contracts[2].address as string || "",
      userAddress: owner,
      limit: 200,
      offset: 0,
    },
    true
  );

  const settlements = await FetchStaticData.fetchUserOwnedNFTs(
    fetchAgent,
    {
      collectionAddress: contracts[3].address as string || "",
      userAddress: owner,
      limit: 200,
      offset: 0,
    },
    true
  );

  tokens = [...loot, ...lootRealm, ...ability, ...settlements]
  
  res.status(200).json({tokens});
};