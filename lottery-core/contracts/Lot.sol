// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "hardhat/console.sol";

contract LotteryTMT {
  // Lot Info
  // Total = 33 * 1 + 3 * 3 + 1 * 5 = 47
  // 後で時間を設定する！どれくらいなのか？みたいな！
  uint256 public constant FIRSTPrizeRatio = 33;
  uint256 public constant FIRSTNumber = 1;
  uint256 public constant SECONDPrizeRatio = 3;
  uint256 public constant SECONDNumber = 3;
  uint256 public constant THIRDPrizeRatio = 1;
  uint256 public constant THIRDNumber = 5;

  // Lot Structs
  struct LotChance {
    address payable userAddress;
    uint256 ids;
  }

  // i have to create lottery struct >> first buyer, and PRICE...
  // lotchances.length == 0 , >> add 1 !!!

  LotChance[] public lotChances;
  uint256 public randomNumber;
  address payable luckyPerson;
  uint256[] public lotNumbers;

  // Lot Join Fee
  uint256 public constant PRICE = 1;

  // Other Vars
  address payable public jp_bank;
  address payable[] public players;
  uint256 public lotteryId = 1;
  uint256 public purchasedLotNumber;
  bool public lotStarted;
  uint256 public lotTime;

  mapping(uint256 => address payable) public lotteryHistory;

  constructor() payable {
    jp_bank = payable(msg.sender);
  }

  // get user info of winner in the lottery
  function getWinnerByLottery(uint256 lottery)
    public
    view
    returns (address payable)
  {
    return lotteryHistory[lottery];
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getPlayersLength() public view returns (uint256) {
    return players.length;
  }

  function getUser(uint256 ids) internal {
    luckyPerson = payable(lotChances[ids].userAddress);
  }

  function getLotteryId() public view returns (uint256) {
    return lotteryId;
  }

  function getRandomNumber(uint256 i) internal {
    randomNumber =
      uint256(
        keccak256(abi.encodePacked(block.difficulty, block.timestamp, i))
      ) %
      lotChances.length;
    if (randomNumber == 0) {
      // if get 0, user has all 0, so it is difficult ....
      // if, this user is first buyer, you have to push more 1 lottery
      getRandomNumber(i);
    }
    console.log("RandomNumber is === ", randomNumber);
  }

  function getPurchasedNumber() public view returns (uint256[] memory l) {
    l = new uint256[](purchasedLotNumber);
    for (uint256 i = 0; i < purchasedLotNumber; i++) {
      if (msg.sender == lotChances[i].userAddress) {
        l[i] = lotChances[i].ids;
      }
    }
  }

  // this is test

  function getLotChancesLength() public view returns (uint256) {
    return lotChances.length;
  }

  function lotStart() public onlyOwner {
    lotStarted = true;
    lotTime = block.timestamp;
  }

  // User have to buy more than two
  function enter(uint256 buyNumber) public payable {
    require(msg.value > buyNumber * PRICE);
    require(
      lotStarted != false,
      "Lot have been not started yet. Please let me know by Twitter"
    );
    if (lotChances.length < 1) {
      for (uint256 i = 0; i < buyNumber + 1; i++) {
        lotChances.push(LotChance(payable(msg.sender), purchasedLotNumber));
        purchasedLotNumber++;
      }
    } else {
      for (uint256 i = 0; i < buyNumber; i++) {
        lotChances.push(LotChance(payable(msg.sender), purchasedLotNumber));
        purchasedLotNumber++;
      }
    }
  }

  function Keccahappyoooooo() public onlyOwner {
    require(lotChances.length > 9, "Lack of participants...");
    require(block.timestamp - lotTime > 1 days, "Insufficient Time");
    payTHREEWinner();
    paySecondWinner();
    payFirstWinner();
    // this is last movement to reset lottery
    lotteryHistory[lotteryId] = luckyPerson;
    console.log("Kekkahappyoooo luckey person is === ", luckyPerson);
    // ここに関しての情報はデラックスにしたいからstructを組んで考えよう！
    lotteryId++;
    delete lotChances;
    jp_bank.transfer(address(this).balance);
    lotStarted = false;
  }

  function getLotTime() public view returns (uint256) {
    require(lotTime > 0 && lotStarted == true, "akande!!!");
    return lotTime;
  }

  //　こんとらくとは一旦保留にする！とってくるとかの確認は後ででいい！増えすぎる！
  // add
  function getLotRestTime() public view returns (uint256) {
    require(lotTime > 0 && lotStarted == true, "akande!!!");
    require(block.timestamp - lotTime < 1 days, "Already finished!");
    return (block.timestamp - lotTime);
  }

  function getLuckyPerson(uint256 lotteryIds)
    public
    view
    returns (address payable)
  {
    return lotteryHistory[lotteryIds];
  }

  function payTHREEWinner() internal {
    // 1: getRandomNumber >> Do not allow duplicates >> global を更新するでも最終的にplayerの番号
    // > そのクジを弾く必要があるのか？いらない気がする！
    // 2: getUser from randomNumber
    uint256 prize = (address(this).balance * THIRDPrizeRatio) / 100;

    for (uint256 i = 0; i < THIRDNumber; i++) {
      getRandomNumber(i);
      getUser(randomNumber);
      luckyPerson.transfer(prize);
      console.log("THIRD PRIZE");
      console.log("No.", i);
      console.log("LuckyPerson", luckyPerson);
      console.log("-------------------------------");
    }
  }

  function paySecondWinner() internal {
    uint256 prize = (address(this).balance * SECONDPrizeRatio) / 100;

    for (uint256 i = 0; i < SECONDNumber; i++) {
      getRandomNumber(i);
      getUser(randomNumber);
      luckyPerson.transfer(prize);
      console.log("SECND PRIZE");
      console.log("No.", i);
      console.log("LuckyPerson", luckyPerson);
      console.log("-------------------------------");
    }
  }

  function payFirstWinner() internal {
    uint256 prize = (address(this).balance * FIRSTPrizeRatio) / 100;

    for (uint256 i = 0; i < FIRSTNumber; i++) {
      getRandomNumber(i);
      getUser(randomNumber);
      luckyPerson.transfer(prize);
      console.log("FIRST PRIZE");
      console.log("No.", i);
      console.log("LuckyPerson", luckyPerson);
      console.log("-------------------------------");
    }
  }

  modifier onlyOwner() {
    require(msg.sender == jp_bank);
    _;
  }
}
