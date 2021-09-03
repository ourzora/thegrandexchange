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

  return contractNav;
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
