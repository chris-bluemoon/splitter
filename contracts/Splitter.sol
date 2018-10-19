pragma solidity ^0.4.23;

import "./SafeMath.sol";

contract Splitter {

  using SafeMath for uint;

  address aliceAddress;
  address bobAddress;
  address carolAddress;
  address owner;
  bool stopped;

  mapping(address => uint) balances;

  constructor(address _aliceAddress, address _bobAddress, address _carolAddress) public {
    aliceAddress = _aliceAddress;
    bobAddress = _bobAddress;
    carolAddress = _carolAddress;
    owner = msg.sender;
  }

   event LogFundsDistributed(address, address, uint, address, uint);

  modifier isAdmin() {
    if(msg.sender != owner) {
        revert();
    }
    _;
  }

   function toggleContractActive() isAdmin public
   {
    // You can add an additional modifier that restricts stopping a contract to be based on another action, such as a vote of users
     stopped = !stopped;
   }

   modifier stopInEmergency { if (!stopped) _; }
   modifier onlyInEmergency { if (stopped) _; }


  function splitFunds(uint fundAmount) internal pure returns (uint splitAmount, uint remainder) {
    remainder = fundAmount.mod(2);
    splitAmount = fundAmount.div(2);
    return (splitAmount, remainder);
  }

  function receiveFunds() stopInEmergency public payable {
     require (msg.sender == aliceAddress);
     require (msg.value > 0);
     uint amount = msg.value;
     uint splitAmount;
     uint remainder;
     (splitAmount, remainder) = splitFunds(amount);
     balances[bobAddress] += splitAmount;
     bobAddress.transfer(splitAmount);
     balances[carolAddress] += splitAmount;
     carolAddress.transfer(splitAmount);
     if (remainder > 0) {
       msg.sender.transfer(remainder);
     }
     emit LogFundsDistributed(bobAddress, carolAddress, splitAmount, msg.sender, remainder);
  }

  function getBalances() public view returns (uint, uint, uint) {
    return (aliceAddress.balance, bobAddress.balance, carolAddress.balance);
  }

  function getMappingBalances() public view returns (uint, uint, uint) {
    return (balances[aliceAddress], balances[bobAddress], balances[carolAddress]);
  }

}
