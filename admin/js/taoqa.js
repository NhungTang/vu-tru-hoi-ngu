const path = '192.168.43.254:8880';

$(document).ready(function () {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    if(!username || username === "Guest"){
        $('#user2').append('<a href="login.html">\n' +
            '                            <b style="color: black">LOGIN </b>\n' +
            '                        </a>')
    }else{

        $('#user2').append('<a href="canhan.html">\n' +
            '                            <div>\n' +
            '                                <img src="fileanh/chocute.jpg" alt="Avatar" id="ava">\n' +
            '                            </div>\n' +
            '                            <b>' + username + '</b>\n' +
            '                        </a>')
    }

    $('#buttbl').click(function (e) {
        e.preventDefault();
        var room_name = $('#roomname').val();
        var topic = $('#topic').val();
        var title = $('#title').val();
        var password = $('#password').val();

        var data = JSON.stringify({
            "creator_username": username,
            "room_name": room_name,
            "topic": topic,
            "title": title,
            "password": password,
            "status": 0,
            "members": [
                ""
            ]

        });

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/room`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            "data": data,
            "processData": false,
        }).done(function (response) {
            window.location.href = "trangchu.html";
        });
    });


});
