import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";
import { fetchContracts } from "../data/fetchContracts";
import Link from "next/link";

export default function Home({
  contractNav
}: {
  contractNav: any[]
}) {
  return (
    <main>
      <IndexWrapper>
        <Head />
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
        <Menu>
          {contractNav && contractNav.map((contract) => {
            return (
              <Link
                href={`/collection/${contract.address}`}
                passHref
                key={contract.address}
              >
                <a>
                  {contract.name}
                </a>
              </Link>
            );
          })}
        </Menu>
      </IndexWrapper>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contracts = await fetchContracts();
  const siteContracts = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ARRAY as any)
  
  let contractNav: any = []
  
  siteContracts.forEach((contract: any) => {
    const navItem = contracts.contracts.TokenContract.find((item: any) => item.address === contract)
    if (navItem !== undefined) {
      contractNav.push(navItem)
    }
  });

  return {
    props: {
      contractNav
    }
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const Menu = styled.menu`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    color: var(--yellow);
    font-size: var(--text-04);
    margin-bottom: var(--space-lg);
    text-decoration: none;
    transition: transform 150ms var(--ease);
    &:hover {
      transform: scale(1.1);
    }
  }
`
