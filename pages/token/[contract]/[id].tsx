
import { Fragment, useContext } from 'react'
import {
  NFTFullPage,
  FullComponents,
  NFTDataContext,
  MediaConfiguration
} from "@zoralabs/nft-components";
import { Button } from "@zoralabs/nft-components/dist/components/Button";
import { useRouter } from "next/router";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "temp-nft-hooks";
import { GetServerSideProps } from "next";
import Head from "../../../components/head";
import { css } from "@emotion/css";
import styled from '@emotion/styled'
import { media, buttonStyle, runeBorder } from '../../../styles/mixins';
import Link from "next/link";
import LootRarityRenderer from "../../../components/LootRarityRenderer"

const styles = {
  theme: {
    lineSpacing: 24,
    linkColor: "var(--black)",
  },
};

type PieceProps = {
  description: any;
  image: string;
  initialData: any;
};

const MangeButton = () => {
  const { nft } = useContext(NFTDataContext);

  const status = nft.data && nft.data.pricing.status 
  const ended = nft.data && nft.data.pricing.reserve && nft.data.pricing.reserve.status
  
  if (!nft.data || !nft.data.pricing.reserve) {
    return <Fragment />;
  } else {
    return (
      <>
        {status === 'RESERVE_AUCTION_FINISHED' && ended === 'Active' || status === 'NO_PRICING' && ended === 'Finished'
          ? <div className={css`
              display: flex;
              justify-content: center;
              padding-bottom: var(--space-lg);
              a {
                ${buttonStyle};
                font-size: var(--text-02);
              }
            `}>
              <Link passHref href="/list">
                <a>Own This? Manage it here!</a>
              </Link>
            </div>
          : <Fragment/>
        }
      </>
    )
  }
}

const AuthenticityButton = () => {
  const { nft } = useContext(NFTDataContext);
  if (!nft.data) {
    return <Fragment />;
  } else {
    return (
      <div className={css`
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: var(--space-md);
        h3 {
          font-family: var(--font-b)!important;
          font-size: var(--text-02);
          text-transform: uppercase;
        }
      `}>
        <h3>Proof of Authenticity</h3>
        <a
          className="button"
          href={`https://etherscan.io/token/${nft.data.nft.contract.address}?a=${nft.data.nft.tokenId}`} target="_blank">
          View on Etherscan
        </a>
      </div>
    )
  }
}

const BidButton = () => {
  const { nft } = useContext(NFTDataContext);
  if (!nft.data || !nft.data.pricing.reserve || nft.data.pricing.reserve.current.likelyHasEnded) {
    return <Fragment />;
  } else {
    return (
      <BidButtonWrapper>
        <a
          href={[
            "https://zora.co/auction",
            nft.data.nft.contract.address,
            nft.data.nft.tokenId,
            "bid",
          ].join("/")}
        >
          <span>Place Bid</span>
        </a>
      </BidButtonWrapper>
    );
  }
};

export default function Piece({
  description,
  image,
  initialData,
}: PieceProps) {
  const { query } = useRouter();
  return (
    <main>
      <Head
        title={`${query.id}`}
        description={description}
        ogImage={image}
      />
      <MediaConfiguration
        networkId={process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs}
        style={styles}
        renderers={query.contract === "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7" ? [LootRarityRenderer] : undefined}
      >
        <PieceWrapper>
          <NFTFullPage
            useBetaIndexer={true}
            contract={query.contract as string}
            id={query.id as string}
            initialData={initialData}
          >
            <ImageWrapper>
              <div className="image-sizer">
                <FullComponents.MediaFull/>
              </div>
            </ImageWrapper>
            <FullComponents.AuctionInfo showPerpetual={false} />
            <BidButton />
            <FullComponents.MediaInfo />
            <AuthenticityButton/>
            <BidHistoryWrapper>
              <FullComponents.BidHistory showPerpetual={false} />
            </BidHistoryWrapper>
            <MangeButton />
          </NFTFullPage>
        </PieceWrapper>
      </MediaConfiguration>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }

  const id = params.id as string;
  const contract = params.contract as string;

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const data = await FetchStaticData.fetchZoraIndexerItem(fetchAgent, {
    tokenId: id,
    collectionAddress: contract,
  });

  const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(data);
  
  return {
    props: {
      id,
      name: tokenInfo.metadata?.name || null,
      description: tokenInfo.metadata?.description || null,
      image: tokenInfo.metadata.image || null,
      initialData: data,
    },
  };
};

export const ImageWrapper = styled.div`
  width: 100%;
  padding: var(--space-sm) 0;
  position: relative;
  .image-sizer {
    width: 100%;
    max-width: 800px;
    margin: auto;
  }
  img {
    filter: drop-shadow(0px 0px 15px rgba(255,255,255,0.2));
  }
  &:after {
    ${runeBorder};
    bottom: 0;
  }
`

export const BidButtonWrapper = styled.div`
  width: 100%;
  padding: 0 var(--space-sm) var(--space-md);
  display: flex;
  justify-content: center;
  a {
    background: transparent;
    display: flex;
    position: relative;
    width: 100%;
    max-width: 477px;
    height: 71px;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    text-decoration: none;
    text-transform: uppercase;
    padding-top: 6px;
    &:after {
      content: '';
      width: 127%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background: transparent url('https://www.runescape.com/img/rs3/../microsite/sprite.png') no-repeat -1924px 0;
      transform: scale(.75);
    }
    ${media.tablet`
      width: 477px;
      font-size: 40px;
      &:after {
        transform: scale(1);
        width: 100%;
        left: 0;
      }
    `}
    span {
      color: #000;
      position: relative;
      margin: auto;
      text-align: center;
      text-shadow: 1px 1px 2px #fff;
      z-index: 10;
    }
  }
`

export const BidHistoryWrapper = styled.div`
  width: 100%;
  position: relative;
  ol {
    width: 100%;
    max-width: 1440px;
    border-top: var(--border-black);
    margin-top: var(--space-sm);
    padding-top: var(--space-md)!important;
  }
  &:before {
    ${runeBorder};
    top: 0;
  }
  h4 {
    font-size: var(--text-04)!important;
    padding: var(--space-md) 0!important;
  }
`

export const PieceWrapper = styled.section`
  * {
    color: var(--yellow);
    font-family: var(--font-a)!important;
  }
  .zora-infoContainer {
    border-top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    * {
      color: var(--black);
      font-size: var(--text-02);
      text-align: center;
    }
    .zora-fullLabel {
      padding-bottom: var(--cell-size);
      display: inline-block;
      margin: 0 auto;
    }
    .zora-fullInfoAuctionWrapper {
      width: 100%;
      div:first-of-type {
        margin-top: var(--space-sm);
        display: inline-block;
        width: 100%;
      }
      .zora-fullLabel {
        padding: 0 var(--space-sm);
        font-family: var(--font-a)!important;
        &:after {
          content: ':'
        }
      }
      font-family: var(--font-b)!important;
      * {
        font-family: var(--font-b)!important;
      }
    }
  }
  .zora-fullPageHistoryItemDescription {
    font-size: var(--text-02)!important;
    text-align: center;
    * {
      font-size: var(--text-02)!important;
    }
    .zora-pricingAmount {
      padding-top: 0;
    }
  }
  .zora-fullTitle {
    text-align: center;
  }
`
