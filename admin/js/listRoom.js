const path = '192.168.43.254:8880';

$(document).ready(function () {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    console.log(username)
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

    $.ajax({
        type: 'GET',
        url: `http://${path}/rooms?page=0`,
        dataType: 'json',
        success: function (data) {
                data.map(obj=> {
                    const {room_name, id} = obj;
                    $(`#listRoom`).append('<div style="width: 20%; margin: 2%">\n' +
                        '                    <div class="room">\n' +
                        '                        <div class="img">\n' +
                        '                            <img src="photo/room1.png" alt="room1" class="room-img">\n' +
                        '\n' +
                        '                        </div>\n' +
                        '                        <div class="see">\n' +
                        '                            <img src="photo/private.png" alt="public" class="icon-public">\n' +
                        '                        </div>\n' +
                        '                        <div class="name-room">\n' +
                        '                            <p class="namer" style="text-align: center " >' + room_name + '</p>\n' +
                        '                        </div>\n' +
                        '                        <div class="tag-list">\n' +
                        '                            <div class="row">\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="join">\n' +
                        '                            <a href="" class="button-join" data-toggle="modal" data-target="#myModal'+id+'" id="test1" data-id="' + id + '">Join now</a>\n' +
                        '                        </div>' + '<div class="modal" id="myModal'+id+'">\n' +
                        '            <div class="modal-dialog modal-dialog-centered">\n' +
                        '                <div class="modal-content">\n' +
                        '                    <div class="text-pass">\n' +
                        '                        <p>Nhập password để vào room</p>\n' +
                        '                    </div>\n' +
                        '                    <div class="password">\n' +
                        '                        <input id="pass' + id + '" type="password" name="pass" class="password-bt">\n' +
                        '\n' +
                        '                    </div>\n' +
                        '\n' +
                        '                    <div class="button">\n' +
                        '                        <div class="row">\n' +
                        '                            <button type="button" class="btn btn-danger"\n' +
                        '                                    data-dismiss="modal">Close</button>\n' +
                        '                            <button id="btnJoin' + id + '" type="submit" class="btn btn-success">Ok</button>\n' +
                        '                        </div>\n' +
                        '\n' +
                        '                    </div>\n' +
                        '\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '                    </div>\n' +
                        '                </div>');
                    $('#btnJoin' + id + '').on("click", function () {
                        // var id = $('#idRoom').val(`${id}`);
                        var pass = $('#pass' + id + '').val();

                        $.ajax({
                            "async": true,
                            "crossDomain": true,
                            "url": `http://${path}/room/join?room_id=${id}&password=${pass}`,
                            "method": "POST",
                            "headers": {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            },
                            "data": data,
                            "processData": false,
                        }).done(function (response) {
                            window.location.href = `chitietroomqa.html?room_id=${id}`;
                        });
                    })
                })

        },
        error: function (data) {
            console.log("Result: ", data)
        }
    });










});





