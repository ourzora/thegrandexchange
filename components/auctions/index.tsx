import styled from '@emotion/styled'
import { TokenThumbnail } from "./TokenThumbnail";
import { listGrid, media, buttonStyle, absoluteCentered } from '../../styles/mixins';

import {
  FetchStaticData,
} from "temp-nft-hooks";

export const Auctions = ({
  tokens,
  useRarity = false
}: {
  tokens: any[];
  useRarity?: boolean
}) => {
  return (
    <TokenListWrapper>
      {tokens &&
        tokens.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return (
            <TokenThumbnail
              token={token}
              useRarity={useRarity}
              key={`${tokenInfo.tokenContract}-${tokenInfo.tokenId}`}
            />
          );
        })}
    </TokenListWrapper>
  );
};

const TokenListWrapper = styled.div`
  ${listGrid};
  .list-token {
    ${buttonStyle};
    width: 100%;
    height: 70px;
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0 var(--space-md) 2px;
    border: 1px solid var(--white);
    float: left;
    margin-top: var(--space-sm);
  }
  .zora-cardOuter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .zora-cardItemInfo {
      width: 100%;
    }
    .blit-wrapper {
      width: 100%;
    }
    .zora-cardLink {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      font-size: 0;
      transition: all 250ms var(--ease);
      will-change: all;
      &:before {
        z-index: 10;
        ${buttonStyle};
        content: 'Start Bidding!';
        max-width: 200px;
        height: 50px;
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 0 var(--space-md) 2px;
        border: 1px solid var(--white);
        ${absoluteCentered};
        transition: all 350ms var(--ease);
        will-change: all;
        transform: translateY(-15px);
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
  }
`