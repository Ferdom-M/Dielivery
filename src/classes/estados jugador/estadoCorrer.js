class Correr extends State{
	enter(delta, scene, jugador){
		//console.log("Estado correr");
		if (jugador.dirX == -1){
			jugador.resetFlip();
		}else{
			jugador.flipX = true;
		}
		
		jugador.anims.play("andar", true);
		if(jugador.enSueloResbaladizo){
			jugador.sPasosMojados.play();
		}else if(jugador.enSueloNormal){
			jugador.sPasos.play();
		}
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.enPinchos){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'dano');
			return;
		}
		if(jugador.dirX == 0){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		if(jugador.jumpsquat){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'salto');
			return;
		}
		if(!jugador.enSuelo){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		if(jugador.enEscalera && jugador.dirY < 0){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'escalera');
			return;
		}
		if(jugador.accion && objetos.getTileAtWorldXY(jugador.x, jugador.y) && jugador.inventario.length < limInventario){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'recogerObjeto');
			return;
		}
		if(jugador.accion && resto.getTileAtWorldXY(jugador.x, jugador.y) && idTumbasConPedidos.has(resto.getTileAtWorldXY(jugador.x, jugador.y).index) && arrayPedidos.length < 5 && arrayPedidosPorRecoger.length > 0){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'recogerPedido');
			return;
		}
		if(jugador.accion && resto.getTileAtWorldXY(jugador.x, jugador.y) && idMesa.has(resto.getTileAtWorldXY(jugador.x, jugador.y).index)){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'mesa');
			return;
		}
		if((jugador.enParedIzq && jugador.enParedIzqNormal && !suelo.getTileAtWorldXY(jugador.x-tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x,jugador.y-tileSize)) || 
		   (jugador.enParedDcha && jugador.enParedDchaNormal && !suelo.getTileAtWorldXY(jugador.x+tileSize, jugador.y-tileSize) && !suelo.getTileAtWorldXY(jugador.x, jugador.y-tileSize))){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, 'escalon');
			return;
		}
		if(jugador.tarjetas && arrayPedidos.length > 0){
			jugador.sPasos.stop();
			jugador.sPasosMojados.stop();
			jugador.stateMachine.transition(delta, "mirandoTarjetas");
			return;
		}
		// SONIDOS
		if(jugador.sPasos.isPlaying && jugador.enSueloResbaladizo){
			jugador.sPasos.stop();
			jugador.sPasosMojados.play();
		}
		if(jugador.sPasosMojados.isPlaying && jugador.enSueloNormal){
			jugador.sPasosMojados.stop();
			jugador.sPasos.play();
		}
		if(jugador.enSueloResbaladizo){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, aceleracionResbaladizo));
		}else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, aceleracion));
		}
		if (jugador.dirX == -1){
			jugador.resetFlip();
		}else{
			jugador.flipX = true;
		}
		
		
	}
}
