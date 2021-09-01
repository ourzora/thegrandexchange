import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "temp-nft-hooks";

import { MediaThumbnailWrapper } from "@zoralabs/nft-components/dist/nft-preview/MediaThumbnailWrapper";
import { NFTPreview, PreviewComponents } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import { media, buttonStyle, absoluteCentered } from "../styles/mixins";

import { getAuctionStatusClassName } from "../utils/getAuctionsStatusClassName";

// Create A Token Thumbnail
const TokenThumbnail = ({
  token,
  linkDetails = true,
}: {
  token: any;
  linkDetails?: boolean;
}) => {
  const nft = token.nft.tokenData
  const listed = nft.auctions && nft.auctions.length > 0;
  const router = useRouter();
  const linkTarget = listed ? `token/${nft.address}/${nft.tokenId}` : "/list";
  const wrapperLink = linkDetails
    ? {
        onClick: (evt: SyntheticEvent) => {
          evt.preventDefault();
          router.push(linkTarget);
        },
        href: linkTarget,
      }
    : {};
  return (
    <NFTPreview
        key={`${token.tokenContract}-${token.tokenId}`}
        contract={token.tokenContract}
        id={token.tokenId}
        initialData={token}
        useBetaIndexer={true}
      >
        <ThumbnailWrapper
          key={token.tokenId}
          className={getAuctionStatusClassName(nft.auctions)}
          {...wrapperLink}
        >
          <MediaThumbnailWrapper {...wrapperLink}>
            <PreviewComponents.MediaThumbnail />
            {listed && (
              <PreviewComponents.PricingComponent />
            )}
          </MediaThumbnailWrapper>
        </ThumbnailWrapper>
      </NFTPreview>
  )
}

// LIST THE TOKENS
const CustomAuctionsList = ({ tokens }: { tokens: any[] }) => {
  return (
    <div className="token-list-wrapper">
      {tokens &&
        tokens.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return (
            <TokenThumbnail
              token={token}
              key={tokenInfo.tokenId}
            />
          );
        })}
    </div>
  );
};

// INCLUDE IN THE PAGE
export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head />
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <CustomAuctionsList tokens={tokens} />
    </IndexWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddress: process.env
      .NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string,
    limit: 100,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};

// STYLE IT UP - Using the classes applied based on different auction states to add some cusom messaging
const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
  .token-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ThumbnailWrapper = styled.div`
  background-color: var(--black);
  .zora-cardOuter {
    border: 0;
    margin: 0;
    background-color: var(--black)!important;
  }
  .zora-cardItemInfo {
    width: 100%;
  }
  .zora-cardAuctionPricing {
    width: 100%;
    background-color: var(--black)!important;
    * {
      color: var(--white)!important;
      opacity: 1!important;
    }
  }
  &.not-listed {
    opacity: 0.5;
    .zora-cardLink:before {
      content: 'Own this? List It Here!'!important;
    }
  }
  &.not-listed {
    order: 1;
  }
  &.auction-live {
    order: -1;
    .zora-cardLink:before {
      content: 'Bid Now!'!important;
    }
    .zora-cardAuctionPricing {
      background-color: var(--black)!important;
    }
  }
  .zora-cardLink {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    font-size: 0;
    &:before {
      z-index: 10;
      ${buttonStyle};
      content: 'Start Bidding!';
      width: 200px;
      height: 23px;
      font-size: var(--text-01);
      border: 2px solid var(--white);
      ${absoluteCentered};
    }
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--overlay-light);
    }
  }
  ${media.canHover`
    &:hover {
      opacity: 1!important;
      .zora-cardLink {
        opacity: 1;
      }
    }
  `}
`
