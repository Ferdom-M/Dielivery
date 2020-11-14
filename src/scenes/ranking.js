// JavaScript source code

class Ranking extends Phaser.Scene {

    constructor() {
        super("Ranking");
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
		
		// CARGA
        this.load.image('fondo', 'assets/sky.jpeg');
        
        this.load.image('volver', 'assets/Interfaz/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Interfaz/Botones/volver_pulsado.png');
        */
		
    }

    create() {
		this.cameras.main.fadeIn(valorFade);
		var scoreboardX = width / 4;
		var scoreboardY = height / 4;
		var volverPosX = 200;
		var volverPosY = 50;

		this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
		
		//Pillamos el scoreboard guardado y lo parseamos para que tenga los vamores bien y no en string, si no encuentra ningun scoreboard porque 
		//nunca se ha jugado, se crea de 0
		var scoreboardGuardado = JSON.parse(localStorage.getItem('scoreboardSave')) || false;

		if(seHaJugado){
			var nuevoJugador = {
				nombre: nombreJugador,
				puntuacion: puntuacionTotal
			};
			//Si no hay scoreboard, creo uno nuevo, creando primero un array vacio de puntuaciones, metiendo al jugador que acaba de jugar, y metiendo ese array en un JSON
			if(scoreboardGuardado == false){
				var puntuaciones = new Array();
				puntuaciones.push(nuevoJugador);
				var scoreboard = {
					scores: puntuaciones
				};
			}else{
				var scoreboard = scoreboardGuardado;
				scoreboard.scores.push(nuevoJugador);
				scoreboard.scores.sort(function(a, b){
					return a.puntuacion-b.puntuacion;
				});
				if(scoreboard.scores.length > 10){
					scoreboard.scores.shift();
				}
				scoreboard.scores = scoreboard.scores.reverse();
			}
			for(let i = 0; i < scoreboard.scores.length; i++){
				var rango = i+1;
				this.add.text(scoreboardX, scoreboardY + (rango*20), rango + 'º: ' + scoreboard.scores[i].nombre + '  ' + scoreboard.scores[i].puntuacion, 
					{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
			}

			localStorage.setItem('scoreboardSave', JSON.stringify(scoreboard));
			seHaJugado = false;
		}else{
			if(scoreboardGuardado == false){
				this.add.text(scoreboardX, scoreboardY + 20, "¡No hay empleado del mes!", 
						{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
			}else{
				for(let i = 0; i < scoreboardGuardado.scores.length; i++){
					var rango = i+1;
					this.add.text(scoreboardX, scoreboardY + (rango*20), rango + 'º: ' + scoreboardGuardado.scores[i].nombre + '  ' + scoreboardGuardado.scores[i].puntuacion, 
						{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
				}
			}
		}

		this.add.text(scoreboardX, scoreboardY, "Empleados del mes", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => PasarEscena(this, "Mainmenu"));
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
        this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});
		
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
}
