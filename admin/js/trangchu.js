const path = '192.168.43.254:8880';

const editTime = (created_at) => {
    var date = new Date(created_at);
    var day = date.getDate();
    var thang = date.getMonth();
    var nam = date.getFullYear();
    date = `Ngày ${day} tháng ${thang} năm ${nam}`;
    return date;
}
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

    var $question = $('#question');
    $.ajax({
        type: 'GET',
        url: `http://${path}/questions?page=0`,
        dataType: 'json',
        success: function (data) {
            let i = 0;
            for (i; i <= 3; i++) {
                const {creator_fullname, title, created_at, id} = data[i];
                const date = editTime(created_at);

                $question.append('<div class="col-sm-3">\n' +
                    '                <div class="detailque" >\n' +
                    '                    <div id="tennghoi">\n' +
                    '                        <div>\n' +
                    '                            <a>\n' +
                    '                                <div id="ten">\n' +
                    '                                    <img src="fileanh/onggia.jpg" alt="Avatar" id="avabang">\n' +
                    '                                    <div id="contentid">' + creator_fullname + '</div>\n' +
                    '                                </div>\n' +
                    '                            </a>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div id="noidunghoi">\n' +
                    '                        <a href="http://localhost:63342/vu-tru-hoi-ngu/admin/chitietcauhoi.html?q_id=' + id + '">\n' + title + '</a>\n' +
                    '                    </div>\n' +
                    '                    <div id="ngaythang">' + date + '</div>\n' +
                    '                </div>\n' +
                    '            </div>');
            }
        },
        error: function (data) {
            console.log("Result: ", data)
        }
    });
    $.ajax({
        type: 'GET',
        url: `http://${path}/rooms?page=0`,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let i = 0;
            for (i; i <= 3; i++) {
                const {room_name, id} = data[i];
                $('#listRoom').append(' <div class="col-sm-3">\n' +
                    '            <div class="detailroom">\n' +
                    '                <div class="planet">\n' +
                    '                    <img src="fileanh\\room-02.png" alt="room1" id="room">\n' +
                    '                </div>\n' +
                    '                <div id="noidungroom">\n' +
                    '                    <p>'+room_name+'</p>\n' +
                    '                </div>\n' +
                    '                <div id="thetags">\n' +
                    '                </div>\n' +
                    '                <div class="joinnow">\n' +
                    '                    <a href="" class="button-join" data-toggle="modal" data-target="#myModal2">Join now</a>\n' +
                    '                </div>\n' +
                    '                <div class="modal" id="myModal2">\n' +
                    '                    <div class="modal-dialog modal-dialog-centered">\n' +
                    '                        <div class="modal-content">\n' +
                    '                            <div class="text-pass">\n' +
                    '                                <p>Nhập password để vào room</p>\n' +
                    '                            </div>\n' +
                    '                            <div class="password">\n' +
                    '                                <input type="password" name="pass" class="password-bt" id="password2'+id+'">\n' +
                    '                            </div>\n' +
                    '                            <div class="button">\n' +
                    '                                <div class="row">\n' +
                    '                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>\n' +
                    '                                    <button id="btnJoin2'+id+'" type="submit" class="btn btn-success">Ok</button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>');
                $('#btnJoin2'+id+'').on("click", function () {
                    var pass = $('#password2'+id+'').val();

                    $.ajax({
                        "async": true,
                        "crossDomain": true,
                        "url": `http://${path}/room/join?room_id=${id}&password=${pass}`,
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        "processData": false,
                    }).done(function (response) {
                        window.location.href = `chitietroomqa.html?room_id=${id}`;
                    });
                })

            }
        },
        error: function (data) {
            console.log("Result: ", data)
        }
    });


    $('#btnJoin').on("click", function () {
        var id = $('#idRoom').val();
        var pass = $('#password').val();

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/room/join?room_id=${id}&password=${pass}`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            "processData": false,
        }).done(function (response) {
            window.location.href = `chitietroomqa.html?room_id=${id}`;
        });
    })

});

