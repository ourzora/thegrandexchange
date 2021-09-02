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
  
  if (json.error) {
    console.error(JSON.stringify(json.error, null, 2));
    throw new Error("error");
  }
  return {
    contracts: json.data
  };
}

export async function fetchContracts() {
  const serverResponse = await fetchGraphQL();
  
  if (serverResponse.status !== 200) {
    console.error(await serverResponse.text());
    throw new Error("server error");
  }
  console.log(serverResponse)
  
  const json = await serverResponse.json();
  return handleResponse(json);
}
