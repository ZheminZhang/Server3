/* 买单合约 */

var abi =
  '[{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"abort","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sellerDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"confirmReceived","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyerDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"confirmPurchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"Aborted","type":"event"},{"anonymous":false,"inputs":[],"name":"PurchaseConfirmed","type":"event"},{"anonymous":false,"inputs":[],"name":"PaymentReceived","type":"event"}]';
var bin =
  "608060405233600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346001819055506000600260015481151561005c57fe5b061415156100d2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4275796572206465706f7369742068617320746f206265206576656e2e00000081525060200191505060405180910390fd5b610997806100e16000396000f3fe608060405260043610610088576000357c01000000000000000000000000000000000000000000000000000000009004806308551a531461008d57806335a063b4146100e45780634c1786ea146100fb5780637150d8ae1461012657806373fac6f01461017d578063a057958714610194578063c19d93fb146101bf578063d6960697146101f8575b600080fd5b34801561009957600080fd5b506100a2610202565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100f057600080fd5b506100f9610228565b005b34801561010757600080fd5b5061011061045e565b6040518082815260200191505060405180910390f35b34801561013257600080fd5b5061013b610464565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561018957600080fd5b5061019261048a565b005b3480156101a057600080fd5b506101a961072b565b6040518082815260200191505060405180910390f35b3480156101cb57600080fd5b506101d4610731565b604051808260028111156101e457fe5b60ff16815260200191505060405180910390f35b610200610744565b005b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4f6e6c792062757965722063616e2063616c6c20746869732e0000000000000081525060200191505060405180910390fd5b60008060028111156102fb57fe5b600360149054906101000a900460ff16600281111561031657fe5b14151561038b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f496e76616c69642073746174652e00000000000000000000000000000000000081525060200191505060405180910390fd5b7f72c874aeff0b183a56e2b79c71b46e1aed4dee5e09862134b8821ba2fddbf8bf60405160405180910390a16002600360146101000a81548160ff021916908360028111156103d657fe5b0217905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f1935050505015801561045a573d6000803e3d6000fd5b5050565b60005481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561054f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f4f6e6c792073656c6c65722063616e2063616c6c20746869732e00000000000081525060200191505060405180910390fd5b600180600281111561055d57fe5b600360149054906101000a900460ff16600281111561057857fe5b1415156105ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f496e76616c69642073746174652e00000000000000000000000000000000000081525060200191505060405180910390fd5b7f7128ad733d5a1939f75b6dfdd7005c9398a0e64b969794de118683c0082caf0860405160405180910390a16002600360146101000a81548160ff0219169083600281111561063857fe5b0217905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6000549081150290604051600060405180830381858888f193505050501580156106a7573d6000803e3d6000fd5b50600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050158015610727573d6000803e3d6000fd5b5050565b60015481565b600360149054906101000a900460ff1681565b600080600281111561075257fe5b600360149054906101000a900460ff16600281111561076d57fe5b1415156107e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f496e76616c69642073746174652e00000000000000000000000000000000000081525060200191505060405180910390fd5b60006002348115156107f057fe5b0614801561080c575060015460023481151561080857fe5b0411155b801561081a57506001543410155b80151561082657600080fd5b7fd5d55c8a68912e9a110618df8d5e2e83b8d83211c57a8ddd1203df92885dc88160405160405180910390a133600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600360146101000a81548160ff021916908360028111156108b257fe5b02179055503460008190555060015460026000548115156108cf57fe5b04101561095257600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600260005481151561092057fe5b04600154039081150290604051600060405180830381858888f19350505050158015610950573d6000803e3d6000fd5b505b600260005481151561096057fe5b04600181905550505056fea165627a7a7230582025d6c12d1af309d9d25585d8fcdf5f020da641ed525f5a804c578ed05e1cae940029";
var deployConfig = "[]";
var callConfig =
  '[{"name": "abort", "args": [], "Chinese": "取消交易", "state": 1},{"name": "confirmPurchase", "args": [], "Chinese": "确认出售", "state": 1},{"name": "confirmReceived", "args": [], "Chinese": "确认收款", "state": 0}]';
var inquireConfig =
  '[{"name": "seller", "args": [], "Chinese": "卖家账号"},{"name": "buyer", "args": [], "Chinese": "买家账号"},{"name": "buyerDeposit", "args": [], "Chinese": "买进数量"}]';

module.exports.abi = abi;
module.exports.bin = bin;
module.exports.deployConfig = deployConfig;
module.exports.callConfig = callConfig;
module.exports.inquireConfig = inquireConfig;