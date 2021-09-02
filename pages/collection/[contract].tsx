import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";

import { PageWrapper } from "../../styles/components";
import Head from "../../components/head";
import { Auctions } from "../../components/auctions";

export default function Piece({
  contract,
  tokens
}:{
  contract: string,
  tokens: any[]
}) {
  const { query } = useRouter();
  return (
    <main>
      <Head
        title={`${contract}`}
      />
      <CollectionWrapper>
        <h3>{contract}</h3>
        <Auctions tokens={tokens} />
      </CollectionWrapper>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }
  const contract = params.contract as string;

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  console.log(contract)
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddress: contract as string,
    limit: 60,
    offset: 0,
  });

  return {
    props: {
      contract,
      tokens
    },
  };
};

const CollectionWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
  h3 {
    text-align: center;
  }
`;
