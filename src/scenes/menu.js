// JavaScript source code
const separacionBotones = 97;
const jugarPosX = width / 2 + 7;
const jugarPosY = 240;
const comoJugarPosX = width / 2 + 7;
const comoJugarPosY = jugarPosY + separacionBotones;
const creditosPosX = width / 2 + 7;
const creditosPosY = comoJugarPosY + separacionBotones;
const volverPosX = 57;
const volverPosY = 57;
const idiomaPosX = width - 75;
const idiomaPosY = height - 75
const logoPosX = width / 2;
const logoPosY = 110

var seHaJugado = false;

var valorFade = 200;
class Mainmenu extends Phaser.Scene {

    constructor() {
        super("Mainmenu");
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
        this.load.image('fondo', 'assets/Interfaz/Fondo menu principal.jpg');
        this.load.image('tablon', 'assets/Interfaz/Tablon menu principal cartas.png');
        this.load.image('logo', 'assets/logo.png');
        */
		
		// SENSIBLE A IDIOMA
		// ESPAÑOL
		if(idioma.idioma.includes("es")){
			this.load.image('jugar', 'assets/Interfaz/Botones/Espanol/jugar.png');
			this.load.image('jugar_pulsado', 'assets/Interfaz/Botones/Espanol/jugar_pulsado.png');;
			this.load.image('creditos', 'assets/Interfaz/Botones/Espanol/creditos.png');
			this.load.image('creditos_pulsado', 'assets/Interfaz/Botones/Espanol/creditos_pulsado.png');
			this.load.image('ranking', 'assets/Interfaz/Botones/Espanol/empleado.png');
			this.load.image('ranking_pulsado', 'assets/Interfaz/Botones/Espanol/empleado_pulsado.png');
			this.load.image('idioma', 'assets/Interfaz/Botones/Espanol/idioma.png');
			this.load.image('alto', 'assets/Interfaz/Botones/Espanol/alto.png');
			this.load.image('alto_pulsado', 'assets/Interfaz/Botones/Espanol/alto_pulsado.png');
			this.load.image('bajo', 'assets/Interfaz/Botones/Espanol/bajo.png');
			this.load.image('bajo_pulsado', 'assets/Interfaz/Botones/Espanol/bajo_pulsado.png');
			this.load.image('medio', 'assets/Interfaz/Botones/Espanol/medio.png');
			this.load.image('medio_pulsado', 'assets/Interfaz/Botones/Espanol/medio_pulsado.png');
			
			this.load.image("botonEnviarCielo", "assets/Interfaz/Botones/Espanol/boton_cielo.png");
			this.load.image("botonEnviarCielo_pulsado", "assets/Interfaz/Botones/Espanol/boton_cielo_pulsado.png");
			this.load.image("botonEnviarInfierno", "assets/Interfaz/Botones/Espanol/boton_infierno.png");
			this.load.image("botonEnviarInfierno_pulsado", "assets/Interfaz/Botones/Espanol/boton_infierno_pulsado.png");
			this.load.image("menu", "assets/Interfaz/Botones/Espanol/menu.png");
			this.load.image("menu_pulsado", "assets/Interfaz/Botones/Espanol/menu_pulsado.png");
			this.load.image("reanudar", "assets/Interfaz/Botones/Espanol/reanudar.png");
			this.load.image("reanudar_pulsado", "assets/Interfaz/Botones/Espanol/reanudar_pulsado.png");
			this.load.image("pausa", "assets/Interfaz/Botones/Espanol/pausa.png");
		}
        else{
			// INGLES
			this.load.image('jugar', 'assets/Interfaz/Botones/Ingles/jugar.png');
			this.load.image('jugar_pulsado', 'assets/Interfaz/Botones/Ingles/jugar_pulsado.png');;
			this.load.image('creditos', 'assets/Interfaz/Botones/Ingles/creditos.png');
			this.load.image('creditos_pulsado', 'assets/Interfaz/Botones/Ingles/creditos_pulsado.png');
			this.load.image('ranking', 'assets/Interfaz/Botones/Ingles/empleado.png');
			this.load.image('ranking_pulsado', 'assets/Interfaz/Botones/Ingles/empleado_pulsado.png');
			this.load.image('idioma', 'assets/Interfaz/Botones/Ingles/idioma.png');
			this.load.image('alto', 'assets/Interfaz/Botones/Ingles/alto.png');
			this.load.image('alto_pulsado', 'assets/Interfaz/Botones/Ingles/alto_pulsado.png');
			this.load.image('bajo', 'assets/Interfaz/Botones/Ingles/bajo.png');
			this.load.image('bajo_pulsado', 'assets/Interfaz/Botones/Ingles/bajo_pulsado.png');
			this.load.image('medio', 'assets/Interfaz/Botones/Ingles/medio.png');
			this.load.image('medio_pulsado', 'assets/Interfaz/Botones/Ingles/medio_pulsado.png');

			this.load.image("botonEnviarCielo", "assets/Interfaz/Botones/Ingles/boton_cielo.png");
			this.load.image("botonEnviarCielo_pulsado", "assets/Interfaz/Botones/Ingles/boton_cielo_pulsado.png");
			this.load.image("botonEnviarInfierno", "assets/Interfaz/Botones/Ingles/boton_infierno.png");
			this.load.image("botonEnviarInfierno_pulsado", "assets/Interfaz/Botones/Ingles/boton_infierno_pulsado.png");
			this.load.image("menu", "assets/Interfaz/Botones/Ingles/menu.png");
			this.load.image("menu_pulsado", "assets/Interfaz/Botones/Ingles/menu_pulsado.png");
			this.load.image("reanudar", "assets/Interfaz/Botones/Ingles/reanudar.png");
			this.load.image("reanudar_pulsado", "assets/Interfaz/Botones/Ingles/reanudar_pulsado.png");
			this.load.image("pausa", "assets/Interfaz/Botones/Ingles/pausa.png");
		}
		
		
        
        

		
    }
	
