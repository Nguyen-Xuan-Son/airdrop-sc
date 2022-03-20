import { Signer } from "ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  SToken,
  STokenAirdrop,
  STokenAirdrop__factory,
  SToken__factory,
} from "../typechain";
import {
  MARKETPLACE_ADDRESS,
  S_TEAM_ADDRESS,
  PUBLIC_SALE_ADDRESS,
  MARKETING_ADDRESS,
  SEED_INVESTOR_ADDRESS,
  COMMUNITY_ADDRESS,
  TOKEN_OWNER_ADDRESS,
  SIGNER_ADDRESS,
} from "../constant";

describe("Testing SToken", () => {
  let SToken: SToken;
  let STokenAirdrop: STokenAirdrop;
  let owner: Signer;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    SToken = await new SToken__factory(owner).deploy(
      MARKETPLACE_ADDRESS!,
      S_TEAM_ADDRESS!,
      PUBLIC_SALE_ADDRESS!,
      MARKETING_ADDRESS!,
      SEED_INVESTOR_ADDRESS!,
      COMMUNITY_ADDRESS!
    );

    STokenAirdrop = await new STokenAirdrop__factory(owner).deploy(
      SToken.address,
      TOKEN_OWNER_ADDRESS!,
      SIGNER_ADDRESS!
    );
  });

  describe("Metadata", () => {
    it("Name and symbol", async () => {
      console.log("SToken", SToken.address);
      console.log("STokenAirdrop", STokenAirdrop.address);
    });
  });
});
