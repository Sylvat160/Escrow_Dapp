const hre = require("hardhat");
const json = require('../artifacts/contracts/EscrowFactory.sol/EscrowFactory.json')

async function main() {
  const factoryAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
  const provider = await hre.ethers.getDefaultProvider()

  const [owner, arbiter, beneficiary] = await hre.ethers.getSigners()
  
  const Factory = new hre.ethers.Contract(factoryAddress, json.abi, provider)

  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(factoryAddress);
  console.log(`Escrow address: ${escrow.target}`);
  const addr = escrow.target;
  const value = hre.ethers.parseEther("0.01");

  console.log('____________________________________________');
  const es = await escrow.getAllEscrow();
  // console.log(owner, 'owner');
  
  // for (let i = 0; i < es.length; i++) {
  //   console.log("Escrow address:", es[i][0]);
  //   console.log("Owner address:", es[i][1]);
  //   console.log("Escrow ID:", es[i][2].toString());
  //   console.log("-------------------------");
  // }

  const initEscrow = await escrow.initEscrow(arbiter.address, beneficiary.address, {value : value});
  await initEscrow.wait()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
