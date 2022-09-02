const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", () => {
  let counter;

  beforeEach(async () => {
    // Fetch the Counter Contract
    let Counter = await ethers.getContractFactory("Counter");

    counter = await Counter.deploy("My Counter", 1);
    await counter.deployed();
  }); // end of beforeEach hook

  describe("deployment", () => {
    it("sets the initial count", async () => {
      const count = await counter.count();

      // Check the count to make sure it's what we expect
      expect(count).to.equal(1);
    });

    it("sets the initial name ", async () => {
      // fetch the name of the state variables
      const name = await counter.name();

      // Check the name to make sure it's what we expect
      expect(name).to.equal("My Counter");
    });
  }); // end of deployment related testing

  //   COUNTING BEHARVIOR
  describe("Counting", () => {
    let transaction;

    it("reads the count from the 'count' public variable", async () => {
        expect(await counter.count()).to.equal(1);
    })

    it("reads the count from the 'getCount' function", async () => {
        expect(await counter.getCount()).to.equal(1);
    })

    it("reads the name from the 'name' public variable", async () => {
        expect(await counter.name()).to.equal("My Counter");
    })

    it("reads the name from the 'getName' function", async () => {
        expect(await counter.getName()).to.equal("My Counter");
    })

    it("updates the name", async () => {
        transaction = await counter.setName("New Counter")
        await transaction.wait()
        expect(await counter.name()).to.equal("New Counter");
    })





    it("increments the count", async () => {
      // Increrment the count by 1
      transaction = await counter.increment();
      //   wait for transaction to complete
      await transaction.wait();

      // assert that the count increment
      expect(await counter.count()).to.equal(2);

      // SECOND CALL TO CONFIRM IF IT INCREMENTS BY ONE AGAIN
      // Increrment the count by 1
      transaction = await counter.increment();
      //   wait for transaction to complete
      await transaction.wait();

      // assert that the count increment
      expect(await counter.count()).to.equal(3);
    });

    it("decrement the count", async () => {
      // decrease the count
      transaction = await counter.decrement();
      //   wait for transaction to complete
      await transaction.wait();
      // assert that the count decreased
      expect(await counter.count()).to.equal(0);


    //   COUNT SHOULD NOT GO BELOW ZERO
    await expect(counter.decrement()).to.be.reverted

    });
  }); // End of Counting Behaviour
}); // end of the test
