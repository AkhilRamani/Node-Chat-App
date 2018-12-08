const expect = require('expect');

const {generateMessage, generateLocationMessage}= require('./message');

describe('generateMessage', ()=>{
    it('Should generate correct message object', ()=>{
        var from= 'akhil';
        var text= 'hello!!';
        var message= generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
});

describe('generateLocationMessage', ()=>{
    it('Should generate correct location message object', ()=>{
        var from= 'akhil'
        var latitude= 50;
        var longitude= 5;
        var url= 'https://www.google.com/maps?q=50,5'
        var message= generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});