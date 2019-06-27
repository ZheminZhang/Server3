/* Hello合约 */

var abi = '[{"constant":false,"inputs":[{"name":"newGreeting","type":"string"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"say","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_greeting","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"state","type":"string"}],"name":"status","type":"event"}]'
var bin = '608060405234801561001057600080fd5b506040516105e73803806105e7833981018060405281019080805182019291905050508060009080519060200190610049929190610156565b506040805190810160405280600681526020017f497373756564000000000000000000000000000000000000000000000000000081525060019080519060200190610095929190610156565b507fe8ca64f431a8cfb9e9c33860d1c005f5efdf340d799f119d831935b54620b424600160405180806020018281038252838181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101425780601f1061011757610100808354040283529160200191610142565b820191906000526020600020905b81548152906001019060200180831161012557829003601f168201915b50509250505060405180910390a1506101fb565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019757805160ff19168380011785556101c5565b828001600101855582156101c5579182015b828111156101c45782518255916020019190600101906101a9565b5b5090506101d291906101d6565b5090565b6101f891905b808211156101f45760008160009055506001016101dc565b5090565b90565b6103dd8061020a6000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633d7403a314610051578063954ab4b2146100ba575b600080fd5b34801561005d57600080fd5b506100b8600480360381019080803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061014a565b005b3480156100c657600080fd5b506100cf61026a565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010f5780820151818401526020810190506100f4565b50505050905090810190601f16801561013c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b806000908051906020019061016092919061030c565b506040805190810160405280600781526020017f5570646174656400000000000000000000000000000000000000000000000000815250600190805190602001906101ac92919061030c565b507fe8ca64f431a8cfb9e9c33860d1c005f5efdf340d799f119d831935b54620b424600160405180806020018281038252838181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102595780601f1061022e57610100808354040283529160200191610259565b820191906000526020600020905b81548152906001019060200180831161023c57829003601f168201915b50509250505060405180910390a150565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061034d57805160ff191683800117855561037b565b8280016001018555821561037b579182015b8281111561037a57825182559160200191906001019061035f565b5b509050610388919061038c565b5090565b6103ae91905b808211156103aa576000816000905550600101610392565b5090565b905600a165627a7a72305820cb130700e1b37f5503a36b00c706ae104c1f4cdb544ba4ceb629035e80c6c1010029'

var deployConfig = '[{"name": "欢迎辞", "type": "string"}]';
var callConfig = '[{"name": "say", "args": [], "constant": true, "Chinese": "合约内容"}, {"name": "update", "args": [{"name": "更新欢迎辞", "type": "string"}], "constant": false, "Chinese": "更新合约内容"}]';

module.exports.abi = abi;
module.exports.bin = bin;
module.exports.deployConfig = deployConfig;
module.exports.callConfig = callConfig;
