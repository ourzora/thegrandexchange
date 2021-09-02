export const transformThumbnailURI = (mediaUri: string) =>
  mediaUri.replace(/^ipfs?:\/\//, 'https://ipfs.io/ipfs/')