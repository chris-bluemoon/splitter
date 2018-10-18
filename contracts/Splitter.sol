pragma solidity ^0.4.23;

contract Splitter {

  /* address aliceAddr = address(0xc639c631b7266ff3db41c6ea47a2327f9ccd7b6c);
  address bobAddr = address(0xec6d6bf5c78b472a09dad4ff28b5515133214d20);
  address carolAddr = address(0xb77ae4cb57931d8a5129860372bc28b43ee606b6); */

  address aliceAddr = address(0x163935d8bc423c74aae135d14d21711c8e5216e5);
  address bobAddr = address(0x8b070595588afe0cd0b46ef0129edf70bcfed99d);
  address carolAddr = address(0x6985c56691276c72720a67740db96300effffab2);

  constructor(address alice, ) public {

  }

  function getSplitterAddress() public view returns (address){
    return address(this);
  }

  function getSplitterBalance() public view returns (uint){
    return address(this).balance;
  }

  function getIndividualBalance(address personAddr) public view returns (uint) {
    return address(personAddr).balance;
  }

  function getAliceBalance() public view returns (uint) {
    return aliceAddr.balance;
  }

  function getBobBalance() public view returns (uint) {
    return bobAddr.balance;
  }

  function getCarolBalance() public view returns (uint) {
    return carolAddr.balance;
  }

  function getAliceAddress() public view returns (address) {
    return aliceAddr;
  }

  function getBobAddress() public view returns (address) {
    return bobAddr;
  }

  function getCarolAddress() public view returns (address) {
    return carolAddr;
  }

  function sendFromAlice() payable public returns (uint) {
    uint fullAmount = msg.value;
    uint bobAmount = fullAmount / 2;
    uint carolAmount = fullAmount / 2;

    bobAddr.transfer(bobAmount);
    carolAddr.transfer(carolAmount);
    return bobAmount;

  }

}
