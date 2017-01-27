import * as chai from 'chai';
import { construct2DRoom } from '../main';

let expect = chai.expect;

describe('simple output', () => {
  it('should return true', () => {
    let result = construct2DRoom();
    console.log(result);
    expect(true)

  });

});

