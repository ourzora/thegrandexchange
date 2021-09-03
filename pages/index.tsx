import { useState } from 'react';

import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";
import { fetchContracts } from "../data/fetchContracts";
import { fetchCollections } from "../data/fetchCollections";
import { Auctions } from "../components/auctions";
import { media } from '../styles/mixins';

export default function Home({
  contracts,
  collections,
}: {
  contracts: any[],
  collections: any[],
}) {
  const [currentCollection, setCurrentCollection] = useState('LOOT');

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
        <TokenList>
          {collections && collections.map((collection: any) => {
            return (
              <div className={`collection-wrapper ${currentCollection === collection.symbol ? 'show' : 'hide'}`} key={collection.address}>
                <Auctions tokens={collection.tokens} useRarity={collection.rarity}/>
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
