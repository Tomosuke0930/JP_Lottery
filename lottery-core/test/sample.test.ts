import { ethers } from "hardhat";
import { expect } from "chai";

describe("Lottery", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    expect(await lottery.greet()).to.equal("HelloWolrd");
    console.log("----- HelloWorld -----");
  });
});
