import { ethers } from "hardhat";
import { expect } from "chai";

describe("TomoToken", function () {
  before(async function () {
    this.TomoToken = await ethers.getContractFactory("TomoToken");
    this.signers = await ethers.getSigners();
    this.alice = this.signers[0];
    this.bob = this.signers[1];
    this.carol = this.signers[2];
  });

  beforeEach(async function () {
    console.log("¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥");
    this.tmt = await this.TomoToken.deploy();
    console.log("##################");
    await this.tomo.deployed();
  });

  it("some messages", async function () {
    const name = await this.tmt.name();
    const symbol = await this.tmt.symbol();
    const decimals = await this.tmt.decimals();
    expect(name, "TomoToken");
    expect(symbol, "TMT");
    expect(decimals, "18");

    console.log("name === ", name);
  });

  it("mint!!!", async function () {
    await this.tmt.mint(this.alice.address, "100");
    await this.tmt.mint(this.bob.address, "1000");
    await expect(
      this.tmt
        .connect(this.bob)
        .mint(this.carol.address, "1000", { from: this.bob.address })
    ).to.be.revertedWith("Ownable: caller is not the owner");

    const totalSupply = await this.sushi.totalSupply();
    const aliceBal = await this.tmt.balanceOf(this.alice.address);
    const bobBal = await this.tmt.balanceOf(this.bob.address);
    const carolBal = await this.tmt.balanceOf(this.carol.address);
    expect(totalSupply).to.equal("1100");
    expect(aliceBal).to.equal("100");
    expect(bobBal).to.equal("1000");
    expect(carolBal).to.equal("0");
  });
});
