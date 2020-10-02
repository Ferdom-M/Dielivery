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

        this.gato = this.physics.add.image(0.5, 0.5, 'gato').setScale(0.1);
        this.gato.setCollideWorldBounds(true);


        logo.setVelocity(500, 100);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
		
        var FKey = this.input.keyboard.addKey('F');
        this.AKey = this.input.keyboard.addKey('A');
        this.DKey = this.input.keyboard.addKey('D');
        

        FKey.on('down', function () {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
        }, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        //camara
        this.playerCamera = this.cameras.main;
        this.playerCamera.startFollow(this.gato);
    }


    update(){

        //Movimiento del jugador
        if (this.AKey.isDown) {
            this.gato.x -= 5;
        }
        else if (this.DKey.isDown) {
            this.gato.x += 5;
        }
    }
}