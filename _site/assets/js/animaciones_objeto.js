

// Constructor function circulo
function Circulo(ctx, x=0, y=0, radio=50){
	this.x = x;
	this.y = y;
	this.radio = radio;
	this.pos_hist = [];
	this.dibujar = function(color_circulo){
		ctx.beginPath();
		ctx.strokeStyle =  color_circulo;
		ctx.arc(this.x, this.y, this.radio,0,2*Math.PI);
		ctx.stroke();
	}
	this.marcar = function(marcas = 1, marca_inicial=0, dibujar_marcas=false, radio_marca, color_marca){
		ctx.translate(this.x, this.y);
		for(let i=1; i<=marcas; i++){
			ctx.beginPath();
			ctx.rotate(2*Math.PI * (i-1)/marcas + marca_inicial)
			ctx.moveTo(-this.radio, 0);
			if(dibujar_marcas){
				ctx.arc(-this.radio, 0, radio_marca, 0, 2*Math.PI);
				ctx.strokeStyle = color_marca;
				ctx.stroke()
				ctx.fillStyle = color_marca;
				ctx.fill();
			}
			
			ctx.rotate(-2*Math.PI * (i-1)/marcas - marca_inicial);
			
		}
		ctx.translate(-this.x, -this.y);		
	}
	this.unir = function(marcas=1, factor=2, marca_inicial=0, color_uniones){
		ctx.translate(this.x, this.y);
		for(let i=1; i<=marcas; i++){
			ctx.beginPath();
			ctx.rotate(2*Math.PI * (i-1)/marcas + marca_inicial);
			ctx.moveTo(-this.radio, 0);
			ctx.rotate(-2*Math.PI * (i-1)/marcas - marca_inicial);
			ctx.rotate(2*Math.PI * (i-1) * factor/marcas + marca_inicial);
			ctx.lineTo(-this.radio, 0);
			ctx.rotate(-2*Math.PI * (i-1)*factor/marcas - marca_inicial);
			ctx.strokeStyle = color_uniones;
			ctx.stroke();
		}
		ctx.translate(-this.x, -this.y);
	}
	this.mover = function(x, y){
		this.x = x;
		this.y = y;
	}
	this.rotar = function(centro_x, centro_y, angulo){
		ctx.translate(centro_x, centro_y);
		
		ctx.rotate(angulo);		
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(100, 100);
		ctx.stroke();
		this.x = 100;
		this.y = 100;
		ctx.rotate(-angulo);
		ctx.translate(-centro_x,-centro_y);
	}
	this.guardarHistorial = function(){
		this.pos_hist.push([this.x, this.y]);
	}
	this.enumerar = function(marcas=0, marca_inicial=0){
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.lineTo(100,100);
		ctx.stroke();
		for(let iter = 1; iter<= marcas; iter++){
			ctx.rotate(2*Math.PI * (iter-1)/marcas);
			ctx.font = "18px Jazz";
			ctx.fillText(iter-1, -this.radio - 25, 0);
			ctx.rotate(-2*Math.PI * (iter-1)/marcas);
		}
		ctx.translate(-this.x, -this.y);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function rotar(tita, vector, bias=[0,0]){
	vector_0 = (vector[0]-bias[0]) * Math.cos(tita) + (vector[1]-bias[1]) * Math.sin(tita) + bias[0];
	vector_1 = -(vector[0]-bias[0]) * Math.sin(tita) + (vector[1]-bias[1]) * Math.cos(tita) + bias[1];
	vector = [vector_0, vector_1];
	return vector;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dibujar_camino(ctx, pos_hist, angulo=0, centro_x=0, centro_y=0){
	ctx.strokeStyle = "purple";
	ctx.beginPath();
	ctx.translate(centro_x, centro_y);
	ctx.rotate(angulo);
	ctx.moveTo(pos_hist[0][0] - centro_x, pos_hist[0][1] - centro_y);
	for(const punto of pos_hist){
		ctx.lineTo(punto[0] - centro_x, punto[1] - centro_y);
	}
	ctx.rotate(-angulo);
	ctx.translate(-centro_x, -centro_y);
	ctx.stroke();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canvas3 = document.getElementById("epicicloides");
const ctx3 = canvas3.getContext("2d");

let radio_rueda = parseFloat(document.getElementById("radio").value);
const circulo_fijo = new Circulo(ctx3, canvas3.width/2, canvas3.height/2,120);
let rueda = new Circulo(ctx3, circulo_fijo.x - (circulo_fijo.radio+radio_rueda), circulo_fijo.y, radio_rueda);
let omega = -0.02;
let marca_hist = [];
let w = 0;

function relacionDown(){
	let relacion = document.getElementById("radio").value / circulo_fijo.radio;
	let iter = 1;
	while(Math.round(relacion*1000)<=Math.round(1000/iter)){
		iter += 1;
	}
	document.getElementById("radio").value = 120 / iter;
}

function relacionUp(){
	let relacion = document.getElementById("radio").value / circulo_fijo.radio;
	if(relacion<1){
		let iter = 23;
		while(Math.round(relacion*1000)>=Math.round(1000/iter) && relacion<1){
			iter -=1;
		}
		console.log("iter", iter);
		document.getElementById("radio").value = 120/iter;
	}	
}

function escena3(){
	let radio_nuevo = parseFloat(document.getElementById("radio").value);
	console.log(rueda.radio);
	if(radio_rueda != radio_nuevo){
		radio_rueda = radio_nuevo;
		rueda = new Circulo(ctx3, circulo_fijo.x - (circulo_fijo.radio+radio_rueda), circulo_fijo.y, radio_rueda);
		marca_hist = [];
		w = 0;
		console.log("entro");
	}
	ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
	circulo_fijo.dibujar("black");
	rueda.dibujar("black");
	rueda.guardarHistorial();
	[rueda.x, rueda.y] = rotar(-omega, [rueda.x, rueda.y], [circulo_fijo.x, circulo_fijo.y]);
	w = w + ((circulo_fijo.radio + rueda.radio)/rueda.radio) * omega;
	rueda.marcar(1, w, true, rueda.radio/10, "purple");
	let ultimo_elemento = rueda.pos_hist.length - 1;
	marca_hist.push([rueda.pos_hist[ultimo_elemento][0] - rueda.radio * Math.cos(w),rueda.pos_hist[ultimo_elemento][1] - rueda.radio * Math.sin(w)]);
	if(rueda.pos_hist.length > 500){
		rueda.pos_hist.shift();
		marca_hist.shift();
	}
	dibujar_camino(ctx3, marca_hist, 0, circulo_fijo.x, circulo_fijo.y, 0, 0);
	document.getElementById("relacion").innerHTML = "Relación entre radios: "+rueda.radio/circulo_fijo.radio;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canvas2 = document.getElementById("cardioide_explicacion");
const ctx2 = canvas2.getContext("2d");

let cantidad_marcas = 0;
const circulo_explicacion = new Circulo(ctx2, canvas2.width/2, canvas2.height/2, Math.min(canvas2.width/2 - 50, canvas2.height/2 - 50));
function escena2(){
	cantidad_marcas = document.getElementById("marcas").value;
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
	ctx2.lineWidth = 1.5;
	circulo_explicacion.dibujar("red");
	circulo_explicacion.marcar(cantidad_marcas, 0, true, 10/Math.log(cantidad_marcas), "black");
	circulo_explicacion.unir(cantidad_marcas, 2, 0, "red");
	circulo_explicacion.enumerar(cantidad_marcas, 0);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const canvas1 = document.getElementById("cardioide_animacion");
const ctx1 = canvas1.getContext("2d");

const circulo_animacion = new Circulo(ctx1, canvas1.width/2, canvas1.height/2, Math.min(canvas1.width/2 - 5, canvas1.height/2 -5));
let factor = parseFloat(document.getElementById("factor").value);
let vel = parseFloat(document.getElementById("velocidad").value);

function logear(){
	vel = 0;
	document.getElementById("velocidad").value = vel;
}

function factorUp(){
	factor = factor + 1;
	document.getElementById("factor").value = factor;
}

function factorDown(){
	factor = factor - 1;
	document.getElementById("factor").value = factor;
}

function escena1(){
	let verde = (255/3 * Math.sin(factor/5 + 0.3 * 3 * 3.3333) + 255/2).toString();
	let azul = (255/3 * Math.cos(factor/5 + 0.3 * 3 * 3.3333) + 255/2).toString();
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	circulo_animacion.dibujar("rgba(255,"+verde+","+azul+",1)");
	circulo_animacion.unir(200, factor, 0, "rgba(255,"+verde+","+azul+",1)");
	factor = parseFloat(document.getElementById("factor").value);
	vel = parseFloat(document.getElementById("velocidad").value);
	factor = factor + vel;
	document.getElementById("factor").value = Math.round(factor*100)/100;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function animar(){
	
	escena3();
	if(cantidad_marcas != document.getElementById("marcas").value){
		escena2();
	}
	escena1();
	requestAnimationFrame(animar);
	
}

animar();


