// JavaScript source code
var jugarPosX = width / 2;
var jugarPosY = 300;
var comoJugarPosX = width / 2;
var comoJugarPosY = 375;
var creditosPosX = width / 2;
var creditosPosY = 450;
var volverPosX = 200;
var volverPosY = 50;
var inputNombreX = (width/4) * 3;
var inputNombreY = height/4;
var nombreJugador;


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
		var width = this.cameras.main.width;
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
		
		// CARGA
        this.load.image('fondo', 'assets/Interfaz/Fondo menu principal.jpg');
        this.load.image('tablon', 'assets/Interfaz/Tablon menu principal.png');
        this.load.image('logo', 'assets/logo.png');
        
        this.load.image('jugar', 'assets/Botones/jugar.png');
        this.load.image('jugar_pulsado', 'assets/Botones/jugar_pulsado.png');;
        this.load.image('creditos', 'assets/Botones/creditos.png');
        this.load.image('creditos_pulsado', 'assets/Botones/creditos_pulsados.png');
        this.load.image('como_jugar', 'assets/Botones/como_jugar.png');
        this.load.image('como_jugar_pulsado', 'assets/Botones/como_jugar_pulsado.png');
        
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);

		
    }
	
    create() {
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		var flipflop = false;
		
        this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
        this.tablon = this.add.image(width / 2, height / 2, 'tablon');
        this.add.image(300, 150, 'logo').setScale(0.4);

        this.buttonJugar = this.add.sprite(jugarPosX, jugarPosY, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => {this.buttonJugar.setTexture("jugar_pulsado");});
        this.buttonJugar.on('pointerup', () => PasarEscena(this, "LevelSelect"));
        this.buttonJugar.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonJugar.setTexture("jugar_pulsado");}});
        this.buttonJugar.on('pointerout', () => {this.buttonJugar.setTexture("jugar");});
		
        this.buttonComoJugar = this.add.sprite(comoJugarPosX, comoJugarPosY, 'como_jugar').setScale(0.5).setInteractive();
		this.buttonComoJugar.on('pointerdown', () => {this.buttonComoJugar.setTexture("como_jugar_pulsado");});
        this.buttonComoJugar.on('pointerup', () => PasarEscena(this, "ComoJugar"));
        this.buttonComoJugar.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonComoJugar.setTexture("como_jugar_pulsado");}});
        this.buttonComoJugar.on('pointerout', () => {this.buttonComoJugar.setTexture("como_jugar");});

        this.buttonCreditos = this.add.sprite(creditosPosX, creditosPosY, 'creditos').setScale(0.5).setInteractive();
		this.buttonCreditos.on('pointerdown', () => {this.buttonCreditos.setTexture("creditos_pulsado");});
        this.buttonCreditos.on('pointerup', () => PasarEscena(this, "creditos"));
        this.buttonCreditos.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonCreditos.setTexture("creditos_pulsado");}});
        this.buttonCreditos.on('pointerout', () => {this.buttonCreditos.setTexture("creditos");});

        var FKey = this.input.keyboard.addKey('F');
        
        FKey.on('down', function () {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                }
                else {
                    this.scale.startFullscreen();
                }
        }, this);
        
        //Creamos el input text del chaval este tan majo y ponemos que cuando el texto cambie se guarde en la variable nombreJugador
        var inputText = this.add.rexInputText(inputNombreX, inputNombreY, 300, 40, {
            placeholder: 'Introduce tu nombre',
        });
        inputText.on('textchange', function(inputText){
            nombreJugador = inputText.text;
        }, this);

        inputText.on('focus', function(){
            flipflop = true;
        }, this);
        
        inputText.on('blur', function(){
            flipflop = false;
        }, this);

    }

	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
}

function PasarEscena(that, escena, nivel){
    //this.scale.off('resize');
    if(nombreJugador == undefined){
        console.log('Mete un nombre, bobo');
    }else{
        that.scene.start(escena, nivel);
    }
	
}