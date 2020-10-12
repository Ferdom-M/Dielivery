var velJugador = 360;
var velEscalon = -350;
var velDeslizandoPared = 300;
var aceleracion = 0.4;
var friccionSuelo = 0.15;
var friccionResbalo = 0.01;
var friccionAerea = 0.25;
var tiempoJumpsquat = 66.6;
var tiempoSaltoEnPared = 350;
var tiempoDash = 100;
var velSaltoPared = 500;
var velSalto = -700;
var velDash = 960;

// Clase jugador, aquí guardaremos el inventario, puntuacion, etc
class Jugador {
    constructor(limInventario) {
        this.puntuacion = 0;
        this.inventario = new Array(limInventario);
        this.numObjetos = 0;
		this.subiendoEscalon = false;
		this.dirX = 0;
		this.dirY = 0;
		this.ultimaDirX = -1;
		this.jumpsquat = false;
		this.dash = false;
		this.dashing = false;
		this.dashVelocity = 0;
		this.dashDisponible = false;
		this.saltoEnParedDisponible = false;
		this.saltandoEnPared = false;
		this.saltando = false;
		this.enEscalera = false;
		this.empezandoSalto = false;
		this.contadorJumpsquat = 0.0;
		this.deslizandoPared = false;
		this.contadorSaltoEnPared = 0.0;
		this.contadorDash = 0.0;
		this.enSuelo = false;
		this.enSueloNormal = false;
		this.enSueloResbaladizo = false;
		this.enParedIzq = false;
		this.enParedIzqNormal = false;
		this.enParedDcha = false;
		this.enParedDchaNormal = false;
    }
}

function ComprobarEstados(jugador, that){
	// Comprobamos una sola vez si tocamos suelo o paredes
		jugador.enSuelo = jugador.sprite.body.blocked.down;
		// Solo queremos hacer las interacciones con paredes (salto en pared y subir escalon) si es suelo normal
		jugador.enParedIzq = jugador.sprite.body.blocked.left;
		jugador.enParedDcha = jugador.sprite.body.blocked.right;
		
						// Tocamos el suelo? && Hay algun bloque debajo? && Es suelo normal?
		jugador.enSueloNormal = jugador.enSuelo && suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize) && idSuelosNormales.has(suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize).index);
		jugador.enParedIzqNormal = jugador.enParedIzq && suelo.getTileAtWorldXY(jugador.sprite.x - tileSize, jugador.sprite.y) && idSuelosNormales.has(suelo.getTileAtWorldXY(jugador.sprite.x - tileSize, jugador.sprite.y).index);
		jugador.enParedDchaNormal = jugador.enParedDcha && suelo.getTileAtWorldXY(jugador.sprite.x + tileSize, jugador.sprite.y) && idSuelosNormales.has(suelo.getTileAtWorldXY(jugador.sprite.x + tileSize, jugador.sprite.y).index);
		
		jugador.enSueloResbaladizo = jugador.enSuelo && suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize) && idSuelosResbaladizos.has(suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize).index);
		
		jugador.enEscalera = that.physics.overlap(jugador.sprite, grupoEscaleras);
}

function ReiniciarValores(jugador){
	if (jugador.enSuelo){
			jugador.dashDisponible = true;
			jugador.saltoEnParedDisponible = true;
			jugador.subiendoEscalon = false;
			jugador.deslizandoPared = false;
			jugador.saltandoEnPared = false;
			jugador.saltando = false;
			jugador.dashing = false;
		}
}
function AccionSalto(delta, jugador){
	if (jugador.jumpsquat && jugador.enSuelo || 
	   !jugador.enSuelo && jugador.dashDisponible || 
	   !jugador.enSuelo && jugador.saltoEnParedDisponible || 
		jugador.empezandoSalto){
		if (jugador.contadorJumpsquat == 0 && jugador.jumpsquat){
			jugador.empezandoSalto = true;
		}
			
		if (jugador.empezandoSalto){
			jugador.contadorJumpsquat += delta;
		}
		if (jugador.contadorJumpsquat > tiempoJumpsquat){
			jugador.empezandoSalto = false;
			jugador.contadorJumpsquat = 0.0;
			jugador.saltando = true;
			if (!jugador.enSuelo){
				
				if (jugador.deslizandoPared && jugador.saltoEnParedDisponible){
					
					jugador.sprite.body.velocity.x = -velSaltoPared * jugador.dirX;
					jugador.deslizandoPared = false;
					jugador.saltoEnParedDisponible = false;
					jugador.saltandoEnPared = true;
					jugador.contadorSaltoEnPared = 0.0;
					jugador.sprite.body.velocity.y = velSalto
				}
				else if (jugador.dashDisponible){
					jugador.dashDisponible = false
					jugador.sprite.body.velocity.y = velSalto
				}
			}
			else{
				if (jugador.jumpsquat){
					jugador.sprite.body.velocity.y = velSalto;
					jugador.jumpsquat = false;
				}else{
					jugador.sprite.body.velocity.y = velSalto / 1.2;
				}

			}
		}
	}

	if(jugador.sprite.body.velocity.y > 0){
		console.log("bajando");
		jugador.sprite.anims.play('caidaSalto', true);
		if(suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + 50)){
			console.log("cai");
			jugador.sprite.anims.play('aterrizajeSalto', true);
		}
		//meter timer que llame a la animacion de idle una vez toque el suelo	
	}
	
}


