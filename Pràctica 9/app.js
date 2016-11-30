/**
 * Created by Albert on 22/11/2016.
 */

var calculator = new Phaser.Game(450, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    calculator.load.image('button-0', 'images/one.png');
    calculator.load.image('button-1', 'images/two.png');
    calculator.load.image('button-2', 'images/three.png');
    calculator.load.image('button-3', 'images/multiply.png');
    calculator.load.image('button-4', 'images/four.png');
    calculator.load.image('button-5', 'images/five.png');
    calculator.load.image('button-6', 'images/six.png');
    calculator.load.image('button-7', 'images/division.png');
    calculator.load.image('button-8', 'images/seven.png');
    calculator.load.image('button-9', 'images/eight.png');
    calculator.load.image('button-10' ,'images/nine.png');
    calculator.load.image('button-11', 'images/minus.png');
    calculator.load.image('button-12', 'images/equal.png');
    calculator.load.image('button-13', 'images/zero.png');
    calculator.load.image('button-14', 'images/clear.png');
    calculator.load.image('button-15', 'images/add.png');
}

var background, button;
var tx;

function create() {
    calculator.stage.backgroundColor = '#FFFFFF';
    var style = { font: "82px Arial", fill: "#000000", align: "center" };
    tx = calculator.add.text(30, 40, "", style);

    var n = 0;
    for(var i = 2; i < 6; i++){
        for(var j = 0.2; j < 3.8; j++){
            var key = "button-" + n;
            b = calculator.add.button(j * 100, i * 100, key, actionOnClick, {keyname:n}, 0, 0, 0);
            b.events.onInputDown.add(onInputDown);
            b.events.onInputUp.add(onInputUp);
            n++;
        }
    }
}

var op = false, res = 0, n1="", n2="", operator = 0, key = 0;

function actionOnClick () {
    key = this.keyname;
    if(key!=12 && key!=14) {
        if (key == 3 || key == 7 || key == 15 || key == 11) {
            tx.text = "";
            operator = key;
            op = true;
            return;
        }
        if (op) {
            n2 += num(key);
            tx.text = n2;
            return;
        }
        else {
            n1 += num(key);
            tx.text = n1;
            return;
        }
    }

    else{
        tx.text = "";
        res = calculate(operator,n1,n2);
        tx.text = String(res);
        operator = 0;
        n1="";
        n2="";
        op= false;
    }
}
