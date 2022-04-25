// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Lottery {
  // Lot Info
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
  LotChance[] public lotChances;
  uint256 public randomNumber;
  address payable luckyPerson;
  uint256[] public lotNumbers;

  // Lot Join Fee
  uint256 public constant PRICE = 0.001 ether;

  // Other Vars
  address public jp_bank;
  address payable[] public players;
  uint256 public lotteryId;
  uint256 public purchasedLotNumber;

  mapping(uint256 => address payable) public lotteryHistory;

  constructor() {
    jp_bank = msg.sender;
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

  function getPlayers() public view returns (address payable[] memory) {
    return players;
  }

  // User have to buy more than two
  function enter(uint256 buyNumber) public payable {
    require(buyNumber > 1, "<<<<<<Buy more than 1>>>>>>");
    require(msg.value > buyNumber * PRICE);
    for (uint256 i = 0; i < buyNumber; i++) {
      lotChances.push(LotChance(payable(msg.sender), purchasedLotNumber));
      purchasedLotNumber++;
    }
  }

  function getUser(uint256 ids) internal {
    luckyPerson = payable(lotChances[ids].userAddress);
  }

  function getRandomNumber(uint256 i) internal {
    randomNumber =
      uint256(
        keccak256(abi.encodePacked(block.difficulty, block.timestamp, i))
      ) %
      lotChances.length;
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
  function greet() public pure returns (string memory) {
    return "HelloWolrd";
  }

  function Keccahappyoooooo() public onlyOwner {
    require(lotChances.length > 9, "Lack of participants...");
    payTHREEWinner();
    paySecondWinner();
    payFirstWinner();
    // this is last movement to reset lottery
    lotteryHistory[lotteryId] = luckyPerson;
    // ここに関しての情報はデラックスにしたいからstructを組んで考えよう！
    lotteryId++;

    // players = new address payable[](0);

    // address payable[] public players;
    // LotChance[] public lotChances;

    // lotChances = new LotChance[](0);
    // dynamic arrayはあかん！
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
    }
  }

  function paySecondWinner() internal {
    uint256 prize = (address(this).balance * SECONDPrizeRatio) / 100;

    for (uint256 i = 0; i < SECONDNumber; i++) {
      getRandomNumber(i);
      getUser(randomNumber);
      luckyPerson.transfer(prize);
    }
  }

  function payFirstWinner() internal {
    uint256 prize = (address(this).balance * FIRSTPrizeRatio) / 100;

    for (uint256 i = 0; i < FIRSTNumber; i++) {
      getRandomNumber(i);
      getUser(randomNumber);
      luckyPerson.transfer(prize);
    }
  }

  modifier onlyOwner() {
    require(msg.sender == jp_bank);
    _;
  }
}

//買った人がわかる関数を見るの大切！
