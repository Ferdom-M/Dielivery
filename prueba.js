var cursors;
// Clase jugador, aquí guardaremos el inventario, puntuacion, etc
class Jugador {
    constructor(sprite, muerte, puntuacion) {
        this.sprite = sprite;
        this.puntuacion = puntuacion;
    }
}

// Por si acaso acabamos metiendo multi local, se hará con un array del tamaño de numJugadores
var numJugadores = 1;
var jugadores = new Array(numJugadores);
for (var i = 0; i < numJugadores; i++) {
    jugadores[i] = new Jugador;
    jugadores[i].puntuacion = 0;
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
		
		// Al pulsar izq o dcha se sube o baja vel
		cursors.left.on('down', function () {
            jugadores[0].sprite.body.velocity.x = -320;
        }, this);
		cursors.right.on('down', function () {
            jugadores[0].sprite.body.velocity.x = 320;
        }, this);
		
        // Cámara
        this.playerCamera = this.cameras.main;
        this.playerCamera.startFollow(jugadores[0].sprite);
    }


    update(){
		if (!cursors.left.isDown && !cursors.right.isDown) { // Si no se pulsa nada se desacelera hasta parar
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