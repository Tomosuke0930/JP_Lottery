// SPDX-License-Identifier: MIT
pragma solidity =0.8.14;

/// @title TomLot
/// @author tom_eth_dev: Twitter >> https://twitter.com/tom_eth_dev
/// @notice You can buy lots on this contract. If you are lucky, you can get more TomoFinanceToken!!!

contract TomLot {
  // Lot Info : Total = 33 * 1 + 3 * 3 + 1 * 5 = 47
  uint8 public constant FIRSTPrizeRatio = 33;
  uint8 public constant FIRSTNumber = 1;
  uint8 public constant SECONDPrizeRatio = 3;
  uint8 public constant SECONDNumber = 3;
  uint8 public constant THIRDPrizeRatio = 1;
  uint8 public constant THIRDNumber = 5;
  // Lot Join Fee
  uint8 public constant PRICE = 1;
  uint8 public lotteryId = 1; // 8 * 8 = 64

  uint96 public lotTime;
  uint96 public purchasedLotNumber; // 96 * 2 = 192 >>  64 + 192 = 256 >> 0 slot

  uint256 public randomNumber; // >> 1slot

  // Other Vars
  address payable luckyPerson;
  address payable public jp_bank;
  uint32[] public lotNumbers;
  LotChance[] public lotChances;
  address payable[] public players;

  bool public lotStarted; //ここもoptimizeできるよ！

  // Lot Structs
  struct LotChance {
    address payable userAddress;
    uint32 ids;
  }
  mapping(uint32 => address payable) public lotteryHistory;

  constructor() payable {
    jp_bank = payable(msg.sender);
  }

  receive() external payable {}

  // External functions

  function buyLots(uint256 buyNumber) external payable {
    require(msg.value > buyNumber * PRICE);
    require(
      lotStarted != false,
      "Lot have been not started yet. Please let me know by Twitter"
    );
    if (lotChances.length < 1) {
      for (uint256 i = 0; i < buyNumber + 1; i++) {
        lotChances.push(
          LotChance(payable(msg.sender), uint32(purchasedLotNumber))
        );
        purchasedLotNumber++;
      }
    } else {
      for (uint256 i = 0; i < buyNumber; i++) {
        lotChances.push(
          LotChance(payable(msg.sender), uint32(purchasedLotNumber))
        );
        purchasedLotNumber++;
      }
    }
  }

  // External function that are onlyOwner

  function lotStart() external onlyOwner {
    lotStarted = true;
    lotTime = uint64(block.timestamp);
  }

  function Keccahappyoooooo() external onlyOwner {
    require(lotChances.length > 9, "Lack of participants...");
    require(block.timestamp - lotTime > 1 days, "Insufficient Time");
    payTHREEWinner();
    paySecondWinner();
    payFirstWinner();
    // this is last movement to reset lottery
    lotteryHistory[lotteryId] = luckyPerson;

    // ここに関しての情報はデラックスにしたいからstructを組んで考えよう！
    lotteryId++;
    delete lotChances;
    jp_bank.transfer(address(this).balance);
    lotStarted = false;
  }

  // External functions that are view

  function getBalance() external view returns (uint256) {
    return address(this).balance;
  }

  function getLotteryId() external view returns (uint256) {
    return lotteryId;
  }

  function getPlayersLength() external view returns (uint256) {
    return players.length;
  }

  function getLotChancesLength() external view returns (uint256) {
    return lotChances.length;
  }

  function getLotRestTime() external view returns (uint256) {
    require(lotTime > 0 && lotStarted == true, "akande!!!");
    require(block.timestamp - lotTime < 1 days, "Already finished!");
    return block.timestamp - lotTime;
  }

  function getPurchasedNumber() external view returns (uint64[] memory l) {
    l = new uint64[](purchasedLotNumber);
    for (uint64 i = 0; i < purchasedLotNumber; i++) {
      if (msg.sender == lotChances[i].userAddress) {
        l[i] = lotChances[i].ids;
      }
    }
  }

  function getLuckyPerson(uint32 lotteryIds)
    external
    view
    returns (address payable)
  {
    return lotteryHistory[lotteryIds];
  }

  // Private functions

  function getUserAddr(uint256 ids) private returns (address) {
    return luckyPerson = payable(lotChances[ids].userAddress);
  }

  function createRandomNumber(uint256 i)
    private
    returns (uint256 _randomNumber)
  {
    randomNumber =
      uint256(
        keccak256(abi.encodePacked(block.difficulty, block.timestamp, i))
      ) %
      lotChances.length;
    if (randomNumber == 0) createRandomNumber(i);
    _randomNumber = randomNumber;
  }

  function payTHREEWinner() private {
    uint256 prize = (address(this).balance * THIRDPrizeRatio) / 100;

    for (uint256 i = 0; i < THIRDNumber; i++) {
      createRandomNumber(i);
      uint256 _randomNumber = randomNumber;
      getUserAddr(_randomNumber);
      luckyPerson.transfer(prize);
    }
  }

  function paySecondWinner() private {
    uint256 prize = (address(this).balance * SECONDPrizeRatio) / 100;

    for (uint256 i = 0; i < SECONDNumber; i++) {
      createRandomNumber(i);
      uint256 _randomNumber = randomNumber;
      getUserAddr(_randomNumber);
      luckyPerson.transfer(prize);
    }
  }

  function payFirstWinner() private {
    uint256 prize = (address(this).balance * FIRSTPrizeRatio) / 100;

    for (uint256 i = 0; i < FIRSTNumber; i++) {
      createRandomNumber(i);
      uint256 _randomNumber = randomNumber;
      getUserAddr(_randomNumber);
      luckyPerson.transfer(prize);
    }
  }

  modifier onlyOwner() {
    require(msg.sender == jp_bank);
    _;
  }
}
