var velJugador = 360;
var velEscalon = -150;
var velDeslizandoPared = 300;
var aceleracion = 0.4;
var friccionSuelo = 0.15;
var friccionResbalo = 0.01;
var friccionAerea = 0.25;
var tiempoJumpsquat = 84;
var tiempoSaltoEnPared = 350;
var tiempoRecogerObjeto = 5000; // 5 sEGUNDOS
var tiempoDash = 200;
var velSaltoPared = 500;
var velSalto = -625;
var velDash = 720;
var limInventario = 6;

class Jugador extends Phaser.Physics.Arcade.Sprite{
	constructor(config){
		super(config.scene, config.x, config.y, config.key);
		
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		config.scene.physics.add.collider(this, suelo);
		
		this.setMaxVelocity(velDash, 800);
		
		config.scene.anims.create({
			key: 'andar',
			frames: config.scene.anims.generateFrameNames('anim_andar', {start: 1, end: 3}),
			frameRate: 8,
			repeat: -1
		});

		config.scene.anims.create({
			key: 'idle',
			frames: config.scene.anims.generateFrameNames('anim_Idle', {start: 0, end: 1}),
			frameRate: 4,
			repeat: -1
		});

		config.scene.anims.create({
			key: 'inicioSalto',
			frames: config.scene.anims.generateFrameNames('anim_InicioSalto', {start: 0, end: 1}),
			frameRate: 8,
			repeat: 0
		});

		config.scene.anims.create({
			key: 'caidaSalto',
			frames: config.scene.anims.generateFrameNames('anim_CaidaSalto', {start: 0, end: 1}),
			frameRate: 6,
			repeat: -1
		});
		
		config.scene.anims.create({
			key: 'aterrizajeSalto',
			frames: config.scene.anims.generateFrameNames('anim_AterrizajeSalto', {start: 0, end: 1}),
			frameRate: 4,
			repeat: 0
		});

		config.scene.anims.create({
			key: 'dash',
			frames: config.scene.anims.generateFrameNames('anim_Dash', {start: 0, end: 1}),
			frameRate: 8,
			repeat: -1
		});
		config.scene.anims.create({
			key: 'trepar',
			frames: config.scene.anims.generateFrameNames('anim_Trepar', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});
		config.scene.anims.create({
			key: 'dano',
			frames: config.scene.anims.generateFrameNames('anim_Dano', {start: 0, end: 1}),
			frameRate: 8,
			repeat: -1
		});
		config.scene.anims.create({
			key: 'pared',
			frames: config.scene.anims.generateFrameNames('anim_Pared', {start: 0, end: 1}),
			frameRate: 4,
			repeat: -1
		});
		
		// Referencia a la escena
		this.scene = config.scene;
		// Contadores
		this.alturaSalto = 0.0;
		// Control
		this.dirX = 0;
		this.dirY = 0;
		this.ultimaDirX = -1;
		this.dash = false;
		this.dashVelocity = 0;
		this.jumpsquat = false;
		this.accion = false;
		// Acciones posibles
		this.dashDisponible = false;
		// Percepciones
		this.empezandoSalto = false;
		this.enEscalera = false;
		this.enSuelo = false;
		this.enSueloNormal = false;
		this.enSueloResbaladizo = false;
		this.enParedIzq = false;
		this.enParedIzqNormal = false;
		this.enParedDcha = false;
		this.enParedDchaNormal = false;
		this.enPinchos = false;
		// Valores
		this.puntuacion = 0;
		this.inventario = new Array();
		this.arraySeleccionados = new Array();
		this.arrayMostrados = new Array();
		this.pedidoSeleccionado;
		this.velActual = velJugador;
		
		this.stateMachine = new StateMachine('idle', {
			idle: new Idle(), 
			correr: new Correr(), 
			salto: new Salto(), 
			caer: new Caer(), 
			dash: new Dash(), 
			escalera: new Escalera(), 
			recogerObjeto: new RecogerObjeto(),
			escalon: new Escalon(),
			deslizandoPared: new DeslizandoPared(),
			saltoPared: new SaltoPared(),
			dano: new Dano(),
			mesa: new Mesa()
		}, [this.scene, this]);
	}
	
	update(time, delta){
		this.Percepcion();
		this.stateMachine.step(delta);
	}
	
	Percepcion(){
		// Comprobamos una sola vez si tocamos suelo o paredes
		let sueloDebajo = suelo.getTileAtWorldXY(this.x, this.y + tileSize);
		// Necesitamos saber si en el extremo de Grimmy hay suelo		16 - 16, se queda en 0, dentro de su sprite
		let sueloDebajoExtremoIzq = suelo.getTileAtWorldXY(this.x - this.width / 2, this.y + tileSize);
		//																16 + 16, un pixel mas que su anchura, hay que restar 1. Se aplicaria siempre igual aunque midiese 64 en lugar de 32
		let sueloDebajoExtremoDcha = suelo.getTileAtWorldXY(this.x + this.width / 2 - 1, this.y + tileSize);
		
		let sueloIzq = suelo.getTileAtWorldXY(this.x - tileSize, this.y);
		let sueloDcha = suelo.getTileAtWorldXY(this.x + tileSize, this.y);
		
		this.enSuelo = sueloDebajo || sueloDebajoExtremoIzq || sueloDebajoExtremoDcha
		
		this.enParedIzq = this.body.blocked.left;
		this.enParedDcha = this.body.blocked.right;
		
						// Tocamos el suelo? && Es suelo normal?
		this.enSueloNormal = this.enSuelo && sueloDebajo && idSuelosNormales.has(sueloDebajo.index);
		
		// Solo queremos hacer las interacciones con paredes (salto en pared y subir escalon) si es suelo normal
		this.enParedIzqNormal = suelo.getTileAtWorldXY(this.x - tileSize, this.y) && idSuelosNormales.has(suelo.getTileAtWorldXY(this.x - tileSize, this.y).index);
		this.enParedDchaNormal = suelo.getTileAtWorldXY(this.x + tileSize, this.y) && idSuelosNormales.has(suelo.getTileAtWorldXY(this.x + tileSize, this.y).index);
		
		this.enSueloResbaladizo = this.enSuelo && sueloDebajo && idSuelosResbaladizos.has(sueloDebajo.index);
		
		this.enPinchos = this.enSuelo && sueloDebajo && idPinchos.has(sueloDebajo.index);
		
		this.enEscalera = objetos.getTileAtWorldXY(this.x, this.y) && idEscaleras.has(objetos.getTileAtWorldXY(this.x, this.y).index);

		/*
		if(this.enSuelo && this.body.velocity.x != 0){
			console.log(this.body.velocity.x);
			emitter.start();
		}else{
			emitter.stop();
		}
		*/
	}
}