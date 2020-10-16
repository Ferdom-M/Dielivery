var velJugador = 360;
var velEscalon = -300;
var velDeslizandoPared = 300;
var aceleracion = 0.4;
var friccionSuelo = 0.15;
var friccionResbalo = 0.01;
var friccionAerea = 0.25;
var tiempoJumpsquat = 66.6;
var tiempoSaltoEnPared = 350;
var tiempoRecogerObjeto = 5000; // 5 sEGUNDOS
var tiempoDash = 100;
var velSaltoPared = 500;
var velSalto = -625;
var velDash = 960;

// Clase jugador, aquí guardaremos el inventario, puntuacion, etc
class Jugador {
    constructor() {
        this.puntuacion = 0;
        this.inventario = new Array();
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
		this.alturaSalto = 0.0;
		this.deslizandoParedIzq = false;
		this.deslizandoParedDcha = false;
		this.contadorSaltoEnPared = 0.0;
		this.contadorDash = 0.0;
		this.contadorRecogiendoObjeto = 0.0;
		this.recogiendoObjeto = false;
		this.enSuelo = false;
		this.enSueloNormal = false;
		this.enSueloResbaladizo = false;
		this.enParedIzq = false;
		this.enParedIzqNormal = false;
		this.enParedDcha = false;
		this.enParedDchaNormal = false;
		this.enPinchos = false;
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
	jugador.enParedIzqNormal = suelo.getTileAtWorldXY(jugador.sprite.x - tileSize, jugador.sprite.y) && idSuelosNormales.has(suelo.getTileAtWorldXY(jugador.sprite.x - tileSize, jugador.sprite.y).index);
	jugador.enParedDchaNormal = suelo.getTileAtWorldXY(jugador.sprite.x + tileSize, jugador.sprite.y) && idSuelosNormales.has(suelo.getTileAtWorldXY(jugador.sprite.x + tileSize, jugador.sprite.y).index);
	
	jugador.enSueloResbaladizo = jugador.enSuelo && suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize) && idSuelosResbaladizos.has(suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize).index);
	
	jugador.enPinchos = jugador.enSuelo && suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize) && idPinchos.has(suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize).index);
	
	jugador.enEscalera = that.physics.overlap(jugador.sprite, grupoEscaleras);	
}

function ReiniciarValores(jugador){
	if (jugador.enSuelo){
		//jugador.sprite.body.velocity.y = 0;
		jugador.dashDisponible = true;
		jugador.saltoEnParedDisponible = true;
		jugador.subiendoEscalon = false;
		jugador.deslizandoParedIzq = false;
		jugador.deslizandoParedDcha = false;
		jugador.saltandoEnPared = false;
		jugador.saltando = false;
		jugador.dashing = false;
		jugador.sprite.body.setAllowGravity(true);
	}
}

function AccionSalto(delta, jugador, that){
	if(!jugador.recogiendoObjeto){
		if (jugador.jumpsquat && jugador.enSuelo || 
		   !jugador.enSuelo && jugador.dashDisponible || 
		   !jugador.enSuelo && jugador.saltoEnParedDisponible || 
			jugador.empezandoSalto){
			if (jugador.contadorJumpsquat == 0 && jugador.jumpsquat){
				jugador.empezandoSalto = true;
			}
				
			if (jugador.empezandoSalto){
				jugador.contadorJumpsquat += delta;
				// Dependiendo de cuanto tiempo se pulse el salto, saltará más o menos
				if(jugador.jumpsquat){
					jugador.alturaSalto += delta;
				}
			}
			if (jugador.contadorJumpsquat > tiempoJumpsquat){
				jugador.empezandoSalto = false;
				jugador.contadorJumpsquat = 0.0;
				// limitamos el maximo a tiempoJumpsquat
				jugador.alturaSalto = Math.min(tiempoJumpsquat, jugador.alturaSalto);
				jugador.saltando = true;
				if (!jugador.enSuelo){
					if ((jugador.deslizandoParedIzq || jugador.deslizandoParedDcha) && jugador.saltoEnParedDisponible){
						// El contador empieza con un valor mayor si ha sido un salto pequeño
						jugador.contadorSaltoEnPared = (tiempoJumpsquat - jugador.alturaSalto) * ((tiempoSaltoEnPared / (tiempoJumpsquat / delta)) / (tiempoJumpsquat - delta));
						jugador.sprite.body.velocity.y = velSalto + ((tiempoJumpsquat - jugador.alturaSalto) * (velSalto / 2 - velSalto) / (tiempoJumpsquat - delta));
						
						if(jugador.deslizandoParedIzq){
							jugador.sprite.body.velocity.x = -velSaltoPared * -1  - (tiempoJumpsquat - jugador.alturaSalto) * (velSaltoPared / 2 - velSaltoPared) / (tiempoJumpsquat - delta) * jugador.dirX;
						}
						if(jugador.deslizandoParedDcha){
							jugador.sprite.body.velocity.x = -velSaltoPared * 1  - (tiempoJumpsquat - jugador.alturaSalto) * (velSaltoPared / 2 - velSaltoPared) / (tiempoJumpsquat - delta) * jugador.dirX;
						}
						
						jugador.deslizandoParedIzq = false;
						jugador.deslizandoParedDcha = false;
						jugador.saltoEnParedDisponible = false;
						jugador.saltandoEnPared = true;
						
						
					}
					else if (jugador.dashDisponible){
						jugador.dashDisponible = false
						jugador.sprite.body.velocity.y = velSalto + ((tiempoJumpsquat - jugador.alturaSalto) * (velSalto / 2 - velSalto) / (tiempoJumpsquat - delta));
					}
				}
				else{
					jugador.sprite.body.velocity.y = velSalto + ((tiempoJumpsquat - jugador.alturaSalto) * (velSalto / 2 - velSalto) / (tiempoJumpsquat - delta));
				}
				jugador.jumpsquat = false;
				jugador.alturaSalto = 0.0;
			}
		}

		if(jugador.sprite.body.velocity.y > 0){
			jugador.sprite.anims.play('caidaSalto', true);
			if(suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + (1.5*tileSize))){
				jugador.sprite.anims.play('aterrizajeSalto', true);
			}
			//meter timer que llame a la animacion de idle una vez toque el suelo
			if(!cursors.left.isDown && !cursors.right.isDown){
				var timer = that.time.addEvent({
					delay: 1250,
					callback: idle,
					callbackScpe: this,
					loop: false
				});
			}else{
				jugadores[0].sprite.anims.play('andar', true);
			}
			
		}
	}
}


