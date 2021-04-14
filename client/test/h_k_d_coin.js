const HKDCoin = artifacts.require("HKDCoin");
const { assert } = require('chai');

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n){
    return web3.utils.toWei(n, 'Ether'); 
}  

contract("HKDCoin", function () {

  let hkdCoin; 

  before(async () => {
    hkdCoin = await HKDCoin.new(); 
  })


  describe('HKDCoin deployment', async() => {
    it('has a name', async() => {
      const name = await hkdCoin.name();
      assert.equal(name, 'HKDCoin'); 
  });
  }); 

  describe('totalSupply is 1 mill', async() => {
    it('has 1 mill', async() => {
      const totalSupply = await hkdCoin.totalSupply(); 
      assert.equal(totalSupply.toString(), '100000000000000000000000000');
    })
  })
});

