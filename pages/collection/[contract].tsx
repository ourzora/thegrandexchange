import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { fetchContracts } from "../../data/fetchContracts";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetStaticProps, GetStaticPaths } from "next";

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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchContracts();
  console.log(posts)

  const paths = posts.map((post: any) => ({
    params: { contract: post.address },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }
  const contract = params.contract as string;

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );

  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    collectionAddress: contract as string,
    limit: 60,
    offset: 0,
  });

  return {
    props: {
      contract,
      tokens
    }
  };
};

const CollectionWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
  h3 {
    text-align: center;
  }
`;
