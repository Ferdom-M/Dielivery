// JavaScript source code




class Results extends Phaser.Scene {

    constructor() {
        super("Results");
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
        this.load.image('fondo', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        
        this.load.image('volver', 'assets/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Botones/volver_pulsado.png');
        
    }

    create(puntuacion) {
		var puntuacionPosX = width / 2;
		var puntuacionPosY = height / 2;
		var scoreboardX = width / 4;
		var scoreboardY = height / 4;
		var volverPosX = 200;
		var volverPosY = 50;
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);

		//Pillamos el scoreboard guardado y lo parseamos para que tenga los vamores bien y no en string, si no encuentra ningun scoreboard porque 
		//nunca se ha jugado, se crea de 0
		var scoreboardGuardado = JSON.parse(localStorage.getItem('scoreboardSave')) || false;
		//Creo un JSON que almacene el nombre y puntuacion del jugador que acaba de jugar
		var nuevoJugador = {
			nombre: nombreJugador,
			puntuacion: puntuacionTotal
		}
		//Si no hay scoreboard, creo uno nuevo, creando primero un array vacio de puntuaciones, metiendo al jugador que acaba de jugar, y metiendo ese array en un JSON
		if(scoreboardGuardado == false){
			var puntuaciones = new Array();
			puntuaciones.push(nuevoJugador);
			var scoreboard = {
				scores: puntuaciones
			}
		}else{
			var scoreboard = scoreboardGuardado
			scoreboard.scores.push(nuevoJugador)
			scoreboard.scores.sort(function(a, b){
				return a.puntuacion-b.puntuacion;
			});
			if(scoreboard.scores.length > 10){
				scoreboard.scores.shift()
			}
			scoreboard.scores = scoreboard.scores.reverse();
		}
		localStorage.setItem('scoreboardSave', JSON.stringify(scoreboard));

        this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
		
		console.log(puntuacionTotal);
		
		this.add.text(puntuacionPosX, puntuacionPosY, "Has acabado con " + puntuacionTotal.toString() + " puntos, pog felicididades " + nombreJugador,
		  { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		//Escritura del scoreboard
		this.add.text(scoreboardX, scoreboardY, "Scoreboard", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		for(let i = 0; i < scoreboard.scores.length; i++){
			var rango = i+1;
			this.add.text(scoreboardX, scoreboardY + (rango*20), rango + 'º: ' + scoreboard.scores[i].nombre + '  ' + scoreboard.scores[i].puntuacion, 
				{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		}
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());
		
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

	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}

	clickButtonVolver() {
		//this.scale.off('resize');
		this.scene.stop("Game");
		this.scene.stop("Results");
        this.scene.start("Ranking");
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolver());
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());
    }
    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
    }
}