    create() {
		this.cameras.main.fadeIn(valorFade);
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		var flipflop = false;
		
        this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
        this.tablon = this.add.image(width / 2, height / 2, 'tablon');
        this.logo = this.add.image(logoPosX, logoPosY, 'logo');

        this.buttonJugar = this.add.sprite(jugarPosX, jugarPosY, 'jugar').setInteractive();
        this.buttonJugar.on('pointerdown', () => {this.buttonJugar.setTexture("jugar_pulsado");});
        this.buttonJugar.on('pointerup', () => PasarEscena(this, "LevelSelect"));
        this.buttonJugar.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonJugar.setTexture("jugar_pulsado");}});
        this.buttonJugar.on('pointerout', () => {this.buttonJugar.setTexture("jugar");});
		
        this.buttonRanking = this.add.sprite(comoJugarPosX, comoJugarPosY, 'ranking').setInteractive();
		this.buttonRanking.on('pointerdown', () => {this.buttonRanking.setTexture("ranking_pulsado");});
        this.buttonRanking.on('pointerup', () => PasarEscena(this, "Ranking"));
        this.buttonRanking.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonRanking.setTexture("ranking_pulsado");}});
        this.buttonRanking.on('pointerout', () => {this.buttonRanking.setTexture("ranking");});

        this.buttonCreditos = this.add.sprite(creditosPosX, creditosPosY, 'creditos').setInteractive();
		this.buttonCreditos.on('pointerdown', () => {this.buttonCreditos.setTexture("creditos_pulsado");});
        this.buttonCreditos.on('pointerup', () => PasarEscena(this, "creditos"));
        this.buttonCreditos.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonCreditos.setTexture("creditos_pulsado");}});
        this.buttonCreditos.on('pointerout', () => {this.buttonCreditos.setTexture("creditos");});
		
		this.buttonAjustes = this.add.sprite(volverPosX, height - volverPosY, 'ajustes').setInteractive();
		this.buttonAjustes.on('pointerdown', () => {this.buttonAjustes.setTexture("ajustes_pulsado");});
        this.buttonAjustes.on('pointerup', () => PasarEscena(this, "Ajustes"));
        this.buttonAjustes.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonAjustes.setTexture("ajustes_pulsado");}});
        this.buttonAjustes.on('pointerout', () => {this.buttonAjustes.setTexture("ajustes");});
		
		this.buttonIdioma = this.add.sprite(idiomaPosX, idiomaPosY, 'idioma').setInteractive();
		this.buttonIdioma.on('pointerdown', () => this.CambiarIdioma());

		
        var FKey = this.input.keyboard.addKey('F');
        
        FKey.on('down', function () {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                }
                else {
                    this.scale.startFullscreen();
                }
        }, this);
        

    }

	CambiarIdioma(){
		arrayCausaMuerte = new Array();
		if(idioma.idioma.includes("es")){
			idioma.idioma = "en";
			
			arrayCausaMuerte = arrayCausaMuerteIngles;
			// LO PONGO EN ELSE IF POR SI ACASO AÑADIMOS MÁS IDIOMAS
		}else if(idioma.idioma.includes("en")){
			idioma.idioma = "es";
			
			arrayCausaMuerte = arrayCausaMuerteEspanol
		}else{ // 
			idioma.idioma = "es";
			
			arrayCausaMuerte = arrayCausaMuerteEspanol
		}
		localStorage.setItem('idioma', JSON.stringify(idioma));
		
		this.textures.remove('jugar');
		this.textures.remove('jugar_pulsado');
		this.textures.remove('ranking');
		this.textures.remove('ranking_pulsado');
		this.textures.remove('creditos');
		this.textures.remove('creditos_pulsado');
		this.textures.remove('idioma');
		this.textures.remove('alto');
		this.textures.remove('alto_pulsado');
		this.textures.remove('medio');
		this.textures.remove('medio_pulsado');
		this.textures.remove('bajo');
		this.textures.remove('bajo_pulsado');
		
		
		this.textures.remove("botonEnviarCielo");
		this.textures.remove("botonEnviarCielo_pulsado");
		this.textures.remove("botonEnviarInfierno");
		this.textures.remove("botonEnviarInfierno_pulsado");
		this.textures.remove("menu");
		this.textures.remove("menu_pulsado");
		this.textures.remove("reanudar");
		this.textures.remove("reanudar_pulsado");
		this.textures.remove("pausa");
		this.scene.restart();
	}
	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
}

function PasarEscena(that, escena, nivel){
	//this.scale.off('resize');
	that.cameras.main.fadeOut(valorFade);
	/*if( nivel== "Ranking"){
		seHaJugado = false;
	}*/
	if(nivel == "Nivel1" || nivel == "Nivel2" || nivel == "Nivel3" || nivel == "tutorial"){
		that.sound.stopAll();
		that.sound.play("s_game");
	}
    that.cameras.main.on('camerafadeoutcomplete', () => {that.scene.start(escena, nivel);});
	
	
    //if(nombreJugador == undefined){
      //  console.log('Mete un nombre, bobo');
    //}else{
      //  that.scene.start(escena, nivel);
    //}
}

