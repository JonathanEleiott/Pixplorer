const React = require('react');

const expect = require('chai').expect;

const actionsIndex = '../scavengerHunt/src/actions/AuthActions.js';

describe('Front End', () => {
  describe('Testing Tests', () => {
    const testData = ['test1', 'test2', 'test3', 'test4'];

    it('should expect true to equal true', () => {
      expect(true).to.equal(true);
    });

    it('should expect testData to contain 1', () => {
      expect(testData[0]).to.contain(1);
    });

    it('should expect testData[2] to be a number', () => {
      expect(testData[2]).to.be.a('string');
    });

    it('should expect testData to have a length of 4', () => {
      expect(testData).to.have.lengthOf(4);
    });
  });

  describe('Actions', () => {
    describe('AuthActions', () => {
      console.log('AuthActions', actionsIndex.emailChanged);
    });
  });
});
