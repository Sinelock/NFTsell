const testNFT = artifacts.require("./testNFT.sol");
const testERC20 = artifacts.require("./testERC20.sol");
const testMarket=artifacts.require("./testMarket.sol")
const buyerBalance = web3.utils.toWei("2000", "ether");
const price = web3.utils.toWei("100", "ether");
module.exports = function(deployer) {
  deployer.deploy(testNFT,"test.test");

};


module.exports = async function (deployer, network, accounts) {  
  const owner=accounts[0]  // creator for erc20 and market test contracts
  const tokenOwner=accounts[1]
  const buyer=accounts[2]

 
 
  await deployer.deploy(testNFT,"http://test.com",{from:tokenOwner});
  const deployedtestNFT = await testNFT.deployed();
 
  await deployer.deploy(testERC20);
  const deployedtestERC20 = await testERC20.deployed();
 
   
  const deployedtestMarket=  await deployer.deploy(
    testMarket,
    deployedtestNFT.address,
    deployedtestERC20.address,
    1,
    price,
    tokenOwner 
    
     
  );

  /* let buyerBalance1=await deployedtestERC20.balanceOf(buyer);
  let allowance=await deployedtestERC20.allowance(buyer,deployedtestMarket.address)
  let isApprovedForAll=await deployedtestNFT.isApprovedForAll(tokenOwner,deployedtestMarket.address) */
/*   console.log(web3.utils.fromWei(buyerBalance1, "ether"),web3.utils.fromWei(allowance, "ether"),isApprovedForAll) */
  await deployedtestERC20.transfer(buyer, buyerBalance, {
    from: owner,
  }); 
  const x=await deployedtestNFT.uri(1);
  const bal=await deployedtestNFT.balanceOf(tokenOwner,1) 
  console.log("x",x,bal)
/*   await deployedtestERC20.approve(deployedtestMarket.address, price, {
    from: buyer,
  }); */
 /*  buyerBalance1=await deployedtestERC20.balanceOf(buyer);
  allowance=await deployedtestERC20.allowance(buyer,deployedtestMarket.address)
  */

  /* await deployedtestNFT.setApprovalForAll(deployedtestMarket.address, true, {
    from: tokenOwner,
  });
  isApprovedForAll=await deployedtestNFT.isApprovedForAll(tokenOwner,deployedtestMarket.address)
  console.log(web3.utils.fromWei(buyerBalance1, "ether"),web3.utils.fromWei(allowance, "ether"),isApprovedForAll)  */
};
