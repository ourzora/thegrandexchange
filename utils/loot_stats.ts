import { ORDERS_API_BASE_URI } from "./constants";

export interface LootOrder {
  eth_price: number;
  group_timestamp: number;
  contract_address: string;
  token_id: number;
  sale_link: string;
}

export interface FloorInfo {
  price: number;
  order: LootOrder;
}

export interface FloorPrices {
  floor: FloorInfo;
  demon: FloorInfo;
  divine_robes: FloorInfo;
  katanas: FloorInfo;
  ancient_helms: FloorInfo;
  updated_at: number;
}

export const fetchLootStats = async () => {
  const res = await fetch(`${ORDERS_API_BASE_URI}/loot_stats`);
  const resData = await res.json();
  return resData as FloorPrices;
}