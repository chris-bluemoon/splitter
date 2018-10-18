  var splitterContractInstance;

  function init() {

    var Web3 = require('web3');
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider());
    console.log("Calling init");

    var abi = [{
        "constant": false,
        "inputs": [],
        "name": "sendFromAlice",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getAliceAddress",
        "outputs": [{
          "name": "",
          "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getAliceBalance",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getBobAddress",
        "outputs": [{
          "name": "",
          "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getBobBalance",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getCarolAddress",
        "outputs": [{
          "name": "",
          "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getCarolBalance",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [{
          "name": "personAddr",
          "type": "address"
        }],
        "name": "getIndividualBalance",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getSplitterAddress",
        "outputs": [{
          "name": "",
          "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getSplitterBalance",
        "outputs": [{
          "name": "",
          "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
    var splitterContract = web3.eth.contract(abi);

    splitterContractInstance = splitterContract.at('0x238e959470a94165da0e2851ff8eeffb2296b7db');
    console.log(splitterContractInstance);
  }

  function getSplitterInfo() {
    // splitterContractInstance.getSplitterAddr(function(error, result) {
    //   if (!error) {
    //     // $("#aliceAddr").html(result);
    //     document.getElementById('headerAddr').innerText = 'Splitter Address: ' + result;
    //     console.log(result);
    //   } else
    //     console.error(error);
    // });
    splitterContractInstance.getSplitterBalance(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('headerBal').innerText = 'Splitter Balance: ' + result;
      } else
        console.error(error);
    });
    splitterContractInstance.getSplitterAddress(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('headerAddr').innerText = 'Splitter Contract: ' + result;
      } else
        console.error(error);
    });
    splitterContractInstance.getAliceAddress(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('aliceAddr').innerText = 'Address: ' + result;
      } else
        console.error(error);
    });
    splitterContractInstance.getAliceBalance(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('aliceBal').innerText = 'Balance: ' + result;
      } else
        console.error(error);
    });
    splitterContractInstance.getBobAddress(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('bobAddr').innerText = 'Address: ' + result;
      } else
        console.error(error);
    });
    splitterContractInstance.getBobBalance(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('bobBal').innerText = 'Balance: ' + result;
      } else
        console.error(error);
    });
    splitterContractInstance.getCarolAddress(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('carolAddr').innerText = 'Address: ' + result;
      } else
        console.error(error);
    });
    splitterContractInstance.getCarolBalance(function(error, result) {
      if (!error) {
        // $("#aliceAddr").html(result);
        document.getElementById('carolBal').innerText = 'Balance: ' + result;
      } else
        console.error(error);
    });
  }

  function watchBalance() {
    var coinbase = web3.eth.coinbase;

    var originalBalance = web3.eth.getBalance(coinbase).toNumber();
    document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
    document.getElementById('original').innerText = ' original balance: ' + originalBalance + '    watching...';

    web3.eth.filter('latest').watch(function() {
      var currentBalance = web3.eth.getBalance(coinbase).toNumber();
      document.getElementById("current").innerText = 'current: ' + currentBalance;
      document.getElementById("diff").innerText = 'diff:    ' + (currentBalance - originalBalance);
    });
  }

  // function sendFunds() {
  //   // $(“#submit button.set”).click(function() {
  //   // var value = $(“#submit input.text”).val();
  //   var params = {
  //   gas: 40000,
  //   from:
  //   value: 10
  //   };
  //   splitterContractInstance.sendTransaction.sendFromAlice(params);
  // }

  init();
  getSplitterInfo();

$(“#submit button.set”).click(function() {
var value = $(“#submit input.text”).val();
var params = {
gas: 40000,
from:
};
SimpleStorage.sendTransaction.set(value, params);
});
