const CarMaintenance = artifacts.require("CarMaintenance");

module.exports = function(deployer) {
  deployer.deploy(CarMaintenance);
};