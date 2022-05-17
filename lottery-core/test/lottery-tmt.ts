// import {
//   ADDRESS_ZERO,
//   advanceBlock,
//   advanceBlockTo,
//   advanceTime,
//   advanceTimeAndBlock,
//   deploy,
//   getBigNumber,
//   prepare,
// } from "./utilities";
// import { assert, expect } from "chai";

// import { ethers } from "hardhat";

// describe("LotteryTMT.test", function () {

//   before(async function () {
//     await prepare(this, ["MiniChefV2", "SushiToken", "ERC20Mock", "RewarderMock", "RewarderBrokenMock"])
//   })
//   beforeEach(async function () => {
//     [owner, alice, bob] = await ethers.getSigners();
//     ownerAddress = await owner.getAddress();
//     aliceAddress = await alice.getAddress();
//     bobAddress = await bob.getAddress();
//   });
//   // balanceをみよう

//   it("", async function () {
//     const Lottery = await ethers.getContractFactory("Lottery");
//     const lottery = await Lottery.deploy();
//     await lottery.deployed();
//     console.log("Contract Address === ", lottery.address);
//     console.log("Contract Owner   ===", owner.address);
//     console.log("owner balance === ", owner.address.balance);

//     expect(await lottery.greet()).to.equal("HelloWolrd");
//   });
// });
