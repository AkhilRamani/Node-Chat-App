var socket= io();

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li= jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var formattedTime= moment(message.createdAt).format('h:mm a');
    var li= jQuery('<li></li>');
    var a= jQuery('<a target="_blank">My current Location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});

var sendLocationButton= jQuery('#send-location');
sendLocationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Your browser dose not support Geolocation');
    }
    sendLocationButton.attr('disabled', 'disabled').text('Sending....');

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        sendLocationButton.removeAttr('disabled').text('Send Location');
    }, function(){
        sendLocationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});