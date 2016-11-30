/**
 * Created by Albert on 22/11/2016.
 */
function calculate(operator, n1, n2){
    var res = 0;
    switch(operator){
        case 3:
            res = Number(n1)*Number(n2);
            break;
        case 7:
            res = Number(n1)/Number(n2);
            break;
        case 11:
            res = Number(n1)-Number(n2);
            break;
        case 15:
            res = Number(n1)+Number(n2);
            break;
    }
    return res;
}

function num(key) {
    switch(key){
        case 0:
            return '1';
        case 1:
            return '2';
        case 2:
            return '3';
        case 4:
            return '4';
        case 5:
            return '5';
        case 6:
            return '6';
        case 8:
            return '7';
        case 9:
            return '8';
        case 10:
            return '9';
        case 13:
            return '0';
    }
}

function onInputUp(button) {

    calculator.add.tween(button.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true);
}

function onInputDown(button) {

    calculator.add.tween(button.scale).to({x: 0.8, y: 0.8}, 200, Phaser.Easing.Cubic.Out, true);
}