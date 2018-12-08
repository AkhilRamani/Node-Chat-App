var socket= io();

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template= jQuery('#message-template').html();
    var html= Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var formattedTime= moment(message.createdAt).format('h:mm a');

    var template= jQuery('#location-message-template').html();
    var html= Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
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