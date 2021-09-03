import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import styled from "@emotion/styled/";

import { MediaThumbnailWrapper } from "@zoralabs/nft-components/dist/nft-preview/MediaThumbnailWrapper";
import { MediaConfiguration, NFTPreview, PreviewComponents } from '@zoralabs/nft-components'

import { getAuctionStatusClassName } from "../../utils/getAuctionsStatusClassName";
import { media, buttonStyle, absoluteCentered } from "../../styles/mixins";

import {
  FetchStaticData,
} from "temp-nft-hooks";
import LootRarityRenderer from '../LootRarityRenderer'

export const TokenThumbnail = ({
  token,
  linkDetails = true,
}: {
  token: any;
  linkDetails?: boolean;
}) => {
  const tokenAuctions = token.nft.tokenData.auctions
  const listed = tokenAuctions && tokenAuctions.length > 0;
  const router = useRouter();
  const linkTarget = listed ? `/token/${token.nft.tokenData.address}/${token.nft.tokenData.tokenId}` : "/list";

  const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);

  const returnAuctionState = () => {
    if (token.nft.auctionData === undefined) {
      return 'not-listed'
    } else if (token.nft.auctionData !== undefined && token.nft.auctionData.currentBid !== null) {
      return 'Live'
    } else {
      return token.nft.auctionData.status
    }
  }
  
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
    <TokenWrapper className={`token-wrapper ${getAuctionStatusClassName(tokenAuctions)} ${returnAuctionState()}`}>
      <MediaConfiguration renderers={[LootRarityRenderer]}>
        <NFTPreview
          key={tokenInfo.tokenId}
          id={tokenInfo.tokenId}
          contract={tokenInfo.tokenContract}
          useBetaIndexer={false}
        >
          <ThumbnailWrapper
            className={`thumbnail-wrapper`}
            {...wrapperLink}
          >
            <MediaThumbnailWrapper {...wrapperLink}>
              <div className="info-wrapper">
                <PreviewComponents.MediaThumbnail/>
              </div>
              <div className={`bottom-thumb-wrapper`}>
                {tokenAuctions.length ?
                  <PreviewComponents.PricingComponent />
                  : <div className="list-token">Yours? List It Here!</div>
                }
              </div>
            </MediaThumbnailWrapper>
          </ThumbnailWrapper>
        </NFTPreview>
      </MediaConfiguration>
    </TokenWrapper>
  )
}

const TokenWrapper = styled.div`
  .zora-cardAuctionPricing {
    background-color: var(--yellow)!important;
    border-color: var(--yellow);
  }
  &.not-listed.not-listed,
  &.not-listed.Finished {
    order: 2;
    .zora-cardMediaWrapper {
      opacity: 0.65!important;
    }
    .zora-cardLink:before {
      content: 'Click to List!'!important;
    }
    .list-token {
      background-color: var(--black);
      color: #FFF!important;
      border-top: var(--border-yellow)!important;
      * {
        color: #FFF!important;
      }
    }
  }
  &.listed {
    h2 {
      color: var(--yellow);
    }
    .zora-cardAuctionPricing {
      background-color: var(--yellow)!important;
      border-color: var(--yellow);
      * {
        color: var(--black)!important;
      }
    }
  }
  &.listed.Finished {
    order: -1;
    .zora-cardAuctionPricing {
      background-color: var(--yellow)!important;
      border-color: var(--yellow);
    }
    .zora-cardLink:before {
      content: 'Bid History'!important;
      background-color: var(--yellow)!important;
    }
  }
  &.unclaimed {
    order: 0;
    .zora-cardAuctionPricing {
      background-color: var(--yellow)!important;
    }
    .zora-cardLink:before {
      content: 'Unclaimed!'!important;
      background-color: var(--yellow)!important;
    }
  }
  &.listed.Live,
  &.auction-live.Live {
    order: -2;
    .zora-cardAuctionPricing {
      background-color: var(--yellow)!important;
    }
    .zora-cardLink:before {
      content: 'Bid Now!'!important;
    }
  }
`

const ThumbnailWrapper = styled.div`
  background-color: var(--black);
  position: relative;
  border: var(--border-yellow);
  border-radius: 10px;
  overflow: hidden;
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