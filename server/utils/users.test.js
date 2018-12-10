const expect= require('expect');

const {Users}= require('./users');

describe('Users', ()=>{

    var users;
    beforeEach(()=>{
        users= new Users();
        users.users= [
            {
                id:'1',
                name: 'akhil',
                room: 'abc'
            },
            {
                id:'2',
                name: 'sagar',
                room: 'xyz'
            },
            {
                id:'3',
                name: 'ridhhi',
                room: 'abc'
            }
        ];    
    });

    it('should add new user', ()=>{
        var users= new Users();
        var user= {
            id: '1234',
            name: 'akhil',
            room:'my room'
        };
        var resUser= users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        expect(resUser).toEqual(user);
    });

    it('should return names for room abc', ()=>{
        var usersList= users.getUsersList('abc');

        expect(usersList).toEqual(['akhil', 'ridhhi']);
    });

    it('should return names for room xyz', ()=>{
        var usersList = users.getUsersList('xyz');
        expect(usersList).toEqual(['sagar']);
    });

    it('should find user', ()=>{
        var userId= '3';
        var user= users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', ()=>{
        var userId= '212';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });

    it('should remove user', ()=>{
        var userId = '2';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not romove user', ()=>{
        var userId = '3434';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    })

});