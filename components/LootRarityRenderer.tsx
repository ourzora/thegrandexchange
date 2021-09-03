import useSWR from "swr";
import { rarityImage } from "loot-rarity";

// These are missing from the @zoralabs/nft-components
// exports so we redeclare them.
const RENDERING_PREFERENCE_INVALID = -1;
const RENDERING_PREFERENCE_NORMAL = 2;

export default {
  getRenderingPreference: (request: any) =>
    request.media.image || request.media.content?.type?.startsWith("image/")
      ? RENDERING_PREFERENCE_NORMAL
      : RENDERING_PREFERENCE_INVALID,
  render(props: any) {
    const image = props?.request?.metadata?.image;
    const { data: src } = useSWR(image, rarityImage);
    return <img src={src} alt="" />;
  },
};
