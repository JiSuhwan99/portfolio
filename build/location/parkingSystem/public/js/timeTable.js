//�꾩옱�쒓컙 �쒖떆
function nowTime() {
    var time = new Date();

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    $(`#nowtime`).html(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
}
setInterval(nowTime(), 1000);