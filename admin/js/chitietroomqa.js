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
    var detail = $('#info');
    var dong2 = $('#dong2');
    var bangcmt = $('#infoCmt');
    var stringUrl = window.location.href;
    var url = new URL(stringUrl)
    const room_id = url.searchParams.get("room_id");
    // console.log(username)

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
        "async": true,
        "crossDomain": true,
        "url": `http://${path}/room?room_id=${room_id}`,
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        "processData": false,
    }).done(function (response) {
        console.log(response)
        const {topic, title,room_name,members,questions,modified_at,creator_username} = response;
        // const {topic, title, room_name, members, questions, modified_at} = res;

        const memberNumber = members.length;
        const questionNumber = questions.length;
        const date = editTime(modified_at);
        $('#bang1').append('<div class="row hang">\n' +
            '            <div class="col-sm-9 test1">\n' +
            '                <div class="dong">\n' +
            '                    <div id="gachngang">\n' +
            '                    </div>\n' +
            '                    <div id="tieudech">\n' +
            '                        ROOM Q&A\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="dong">\n' +
            '               <input id="chude" rows="1" disabled value="' + topic + '"/>\n' +
            '                    <div class="trangthai">\n' +
            '                        <a id="tentv">' + memberNumber + ' thành viên</a>\n'  +
            '                        <a id="tentv2" title="Sửa phòng"><i class=\'fas fa-edit\'></i></a>\n' +
            '                        <a id="tentv3" title="Xóa phòng"><i class=\'fas fa-trash-alt\'></i></a>\n' +
            '<a id="edit">Edit</a>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="dong">\n' +
            '               <input id="noidungch" rows="1" disabled value="' + room_name + '"/>\n' +
            '                </div>\n' +
            '                <div class="dong">\n' +
            '               <input id="tieuderoom" rows="1" disabled value="' + title + '"/>\n' +
            '                </div>\n' +
            '                <div class="dong">\n' +
            '                    <div class="cotthongtin">\n' +
            '                        <a href="">\n' +
            '                            <div>\n' +
            '                                <img src="fileanh/chocute.jpg" alt="Avatar" id="ava2">\n' +
            '                            </div>\n' +
            '                        </a>\n' +
            '                    </div>\n' +
            '                    <div class="cotthongtin">\n' +
            '                        Chủ Phòng<br>\n' +
            '                        <a href="" id="tentv"><b>'+creator_username+'</b></a>\n' +
            '                    </div>\n' +
            '                    <div class="cotthongtin">\n' +
            '                        Số câu hỏi <br>\n' +
            '                        <b>' + questionNumber + '</b>\n' +
            '                    </div>\n' +
            '                    <div class="cotthongtin2">\n' +
            '                        Ngày tạo\n' +
            '                        <br>\n' +
            '                        <b>' + date + '</b>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-sm-3 test2">\n' +
            '            </div>\n' +
            '        </div>');
        if(creator_username === username ){
            $('#tentv2').css({'display': 'inline'});
            $('#tentv3').css({'display': 'inline'});
        }else{
            $('#tentv2').css({'display': 'none'});
            $('#tentv3').css({'display': 'none'});
        }
        $('#bangcmt').append('<div class="dong" id="binhluan">\n' +
            '                <b>' + questionNumber + ' câu hỏi</b>\n' +
            '            </div>\n' +
            '            <div id="thembl">\n' +
            '                <a href="#gocmt"> <u> Thêm câu hỏi</u></a>\n' +
            '            </div>\n' +
            '            <div class="kengang1"></div>');
        if (questionNumber) {
            questions.map(obj => {
                const {id, creator_username, descriptions, answers, like_number, created_at} = obj;
                const date = editTime(modified_at);
                $('#bangcmt').append('<div class="dong2">\n' +
                    '                <a href="">\n' +
                    '                    <div id="">\n' +
                    '                        <img src="fileanh/onggia.jpg" alt="Avatar" id="ava3">\n' +
                    '                    </div>\n' +
                    '                </a>\n' +
                    '                <textarea id="cmt' + id + '" class="comment" disabled>' + descriptions + '</textarea>\n' +
                    '            </div>\n' +
                    '            <div class="dong3">\n' +
                    '                <div class="cottlsua">\n' +
                    '                    <div id="thembl" style="display: flex; flex-direction: row">\n' +'<p style="color: #ff8a00" id="number'+id+'">'+like_number+'</p>'+
                    '                        <a href="" id="like'+id+'">Like</a>\n' +
                    '                    </div>\n' +
                    '                    <div id="thembl">\n' +
                    '                        <a href="" id="rep'+id+'">Trả lời</a>\n' +
                    '                    </div>\n' +
                    '                    <div class="thembl2" id="'+id+'">\n' +
                    '                        <a id="sua'+id+'" href="">Sửa</a>\n' +
                '                        <a id="Xong' + id + '" style="display:none "href="">Xong</a>\n' +
                    '                    </div>\n' +
                    '                    <div class="cotthanhvien">\n' +
                    '                        Trả lời <b>' + date + '</b> bởi <a href="" id="tentv"> <b>' + creator_username + '</b> </a>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' + '<div class="dong">\n' +
                    '                <div class="kengang2">\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div id="listRepCmt' + id + '"></div>+\n' +'<div class="dong4" id="repcmt'+id+'" style="display: none; flex-direction: column; align-items: flex-start">\n' +
                    '            <textarea row hangs="5" id="gorep'+id+'" class="gorep" placeholder="Nhập bình luận..." style="width: 100%"></textarea>\n' +
                    ' <div id="thembl3" style="float:right">\n' +
                    ' <a id="send'+id+'">Gửi bình luận</a>\n' +
                    '</div>\n' +'</div>');
                if(creator_username === username ){
                    $('#'+id+'').css({'display': 'inline'});
                }else{
                    $('#'+id+'').css({'display': 'none'});
                }
                //LIKE CMT
                $('#like'+id+'').click(function (event) {
                    event.preventDefault();
                    $.ajax({
                        "async": true,
                        "crossDomain": true,
                        "url": `http://${path}/room/like_question?room_id=${room_id}&q_id=${id}`,
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        "processData": false,
                    }).done(function (response) {
                        var number = like_number +1;
                        document.getElementById(`number${id}`).innerHTML = `${number}`;
                    });

                });
                //EDIT CMT
                $('#sua' + id + '').click(function (event) {
                    event.preventDefault();
                    $('#cmt' + id + '').prop("disabled", false);
                    $('#Xong' + id + '').css({'display': 'inline'});
                    $('#sua' + id + '').css({'display': 'none'});
                });
                $('#Xong' + id + '').click(function (event) {
                    // console.log(id);
                    event.preventDefault();
                    var cmt2 = $('#cmt' + id + '').val();
                    var data = JSON.stringify({
                        "content": cmt2
                    });

                    $.ajax({
                        "async": true,
                        "crossDomain": true,
                        "url": `http://${path}/room/edit_question?room_id=${room_id}&q_id=${id}`,
                        "method": "PUT",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        "data": data,
                        "processData": false,
                    }).done(function (response) {
                        console.log(id)
                        $('#Xong' + id + '').css({'display': 'none'});
                        $('#sua' + id + '').css({'display': 'inline'});
                        $('#cmt' + id + '').prop("disabled", true);
                    });


                });
                //REP CMT
                $('#rep' + id + '').click(function (event) {
                    event.preventDefault();
                    $('#repcmt' + id + '').css({'display': 'flex'});
                });
                $('#send'+id+'').click(function (event) {
                    event.preventDefault();
                    var cmt = $('#gorep'+id+'').val();
                    var data = JSON.stringify({
                        "response_username": username,
                        "response_fullname": "Tăn Thị Nhung",
                        "content": cmt
                    });

                    $.ajax({
                        "async": true,
                        "crossDomain": true,
                        "url": `http://${path}/room/add_answer?room_id=${room_id}&q_id=${id}`,
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        "data": data,
                        "processData": false,
                    }).done(function (response) {
                        window.location.href = `chitietroomqa.html?room_id=${room_id}`;
                    });

                });

                if (answers) {
                    answers.map(obj => {
                        const {response_username, content, vote, created_at} = obj;
                        const date = editTime(created_at);
                        $('#listRepCmt' + id + '').append(
                            '            <div class="dong4">\n' +
                            '                <a href="">\n' +
                            '                    <div id="">\n' +
                            '                        <img src="fileanh/onggia.jpg" alt="Avatar" id="ava3">\n' +
                            '                    </div>\n' +
                            '                </a>\n' +
                            '                <div class="cmocm">\n' +
                            '                    <div id="tttvien">\n' +
                            '                        <a href="" id="tentv"><b>' + response_username + '</b></a> trả lời <b>' + date + '</b>\n' +
                            '                    </div>\n' +
                            '                <textarea id="cmt' + id + '" class="comment" disabled>' + content + '</textarea>\n' +
                            '                </div>\n' +
                            '            </div>\n' + '<div class="dong4">\n' +
                            '                <div class="kengang2">\n' +
                            '                </div>\n' +
                            '            </div>\n')
                    });
                }


            });
        };
        $('#bangcmt').append('<div class="dong3" id="binhluan">\n' +
            '                <b>Câu hỏi của bạn</b>\n' +
            '            </div>\n' +
            '            <div class="nhapch">\n' +
            '                <textarea row hang hangs="5" id="gocmt" placeholder="Nhập câu hỏi..."></textarea>\n' +
            '            </div>\n' +
            '            <div id="buttch">\n' +
            '                <a id="btn">Gửi câu hỏi</a>\n' +
            '            </div>');
        $('#btn').click(function (event) {
            console.log('aaaa')
            event.preventDefault();
            var cmt = $('#gocmt').val();
            var data = JSON.stringify({
                "creator_username": username,
                "descriptions": cmt
            });

            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": `http://${path}/room/add_question?room_id=${room_id}`,
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                "data": data,
                "processData": false,
            }).done(function (response) {
                window.location.href = `chitietroomqa.html?room_id=${room_id}`;
            });

        });
        //EDIT
        $('#tentv2').click(function (event) {
            $('#noidungch').prop("disabled", false);
            $('#tieuderoom').prop("disabled", false);
            $('#chude').prop("disabled", false);
            $('#edit').css({'display': 'inline'});
        });
        $('#edit').click(function (event) {
            event.preventDefault();
            var noidungch = $('#noidungch').val();
            var tieuderoom = $('#tieuderoom').val();
            var chude = $('#chude').val();
            var data = JSON.stringify({
                "room_name": noidungch,
                "topic": chude,
                "title": tieuderoom,
            });

            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": `http://${path}/room?room_id=${room_id}`,
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                "data": data,
                "processData": false,
            }).done(function (response) {
                $('#noidungch').prop("disabled", true);
                $('#chitie').prop("disabled", true);
                $('#chude').prop("disabled", true);
                $('#edit').css({'display': 'none'});
            });
        });
        //DELETE
        $('#tentv3').click(function (event) {
            event.preventDefault();
            $.ajax({
                "async": true,
                "crossDomain": true,
                "url": `http://${path}/room?room_id=${room_id}`,
                "method": "DELETE",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                "processData": false,
            }).done(function (response) {
                window.location.href = `trangchu.html`;
                // console.log(response);
            });

        });

    });




});