const path = '192.168.43.254:8880';

const editTime = (created_at) => {
    var date = new Date(created_at);
    var day = date.getDate();
    var thang = date.getMonth();
    var nam = date.getFullYear();
    date = `Ngày ${day} tháng ${thang} năm ${nam}`;
    return date;
}