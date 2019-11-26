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

    $.ajax({
        type: 'GET',
        url: `http://${path}/rooms?page=0`,
        dataType: 'json',
        success: function (data) {
            console.log('data', data);
            const du = data.length % 4;
            if (du !== 0) {
                var length = data.length / 4 + 1;
            } else {
                var length = data.length / 4;
            }
            let i = 1;
            for (i; i <= length; i++) {
                $('#listRoom').append('<div class="row" id="row'+i+'"></div>');
                let j = i * 4 - 3;
                for (j; j <= i * 4; j++) {
                    if (data[j]) {
                        const {room_name, id} = data[j];
                        $(`#row${i}`).append('<div class="col-sm-3">\n' +
                            '                    <div class="room">\n' +
                            '                        <div class="img">\n' +
                            '                            <img src="photo/room1.png" alt="room1" class="room-img">\n' +
                            '\n' +
                            '                        </div>\n' +
                            '                        <div class="see">\n' +
                            '                            <img src="photo/private.png" alt="public" class="icon-public">\n' +
                            '                        </div>\n' +
                            '                        <div class="name-room">\n' +
                            '                            <p class="namer" style="text-align: center">'+room_name+'</p>\n' +
                            '                        </div>\n' +
                            '                        <div style="align-items: center; ">\n' +
                            '                            <p class="namer" style="font-size: medium; text-align: center" >ID: '+id+'</p>\n' +
                            '                        </div>\n' +
                            '                        <div class="tag-list">\n' +
                            '                            <div class="row">\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                        <div class="join">\n' +
                            '                            <a href="" class="button-join" data-toggle="modal" data-target="#myModal" ">Join now</a>\n' +
                            '                        </div>\n' +
                            '                        <div class="modal" id="myModal">\n' +
                            '                            <div class="modal-dialog modal-dialog-centered">\n' +
                            '                                <div class="modal-content">\n' +
                            '                                    <div class="password">\n' + 'ID Room'+
                            '                                        <input type="text" name="idRoom" class="password-bt" id="idRoom">\n' +
                            '\n' +
                            '                                    </div>\n' +
                            '                                    <div class="password">\n' +'Password'+
                            '                                        <input type="password" name="pass" class="password-bt" id="pass">\n' +
                            '\n' +
                            '                                    </div>\n' +
                            '\n' +
                            '                                    <div class="button">\n' +
                            '                                        <div class="row">\n' +
                            '                                            <button type="button" class="btn btn-danger"\n' +
                            '                                                data-dismiss="modal">Close</button>\n' +
                            '                                            <button type="submit" class="btn btn-success" id="btnJoin">Ok</button>\n' +
                            '                                        </div>\n' +
                            '\n' +
                            '                                    </div>\n' +
                            '\n' +
                            '                                </div>\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                    </div>\n' +
                            '                </div>')
                    }

                }
            }
        },
        error: function (data) {
            console.log("Result: ", data)
        }
    });

    $('#btnJoin').click(function (event) {
        event.preventDefault();
        var id = $('#idRoom').val();
        var pass = $('#pass').val();

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

    });


});




