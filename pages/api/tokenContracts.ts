import { fetchContracts } from "../../data/fetchContracts";

module.exports = async (req: any, res: any) => {
  const contracts = await fetchContracts();
  res.status(200).json(contracts);
};