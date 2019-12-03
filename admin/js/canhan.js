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
    $('#user2').click(function (event) {
        sessionStorage.clear();
    });

    $.ajax({
        type: 'GET',
        url: `http://${path}/user?username=${username}`,
        dataType: 'json',
        success: function (data) {
            const {about_me,fullname,email,facebook_url,username,birth_daydisplay_name} = data;
            console.log(data);
            $('xemthu2').append(' <h1> <b>'+username+' <a href="" id="tentv" title="Sửa tên"><i class=\'fas fa-edit\'></i></a></b></h1>\n' +
                '                    <br>\n' +
                '                    <h3>@username</h3> <br>')

        },
    });
})