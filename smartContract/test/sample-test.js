const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = require('bignumber.js');

describe("WorkToken", function () {
  it("deploy", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const WorkToken = await ethers.getContractFactory("WorkToken");
    const workToken = await WorkToken.deploy();
    await workToken.deployed();
    
    /*
    const TestERC20 = await ethers.getContractFactory("TestERC20");
    const testERC20 = await TestERC20.deploy(ethers.BigNumber.from("0xffffffffffffffffffffffffffffffff"));
    await testERC20.deployed();
    */

    //await workToken.setTokenAddresses(testERC20.address);

    const tx0 = await testERC20.transfer(addr2.address, ethers.BigNumber.from("0xfffffffffffffffffffffffff"))
    await tx0.wait();

    //const bal = await testERC20.balanceOf(addr2.address);
    //console.log(bal / 10 ** 18)
    //console.log('erc20 address ', testERC20.address)
  
    
    const tx1 = await workToken.connect(addr1).newProjectCreator(10, 604800, "this is a URI");
    await tx1.wait();

    const tx2 = await testERC20.approve(workToken.address, ethers.BigNumber.from("0xffffffffffffffffffffffffffffff"))
    await tx2.wait();

    //const tx4 = await workToken.mintNFT(addr1.address, 0);
    //await tx4.wait();
    /*
    var tx3 = await workToken.getProjectStatus(0);
    console.log(tx3)
    var tx3 = await workToken.getProjectURI(0);
    console.log(tx3)
    */
    //const tx2 = await workToken.getProjectCreator(addr1.address);
    //console.log(tx2)
    /*
    // wait until the transaction is mined
    expect(await greeter.greet()).to.equal("Hola, mundo!");
    */
  });
});
