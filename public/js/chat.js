var socket= io();

function scrollToBottom(){
    var messages= jQuery('#messages');
    var newMessage= messages.children('li:last-Child');

    var clientHeight= messages.prop('clientHeight');
    var scrollTop= messages.prop('scrollTop');
    var scrollHeight= messages.prop('scrollHeight');
    var newMessageHeight= newMessage.innerHeight();
    var lastMessageHeight= newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        } else{
            console.log('No error');
        }
    })
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    console.log(users);
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user){
        ol.append(jQuery(`<li>${user}</li>`));
    });
    jQuery('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
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