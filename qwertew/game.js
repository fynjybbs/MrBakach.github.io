var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var bak = [];
var fire=[];
var expl=[];
var timer=0;
var ship={x:300,y:300};

var bakach = new Image();
bakach.src = 'chudo.png';

var fireimg = new Image();
fireimg.src = 'drop01.png';

var shipimg = new Image();
shipimg.src = 'ship01.png';

var fon = new Image();
fon.src = 'fon01.jpg';

//var explimg = new Image();
//explimg.src = 'chudo.png';

canvas.addEventListener("mousemove", function(event){
	ship.x=event.offsetX-25;
	ship.y=event.offsetY-13;
})





fon.onload = function (){
	game();
}

function game(){
 	update();
	render();
	requestAnimFrame(game);
}

function update(){
	//Timer
timer++;
if(timer%10==0){
	bak.push({
	x:Math.random()*600,
	y:-50,
	dx:Math.random()*2-1,
	dy:Math.random()*2+2});
	del:0;
}
//fire
if(timer%10==0){
	fire.push({x:ship.x+10,y:ship.y,dx:0,dy:-5.2});
	fire.push({x:ship.x+10,y:ship.y,dx:0.5,dy:-5});
	fire.push({x:ship.x+10,y:ship.y,dx:-0.5,dy:-5});
}
//двигаем капли
for(i in fire){
fire[i].x=fire[i].x+fire[i].dx;
fire[i].y=fire[i].y+fire[i].dy;
if (fire[i].y<-30) fire.splice(i,1);
}
//анимация взрывов
for(i in expl){
expl[i].animx=expl[i].animx+0.5;
if (expl[i].animx>7) {expl[i].animy++;expl[i].animx=0}
if (expl[i].animx>7)
expl.splice(i,1);
}
	//физика
for(i in bak){
bak[i].x=bak[i].x+bak[i].dx;
bak[i].y=bak[i].y+bak[i].dy;


	//границы
	if (bak[i].x>=550 || bak[i].x<0) bak[i].dx=-bak[i].dx;
	if (bak[i].y>=600 ) bak.slice(i,1);

		for(j in fire){
			if(Math.abs(bak[i].x+25-fire[j].x-15)<50 && Math.abs(bak[i].y-fire[j].y)<25){
				expl.push({x:bak[i].x-25,y:bak[i].y-25,animx:0,animy:0});
				bak[i].del=1;
				fire.splice(j,1);break;
			}
		}
		if(bak[i].del==1) bak.splice(i,1);
	}
}


function render(){
	context.drawImage(fon, 0, 0, 600, 600);
	context.drawImage(shipimg, ship.x, ship.y, 100, 150);
	for(i in fire) context.drawImage(fireimg, fire[i].x, fire[i].y, 50, 30);
	for(i in bak)
	context.drawImage(bakach, bak[i].x, bak[i].y, 150, 150);
}
var requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	 window.webkitRequestAnimationFrame ||
	 window.mozkitRequestAnimationFrame ||
	 window.okitRequestAnimationFrame	||
	 window.mskitRequestAnimationFrame	||
	 function(callback){
	 	window.setTimeout(callback,1000/20);
	 };

})();
