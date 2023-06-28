const hre = require("hardhat");

async function main() {
  const factoryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(factoryAddress);
  console.log(`Escrow address: ${escrow.target}`);
  const addr = escrow.target

  console.log('____________________________________________');
  const addTo = await escrow.escrowFactory().escrows()
  // const Tx = await addTo.wait()

  // console.log(Tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
