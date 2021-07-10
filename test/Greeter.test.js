const { expect } = require('chai');
const { smockit } = require('@eth-optimism/smock');

describe('Greeter', function(){
  describe('setGreeting', async()=>{

    before(async()=>{
        this.TipJarFactory = await ethers.getContractFactory('TipJar');
        this.Greeter = await ethers.getContractFactory("Greeter");

        this.tipJar = await this.TipJarFactory.deploy();
        this.tipJar.deployed()
    })

    beforeEach(async()=> {
        this.greeter = await this.Greeter.deploy(this.tipJar.address);
        this.greeter.deployed();
    })

    it('requires a tip', async() => {
        await expect(
                  this.greeter.setGreeting("hello")
              ).to
              .be.revertedWith('Please tip the Greeter');
    })

    it('sets greeting ', async() => {
        /**
         * This example assumes that TipJar successfully receives
         * and updates balance
         * */
        await this.greeter.setGreeting("Success!", { value: 100});
        expect(await this.greeter.greet()).to.equal('Success!');
    })

    it('does not set greeting if TipJar fails to update', async() => {
        /**
         * How to mock a failure on TipJar, to test how Greeter handles the response?
         * */

        const mockJar = await smockit(this.tipJar);

        const greeterToMock = await this.Greeter.deploy(mockJar.address);
        greeterToMock.deployed();
        const mockGreeter = await smockit(greeterToMock);

        // we now have a mockable Jar (mockJar) <-> Greeter (mockGreeter)

        // mock instances do not load ethers signers by default
        const user = (await ethers.getSigners())[0]

        /** positive case:
         * checking mocked Greeter can still setGreeting
         **/
        await mockGreeter.connect(user).setGreeting('Hello!', { value: 100 })
        expect(await mockGreeter.greet()).to.equal('Hello!');

        /** negative case:
         * mocking a sure-fail `receive` function on the Jar
         * from the line Greeter.sol#L23
         * (bool success, ) = payable(tipJar).call{ value: msg.value }("");
         * */

        mockJar.smocked.receive.will.return.with((false))
        mockJar.smocked.call.will.return.with((false))

        await expect(
          mockGreeter.connect(user).setGreeting('Hello!', { value: 100 })
          ).to
          .be.revertedWith('Tip failed to add to TipJar');
    })


  })


})