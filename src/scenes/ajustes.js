var textoConfiguracionEspañol = {
	left: "Izquierda",
	right: "Derecha",
	up: "Arriba",
	down: "Abajo",
	jump: "Salto",
	dash: "Dash",
	accion: "Accion",
	inventario: "Tarjetas",
	fullscreen: "Pantalla completa",
	pausa: "Pausa"
}
var textoConfiguracionIngles = {
	left: "Left",
	right: "Right",
	up: "Up",
	down: "Down",
	jump: "Jump",
	dash: "Dash",
	accion: "Action",
	inventario: "Cards",
	fullscreen: "Fullscreen",
	pausa: "Pause"
}

var configTexto = {
	fontFamily: 'Sylfaen',
	fontSize: '14px',
	color: '#4f5051',
	stroke: '#fff',
	strokeThickness: 0.2,
	align: 'justify',  // 'left'|'center'|'right'|'justify'
	maxLines: 0,
	lineSpacing: 0,
	fixedWidth: 198,
	fixedHeight: 92 ,
	rtl: false,
	testString: '|MÉqgy',
	wordWrap: {
		width: 198,
		callback: null,
		callbackScope: null,
		useAdvancedWrap: false
	},
	metrics: false
	// metrics: {
	//     ascent: 0,
	//     descent: 0,
	//     fontSize: 0
	// }
};


var arrayTeclas = new Array();
var arrayTeclasInternos = new Array();
var separacionBotonesY = 45;
var separacionBotonesX = 175;
var separacionBotonesCambiarX = 305;
var inicioTeclas = 65;
var teclasIntY = 11;
var teclasIntX = 7;
var teclasGrandesX = 0;
var desplazamientoGrandesX = 9;
// JavaScript source code
class Ajustes extends Phaser.Scene {

