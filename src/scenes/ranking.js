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
		var configTextoRanking = {
			fontFamily: 'Sylfaen',
			fontSize: '22px',
			color: '#fff',
			stroke: '#000000',
			strokeThickness: 0.5,
			align: 'left',  // 'left'|'center'|'right'|'justify'
			maxLines: 0,
			lineSpacing: 0,
			fixedWidth: 500,
			fixedHeight: 92 ,
			rtl: false,
			testString: '|MÉqgy',
			wordWrap: {
				width: 500,
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
		this.cameras.main.fadeIn(valorFade);
		var scoreboardX = width / 4.2;
		var scoreboardY = height / 3;
		
		this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
		if(idioma.idioma.includes("es")){
			this.tablon = this.add.image(width / 2, height / 2, 'tablon_puntuaciones_es');
		}
		else{
			this.tablon = this.add.image(width / 2, height / 2, 'tablon_puntuaciones_en');
		}
		
		
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
				if(rango <= 5){
					this.add.text(scoreboardX, scoreboardY + (rango*45), rango + 'º: ' + scoreboard.scores[i].nombre + '  ' + scoreboard.scores[i].puntuacion, 
					configTextoRanking);
				}else{
					this.add.text(scoreboardX + 310, scoreboardY + ((rango-5)*45), rango + 'º: ' + scoreboard.scores[i].nombre + '  ' + scoreboard.scores[i].puntuacion, 
					configTextoRanking);
				}
				
			}

			localStorage.setItem('scoreboardSave', JSON.stringify(scoreboard));
			seHaJugado = false;
		}else{
			if(scoreboardGuardado == false){
				if(idioma.idioma.includes("es")){
					this.add.text(scoreboardX, scoreboardY + 20, "¡No hay empleado del mes!", 
					configTextoRanking);
				}else{
					this.add.text(scoreboardX, scoreboardY + 20, "There´s no employee of the month!", 
					configTextoRanking);
				}
				
			}else{
				for(let i = 0; i < scoreboardGuardado.scores.length; i++){
					var rango = i+1;
					if(rango <= 5){
						this.add.text(scoreboardX, scoreboardY + (rango*45), rango + 'º: ' + scoreboardGuardado.scores[i].nombre + '  ' + scoreboardGuardado.scores[i].puntuacion, 
						configTextoRanking);
					}else{
						this.add.text(scoreboardX + 310, scoreboardY + ((rango-5)*45), rango + 'º: ' + scoreboardGuardado.scores[i].nombre + '  ' + scoreboardGuardado.scores[i].puntuacion, 
						configTextoRanking);
					}
				}
			}
		}

		/*if(idioma.idioma.includes("es")){
			this.add.text(scoreboardX, scoreboardY, "Empleados del mes", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		}else{
			this.add.text(scoreboardX, scoreboardY, "Empleados del mes", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		}*/
		
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setInteractive();
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => PasarEscena(this, "Mainmenu"));
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
        this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});
    }

	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
}
