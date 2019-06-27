// 引入WebSocket模块
var getCoinPrice = require("./lib/huobipro/getCoinPrice");
var getRMBRate = require("./lib/getRMBRate");
var SmartContractList = require("./SmartContract/SmartContractList");

//var ws = require('nodejs-websocket')
var http = require("http");
var PORT = 3000;
var levelup = require("levelup");
var leveldown = require("leveldown");
var db = levelup(leveldown("./SmartContractDB"));
//var hysd = levelup(leveldown('./hysd'))

var checkForTransactionReceipt = require("./lib/utils")
  .checkForTransactionReceipt;
var balance = require("./lib/balance");
var purchase = require("./lib/purchase");
var transfer = require("./lib/transfer");
var sendTx = require("./lib/sendTx");
var loadContract = require("./lib/loadContract");
var deployContract = require("./lib/deployContract");

var BTCRate = 100; //Sotashi/B
var ETHRate = 1000000000; //Wei/Gas

var crawlData = {};
getCoinPrice("eth", "usdt", crawlData);
getRMBRate(crawlData);
setInterval(getCoinPrice, 1000, "eth", "usdt", crawlData);
setInterval(getRMBRate, 10000, crawlData);

var server = http
  .createServer(function(req, res) {
    //创建空字符叠加数据片段
    var data = "";

    //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
    req.on("data", function(chunk) {
      // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
      data += chunk;
    });

    // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
    //注册end事件，所有数据接收完成会执行一次该方法
    req.on("end", function() {
      //（1）.对url进行解码（url会对中文进行编码）
      data = decodeURI(data);
      //console.log(data);

      /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

      //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
      //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
      try {
        var dataObject = JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
      console.log("Received:\n ");
      console.log(dataObject);

      // const HttpProvider = "http://192.168.1.9:8100";
      const HttpProvider = "http://127.0.0.1:8100";
      //const HttpProvider = "http://localhost:8100"
      var Web3 = require("web3");
      if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
      }

      try {
        for (var key in dataObject) {
          if (key === "coinPrice") {
            res.writeHead(200, {
              "content-type": "text/plain"
            });
            console.log(crawlData);
            res.write(JSON.stringify(crawlData));
            res.end();
          }
          if (key === "balance") {
            balance(web3, dataObject[key], response => {
              res.writeHead(200, {
                "content-type": "text/plain"
              });
              console.log(response);
              res.write(JSON.stringify(response));
              res.end();
            });
          }
          if (key === "transfer") {
            transfer(web3, BTCRate, ETHRate, dataObject[key], response => {
              res.writeHead(200, {
                "content-type": "text/plain"
              });
              res.write(JSON.stringify(response));
              res.end();
            });
          }
          if (key === "signedTx") {
            sendTx(web3, dataObject[key], response => {
              res.writeHead(200, {
                "content-type": "text/plain"
              });
              res.write(JSON.stringify(response));
              res.end();
            });
          }
          if (key === "gasLimitAndNonce") {
            var response = {};
            var txOptions = {};
            txOptions = dataObject[key][0];
            var address = dataObject[key][1];
            response.gasLimit = web3.eth.estimateGas(txOptions);
            response.nonce = web3.eth.getTransactionCount(address);
            res.writeHead(200, {
              "content-type": "text/plain"
            });
            res.write(JSON.stringify(response));
            res.end();
          }
          if (key === "deployContract") {
            deployContract(web3, db, dataObject[key], response => {
              res.writeHead(200, {
                "content-type": "text/plain"
              });
              res.write(JSON.stringify(response));
              res.end();
            });
          }
          if (key === "loadContract") {
            var timestamp = dataObject[key][1];
            loadContract(web3, db, timestamp, dataObject[key], response => {
              res.writeHead(200, {
                "content-type": "text/plain"
              });
              res.write(JSON.stringify(response));
              res.end();
            });
          }
          if (key === "listContractTemplate") {
            var response = {};
            response.ContractTemplateList = SmartContractList;
            res.writeHead(200, {
              "content-type": "text/plain"
            });
            res.write(JSON.stringify(response));
            res.end();
          }
          if (key === "callContract") {
            var response = {};
            var abi = JSON.parse(dataObject[key].pop());
            var address = dataObject[key].pop();
            var functionName = dataObject[key].pop();
            var args = dataObject[key].pop();
            var contract = web3.eth.contract(abi).at(address);
            response.result = contract[functionName].apply(null, args);
            console.log(response);
            res.writeHead(200, {
              "content-type": "text/plain"
            });
            res.write(JSON.stringify(response));
            res.end();
          }
          if (key === "purchase") {
            purchase(web3, dataObject[key], response => {
              res.writeHead(200, {
                "content-type": "text/plain"
              });
              res.write(JSON.stringify(response));
              res.end();
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  })
  .listen(PORT);

console.log("http server listening on port " + PORT);
