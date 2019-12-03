const path = '192.168.43.254:8880';

$(document).ready(function () {
    $('#login').click(function (e) {
        e.preventDefault();
        var $username = $('#username').val();
        var $password = $('#password').val();

        var data = JSON.stringify({
            "username": $username,
            "password": $password
        });

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/login`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": data,
            "processData": false,
        }).done(function (response) {
            window.location.href = "trangchu.html";
            const res = JSON.parse(response)
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("username", res.username);
        });
    });
    $('#loginFake').click(function (e) {
        e.preventDefault();

        var data = JSON.stringify({
            "username": "Guest",
            "password": "Guest"
        });

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/login`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": data,
            "processData": false,
        }).done(function (response) {
            window.location.href = "trangchu.html";
            const res = JSON.parse(response)
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("username", res.username);
        });
    });

    $('#signup').click(function (e) {
        e.preventDefault();
        var $username = $('#user-name').val();
        var $password = $('#pass-word').val();
        var $namedisplay = $('#name-display').val();
        var $repass = $('#re-pass').val();
        var $fullname = $('#full-name').val();

        var data = JSON.stringify({
            "username": $username,
            "password": $password,
            "full_name": $fullname,
            "display_name": $namedisplay,
            "status": 1
        });

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/sign-up`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": data,
            "processData": false,
        }).done(function (response) {
            swal("Bạn có tài khoản rồi nè...Hãy thử đăng nhập thôi nào", "You clicked the button!", "success");
            $('#user-name').val("");
            $('#pass-word').val("");
            $('#name-display').val("");
            $('#re-pass').val("");
            $('#full-name').val("");
        });
    });
});
