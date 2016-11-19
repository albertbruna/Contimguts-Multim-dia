/**
 * Created by Ana i Albert on 18/10/2016.
 */
$(document).ready(function () {
    var localT = 0;
    var visitorT = 0;
    var image1 = new Image();
    image1.src ="http://as01.epimg.net/img/comunes/fotos/fichas/equipos/medium/3.png";
    var image2 = new Image();
    image2.src ="http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/42.png";

    var Pala = function(x_start,y_end){
        this.color_pala = "#336699";
        this.position = {x:x_start, y:0};
        this.size = {w:5, h:60};
        this.y_end = y_end;
    };
    Pala.prototype.render = function (ctx) {
        ctx.fillStyle = this.color_pala;
        ctx.fillRect(   this.position.x,
                        this.position.y,
                        this.size.w,
                        this.size.h);
    };

    Pala.prototype.goUp = function(){
        if(this.position.y >= 0) this.position.y -= 10;
    };
    Pala.prototype.goDown = function(){
        if(this.position.y+this.size.h <= this.y_end) this.position.y += 10;
    };
    Pala.prototype.setKeys = function(keyUp, keyDown){
        var _this = this;
        $(window).keydown(function(event) {
            //console.log("Key pressed is: " +event.which);
            if ( event.which == keyUp ) {
                _this.goUp()
            }else if( event.which == keyDown ){
                _this.goDown();
            }
        });
    }

    var Bola = function(start_pos_x, start_pos_y){
        this.position = {x:start_pos_x, y:start_pos_y};
        this.color_bola = "#FF0000";
        this.size = {w:5, h:5};
        this.angle =  170;
        this.radiusBola = 3;
        this.direction= {x:-1, y:-1};
        this.speed = {x:7, y:7};
    }
    Bola.prototype.render = function(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color_bola;
        ctx.arc(this.position.x, this.position.y, this.radiusBola, 0, (Math.PI / 180)*360, false);
        ctx.fill();
        ctx.closePath;
    }


    var socket = io();

    socket.on('update-marcador', function(newScore){
        localT = newScore.local;
        visitorT = newScore.visitor;
        marcador(ctx);
    });

    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");

    var pala_L = new Pala(0,canvas.height);
    var pala_R = new Pala(295,canvas.height);

    pala_L.setKeys(81,65); // Keys: Q, A
    pala_R.setKeys(87,83); // Keys: W, S

    var bola = new Bola(canvas.width/2, canvas.height/2);

    function updateBola(){
        bola.position.x = bola.position.x + bola.speed.x * bola.direction.x;
        bola.position.y = bola.position.y + bola.speed.y * bola.direction.y;

        // Goal
        if(bola.position.x < 0){
            //visitor++;
            socket.emit('visitor-goal');
            bola.position.x = canvas.width/2;
            bola.position.y = canvas.height/2;
            pala_L.position.x = 0;
            pala_L.position.y = 55;
            pala_R.position.x = 295;
            pala_R.position.y = 55;
        }
        else if(bola.position.x > canvas.width){
            //local++;
            socket.emit('local-goal');
            bola.position.x = canvas.width/2;
            bola.position.y = canvas.height/2;
            pala_L.position.x = 0;
            pala_L.position.y = 50;
            pala_R.position.x = 295;
            pala_R.position.y = 55;
        }

        // Rebounds
        if(bola.position.y < 17 + bola.radiusBola){
            bola.direction.y = 1;
        }
        else if(bola.position.y > canvas.height - bola.radiusBola){
            bola.direction.y = -1;
        }
        if(bola.position.y >= pala_L.position.y && bola.position.y <= pala_L.position.y + pala_L.size.h && bola.position.x >= pala_L.position.x && bola.position.x <= pala_L.position.x + pala_L.size.w){
            bola.direction.x = 1;
        }
        else if(bola.position.y >= pala_R.position.y && bola.position.y <= pala_R.position.y + pala_R.size.h && bola.position.x >= pala_R.position.x && bola.position.x <= pala_R.position.x + pala_R.size.w){
            bola.direction.x = -1;
        }
    }



    function renderCampo(ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 15, 600, 400);

        ctx.drawImage(image1, 70, 55, 30, 30);
        ctx.drawImage(image2, 200, 55, 30, 30);

        ctx.font = "6px Verdana";
        ctx.strokeText("Barça", 76, 90);
        ctx.strokeText("Atleti", 207, 90);
    }

    function marcador(ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "15px Verdana";
        ctx.fillText(localT,20,14);
        ctx.fillText(visitorT,270,14);
    }

    function render() {
        updateBola();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderCampo(ctx);
        marcador(ctx);
        pala_L.render(ctx);
        pala_R.render(ctx);
        bola.render(ctx);
    };
    setInterval(render, 100);
});



