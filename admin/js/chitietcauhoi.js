const path = '192.168.1.44:8880';

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
    var $detail = $('#info');
    var $dong2 = $('#dong2');
    var $bangcmt = $('#infoCmt');
    var stringUrl = window.location.href;
    var url = new URL(stringUrl)
    const q_id = url.searchParams.get("q_id");

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
        url: `http://${path}/question?q_id=${q_id}`,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            const {like_number, title, descriptions, creator_username, created_at, tags, answers} = data;
            var cmt = answers ? answers.length : 0;
            var date = editTime(created_at);
            if(creator_username !== username){
                $('#tentv1').css({'display':'none'});
                $('#tentv2').css({'display':'none'});

            }
            $detail.append('<div class="dong2">\n' +
                '                    <div id="binhchon">\n' +
                '                        <b id="likeNumber">' + like_number + '</b>\n' +
                '                        <br>\n' +
                '                        <a href="" id="like"><i class=\'fas fa-thumbs-up\'></i></a>\n' +
                '                    </div>\n' +
                '               <textarea id="noidungch" rows="2" disabled>' + title + '</textarea>\n' +
                '            </div>\n' +
                '            <textarea rows="5" class="dong2" id="chitiet" disabled>' + descriptions + ' </textarea>\n' +
                '                <div class="dong">\n' +
                '                    <div class="cotthongtin">\n' +
                '                        <a href="">\n' +
                '                            <div>\n' +
                '                                <img src="fileanh/chocute.jpg" alt="Avatar" id="ava2">\n' +
                '                            </div>\n' +
                '                        </a>\n' +
                '                    </div>\n' +
                '                    <div class="cotthongtin">\n' +
                '                        Thành viên <br>\n' +
                '                        <a href="canhan.html" id="tentv"><b>' + creator_username + '</b></a>\n' +
                '                    </div>\n' +
                '                    <div class="cotthongtin">\n' +
                '                        Số bình luận <br>\n' +
                '                        <b>' + cmt + '</b>\n' +
                '                    </div>\n' +
                '                    <div class="cotthongtin2">\n' +
                '                        Ngày tạo\n' +
                '                        <br>\n' +
                '                        <b>' + date + '</b>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '        </div>');
            tags.map(obj => {
                $dong2.append('<div class="thetags">\n' +
                    '                        <a href="">' + obj + '</a>\n' +
                    '                    </div>');
            });
            answers.map(obj => {
                const {response_username, content, list_reply, vote, created_at} = obj;
                const numberVote = vote ? vote : 0;
                var date = editTime(created_at);
                $bangcmt.append('<div class="dong2">\n' +
                    '                <a href="">\n' +
                    '                    <div id="">\n' +
                    '                        <img src="fileanh/onggia.jpg" alt="Avatar" id="ava3">\n' +
                    '                    </div>\n' +
                    '                </a>\n' +
                    '                <textarea id="cmt" class="comment" disabled>' + content + '</textarea>\n' +
                    '                </textarea>\n' +
                    '            </div>\n' +
                    '            <div class="dong3">\n' +
                    '                <div class="cottlsua">\n' +
                    '                    <div id="thembl1" style="color: #ff8a00">\n' + numberVote +
                    '                        <button href="">Vote</button>\n' +
                    '                    </div>\n' +
                    '                    <div id="thembl2">\n' +
                    '                        <button href="">Trả lời</button>\n' +
                    '                    </div>\n' +
                    '                    <div id="thembl3">\n' +
                    '                        <button id="sua">Sửa</button>\n' +
                    '                    </div>\n' +
                    '                    <div class="cotthanhvien">\n' +
                    '                        Trả lời <b>' + date + '</b> bởi <a href="" id="tentv"> <b>' + response_username + '</b> </a>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="dong">\n' +
                    '                <div class="kengang2">\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="dong4">\n' +
                    '                <a href="">\n' +
                    '                    <div id="">\n' +
                    '                        <img src="fileanh/onggia.jpg" alt="Avatar" id="ava3">\n' +
                    '                    </div>\n' +
                    '                </a>\n' +
                    '                <div class="cmocm">\n' +
                    '                    <div id="tttvien">\n' +
                    '                        <a href="" id="tentv"><b>Tên thành viên</b></a> trả lời lúc <b>x/y/20xx:</b>\n' +
                    '                    </div>\n' +
                    '                    <div class="comment2">\n' +
                    '                        Kể từ khi Brendan Rodgers giữ ghế HLV trưởng giữa mùa bóng trước (từ ngày 26.2.2019), Leicester\n' +
                    '                        tích\n' +
                    '                        lũy số điểm chỉ thua đúng hai đội khác ở Premier League (đấy dĩ nhiên là Man City và Liverpool).\n' +
                    '                        Có\n' +
                    '                        hai kết luận. Thứ nhất, phong độ tốt trong mùa bóng này không phải là điều bất ngờ, bởi đấy đã\n' +
                    '                        là\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n')
            })




        },
        error: function (data) {
            console.log("Result: ", data)
        }
    });

    $('#tentv1').click(function (event) {
        $('#noidungch').prop("disabled", false);
        $('#chitiet').prop("disabled", false);
        $('#edit').css({'display':'inline'});
    });

    $('#edit').click(function (event) {
        event.preventDefault();
        var noidungch = $('#noidungch').val();
        var chitiet = $('#chitiet').val();
        var data = JSON.stringify({
            "title": noidungch,
            "descriptions": chitiet
        });
        console.log(data);

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/question?q_id=${q_id}`,
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            "data": data,
            "processData": false,
        }).done(function (response) {
            $('#noidungch').prop("disabled", true);
            $('#chitiet').prop("disabled", true);
            $('#edit').css({'display':'none'});
        });
    });

    $('#sua').click(function (event) {
        event.preventDefault();
        var cmt = $('#cmt').val();

        var data = JSON.stringify({
            "title": noidungch,
            "descriptions": chitiet
        });
        console.log(data);

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}//question/edit_answer?q_id=${q_id}`,
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            "data": data,
            "processData": false,
        }).done(function (response) {
            $('#noidungch').prop("disabled", true);
            $('#chitiet').prop("disabled", true);
            $('#edit').css({'display':'none'})
        });
    });

    $('#btn').click(function (event) {
        event.preventDefault();
        var cmt = $('#gocmt').val();
        var data = JSON.stringify({
            "response_username": username,
            "response_fullname": "Tăn Thị Nhung",
            "content": cmt
        });

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/question/add_answer?q_id=${q_id}`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            "data": data,
            "processData": false,
        }).done(function (response) {
            window.location.href = `chitietcauhoi.html?q_id=${q_id}`;
        });

    });

    $('#tentv2').click(function (event) {
        event.preventDefault();
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/question?q_id=${q_id}`,
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

    $('#tentv3').click(function (event) {
        event.preventDefault();
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `http://${path}/question/like?q_id=${q_id}`,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            "processData": false,
        }).done(function (response) {
            window.location.href = `chitietcauhoi.html?q_id=${q_id}`;
        });

    });

});