    constructor() {
        super('Ajustes');
    }
	shutdown(){
		this.load.off('progress');
		this.load.off('complete');
	}
    preload() {
		// BARRA DE CARGA
		/*var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		
		var progressBar = this.add.graphics(width / 2, height / 2);
		var progressBox = this.add.graphics(width / 2, height / 2);
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(width / 2 - 320 / 2, height / 2, 320, 50);
		
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		this.load.on('progress', function (value) {
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(width / 2 - 320 / 2 + 10, height / 2 + 10, 300 * value, 30);

			percentText.setText(parseInt(value * 100) + '%');
		});


		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			percentText.destroy();
		});
		this.sys.events.once('shutdown', this.shutdown, this);
		*/
		
		// CARGA
		/*
        this.load.image('volver', 'assets/Interfaz/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Interfaz/Botones/volver_pulsado.png');
		*/
	}
	create() {
		this.cameras.main.fadeIn(valorFade);
		
		
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
        this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
		//this.tablon_graficos = this.add.image(width / 2 - 190, height / 2 + 20, 'tablon_graficos');
		//this.tablon_teclas = this.add.image(width / 2 + 230, height / 2, 'tablon_teclas');
		this.tablon_ajustes = this.add.image(width / 2 , height / 2, 'tablon_ajustes');
		//this.tablon_ajustes.setDisplaySize(width, height);


        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setInteractive();
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => PasarEscena(this, "Mainmenu"));
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
        this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});
		
		this.tablon = this.add.image(width / 2, height / 2, 'tablonPausa').setVisible(false);
		
		var cambiar;
		var cambiar_pulsado;
		var graficos;
		var volumen;
		if(enPc){
			if(idioma.idioma.includes("es")){
				var i = 0;
				cambiar = 'cambiar';
				graficos = 'graficos_es';
				volumen = 'volumen_es';
				cambiar_pulsado = 'cambiar_pulsado';
				for (var key in textoConfiguracionEspañol){
					this.add.text(width / 2 - 5, 57 + i * separacionBotonesY, textoConfiguracionEspañol[key], configTextoMesa);
					i++;
				}
			}else{
				var i = 0;
				cambiar = 'cambiar_en';
				graficos = 'graficos_en';
				volumen = 'volumen_en';
				cambiar_pulsado = 'cambiar_en_pulsado';
				for (var key in textoConfiguracionIngles){
					this.add.text(width / 2 - 5, 57 + i * separacionBotonesY, textoConfiguracionIngles[key], configTextoMesa);
					i++;
				}
			}
			this.graficos = this.add.image(width / 2 - 215, height / 2 - 110, graficos.toString());
			this.volumen = this.add.image(width / 2 - 215, height / 2 + 150, volumen.toString());
			//var controlesGuardados = JSON.parse(localStorage.getItem('controlesGuardados'));
			//console.log(controlesGuardados);

			var i = 0;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'left'))); 
			this.botonIzq = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar.toString()).setInteractive();
			this.botonIzq.on('pointerdown', () => {this.botonIzq.setTexture(cambiar_pulsado.toString());});
			this.botonIzq.on('pointerup', () => {this.botonIzq.setTexture(cambiar.toString()); this.RecibirTecla('left');} );
			this.botonIzq.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonIzq.setTexture(cambiar_pulsado);}});
			this.botonIzq.on('pointerout', () => {this.botonIzq.setTexture(cambiar.toString());});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'right'))); 
			this.botonDcha = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonDcha.on('pointerdown', () => {this.botonDcha.setTexture(cambiar_pulsado.toString());});
			this.botonDcha.on('pointerup', () => {this.botonDcha.setTexture(cambiar); this.RecibirTecla('right');});
			this.botonDcha.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonDcha.setTexture(cambiar_pulsado.toString());}});
			this.botonDcha.on('pointerout', () => {this.botonDcha.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'up'))); 
			this.botonArriba = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonArriba.on('pointerdown', () => {this.botonArriba.setTexture(cambiar_pulsado.toString());});
			this.botonArriba.on('pointerup', () => {this.botonArriba.setTexture(cambiar); this.RecibirTecla('up');});
			this.botonArriba.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonArriba.setTexture(cambiar_pulsado.toString());}});
			this.botonArriba.on('pointerout', () => {this.botonArriba.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'down'))); 
			this.botonAbajo = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonAbajo.on('pointerdown', () => {this.botonAbajo.setTexture(cambiar_pulsado.toString());});
			this.botonAbajo.on('pointerup', () => {this.botonAbajo.setTexture(cambiar); this.RecibirTecla('down');});
			this.botonAbajo.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonAbajo.setTexture(cambiar_pulsado.toString());}});
			this.botonAbajo.on('pointerout', () => {this.botonAbajo.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'jump'))); 
			this.botonSalto = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonSalto.on('pointerdown', () => {this.botonSalto.setTexture(cambiar_pulsado.toString());});
			this.botonSalto.on('pointerup', () => {this.botonSalto.setTexture(cambiar); this.RecibirTecla('jump');});
			this.botonSalto.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonSalto.setTexture(cambiar_pulsado.toString());}});
			this.botonSalto.on('pointerout', () => {this.botonSalto.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'dash'))); 
			this.botonDash = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonDash.on('pointerdown', () => {this.botonDash.setTexture(cambiar_pulsado.toString());});
			this.botonDash.on('pointerup', () => {this.botonDash.setTexture(cambiar); this.RecibirTecla('dash');});
			this.botonDash.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonDash.setTexture(cambiar_pulsado.toString());}});
			this.botonDash.on('pointerout', () => {this.botonDash.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'accion'))); 
			this.botonAccion = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonAccion.on('pointerdown', () => {this.botonAccion.setTexture(cambiar_pulsado.toString());});
			this.botonAccion.on('pointerup', () => {this.botonAccion.setTexture(cambiar); this.RecibirTecla('accion');});
			this.botonAccion.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonAccion.setTexture(cambiar_pulsado.toString());}});
			this.botonAccion.on('pointerout', () => {this.botonAccion.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'inventario'))); 
			this.botonTarjetas = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonTarjetas.on('pointerdown', () => {this.botonTarjetas.setTexture(cambiar_pulsado.toString());});
			this.botonTarjetas.on('pointerup', () => {this.botonTarjetas.setTexture(cambiar); this.RecibirTecla('inventario');});
			this.botonTarjetas.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonTarjetas.setTexture(cambiar_pulsado.toString());}});
			this.botonTarjetas.on('pointerout', () => {this.botonTarjetas.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'fullscreen'))); 
			this.botonFullscreen = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonFullscreen.on('pointerdown', () => {this.botonFullscreen.setTexture(cambiar_pulsado.toString());});
			this.botonFullscreen.on('pointerup', () => {this.botonFullscreen.setTexture(cambiar); this.RecibirTecla('fullscreen');});
			this.botonFullscreen.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonFullscreen.setTexture(cambiar_pulsado.toString());}});
			this.botonFullscreen.on('pointerout', () => {this.botonFullscreen.setTexture(cambiar);});
			i++;
			//arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX*1.5, 50 + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'pausa'))); 
			this.botonPausa = this.add.sprite(width / 2 + separacionBotonesCambiarX, inicioTeclas + i * separacionBotonesY, cambiar).setInteractive();
			this.botonPausa.on('pointerdown', () => {this.botonPausa.setTexture(cambiar_pulsado.toString());});
			this.botonPausa.on('pointerup', () => {this.botonPausa.setTexture(cambiar); this.RecibirTecla('pausa');});
			this.botonPausa.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonPausa.setTexture(cambiar_pulsado.toString());}});
			this.botonPausa.on('pointerout', () => {this.botonPausa.setTexture(cambiar);});

			this.ListaTeclas();
		}
		
		this.graficos = JSON.parse(localStorage.getItem('graficos')) || {
			iluminacion: true,
			particulas: true
		};
		if(enPc){
			this.botonAlto = this.add.sprite(width / 2 - 220, height / 2 - 55, 'alto_pulsado').setInteractive();
			this.botonMedio = this.add.sprite(width / 2 - 220, (height / 2) + 20, 'medio_pulsado').setInteractive();
			this.botonBajo = this.add.sprite(width / 2 - 220, (height / 2) + 95, 'bajo_pulsado').setInteractive();
			
		}else{
			this.botonAlto = this.add.sprite(width / 2, height / 2 - 50, 'alto_pulsado').setInteractive();
			this.botonMedio = this.add.sprite(width / 2, (height / 2) , 'medio_pulsado').setInteractive();
			this.botonBajo = this.add.sprite(width / 2, (height / 2) * 3, 'bajo_pulsado').setInteractive();
		}
		
		this.botonAlto.on('pointerdown', () => this.PulsarAlto());

		this.botonBajo.on('pointerdown', () => this.PulsarBajo());
		this.botonMedio.on('pointerdown', () => this.PulsarMedio());
		
		if(this.graficos.iluminacion){
			if(this.graficos.particulas){
				this.botonAlto.setTexture('alto');
			}else{
				this.botonMedio.setTexture('medio');
			}
		}else{
			this.botonBajo.setTexture('bajo');
		}
		
    }

	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
	
	RecibirTecla(accion){
		this.botonIzq.setVisible(false);
		this.botonDcha.setVisible(false);
		this.botonArriba.setVisible(false);
		this.botonAbajo.setVisible(false);
		this.botonSalto.setVisible(false);
		this.botonDash.setVisible(false);
		this.botonAccion.setVisible(false);
		this.botonTarjetas.setVisible(false);
		this.botonFullscreen.setVisible(false);
		this.botonPausa.setVisible(false);
		this.botonAlto.setVisible(false);
		this.botonMedio.setVisible(false);
		this.botonBajo.setVisible(false);
		
		
		this.tablon.setVisible(true);
		var texto;
		var acciones; 
		if(idioma.idioma.includes("es")){
			texto = "Pulsa la tecla para: ";
			acciones = textoConfiguracionEspañol;
		}else{
			texto = "Press the key for: ";
			acciones = textoConfiguracionIngles;
		}
		
		this.texto = this.add.text(width / 2, height / 2, texto + acciones[accion], configTextoMesa);
		
		this.texto.depth = 100;
		this.tablon.depth = 100;
		this.input.keyboard.once('keydown', (eventName, event) => {
			var controlesGuardados = JSON.parse(localStorage.getItem('controlesGuardados')) || {
				left: Phaser.Input.Keyboard.KeyCodes.A,
				right: Phaser.Input.Keyboard.KeyCodes.D,
				up: Phaser.Input.Keyboard.KeyCodes.W,
				down: Phaser.Input.Keyboard.KeyCodes.S,
				jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
				dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
				accion: Phaser.Input.Keyboard.KeyCodes.E,
				inventario: Phaser.Input.Keyboard.KeyCodes.Q,
				fullscreen: Phaser.Input.Keyboard.KeyCodes.F,
				pausa: Phaser.Input.Keyboard.KeyCodes.P,
				//debug
				propiedades: Phaser.Input.Keyboard.KeyCodes.L,
				tpMesa: Phaser.Input.Keyboard.KeyCodes.I,
				tpCosas: Phaser.Input.Keyboard.KeyCodes.O
			};
			console.log(controlesGuardados);
			controlesGuardados[accion] = eventName.keyCode;

			localStorage.setItem('controlesGuardados', JSON.stringify(controlesGuardados));
			this.ComprobarTecla(controlesGuardados, accion);
			this.ListaTeclas();

			this.tablon.setVisible(false);
			this.texto.setVisible(false);
			
			this.botonIzq.setVisible(true);
			this.botonDcha.setVisible(true);
			this.botonArriba.setVisible(true);
			this.botonAbajo.setVisible(true);
			this.botonSalto.setVisible(true);
			this.botonDash.setVisible(true);
			this.botonAccion.setVisible(true);
			this.botonTarjetas.setVisible(true);
			this.botonFullscreen.setVisible(true);
			this.botonPausa.setVisible(true);
			this.botonAlto.setVisible(true);
			this.botonMedio.setVisible(true);
			this.botonBajo.setVisible(true);
			
		
			
			
		});
	}
	
	PulsarAlto(){
		if(!(this.graficos.iluminacion && this.graficos.particulas)){
			this.botonAlto.setTexture('alto');
			this.botonMedio.setTexture('medio_pulsado');
			this.botonBajo.setTexture('bajo_pulsado');
			this.graficos.iluminacion = true;
			this.graficos.particulas = true;
			localStorage.setItem('graficos', JSON.stringify(this.graficos));
		}
	}
	PulsarMedio(){
		if(!(this.graficos.iluminacion && !this.graficos.particulas)){
			this.botonAlto.setTexture('alto_pulsado');
			this.botonMedio.setTexture('medio');
			this.botonBajo.setTexture('bajo_pulsado');
			this.graficos.iluminacion = true;
			this.graficos.particulas = false;
			localStorage.setItem('graficos', JSON.stringify(this.graficos));
		}
	}
	PulsarBajo(){
		if(!(!this.graficos.iluminacion && !this.graficos.particulas)){
			this.botonAlto.setTexture('alto_pulsado');
			this.botonMedio.setTexture('medio_pulsado');
			this.botonBajo.setTexture('bajo');
			this.graficos.iluminacion = false;
			this.graficos.particulas = false;
			localStorage.setItem('graficos', JSON.stringify(this.graficos));
		}
	}

	ComprobarTecla(array, tecla){
		if(array[tecla] == 46){//delete
			return new Array("atras");
		}
		else if(array[tecla] == 13){//enter
			return new Array("enter");
		}
		else if(array[tecla] == 32){//space
			return new Array("espacio");
		}
		else if(array[tecla] == 40){//down
			return new Array("flecha_abajo");
		}
		else if(array[tecla] == 38){//up
			return new Array("flecha_arriba");
		}
		else if(array[tecla] == 39){//right
			return new Array("flecha_derecha");
		}
		else if(array[tecla] == 37){//left
			return new Array("flecha_izquierda");
		}
		else if(array[tecla] == 16){//shift
			return new Array("shift");
		}
		else if(array[tecla] == 9){//tab
			return new Array("tabulador");
		}
		else if(array[tecla]>= 65 && array[tecla]<= 90){//letras
			return new Array("tecla_base", String.fromCharCode(array[tecla]));
		}
		else if(array[tecla]>= 49 && array[tecla]<= 57){//numeros
			return new Array("tecla_base", String.fromCharCode(array[tecla]));
		}
		else if(array[tecla] == 18){//alt
			return new Array("tecla_larga_base", "ALT");
		}
		else if(array[tecla] == 17){//ctrl
			return new Array("tecla_larga_base", "CTRL");
		}
		else if(array[tecla] == 20){//block mayus
			return new Array("tecla_larga_base", "CAPS");
		}
		else if(array[tecla] == 220){//º
			return new Array("tecla_base", "º");
		}
		else if(array[tecla] == 186){//`
			return new Array("tecla_base", "`");
		}
		else if(array[tecla] == 219){//'
			return new Array("tecla_base", "'");
		}
		else if(array[tecla] == 221){//¡
			return new Array("tecla_base", "¡");
		}
		else if(array[tecla] == 188){//,
			return new Array("tecla_base", ",");
		}
		else if(array[tecla] == 190){//.
			return new Array("tecla_base", ".");
		}
		else if(array[tecla] == 189){//-
			return new Array("tecla_base", "-");
		}
		else if(array[tecla] == 222){//´
			return new Array("tecla_base", "´");
		}
		else if(array[tecla] == 191){//ç
			return new Array("tecla_base", "ç");
		}
		else if(array[tecla] == 187){//+
			return new Array("tecla_base", "+");
		}
		else if(array[tecla] == 27){//ESC
			return new Array("tecla_larga_base", "ESC");
		}
		else if(array[tecla] == 18){//ALTG
			return new Array("tecla_larga_base", "ALTG");
		}
		else if(array[tecla] == 18){//ALTG
			return new Array("teclabase", "");
		}
	}

	ListaTeclas(){
		for(let j = 0; j < arrayTeclas.length; j++){
			arrayTeclas[j].destroy();
		}
		for(let j = 0; j < arrayTeclasInternos.length; j++){
			arrayTeclasInternos[j].destroy();
		}
		arrayTeclas = new Array();
		arrayTeclasInternos = new Array();
		var controlesGuardados = JSON.parse(localStorage.getItem('controlesGuardados'));
		var i = 0;
		
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'left')[0]));
		if(this.ComprobarTecla(controlesGuardados, 'left').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'left')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'left')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'left')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'left')[1], configTexto));
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'right')[0]));
		if(this.ComprobarTecla(controlesGuardados, 'right').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'right')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'right')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'right')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'right')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'up')[0])); 
		if(this.ComprobarTecla(controlesGuardados, 'up').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'up')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'up')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'up')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'up')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'down')[0])); 
		if(this.ComprobarTecla(controlesGuardados, 'down').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'down')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'down')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'down')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'down')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'jump')[0])); 
		if(this.ComprobarTecla(controlesGuardados, 'jump').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'jump')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'ljumpeft')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'jump')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'jump')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'dash')[0]));
		if(this.ComprobarTecla(controlesGuardados, 'dash').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'dash')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'dash')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'dash')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'dash')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'accion')[0]));
		if(this.ComprobarTecla(controlesGuardados, 'accion').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'accion')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'accion')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'accion')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'accion')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'inventario')[0])); 
		if(this.ComprobarTecla(controlesGuardados, 'inventario').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'inventario')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'inventario')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'inventario')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'inventario')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'fullscreen')[0]));
		if(this.ComprobarTecla(controlesGuardados, 'fullscreen').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'fullscreen')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'fullscreen')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'fullscreen')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'fullscreen')[1], configTexto))
			teclasGrandesX = 0;
		} 
		i++;
		arrayTeclas.push(this.add.sprite(width / 2 + separacionBotonesX, inicioTeclas + i * separacionBotonesY, this.ComprobarTecla(controlesGuardados, 'pausa')[0])); 
		if(this.ComprobarTecla(controlesGuardados, 'pausa').length > 1){
			if(this.ComprobarTecla(controlesGuardados, 'pausa')[1] == "CAPS" || this.ComprobarTecla(controlesGuardados, 'pausa')[1] == "ALT" || this.ComprobarTecla(controlesGuardados, 'pausa')[1] == "CTRL"){
				teclasGrandesX = desplazamientoGrandesX;
			}
			arrayTeclasInternos.push(this.add.text(width / 2 + separacionBotonesX - teclasIntX - teclasGrandesX, inicioTeclas + i * separacionBotonesY - teclasIntY, this.ComprobarTecla(controlesGuardados, 'pausa')[1], configTexto))
			teclasGrandesX = 0;
		} 
	}
}