class Escalera extends State{
	enter(delta, scene, jugador){
		console.log("Estado escalera");
		
		jugador.anims.play("trepar", true);
		
		jugador.body.setAllowGravity(false);
		jugador.dashDisponible = true;
		
		if(jugador.dirY != 0){
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, jugador.dirY * jugador.velActual, aceleracion));
		}else{
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, 0, friccionAerea));
		}
		if(jugador.dirX != 0){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirY * jugador.velActual, aceleracion));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionAerea));
		}
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(!jugador.enEscalera && !jugador.enSuelo){
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		if(jugador.body.blocked.down){
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		if(jugador.jumpsquat){
			jugador.stateMachine.transition(delta, 'salto');
			return;
		}
		
		if(jugador.dirY != 0){
			jugador.anims.play("trepar", true);
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, jugador.dirY * jugador.velActual, aceleracion));
		}else{
			jugador.setVelocityY(Phaser.Math.Linear(jugador.body.velocity.y, 0, friccionAerea));
		}
		if(jugador.dirX != 0){
			jugador.anims.play("trepar", true);
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, aceleracion));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionAerea));
		}
		if(jugador.dirX == 0 && jugador.dirY == 0){
			jugador.anims.stop();
		}
	}
}
