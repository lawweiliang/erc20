const globalVariable = require('../variable/global_variable.js');
const liangTokenContract = artifacts.require('LiangToken');

module.exports = async (deployer, network, accounts) => {
  const name = globalVariable.erc20.name;
  const symbol = globalVariable.erc20.symbol;
  const totalSupply = globalVariable.erc20.totalSupply;
  deployer.deploy(liangTokenContract, name, symbol, totalSupply);
}