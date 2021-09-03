import { useState } from 'react';

import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";
import { fetchContracts } from "../data/fetchContracts";
import { fetchCollections } from "../data/fetchCollections";
import { Auctions } from "../components/auctions";
import { media, runeBorder } from '../styles/mixins';
import useSWR from 'swr';
import { ORDERS_API_BASE_URI } from '../utils/constants';
import { fetchLootStats } from '../utils/loot_stats';
import { Stats } from '../components/Stats';

export default function Home({
  contracts,
  collections,
}: {
  contracts: any[],
  collections: any[],
}) {
  const [currentCollection, setCurrentCollection] = useState('LOOT');
  
  const statsFetch = useSWR('loot-stats', fetchLootStats);
  const lootStats = statsFetch.data;
  const lootStatsError = statsFetch.error ? true : false;

  return (
    <main>
      <HeroWrapper>
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
        <Stats prices={lootStats} hasError={lootStatsError}/>
        <Menu>
          {contracts && contracts.map((contract: any) => {
            return (
              <button
                key={contract.address}
                className={currentCollection === contract.symbol ? 'active' : ''}
                onClick={() => {
                  setCurrentCollection(contract.symbol)
                }}
              >
                {contract.name}
              </button>
            );
          })}
        </Menu>
      </HeroWrapper>
      <IndexWrapper>
        <Head />
        <TokenList>
          {collections && collections.map((collection: any, index: number) => {
            return (
              <div className={`collection-wrapper ${currentCollection === collection.symbol ? 'show' : 'hide'}`} key={collection.address}>
                <Auctions tokens={collection.tokens} useRarity={index === 0 ? true : false}/>
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
  const collections = await fetchCollections();
  
  return {
    props: {
      contracts,
      collections
    },
    revalidate: 60
  };
};

const HeroWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: var(--space-sm);
  background-image: url('/rs/cracks-top.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  &:after {
    ${runeBorder};
    bottom: 0;
  }
`

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
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: var(--space-lg);
  padding: 0 var(--space-sm);
  button {
    border: 3px var(--yellow) outset;
    background-color: var(--yellow);
    color: var(--black);
    font-size: var(--text-02);
    text-decoration: none;
    transition: transform 150ms var(--ease);
    margin-right: var(--space-sm);
    margin-bottom: var(--space-sm);
    cursor: pointer;
    &.active {
      filter: var(--golden-shadow);
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  ${media.tablet`
    padding: 0 var(--space-sm);
    button {
      font-size: var(--text-03);
      margin-right: var(--space-md);
      &:hover {
        transform: scale(1.05);
      }
    }
  `}
`
