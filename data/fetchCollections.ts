import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "temp-nft-hooks";

import { fetchContracts } from "./fetchContracts";


export async function fetchCollections() {  
  const contracts = await fetchContracts();

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );

  async function fetchCollectionArray() {
    let fetchedCollections = []
    
    const fetchPromises = contracts.map(async (id: any) => {
      const response = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
        collectionAddress: id.address as string,
        limit: 60,
        offset: 0,
      });
      return {
        address: id.address,
        name: id.name,
        symbol: id.symbol,
        tokens: response,
        rarity: id.rarity
      };
    });

    for (const fetchPromise of fetchPromises) {
      const collection = await fetchPromise
      fetchedCollections.push(collection)
    }
    return fetchedCollections;
  }

  const collections: any[] = await fetchCollectionArray()
  
  return collections
}
