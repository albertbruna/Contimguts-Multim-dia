/**
 * Created by Albert on 25/10/2016.
 */

$(document).ready(function () {
// Timer
    var sec = 0;
    var min = 2;
    var call;
    var zmin = '';
    var zsec = '';

    function countdown() {
        zero(min, sec);
        sec = sec % 60;
        document.getElementById("timer").innerHTML = zmin + min + ':' + zsec + sec;

        if (min === 0 && sec === 0) {
            alert("Game over!");
            clearTimeOut(call);
        }

        if (sec == 0) {
            min--;
            sec += 60;
        }
        sec--;
        var call = setTimeout(countdown, 1000);
    }

    function zero(min, sec) {
        if (min < 10) {
            zmin = '0';
        }

        if (sec < 10) {
            zsec = '0';
        } else {
            zsec = '';
        }

        return [zsec,zmin];
    }
    countdown();
});
