import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const { BSCSCAN_API_KEY, PRIVATE_KEY, REPORT_GAS } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [PRIVATE_KEY!],
    },
  },
  gasReporter: {
    enabled: +REPORT_GAS! === 1,
    currency: "USD",
  },
  etherscan: {
    apiKey: BSCSCAN_API_KEY!,
  },
};

export default config;
