class Dash extends State{
	enter(delta, scene, jugador){
		//console.log("Estado dash");
		jugador.particulasDash.start();
		
		jugador.anims.play("dash");
		jugador.sDash.play();
			
		jugador.dashDisponible = false
		
		if (jugador.ultimaDirX == -1){
			jugador.resetFlip();
		}else{
			jugador.flipX = true;
		}
		
		jugador.dashVelocity = velDash * jugador.ultimaDirX;
		jugador.setVelocity(jugador.dashVelocity, 0);
		jugador.body.setAllowGravity(false);

		this.temporizadorDash = scene.time.delayedCall(tiempoDash, () => this.TerminarDash(delta, scene, jugador));	
	}
	
	execute(delta, scene, jugador){
		if((jugador.enParedIzq && jugador.enParedIzqNormal && !suelo.getTileAtWorldXY(jugador.x-tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x,jugador.y-tileSize)) || 
		   (jugador.enParedDcha && jugador.enParedDchaNormal && !suelo.getTileAtWorldXY(jugador.x+tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x, jugador.y-tileSize))){
			this.temporizadorDash.remove();
			jugador.particulasDash.stop();
			jugador.stateMachine.transition(delta, 'escalon');
			return;
		}
		if((jugador.enParedIzq && jugador.enParedIzqNormal) || (jugador.enParedDcha && jugador.enParedDchaNormal)){
			this.temporizadorDash.remove();
			jugador.particulasDash.stop();
			jugador.stateMachine.transition(delta, 'deslizandoPared');
			return;
		}
		
		jugador.setVelocity(jugador.dashVelocity, 0);
	}
	
	TerminarDash(delta, scene, jugador){
		// Transicion
		jugador.particulasDash.stop();
		jugador.stateMachine.transition(delta, 'caer');
	}
	
}
