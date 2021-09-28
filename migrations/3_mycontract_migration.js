
const myContractContract = artifacts.require('MyContract');

module.exports = async (deployer, network, accounts) => {

  deployer.deploy(myContractContract);

}
