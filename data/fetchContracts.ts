/*
Expects Array set in .env

NEXT_PUBLIC_CONTRACT_ARRAY=[
  "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7",
  "0x7AFe30cB3E53dba6801aa0EA647A0EcEA7cBe18d",
  "0x42A87e04f87A038774fb39c0A61681e7e859937b",
  "0xdEcC60000ba66700a009b8F9F7D82676B5cfA88A"
]
*/

import fetch from "cross-fetch";

async function fetchGraphQL() {
  const query = `
    query tokenContracts @cached {
      TokenContract {
        address
        name
        symbol
      }
    }
	`;
  const reqBody = JSON.stringify({
    query,
    operationName: "tokenContracts",
  });
  const result = await fetch(
    process.env.NEXT_PUBLIC_INDEXER_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-hasura-role": "anonymous",
      },
      body: reqBody,
    }
  );
  return result;
}

export function handleResponse(json: any) {
  let contractNav: any = []
    
  /* Dain todo: need to convert array of objects from env */
  // NEXT_PUBLIC_CONTRACT_ARRAY=[{"address":"0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7","rarity":true},{"address":"0x7AFe30cB3E53dba6801aa0EA647A0EcEA7cBe18d",rarity:false},{address:"0x42A87e04f87A038774fb39c0A61681e7e859937b",rarity:false},{address:"0xdEcC60000ba66700a009b8F9F7D82676B5cfA88A",rarity:false}]
  
  const siteContracts = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ARRAY as any)

  if (json.error) {
    console.error(JSON.stringify(json.error, null, 2));
    throw new Error("error");
  } else if (json.data !== undefined) {
    siteContracts.forEach((contract: any) => {
      const navItem = json.data.TokenContract.find((item: any) => item.address === contract)
      if (navItem !== undefined) {
        contractNav.push(navItem)
      }
    });
  }
  return contractNav
}

export async function fetchContracts() {
  const serverResponse = await fetchGraphQL();
  
  if (serverResponse.status !== 200) {
    console.error(await serverResponse.text());
    throw new Error("server error");
  }
  
  const json = await serverResponse.json();
  return handleResponse(json);
}
