class Caer extends State{
	enter(delta, scene, jugador){
		//console.log("Estado caer");
		
		jugador.anims.play("caidaSalto");
		jugador.body.setAllowGravity(true);
	}
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.body.blocked.down){
			jugador.anims.play('aterrizajeSalto');
			jugador.anims.chain('idle')
			jugador.stateMachine.transition(delta, 'idle');	
			return;
		}
		if(jugador.jumpsquat && jugador.dashDisponible){
			jugador.dashDisponible = false;
			jugador.stateMachine.transition(delta, 'salto');
			return;
		}
		if(!jugador.enSuelo && jugador.dash && jugador.dashDisponible){
			jugador.stateMachine.transition(delta, 'dash');
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
		if((jugador.enParedIzq && jugador.enParedIzqNormal) || (jugador.enParedDcha && jugador.enParedDchaNormal)){
			jugador.stateMachine.transition(delta, 'deslizandoPared');
			return;
		}
		
		
		if(jugador.dirX == 0){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, inerciaDescenso));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, inerciaDescenso));
			if (jugador.dirX == -1){
				jugador.resetFlip();
			}else{
				jugador.flipX = true;
			}
		}
	}
}