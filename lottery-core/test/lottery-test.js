const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    aliceAddress = await alice.getAddress();
    bobAddress = await bob.getAddress();
  });

  it("", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();
    console.log("Contract Address === ", lottery.address);
    console.log("Contract Owner   ===", owner.address);
    console.log("owner balance === ", owner.address.balance);

    expect(await lottery.greet()).to.equal("HelloWolrd");
  });
});