function ProcesarMovimiento(delta, jugador){
	if(!jugador.dashing){
		if(jugador.enEscalera){
			// Como tal no hace falta ya porque no cuenta la escalera como pared por quitar el add overlap
			// Pero mejor ponerlo en false por si se da el caso de que hay una escalera al lado de una pared
			jugador.enParedIzqNormal = false;
			jugador.enParedDchaNormal = false;
			jugador.sprite.body.setAllowGravity(false);
			if(jugador.dirY != 0){
				jugador.sprite.body.velocity.y = Phaser.Math.Linear(jugador.sprite.body.velocity.y, jugador.dirY * velJugador, aceleracion);
			}else{
				jugador.sprite.body.velocity.y = Phaser.Math.Linear(jugador.sprite.body.velocity.y, 0, friccionAerea);
			}
		}
		if(!jugador.saltandoEnPared){
			if(jugador.dirX != 0){
				jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, jugador.dirX * velJugador, aceleracion);
			}else{
				if(jugador.enSueloResbaladizo){
					jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, 0, friccionResbalo);
				}
				else if(jugador.enSueloNormal){
					jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, 0, friccionSuelo);
				}else{
					jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, 0, friccionAerea);
				}
			}
		}else{
			jugador.contadorSaltoEnPared += delta;
			// Si tocamos una pared reiniciamos el contador de salto en pared para poder saltar y deslizarnos de forma normal
			if(jugador.contadorSaltoEnPared > tiempoSaltoEnPared || jugador.enParedIzqNormal || jugador.enParedDchaNormal){
				jugador.saltandoEnPared = false;
				jugador.saltoEnParedDisponible = true;
			}
		}
		if (!jugador.enSueloNormal){
			if (jugador.enParedIzqNormal || jugador.enParedDchaNormal){
				jugador.deslizandoPared = true;
				
				jugador.sprite.body.setAllowGravity(false);
				jugador.sprite.body.velocity.y = velDeslizandoPared;
			}
			else if(!jugador.enEscalera){
				jugador.deslizandoPared = false;
				jugador.sprite.body.setAllowGravity(true);
			}
		}
	}
}	

function ProcesarDash(delta, jugador){
	if (jugador.dash && jugador.dashDisponible && !jugador.saltandoEnPared && !jugador.enSuelo){
			jugador.dashing = true
			jugador.dashDisponible = false
		
			jugador.dashVelocity = velDash * jugador.ultimaDirX;
	}	
	if(jugador.dashing){
		if(!jugador.enSuelo){
			jugador.sprite.body.velocity.y = 0;
			jugador.sprite.body.velocity.x = jugador.dashVelocity;
			jugador.contadorDash += delta;
			jugador.sprite.body.setAllowGravity(false);
			
		}
		if(jugador.contadorDash > tiempoDash){
			jugador.dashing = false;
			jugador.dashVelocity = 0;
			jugador.contadorDash = 0;
			jugador.sprite.body.setAllowGravity(true);
		}
	}
	
}

function SubirEscalon(delta, jugador){
	if(!jugador.enEscalera){
		if(jugador.enParedIzqNormal){
			// El bloque de arriba a la izq está libre
			// Comprueba también si el de justo encima está libre para poder pasar, no debería pasar nada pero por si acaso lo compruebo
			if((!suelo.getTileAtWorldXY(jugador.sprite.x-tileSize, jugador.sprite.y-tileSize)&&
				!suelo.getTileAtWorldXY(jugador.sprite.x,jugador.sprite.y-tileSize)) || 
				jugador.subiendoEscalon){
					
				jugador.sprite.body.velocity.y = velEscalon;
				jugador.sprite.body.velocity.x = velJugador/4  * jugador.dirX;
				jugador.subiendoEscalon = true;
			}
		}else{
			jugador.subiendoEscalon = false;
		}
		if(jugador.enParedDchaNormal){
			if((!suelo.getTileAtWorldXY(jugador.sprite.x+tileSize, jugador.sprite.y-tileSize)&&
				!suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y-tileSize)) ||
				
				jugador.subiendoEscalon){
				jugador.sprite.body.velocity.y = velEscalon;
				jugador.sprite.body.velocity.x = velJugador/4  * jugador.dirX;
				jugador.subiendoEscalon = true;
			}
		}else{
			jugador.subiendoEscalon = false;
		}
	}
}

