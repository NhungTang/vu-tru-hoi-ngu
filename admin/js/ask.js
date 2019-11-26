const path = '192.168.1.44:8880';

$(document).ready(function () {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    if(username){
        $('#user2').append('<a href="canhan.html">\n' +
            '                            <div>\n' +
            '                                <img src="fileanh/chocute.jpg" alt="Avatar" id="ava">\n' +
            '                            </div>\n' +
            '                            <b>' + username + '</b>\n' +
            '                        </a>')
    }else{
        $('#user2').append('<a href="login.html">\n' +
            '                            <b style="color: black">LOGIN </b>\n' +
            '                        </a>')
    }

    $('#ask').click(function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var descriptions = $('#descriptions').val();
        var tags = $('#tags').val();

        var data = JSON.stringify({
            "creator_fullname": sessionStorage.getItem("fullname"),
            "creator_username": username,
            "tags": [tags],
            "title": title,
            "descriptions": descriptions,

        });

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/question`,
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
