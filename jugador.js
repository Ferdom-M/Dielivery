var velJugador = 360;
var velEscalon = -220;
var velDeslizandoPared = 300;
var aceleracion = 0.4;
var friccionSuelo = 0.1;
var friccionAerea = 0.2;
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
		this.ultimaDirX = 0;
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
    }
}

function AccionSalto(delta, enSuelo){
	if (jugadores[0].contadorJumpsquat == 0 && jugadores[0].jumpsquat){
		jugadores[0].empezandoSalto = true;
	}
		
	if (jugadores[0].empezandoSalto){
		jugadores[0].contadorJumpsquat += delta;
	}
	if (jugadores[0].contadorJumpsquat > tiempoJumpsquat){
		jugadores[0].empezandoSalto = false;
		jugadores[0].contadorJumpsquat = 0.0;
		jugadores[0].saltando = true;
		if (!enSuelo){
			
			if (jugadores[0].deslizandoPared && jugadores[0].saltoEnParedDisponible){
				
				jugadores[0].sprite.body.velocity.x = -velSaltoPared * jugadores[0].dirX;
				jugadores[0].deslizandoPared = false;
				jugadores[0].saltoEnParedDisponible = false;
				jugadores[0].saltandoEnPared = true;
				jugadores[0].contadorSaltoEnPared = 0.0;
				jugadores[0].sprite.body.velocity.y = velSalto
			}
			else if (jugadores[0].dashDisponible){
				jugadores[0].dashDisponible = false
				jugadores[0].sprite.body.velocity.y = velSalto
			}
		}
		else{
			if (jugadores[0].jumpsquat){
				jugadores[0].sprite.body.velocity.y = velSalto;
				jugadores[0].jumpsquat = false;
			}else{
				jugadores[0].sprite.body.velocity.y = velSalto / 1.2;
			}

		}
	}
}

function AccionDash(delta){
	jugadores[0].dashing = true
	jugadores[0].dashDisponible = false
	
	jugadores[0].dashVelocity = velDash * jugadores[0].ultimaDirX;

}

function ProcesarMovimiento(delta, enSuelo, enSueloResbaladizo, enParedIzq, enParedDcha, that){
	if(jugadores[0].enEscalera){
		// Como tal no hace falta ya porque no cuenta la escalera como pared por quitar el add overlap
		// Pero mejor ponerlo en false por si se da el caso de que hay una escalera al lado de una pared
		enParedIzq = false;
		enParedDcha = false;
		jugadores[0].sprite.body.setAllowGravity(false);
		if(jugadores[0].dirY != 0){
			jugadores[0].sprite.body.velocity.y = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.y, jugadores[0].dirY * velJugador, aceleracion);
		}else{
			jugadores[0].sprite.body.velocity.y = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.y, 0, friccionAerea);
		}
	}
	if(!jugadores[0].saltandoEnPared){
		if(jugadores[0].dirX != 0){
			jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, jugadores[0].dirX * velJugador, aceleracion);
		}else{
			console.log(enSueloResbaladizo);
			if(enSueloResbaladizo){
				jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, 0, 1);
			}
			else if(enSuelo){
				jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, 0, friccionSuelo);
			}else{
				jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, 0, friccionAerea);
			}
		}
	}else{
		jugadores[0].contadorSaltoEnPared += delta;
		// Si tocamos una pared reiniciamos el contador de salto en pared para poder saltar y deslizarnos de forma normal
		if(jugadores[0].contadorSaltoEnPared > tiempoSaltoEnPared || enParedIzq || enParedDcha){
			jugadores[0].saltandoEnPared = false;
			jugadores[0].saltoEnParedDisponible = true;
		}
	}
	if (!enSuelo){
		if (enParedIzq || enParedDcha){
			jugadores[0].deslizandoPared = true;
			
			jugadores[0].sprite.body.setAllowGravity(false);
			jugadores[0].sprite.body.velocity.y = velDeslizandoPared;
		}
		else if(!jugadores[0].enEscalera){
			jugadores[0].deslizandoPared = false;
			jugadores[0].sprite.body.setAllowGravity(true);
		}
	}
}	

function ProcesarDash(delta, enSuelo, that){
	if(!enSuelo){
		jugadores[0].sprite.body.velocity.y = 0;
		jugadores[0].sprite.body.velocity.x = jugadores[0].dashVelocity;
		jugadores[0].contadorDash += delta;
		jugadores[0].sprite.body.setAllowGravity(false);
		
	}
	if(jugadores[0].contadorDash > tiempoDash){
		jugadores[0].dashing = false;
		jugadores[0].dashVelocity = 0;
		jugadores[0].contadorDash = 0;
		jugadores[0].sprite.body.setAllowGravity(true);
	}
}

function SubirEscalon(delta, enParedIzq, enParedDcha){
	if(!jugadores[0].enEscalera){
		if(enParedIzq){
			// El bloque de arriba a la izq está libre
			// Comprueba también si el de justo encima está libre para poder pasar, no debería pasar nada pero por si acaso lo compruebo
			if((!suelo.getTileAtWorldXY(jugadores[0].sprite.x-tileSize, jugadores[0].sprite.y-tileSize)&&
				!suelo.getTileAtWorldXY(jugadores[0].sprite.x,jugadores[0].sprite.y-tileSize)) || 
				jugadores[0].subiendoEscalon){
					
				jugadores[0].sprite.body.velocity.y = velEscalon;
				jugadores[0].sprite.body.velocity.x = velJugador/4  * jugadores[0].dirX;
				jugadores[0].subiendoEscalon = true;
			}
		}else{
			jugadores[0].subiendoEscalon = false;
		}
		if(enParedDcha){
			if((!suelo.getTileAtWorldXY(jugadores[0].sprite.x+tileSize, jugadores[0].sprite.y-tileSize)&&
				!suelo.getTileAtWorldXY(jugadores[0].sprite.x, jugadores[0].sprite.y-tileSize)) ||
				
				jugadores[0].subiendoEscalon){
				jugadores[0].sprite.body.velocity.y = velEscalon;
				jugadores[0].sprite.body.velocity.x = velJugador/4  * jugadores[0].dirX;
				jugadores[0].subiendoEscalon = true;
			}
		}else{
			jugadores[0].subiendoEscalon = false;
		}
	}
}

