class Salto extends State{
	enter(delta, scene, jugador){
		console.log("Estado salto");
		
		jugador.alturaSalto = 0;
		jugador.empezandoSalto = true;
		
		jugador.anims.play("inicioSalto");	

		scene.time.delayedCall(tiempoJumpsquat, () => this.ComenzarSalto(delta, scene, jugador));		
	}
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.body.velocity.y > 0 && !jugador.empezandoSalto){
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		if(!jugador.empezandoSalto && jugador.dash && jugador.dashDisponible){
			jugador.stateMachine.transition(delta, 'dash');
			return;
		}
		if(jugador.body.blocked.down){
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		if(jugador.enEscalera && jugador.dirY != 0){
			jugador.stateMachine.transition(delta, 'escalera');
			return;
		}
		if((jugador.enParedIzq && jugador.enParedIzqNormal && !suelo.getTileAtWorldXY(jugador.x-tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x,jugador.y-tileSize)) || 
		   (jugador.enParedDcha && jugador.enParedDchaNormal && !suelo.getTileAtWorldXY(jugador.x+tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x, jugador.y-tileSize))){
			jugador.stateMachine.transition(delta, 'escalon');
			return;
		}
		
		if(jugador.jumpsquat){
			jugador.alturaSalto += delta;
		}
		if(jugador.dirX == 0){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionAerea));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, aceleracion));
			if (jugador.dirX == -1){
				jugador.resetFlip();
			}else{
				jugador.flipX = true;
			}
		}
	}
	
	ComenzarSalto(delta, scene, jugador){
		// limitamos el maximo a tiempoJumpsquat
		jugador.body.setAllowGravity(true);
		jugador.empezandoSalto = false;
		
		jugador.alturaSalto = Math.min(tiempoJumpsquat, jugador.alturaSalto);
		jugador.setVelocityY(velSalto + ((tiempoJumpsquat - jugador.alturaSalto) * (velSalto / 2 - velSalto) / (tiempoJumpsquat - delta)));
		jugador.alturaSalto = 0;
	}
}
