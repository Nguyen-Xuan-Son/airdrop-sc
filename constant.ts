import * as dotenv from "dotenv";
dotenv.config();

const {
  BSCSCAN_API_KEY,
  PRIVATE_KEY,
  REPORT_GAS,
  MARKETPLACE_ADDRESS,
  S_TEAM_ADDRESS,
  PUBLIC_SALE_ADDRESS,
  MARKETING_ADDRESS,
  SEED_INVESTOR_ADDRESS,
  COMMUNITY_ADDRESS,
} = process.env;

export {
  BSCSCAN_API_KEY,
  PRIVATE_KEY,
  REPORT_GAS,
  MARKETPLACE_ADDRESS,
  S_TEAM_ADDRESS,
  PUBLIC_SALE_ADDRESS,
  MARKETING_ADDRESS,
  SEED_INVESTOR_ADDRESS,
  COMMUNITY_ADDRESS,
};
