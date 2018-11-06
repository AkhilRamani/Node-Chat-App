var socket= io();

socket.on('connect', function() {
    console.log('Connected to the server');

    socket.emit('createMessage',{
        to: 'akhil',
        text: 'Hello!!'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
});