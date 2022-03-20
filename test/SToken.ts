import { Signer } from "ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SToken, SToken__factory } from "../typechain";
import {
  MARKETPLACE_ADDRESS,
  S_TEAM_ADDRESS,
  PUBLIC_SALE_ADDRESS,
  MARKETING_ADDRESS,
  SEED_INVESTOR_ADDRESS,
  COMMUNITY_ADDRESS,
} from "../constant";

describe("Testing SToken", () => {
  let SToken: SToken;
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
  });

  describe("Metadata", () => {
    it("Name and symbol", async () => {
      expect(await SToken.name()).to.equal("S TOKEN");
      expect(await SToken.symbol()).to.equal("STK");
    });
    it("Decimal", async () => {
      expect(await SToken.decimals()).to.equal(18);
    });
  });

  describe("Balance Of", () => {
    it("MARKETPLACE", async () => {
      expect(await SToken.balanceOf(MARKETPLACE_ADDRESS!)).to.equal(
        ethers.BigNumber.from(3 * 10 ** 7).mul(
          ethers.BigNumber.from(10).pow(18)
        )
      );
    });
    it("S_TEAM", async () => {
      expect(await SToken.balanceOf(S_TEAM_ADDRESS!)).to.equal(
        ethers.BigNumber.from(25 * 10 ** 6).mul(
          ethers.BigNumber.from(10).pow(18)
        )
      );
    });
    it("PUBLIC_SALE", async () => {
      expect(await SToken.balanceOf(PUBLIC_SALE_ADDRESS!)).to.equal(
        ethers.BigNumber.from(13 * 10 ** 6).mul(
          ethers.BigNumber.from(10).pow(18)
        )
      );
    });
    it("MARKETING", async () => {
      expect(await SToken.balanceOf(MARKETING_ADDRESS!)).to.equal(
        ethers.BigNumber.from(10 * 10 ** 6).mul(
          ethers.BigNumber.from(10).pow(18)
        )
      );
    });
    it("SEED_INVESTOR", async () => {
      expect(await SToken.balanceOf(SEED_INVESTOR_ADDRESS!)).to.equal(
        ethers.BigNumber.from(7 * 10 ** 6).mul(
          ethers.BigNumber.from(10).pow(18)
        )
      );
    });
    it("COMMUNITY", async () => {
      expect(await SToken.balanceOf(COMMUNITY_ADDRESS!)).to.equal(
        ethers.BigNumber.from(5 * 10 ** 6).mul(
          ethers.BigNumber.from(10).pow(18)
        )
      );
    });
  });
});
