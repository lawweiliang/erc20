
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const globalVar = require('../variable/global_variable.js');
const liangTokenContract = artifacts.require('LiangToken');


contract('LiangToken', async ([alice, bob]) => {

  let liangTokenInstance;
  beforeEach(async () => {
    liangTokenInstance = await liangTokenContract.new(globalVar.erc20.name, globalVar.erc20.symbol, globalVar.erc20.totalSupply);

  });

  it('token name', async () => {
    const name = await liangTokenInstance.name();
    assert.equal(name, globalVar.erc20.name);
  });

  it('token symbol', async () => {
    const symbol = await liangTokenInstance.symbol();
    assert.equal(symbol, globalVar.erc20.symbol);
  });

  it('token totalsupply', async () => {
    const totalSupply = await liangTokenInstance.totalSupply();
    assert.equal(totalSupply, globalVar.erc20.totalSupply);
  })


});