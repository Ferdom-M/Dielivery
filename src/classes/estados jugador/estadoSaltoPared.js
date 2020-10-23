class SaltoPared extends State{
	enter(delta, scene, jugador){
		//console.log("Estado salto pared");
		
		jugador.anims.play("inicioSalto");
		
		jugador.empezandoSalto = true;
		
		jugador.alturaSalto = 0;
		jugador.body.setAllowGravity(true);
		scene.time.delayedCall(tiempoJumpsquat, () => this.ComenzarSalto(delta, scene, jugador));	
		
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if((jugador.enParedIzq && jugador.enParedIzqNormal && !suelo.getTileAtWorldXY(jugador.x-tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x,jugador.y-tileSize)) || 
		   (jugador.enParedDcha && jugador.enParedDchaNormal && !suelo.getTileAtWorldXY(jugador.x+tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x, jugador.y-tileSize))){
			this.temporizadorSaltoPared.remove();
			jugador.stateMachine.transition(delta, 'escalon');
			return;
		}
		if(((jugador.enParedIzq && jugador.enParedIzqNormal) || (jugador.enParedDcha && jugador.enParedDchaNormal)) && !jugador.empezandoSalto){
			this.temporizadorSaltoPared.remove();
			jugador.stateMachine.transition(delta, 'deslizandoPared');
			return;
		}
		
		if(jugador.jumpsquat){
			jugador.alturaSalto += delta;
		}
	}
	
	ComenzarSalto(delta, scene, jugador){
		let contadorSaltoEnPared = (tiempoJumpsquat - jugador.alturaSalto) * ((tiempoSaltoEnPared / (tiempoJumpsquat / delta)) / (tiempoJumpsquat - delta));
		jugador.alturaSalto = Math.min(tiempoJumpsquat, jugador.alturaSalto);
		
		jugador.setVelocityY(velSalto + ((tiempoJumpsquat - jugador.alturaSalto) * (velSalto / 2 - velSalto) / (tiempoJumpsquat - delta)));
		console.log(jugador.body.velocity.y);
		if(jugador.enParedIzqNormal){
			jugador.setVelocityX(velSaltoPared * 1  + (tiempoJumpsquat - jugador.alturaSalto) * (velSaltoPared / 2 - velSaltoPared) / (tiempoJumpsquat - delta));
			jugador.flipX = true;
		}
		if(jugador.enParedDchaNormal){
			jugador.setVelocityX(velSaltoPared * -1  - (tiempoJumpsquat - jugador.alturaSalto) * (velSaltoPared / 2 - velSaltoPared) / (tiempoJumpsquat - delta));
			jugador.resetFlip();
		}
		
		scene.time.delayedCall(100, jugador.empezandoSalto = false);
		// Si termina el tiempo caemos
		this.temporizadorSaltoPared = scene.time.delayedCall(tiempoSaltoEnPared,() => this.TransicionCaer(delta, scene, jugador));
	}
	
	TransicionCaer(delta, scene,jugador){
		jugador.stateMachine.transition(delta, 'caer');
	}
}