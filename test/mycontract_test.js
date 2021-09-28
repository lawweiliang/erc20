
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const globalVariable = require('../variable/global_variable.js');
const liangTokenContract = artifacts.require('LiangToken');
const myContractContract = artifacts.require('MyContract');

contract('MyContract', ([alice, bob, admin]) => {

  let liangTokenInstance;
  let myContractInstance;
  beforeEach(async () => {
    liangTokenInstance = await liangTokenContract.new(globalVariable.erc20.name, globalVariable.erc20.symbol, globalVariable.erc20.totalSupply);

    myContractInstance = await myContractContract.new();
  });


  it('Withdraw Token Using Other Contract', async () => {
    await liangTokenInstance.transfer(myContractInstance.address, '1000');
    const balanceInMyContractBefore = await liangTokenInstance.balanceOf(myContractInstance.address);
    console.log('balanceInMyContractBefore', balanceInMyContractBefore.toString());

    await myContractInstance.withdraw(liangTokenInstance.address, bob, '1000');
    const balanceInMyContractAfter = await liangTokenInstance.balanceOf(myContractInstance.address);
    console.log('balanceInMyContractAfter', balanceInMyContractAfter.toString());

    const balanceInBob = await liangTokenInstance.balanceOf(bob);
    console.log('balanceInBob', balanceInBob.toString());

    assert.equal(balanceInMyContractBefore.toString(), '1000');
    assert.equal(balanceInMyContractAfter.toString(), '0');
    assert.equal(balanceInBob.toString(), '1000');
  });

  it('Withdraw Contract Token to other address', async () => {
    await liangTokenInstance.transfer(myContractInstance.address, '1000');
    const balanceInMyContractBefore = await liangTokenInstance.balanceOf(myContractInstance.address);
    console.log('balanceInMyContractBefore', balanceInMyContractBefore.toString());

    await myContractInstance.withdrawContractToken(liangTokenInstance.address, bob, '1000');
    const balanceInMyContractAfter = await liangTokenInstance.balanceOf(myContractInstance.address);
    console.log('balanceInMyContractAfter', balanceInMyContractAfter.toString());

    const balanceInBob = await liangTokenInstance.balanceOf(bob);
    console.log('balanceInBob', balanceInBob.toString());

    assert.equal(balanceInMyContractBefore.toString(), '1000');
    assert.equal(balanceInMyContractAfter.toString(), '0');
    assert.equal(balanceInBob.toString(), '1000');
  });

  it('Withdraw Token from user account to my contract', async () => {
    await liangTokenInstance.transfer(bob, '1000');
    const balanceInMyContractBefore = await liangTokenInstance.balanceOf(myContractInstance.address);
    console.log('balanceInMyContractBefore', balanceInMyContractBefore.toString());

    await liangTokenInstance.approve(myContractInstance.address, '1000', { from: bob });
    await myContractInstance.withdrawUserToken(liangTokenInstance.address, bob, '1000');
    const balanceInMyContractAfter = await liangTokenInstance.balanceOf(myContractInstance.address);
    console.log('balanceInMyContractAfter', balanceInMyContractAfter.toString());

    const balanceInBob = await liangTokenInstance.balanceOf(bob);
    console.log('balanceInBob', balanceInBob.toString());

    assert.equal(balanceInMyContractBefore.toString(), '0');
    assert.equal(balanceInMyContractAfter.toString(), '1000');
    assert.equal(balanceInBob.toString(), '0');
  });
});