class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
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
        
        
		
		// FONDOS MENUS
		this.load.image('fondo', 'assets/Interfaz/Fondo menu principal.jpg');
        this.load.image('tablon', 'assets/Interfaz/Tablon menu principal cartas.png');
        this.load.image('logo', 'assets/logo.png');
        
		// INTERFAZ JUEGO
		this.load.image("interfazInventario", "assets/Interfaz/Tablon interfaz partida.png");
		this.load.image("interfazMesa", "assets/Interfaz/Tablon interfaz pedidos.png");
		this.load.image("cielo2", "assets/Interfaz/Tarjetas/Cielo_2.png");
		this.load.image("cielo3", "assets/Interfaz/Tarjetas/Cielo_3.png");
		this.load.image("cielo4", "assets/Interfaz/Tarjetas/Cielo_4.png");
		this.load.image("infierno2", "assets/Interfaz/Tarjetas/Infierno_2.png");
		this.load.image("infierno3", "assets/Interfaz/Tarjetas/Infierno_3.png");
		this.load.image("infierno4", "assets/Interfaz/Tarjetas/Infierno_4.png");
		
		// PAUSA
        this.load.image('pausa', 'assets/Fondo_pausa.png');
        this.load.image('pausaSprite', 'assets/pausa.png');
		
		// BOTONES
        this.load.image('1', 'assets/Interfaz/Botones/1.png');
        this.load.image('2', 'assets/Interfaz/Botones/2.png');;
        this.load.image('3', 'assets/Interfaz/Botones/3.png');
        this.load.image('volver', 'assets/Interfaz/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Interfaz/Botones/volver_pulsado.png');
		this.load.image("botonEnviarCielo", "assets/Interfaz/Botones/boton_cielo.png");
		this.load.image("botonEnviarCielo_pulsado", "assets/Interfaz/Botones/boton_cielo_pulsado.png");
		this.load.image("botonEnviarInfierno", "assets/Interfaz/Botones/boton_infierno.png");
		this.load.image("botonEnviarInfierno_pulsado", "assets/Interfaz/Botones/boton_infierno_pulsado.png");
		this.load.image("botonEnviarBasura", "assets/Interfaz/Botones/basura.png");
		this.load.image("botonEnviarBasura_pulsado", "assets/Interfaz/Botones/basura_pulsado.png");
		this.load.image("baseJoystick", "assets/Interfaz/Botones/joystick_base.png");
		this.load.image("joystick", "assets/Interfaz/Botones/joystick.png");
		this.load.image("botonAccion", "assets/Interfaz/Botones/boton_accion.png");
		
		//ICONOS DE OBJETOS PARA INVENTARIO
		this.load.image("Anillo", "assets/Sprites Objetos/Icono Anillo.png");
		this.load.image("Bandera 1", "assets/Sprites Objetos/Icono Bandera 1.png");
		this.load.image("Bandera 2", "assets/Sprites Objetos/Icono Bandera 2.png");
		this.load.image("Botella Orujo", "assets/Sprites Objetos/Icono Botella Orujo.png");
		this.load.image("Botella Ron", "assets/Sprites Objetos/Icono Botella Ron.png");
		this.load.image("Botella Vino", "assets/Sprites Objetos/Icono Botella Vino.png");
		this.load.image("Botella Whisky", "assets/Sprites Objetos/Icono Botella Whisky.png");
		this.load.image("Carta Abierta", "assets/Sprites Objetos/Icono Carta Abierta.png");
		this.load.image("Carta Sellada", "assets/Sprites Objetos/Icono Carta Sellada.png");
		this.load.image("Collar Oro", "assets/Sprites Objetos/Icono Collar Oro.png");
		this.load.image("Collar Perlas", "assets/Sprites Objetos/Icono Collar Perlas.png");
		this.load.image("Foto Familiar", "assets/Sprites Objetos/Icono Foto Familiar.png");
		this.load.image("Foto Personal", "assets/Sprites Objetos/Icono Foto Personal.png");
		this.load.image("Margarita", "assets/Sprites Objetos/Icono Margarita.png");
		this.load.image("Osito Nuevo", "assets/Sprites Objetos/Icono Osito Nuevo.png");
		this.load.image("Osito Viejo", "assets/Sprites Objetos/Icono Osito Viejo.png");
		this.load.image("Pendiente", "assets/Sprites Objetos/Icono Pendientes.png");
		this.load.image("Rosa", "assets/Sprites Objetos/Icono Rosa.png");
		this.load.image("Tulipan", "assets/Sprites Objetos/Icono Tulipan.png");
		this.load.image("Violeta", "assets/Sprites Objetos/Icono Violeta.png");
		
		// ANIMACION PEDIDO TUMBA
		this.load.spritesheet('bocadillo', 'assets/Sprites Objetos/Bocadillo Tumba.png', {frameWidth: 32, frameHeight: 32});
		
		// SONIDOS
		this.load.audio('s_pasos', 'assets/Sonidos/s_pasos.wav');
		this.load.audio('s_pasosMojados', 'assets/Sonidos/s_pasosMojado.wav');
		this.load.audio('s_botellas', 'assets/Sonidos/s_botellas.wav');
		this.load.audio('s_carta', 'assets/Sonidos/s_carta.wav');
		this.load.audio('s_flores', 'assets/Sonidos/s_flores.wav');
		this.load.audio('s_joyero', 'assets/Sonidos/s_joyero.wav');
		this.load.audio('s_extTarjeta', 'assets/Sonidos/s_extTarjeta.wav');
		this.load.audio('s_guarTarjeta', 'assets/Sonidos/s_guarTarjeta.wav');
		this.load.audio('s_baulRecuerdos', 'assets/Sonidos/s_baulRecuerdos.wav');
		this.load.audio('s_dash', 'assets/Sonidos/s_dash.wav');
		this.load.audio('s_escalera', 'assets/Sonidos/s_escalera.wav');
		this.load.audio('s_salto', 'assets/Sonidos/s_salto.wav');
		
		// MAPAS
		this.load.tilemapTiledJSON("Nivel1", "assets/Mapas/mapanormaldimensionado.json");
		this.load.tilemapTiledJSON("Nivel2", "assets/Mapas/plataformeodimensionado.json");
		this.load.tilemapTiledJSON("Nivel3", "assets/Mapas/intermedio.json");
		
		// SPRITESHEETS
		this.load.image("tiles", "assets/Mapas/Spritesheets/s-extruded.png");
		this.load.image("fondoCementerio", "assets/Fondos/cementerio.jpg");
		this.load.image("luzCementerio", "assets/Fondos/luz_cementerio.png");
		this.load.image("fondoDesvan", "assets/Fondos/desvan.jpg");
		this.load.image("luzDesvan", "assets/Fondos/luz_desvan.png");
		this.load.image("fondoImprenta", "assets/Fondos/imprenta.jpg");
		this.load.image("luzImprenta", "assets/Fondos/luz_imprenta.png");
		this.load.image("fondoInvernadero", "assets/Fondos/invernadero.jpg");
		this.load.image("luzInvernadero", "assets/Fondos/luz_invernadero.png");
		this.load.image("fondoJoyeria", "assets/Fondos/joyeria.jpg");
		this.load.image("luzJoyeria", "assets/Fondos/luz_joyeria.png");
		this.load.image("fondoBodega", "assets/Fondos/bodega.jpg");
		this.load.image("luzBodega", "assets/Fondos/luz_bodega.png");
		
		// ANIMACIONES
		this.load.spritesheet('anim_andar', 'assets/Sprites Personajes/Spritesheet Andar.png', {frameWidth: 32, frameHeight: 64});
		//this.load.spritesheet('anim_saltar', 'assets/Sprites Personajes/Spritesheet Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_InicioSalto', 'assets/Sprites Personajes/Spritesheet Inicio Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Idle', 'assets/Sprites Personajes/Spritesheet Idle.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_CaidaSalto', 'assets/Sprites Personajes/Spritesheet Caida Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_AterrizajeSalto', 'assets/Sprites Personajes/Spritesheet Aterrizaje Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Dash', 'assets/Sprites Personajes/Spritesheet Dash.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Trepar', 'assets/Sprites Personajes/Spritesheet Trepar Nuevo.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Dano', 'assets/Sprites Personajes/Spritesheet Dano.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Pared', 'assets/Sprites Personajes/Spritesheet Pared.png', {frameWidth: 32, frameHeight: 64});
		
		// PARTICULAS
		this.load.image("llamita", "assets/llamita.png");
		this.load.image("luz1", "assets/luz1.png");
		
		// PERFILES
		for (var i = 0;  i < arrayNombres.length; i++){
			this.load.image("perfil" + i, "assets/Perfiles/perfil" + i + ".jpg");
		}
		
    }
	
    create() {
		if(this.sys.game.device.os.desktop){
			enPc = true;
		}else{
			enPc = false;
		}
		this.scene.start('Mainmenu');
    }

	
}