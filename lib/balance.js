var spawn = require("child_process").spawn;

var balance = function(web3, params, cb) {
  var response = {};
  var address = params[0];
  var coinType = params[1];
  if (coinType == "BTC") {
    var completeData = "";
    var bitcoinBalance = spawn("bitcoin-cli", [
      "listunspent",
      "6",
      "9999999",
      `["${address}"]`
    ]);
    bitcoinBalance.stdout.on("data", function(data) {
      completeData += data;
      //console.log('standard output:\n' + data);
    });

    // 捕获标准错误输出并将其打印到控制台
    bitcoinBalance.stderr.on("data", function(data) {
      console.log("standard error output:\n" + data);
    });

    // 注册子进程关闭事件
    bitcoinBalance.on("exit", function(code, signal) {
      console.log("child process exit ,exit:" + code);
      var UTXOs = JSON.parse(completeData);
      var balance = 0;
      for (var i = 0; i < UTXOs.length; i++) {
        //console.log(UTXOs[i].amount)
        balance += UTXOs[i].amount;
      }
      console.log(balance);
      response.balance = balance;
      cb(response);
    });
  }
  if (coinType == "ETH") {
    var balance = web3.eth.getBalance(address);
    response.balance = web3.fromWei(balance);
    cb(response);
  }
};

module.exports = balance;