function ProcesarMovimiento(delta, jugador){
	if(!jugador.dashing && !jugador.recogiendoObjeto){
		// Fragmento que maneja escaleras
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
		// Movimiento normal
		if(!jugador.saltandoEnPared){
			if(jugador.dirX != 0){
				jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, jugador.dirX * velJugador, aceleracion);
			}
			else{
				if(jugador.enSueloResbaladizo){
					jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, 0, friccionResbalo);
				}
				else if(jugador.enSueloNormal){
					jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, 0, friccionSuelo);
				}else{
					jugador.sprite.body.velocity.x = Phaser.Math.Linear(jugador.sprite.body.velocity.x, 0, friccionAerea);
				}
			}
			if(jugador.dirX > 0 && jugador.deslizandoParedIzq){ jugador.deslizandoParedIzq = false; }
			if(jugador.dirX < 0 && jugador.deslizandoParedDcha){ jugador.deslizandoParedDcha = false; }
		}else{
			jugador.contadorSaltoEnPared += delta;
			// Si tocamos una pared reiniciamos el contador de salto en pared para poder saltar y deslizarnos de forma normal
			if(jugador.contadorSaltoEnPared > tiempoSaltoEnPared || jugador.deslizandoParedIzq || jugador.deslizandoParedDcha){
				jugador.saltandoEnPared = false;
				jugador.saltoEnParedDisponible = true;
			}
		}
		// Deslizar pared
		if (!jugador.enSuelo && !jugador.subiendoEscalon){
			if ((jugador.enParedIzq && jugador.enParedIzqNormal) || jugador.deslizandoParedIzq){
				jugador.deslizandoParedIzq = true;
				
				jugador.sprite.body.setAllowGravity(false);
				jugador.sprite.body.velocity.y = velDeslizandoPared;
			}else if((jugador.enParedDcha && jugador.enParedDchaNormal) || jugador.deslizandoParedDcha){
				jugador.deslizandoParedDcha = true;
				
				jugador.sprite.body.setAllowGravity(false);
				jugador.sprite.body.velocity.y = velDeslizandoPared;
			}
			if(!jugador.enEscalera && !jugador.enParedIzqNormal && !jugador.enParedDchaNormal ){
				jugador.deslizandoParedIzq = false;
				jugador.deslizandoParedDcha = false;
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
	if(jugador.dashing && !jugador.recogiendoObjeto){
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
	if(!jugador.enEscalera && !jugador.recogiendoObjeto){
		if(jugador.enParedIzq && jugador.enParedIzqNormal){
			// El bloque de arriba a la izq está libre
			// Comprueba también si el de justo encima está libre para poder pasar, no debería pasar nada pero por si acaso lo compruebo
			if((!suelo.getTileAtWorldXY(jugador.sprite.x-tileSize, jugador.sprite.y-tileSize)&&
				!suelo.getTileAtWorldXY(jugador.sprite.x,jugador.sprite.y-tileSize)) || 
				jugador.subiendoEscalon){
					
				jugador.deslizandoParedIzq = false; 
				jugador.deslizandoParedDcha = false; 
				jugador.sprite.body.velocity.y = velEscalon;
				jugador.sprite.body.velocity.x = velJugador/4  * jugador.dirX;
				jugador.subiendoEscalon = true;
			}
		}else{
			jugador.subiendoEscalon = false;
		}
		if(jugador.enParedDcha && jugador.enParedDchaNormal){
			if((!suelo.getTileAtWorldXY(jugador.sprite.x+tileSize, jugador.sprite.y-tileSize)&&
				!suelo.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y-tileSize)) ||
				jugador.subiendoEscalon){
					
				jugador.deslizandoParedIzq = false; 
				jugador.deslizandoParedDcha = false; 
				jugador.sprite.body.velocity.y = velEscalon;
				jugador.sprite.body.velocity.x = velJugador/4  * jugador.dirX;
				jugador.subiendoEscalon = true;
			}
		}else{
			jugador.subiendoEscalon = false;
		}
	}
}

function InteractuarPinchos(delta, jugador){
	if(jugador.enPinchos){
		// Ocurre algo, idk no recuerdo el que, perder un objeto creo
		//jugador.inventario.pop();
		console.log("Oh no, perdí " + jugador.inventario.pop());
		jugador.sprite.body.velocity.y = velSalto;
	}
}

function TiempoObjeto(delta, jugador){
	if(jugador.recogiendoObjeto){
		jugador.contadorRecogiendoObjeto += delta;
		if(jugador.contadorRecogiendoObjeto > tiempoRecogerObjeto){
			jugador.recogiendoObjeto = false;
			jugador.contadorRecogiendoObjeto = 0.0;
			console.log("Terminé de coger el objeto");
		}
	}
}

function idle(){
	if(cursors.right.isDown || cursors.left.isDown){
		return 0;
	}
	jugadores[0].sprite.anims.play('idle');
}
