class Dano extends State{
	enter(delta, scene, jugador){
		//console.log("Estado daño");
		
		jugador.anims.play("dano");
		// Ocurre algo, idk no recuerdo el que, perder un objeto creo
		//this.inventario.pop();
		jugador.body.setAllowGravity(true);
		if(jugador.inventario.length > 0){
			console.log("Oh no, perdí " + jugador.inventario.pop());
			jugador.velActual = velJugador + (-velJugador / (2 * limInventario)) * jugador.inventario.length;
		}
		jugador.setVelocityY(velSalto);
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.body.blocked.down){
			jugador.stateMachine.transition(delta, 'idle');
			return;
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
}