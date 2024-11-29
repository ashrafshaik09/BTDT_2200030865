const ElectricityBill = artifacts.require("ElectricityBill");

module.exports = function (deployer) {
  deployer.deploy(ElectricityBill, 10);  // Rate per unit of electricity
};
