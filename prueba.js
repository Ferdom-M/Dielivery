var debug = false;

var cursors;
// Clase jugador, aquí guardaremos el inventario, puntuacion, etc
class Jugador {
    constructor(sprite, puntuacion, inventario) {
        this.sprite = sprite;
        this.puntuacion = puntuacion;
        this.inventario = inventario;
    }
}

class Objeto {
	constructor(tipo, peso, puntuacion){
		this.tipo = tipo; // String
		this.peso = peso; 
		this.puntuacion = puntuacion;
	}
}

var limInventario = 6;

// Por si acaso acabamos metiendo multi local, se hará con un array del tamaño de numJugadores
var numJugadores = 1;
var jugadores = new Array(numJugadores);

for (var i = 0; i < numJugadores; i++) {
    jugadores[i] = new Jugador;
    jugadores[i].puntuacion = 0;
	jugadores[i].inventario = new Array(limInventario);
}

class prueba extends Phaser.Scene {

    constructor() {
        super("prueba");
    }
	
	preload ()
    {
        this.load.image('sky', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('red', 'assets/cuadrencio.png');
        this.load.image('gato', 'assets/bolita.jpg');

    }

    create ()
    {
        this.add.image(640, 360, 'sky').setScale(2,2);
		this.add.image(-100, 704, 'red');

        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(0.5, 0.5, 'logo').setScale(0.1);
		
        jugadores[0].sprite = this.physics.add.sprite(0.5, 0.5, 'gato').setScale(0.1);
        jugadores[0].sprite.setCollideWorldBounds(true);


        logo.setVelocity(500, 100);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
		
		// Guardar cursores
		cursors = this.input.keyboard.addKeys(
            {
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
				action: Phaser.Input.Keyboard.KeyCodes.SPACE,
				fullscreen: Phaser.Input.Keyboard.KeyCodes.F
            });
        
		// Al pulsar F se hace un evento
        cursors.fullscreen.on('down', function () {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
        }, this);
		
		/*
		cursors.action.on('down', function () {
            if (jugadores[0].sprite.) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
        }, this);
		*/
		
		// Cámara un jugador
		var camJugador1 = this.cameras.main;
		camJugador1.startFollow(jugadores[0].sprite);
		
        // Cámara dos jugadores
		/*
		this.cameras.resize(640, 720);
		var camJugador2 = this.cameras.add(640, 0, 640, 720, false, "jugador2");
		
        camJugador1.startFollow(jugadores[0].sprite);
        camJugador2.startFollow(logo);
		*/
		
		if(debug){
			
		}
    }

		
	

    update(){
		if (cursors.left.isDown) {
            jugadores[0].sprite.body.velocity.x = -320;
        }
        else if (cursors.right.isDown) {
            jugadores[0].sprite.body.velocity.x = 320;
        } else{
			if (jugadores[0].sprite.body.velocity.x > 20) {
				jugadores[0].sprite.setAccelerationX(-800);
			} else if (jugadores[0].sprite.body.velocity.x < -20) {
				jugadores[0].sprite.setAccelerationX(800);
			} else {
				jugadores[0].sprite.setAccelerationX(0);
				jugadores[0].sprite.body.velocity.x = 0;
			}
		}
    }
}