var SmartContractList = require("../SmartContract/SmartContractList");

var loadContract = function(web3, db, timestamp, params, cb) {
  var response = {};
  var state = params[0];
  var timestamp = params[1];
  var walletAddress = "0x" + params[2];
  db.createReadStream()
    .on("data", function(data) {
      var address = data.key.toString();
      var contractName = data.value.toString().split(",")[0];
      var price = data.value.toString().split(",")[1];
      var username = data.value.toString().split(",")[2];
      var abi = JSON.parse(SmartContractList[contractName].abi);
      var contract = web3.eth.contract(abi).at(address);
      console.log(contract.seller.apply(null, []));
      console.log(walletAddress);
      if (state == 0) {
        if (contract.state.apply(null, []).toNumber() == 0) {
          response[address] = [];
          response[address].push(contractName);
          if (contractName == "Sell") {
            response[address].push(
              web3.fromWei(contract.sellerDeposit.apply(null, [])).toNumber() /
                2
            );
          } else if (contractName == "Buy") {
            response[address].push(
              web3.fromWei(contract.buyerDeposit.apply(null, [])).toNumber()
            );
          }
          response[address].push(price);
          response[address].push(username);
        }
      } else if (state == 1) {
        if (
          contract.state.apply(null, []).toNumber() == 1 &&
          (contract.seller.apply(null, []) == walletAddress ||
            contract.buyer.apply(null, []) == walletAddress)
        ) {
          console.log("123");
          response[address] = [];
          response[address].push(contractName);
          if (contractName == "Sell") {
            response[address].push(
              web3.fromWei(contract.sellerDeposit.apply(null, [])).toNumber() /
                2
            );
          } else if (contractName == "Buy") {
            response[address].push(
              web3.fromWei(contract.buyerDeposit.apply(null, [])).toNumber()
            );
          }
          response[address].push(price);
          response[address].push(username);
        }
      } else if (state == 2) {
        if (
          contract.state.apply(null, []).toNumber() == 0 &&
          (contract.seller.apply(null, []) == walletAddress ||
            contract.buyer.apply(null, []) == walletAddress)
        ) {
          response[address] = [];
          response[address].push(contractName);
          if (contractName == "Sell") {
            response[address].push(
              web3.fromWei(contract.sellerDeposit.apply(null, [])).toNumber() /
                2
            );
          } else if (contractName == "Buy") {
            response[address].push(
              web3.fromWei(contract.buyerDeposit.apply(null, [])).toNumber()
            );
          }
          response[address].push(price);
          response[address].push(username);
        }
      }
    })
    .on("error", function(err) {
      console.log("Oh my!", err);
    })
    .on("close", function() {
      console.log("Stream closed");
    })
    .on("end", function() {
      response.timestamp = timestamp;
      response.SmartContractList = SmartContractList;
      console.log("Stream ended");
      cb(response);
    });
};

module.exports = loadContract;
