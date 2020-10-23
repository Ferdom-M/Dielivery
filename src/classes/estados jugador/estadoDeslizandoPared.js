class DeslizandoPared extends State{
	enter(delta, scene, jugador){
		//console.log("Estado deslizando pared");
		
		
		jugador.anims.play("pared");
		
		jugador.body.setAllowGravity(false);
		jugador.setVelocityY(velDeslizandoPared);
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.enPinchos && jugador.body.blocked.down){
			jugador.stateMachine.transition(delta, 'dano');
			return;
		}
		
		if(jugador.jumpsquat){
			jugador.stateMachine.transition(delta, 'saltoPared');
			return;
		}
		if (!jugador.enParedIzqNormal && !jugador.enParedDchaNormal){
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		if (jugador.enEscalera && jugador.dirY != 0){
			jugador.stateMachine.transition(delta, 'escalera');
			return;
		}
		if (jugador.enSuelo){
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, aceleracion));
	}
}


