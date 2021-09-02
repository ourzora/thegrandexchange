import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import styled from "@emotion/styled/";

import { MediaThumbnailWrapper } from "@zoralabs/nft-components/dist/nft-preview/MediaThumbnailWrapper";
import { NFTPreview, PreviewComponents } from "@zoralabs/nft-components";

import { getAuctionStatusClassName } from "../../utils/getAuctionsStatusClassName";
import { ThumbnailImage } from "../../styles/components";
import { media, buttonStyle, absoluteCentered } from "../../styles/mixins";

import {
  FetchStaticData,
} from "temp-nft-hooks";

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
    <TokenWrapper className={`token-wrapper ${getAuctionStatusClassName(tokenAuctions)}`}>
      <NFTPreview
        key={tokenInfo.tokenId}
        id={tokenInfo.tokenId}
        contract={tokenInfo.tokenContract}
        useBetaIndexer={false}
      >
        <ThumbnailWrapper
          className={`thumbnail-wrapper ${getAuctionStatusClassName(tokenAuctions)}`}
          {...wrapperLink}
        >
          <MediaThumbnailWrapper {...wrapperLink}>
            <div className="info-wrapper">
              <PreviewComponents.MediaThumbnail/>
            </div>
            <div className={`bottom-thumb-wrapper ${getAuctionStatusClassName(tokenAuctions)}`}>
              {tokenAuctions.length ?
                <PreviewComponents.PricingComponent />
                : <div className="list-token">Yours? List It Here!</div>
              }
            </div>
          </MediaThumbnailWrapper>
        </ThumbnailWrapper>
      </NFTPreview>
    </TokenWrapper>
  )
}

const TokenWrapper = styled.div`
  &.not-listed {
    order: 2;
    .thumbnail-image {
      opacity: 0.65;
    }
    .zora-cardLink:before {
      content: 'Click to List!'!important;
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
  &.ended {
    order: -1;
    .zora-cardAuctionPricing {
      background-color: var(--black)!important;
      border-color: var(--yellow);
    }
    .zora-cardLink:before {
      content: 'Bid History'!important;
      background-color: var(--black)!important;
    }
  }
  &.unclaimed {
    order: 0;
    .zora-cardAuctionPricing {
      background-color: var(--red)!important;
    }
    .zora-cardLink:before {
      content: 'Unclaimed!'!important;
      background-color: var(--red)!important;
    }
  }
  &.auction-live {
    order: -2;
    .zora-cardAuctionPricing {
      background-color: var(--white)!important;
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