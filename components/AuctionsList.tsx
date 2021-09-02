import { FetchStaticData } from "@zoralabs/nft-hooks";
import { MediaConfiguration, NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

import LootRarityRenderer from "./LootRarityRenderer";

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();
  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <MediaConfiguration renderers={[LootRarityRenderer]}>
        {tokens?.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return (
            <NFTPreview
              key={tokenInfo.tokenId}
              id={tokenInfo.tokenId}
              contract={tokenInfo.tokenContract}
              onClick={() => {
                router.push(
                  `/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`
                )
              }}
              useBetaIndexer={true}
            />
          );
        })}
      </MediaConfiguration>
    </div>
  );
};
