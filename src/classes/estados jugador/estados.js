class Idle extends State{
	enter(delta, scene, jugador){
		
		jugador.dashDisponible = true;
		// Desactivamos la gravedad si estamos en el suelo, solo se vuelve a activar si estamos en el aire sin tocar paredes
		jugador.body.setAllowGravity(false);
		
		// Para sustituir la animacion anterior, pero solo la sustituimos si no es aterrizajeSalto
		if(jugador.anims.getCurrentKey() != 'aterrizajeSalto'){
			jugador.anims.delayedPlay(1000, 'idle');
		}
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.dirX != 0){
			this.stateMachine.transition(delta, 'correr');
			return;
		}
		if(jugador.jumpsquat){
			this.stateMachine.transition(delta, 'salto');
		}
		
		if(jugador.enSueloResbaladizo){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionResbalo));
		}
		else if(jugador.enSueloNormal){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionSuelo));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionAerea));
		}
		
		if(Math.abs(jugador.body.velocity.x) < 5){
			jugador.setVelocityX(0);
		}
	}
}




