import { NFTFullPage, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";

import { PageWrapper } from "../../styles/components";
import Head from "../../components/head";

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
      <PageWrapper>
        <h1>{contract}</h1>
      </PageWrapper>
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
