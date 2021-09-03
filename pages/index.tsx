import React, { useState } from 'react';

import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";
import { fetchContracts } from "../data/fetchContracts";
import { Auctions } from "../components/auctions";
import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "temp-nft-hooks";

import { AuctionsList } from '../components/AuctionsList';

import { media } from '../styles/mixins';

export default function Home({
  contracts,
  tokens
}: {
  contracts: any[],
  tokens: any
}) {
  const [collection, setCollection] = useState('LOOT');

  return (
    <main>
      <IndexWrapper>
        <Head />
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
        <Menu>
          {contracts && contracts.map((contract: any) => {
            return (
              <button
                key={contract.address}
                className={collection === contract.symbol ? 'active' : ''}
                onClick={() => {
                  setCollection(contract.symbol)
                }}
              >
                {contract.name}
              </button>
            );
          })}
        </Menu>
        <TokenList>
          {tokens && tokens.map((token: any) => {
            return (
              <div className={`collection-wrapper ${collection === token.symbol ? 'show' : 'hide'}`} key={token.slug}>
                {/*<AuctionsList tokens={token.tokens}/>*/}
                <Auctions tokens={token.tokens} useRarity={token.rarity} />
              </div>
            );
          })}
        </TokenList>
      </IndexWrapper>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contracts = await fetchContracts();
  
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );

  console.log(contracts)

  // Dain TODO - make this dynamic.
  const loot = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddress: contracts[0].address as string,
    limit: 60,
    offset: 0,
  });

  const lootRealm = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddress: contracts[1].address as string,
    limit: 60,
    offset: 0,
  });

  const ability = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddress: contracts[2].address as string,
    limit: 60,
    offset: 0,
  });

  const settlements = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddress: contracts[3].address as string,
    limit: 60,
    offset: 0,
  });

  const tokens = [
    {
      name: 'Loot',
      slug: 'loot',
      symbol: 'LOOT',
      tokens: loot,
      rarity: true
    },
    {
      name: 'Realms (for Adventurers)',
      symbol: 'LootRealm',
      slug: 'realms',
      tokens: lootRealm,
      rarity: false
    },
    {
      name: 'Ability Score',
      symbol: 'SCORE',
      slug: 'ability-score',
      tokens: ability,
      rarity: false
    },
    {
      name: 'Settlements',
      symbol: 'STL',
      slug: 'settlements',
      tokens: settlements,
      rarity: false
    }
  ]
  
  return {
    props: {
      contracts,
      tokens
    },
    revalidate: 60
  };
};

const TokenList = styled.div`
  width: 100%;
  .collection-wrapper.hide {
    display: none;
  }
`

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const Menu = styled.menu`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: var(--space-lg);
  button {
    border: 3px var(--yellow) outset;
    background-color: var(--yellow);
    color: var(--black);
    font-size: var(--text-02);
    text-decoration: none;
    transition: transform 150ms var(--ease);
    margin-right: var(--base-unit);
    cursor: pointer;
    &.active {
      filter: var(--golden-shadow);
    }
    &:last-of-type {
      margin-right: 0;
    }
    ${media.tablet`
      font-size: var(--text-03);
      margin-right: var(--space-md);
      &:hover {
        transform: scale(1.05);
      }
    `}
  }
`
