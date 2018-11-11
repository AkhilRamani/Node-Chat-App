const expect = require('expect');

const {generateMessage}= require('./message');

describe('generateMessage', ()=>{
    it('Should generate correct message object', ()=>{
        var from= 'akhil';
        var text= 'hello!!';
        var message= generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
});