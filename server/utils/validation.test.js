const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', ()=>{
    it('Should reject non-string values', ()=>{
        var res= isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with inly spaces', ()=>{
        var res= isRealString('   ');
        expect(res).toBe(false);
    });

    it('should allow string with noon-spaces characters', ()=>{
        var res= isRealString('    akhil    ');
        expect(res).toBe(true);
    });
});