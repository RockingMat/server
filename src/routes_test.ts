import * as assert from 'assert';
//import * as httpMocks from 'node-mocks-http';
import { getPattern, entropy } from './helper';


describe('helper', function() {
  it('getPattern', function() {
    let guess = 'HELLO';
    let word = 'HELLO';
    const pattern = getPattern(guess, word);
    assert.strictEqual(pattern, 242);
    guess = 'HELLO';
    word = 'WORLD';
    const pattern2 = getPattern(guess, word);
    assert.strictEqual(pattern2, 81 + 54);
  });
  it('entropy', function() {
    const remainingWords = ['HELLO', 'WORLD', 'WORLD', 'HELLO'];
    const word = 'HELLO';
    const ent = entropy(remainingWords, word);
    assert.strictEqual(ent, 0);
  });
});



// describe('routes', function() {
//     it('init', function() {
//       const req = httpMocks.createRequest(
//         {method: 'GET', url: '/api/init'});
//       const res = httpMocks.createResponse();
//       init(req, res);
//       assert.strictEqual(res._getStatusCode(), 200);
//       assert.deepStrictEqual(res._getData(), {message: "words initialized"});
//       resetForTesting();
//     });
//     it('word', function() {
//       //empty scores
//       const req2 = httpMocks.createRequest(
//         {method: 'GET', url: '/api/word'});
//       const res2 = httpMocks.createResponse();
//       word(req2, res2);
//       assert.strictEqual(res2._getStatusCode(), 400);
//       assert.deepStrictEqual(res2._getData(), {message: "words not initialized"});
//       //initialize scores
//       const req = httpMocks.createRequest(
//         {method: 'GET', url: '/api/init'});
//       const res = httpMocks.createResponse();
//       init(req, res);
//       const req3 = httpMocks.createRequest(
//           {method: 'GET', url: '/api/word'});
//       const res3 = httpMocks.createResponse();
//       word(req3, res3);
//       assert.strictEqual(res3._getStatusCode(), 200);
//       resetForTesting();
//     });
//   });
