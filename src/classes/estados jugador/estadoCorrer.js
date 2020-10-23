class Correr extends State{
	enter(delta, scene, jugador){
		//console.log("Estado correr");
		if (jugador.dirX == -1){
			jugador.resetFlip();
		}else{
			jugador.flipX = true;
		}
		jugador.anims.play("andar", true);
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.enPinchos){
			jugador.stateMachine.transition(delta, 'dano');
			return;
		}
		if(jugador.dirX == 0){
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		if(jugador.jumpsquat){
			jugador.stateMachine.transition(delta, 'salto');
			return;
		}
		if(!jugador.enSuelo){
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		if(jugador.enEscalera && jugador.dirY < 0){
			jugador.stateMachine.transition(delta, 'escalera');
			return;
		}
		if(jugador.accion && objetos.getTileAtWorldXY(jugador.x, jugador.y) && jugador.inventario.length < limInventario){
			jugador.stateMachine.transition(delta, 'recogerObjeto');
			return;
		}
		if((jugador.enParedIzq && jugador.enParedIzqNormal && !suelo.getTileAtWorldXY(jugador.x-tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x,jugador.y-tileSize)) || 
		   (jugador.enParedDcha && jugador.enParedDchaNormal && !suelo.getTileAtWorldXY(jugador.x+tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x, jugador.y-tileSize))){
			jugador.stateMachine.transition(delta, 'escalon');
			return;
		}
		
		jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, aceleracion));
		if (jugador.dirX == -1){
			jugador.resetFlip();
		}else{
			jugador.flipX = true;
		}
	}
}
