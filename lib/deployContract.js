var checkForTransactionReceipt = require("../lib/utils")
  .checkForTransactionReceipt;

var deployContract = function(web3, db, params, cb) {
  var response = {};
  var signedTx = params[0];
  var contractName = params[1];
  var contractAddr = params[2];
  var price = params[3];
  var username = params[4];
  web3.eth.sendRawTransaction("0x" + signedTx, function(err, hash) {
    if (!err) {
      var tx = {};
      tx.transactionHash = hash;
      tx._eth = web3.eth;
      response.message = "Contract deployment received. Please wait for the confirmation.";
      cb(response);
      checkForTransactionReceipt(tx, function(e, tx) {
        console.log(
          "Contract mined! " + "transaction hash: " + tx.transactionHash
        );
        db.put(contractAddr, [contractName, price, username], function(err) {
          if (err) return console.log("Ooops!", err);
          db.get(contractAddr, function(err, value) {
            if (err) return console.log("Ooops!", err);
            console.log("contractName = " + value);
          });
        });
      });
    } else console.log(err);
  });
};

module.exports = deployContract;
