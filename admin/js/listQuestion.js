const path = '192.168.1.44:8880';

$(document).ready(function () {
    var $question = $('#question');
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
        url: `http://${path}/questions?page=0`,
        dataType: 'json',
        success: function (data) {
            data.map(obj => {
                const {creator_fullname, title, descriptions, created_at, like_number, answers,id} = obj;
                var date = new Date(created_at);
                var day = date.getDay();
                var thang = date.getMonth();
                var nam = date.getFullYear();
                date = `Ngày ${day} tháng ${thang} năm ${nam}`;
                var answersNumber = answers ? answers.length : 0;
                $question.append('<div class="date">\n' +
                    '                            <div class="row">\n' +
                    '                            <div class="diabay">\n' +
                    '                            <img id="diabay" src="photo/diabay-03.png" alt="diabay">\n' +
                    '                            </div>\n' +
                    '                            <div class="text-date">\n' +
                    '                            <p id="textDate">' + date + '</p>\n' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="infoMember">\n' +
                    '                            <div class="row">\n' +
                    '                            <div class="avtMember">\n' +
                    '                            <a>\n' +
                    '                            <img id="avtMember" src="photo/onggia.jpg" alt="avt">\n' +
                    '                            </a>\n' +
                    '                            </div>\n' +
                    '                            <div class="nameMember">\n' +
                    '                            <a href="" id="nameMember">\n' +
                    '                            <p><b>' + creator_fullname + '</b></p>\n' +
                    '                        </a>\n' +
                    '\n' +
                    '                        </div>\n' +
                    '\n' +
                    '                        </div>\n' +
                    '\n' +
                    '                        </div>\n' +
                    '                        <div class="mainContent">\n' +
                    '                            <a href="" id="mainContent-a">\n' +
                    '                            <p id="mainContent">' + title + '\n' + '<p id="mainContent">' + descriptions + '<a id="more" href="http://localhost:63342/vu-tru-hoi-ngu/admin/chitietcauhoi.html?q_id='+id+'"> Chi tiết</a>\n' +
                    '                        </p>\n' +
                    '                        </a>\n' +
                    '                        </div>\n' +
                    '                            <div class="rep">\n' +
                    '                            <div class="like">\n' +
                    '                            <div class="row">\n' +
                    '                            <div class="iconLike">\n' +
                    '                            <img src="photo/like.png" alt="like" id="iconLike">\n' +
                    '                            </div>\n' +
                    '                            <div class="numberLike">\n' +
                    '                            <p id="numberLike">' + like_number + '</p>\n' +
                    '                            </div>\n' +
                    '                            <div class="textLike">\n' +
                    '                            <p id="textLike">like</p>\n' +
                    '                            </div>\n' +
                    '                            </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="comment">\n' +
                    '                            <div class="row">\n' +
                    '                            <div class="iconCmt">\n' +
                    '                            <img src="photo/cmt.png" alt="cmt" id="iconCmt">\n' +
                    '                            </div>\n' +
                    '                            <div class="numberCmt">\n' +
                    '                            <p id="numberCmt">' + answersNumber + '</p>\n' +
                    '                            </div>\n' +
                    '                            <div class="textCmt">\n' +
                    '                            <p id="textCmt">comment</p>\n' +
                    '                            </div>\n' +
                    '                            </div>\n' +
                    '                            </div>\n' +
                    '\n' +
                    '                            </div>\n')


            })
        },
        error: function (data) {
            console.log("Result: ", data)
        }
    });

});
