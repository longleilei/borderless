const HKDCoin = artifacts.require("HKDCoin");

module.exports = function (deployer) {
  deployer.deploy(HKDCoin);
};