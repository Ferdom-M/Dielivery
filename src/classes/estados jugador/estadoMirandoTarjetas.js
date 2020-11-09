class MirandoTarjetas extends State{
	enter(delta, scene, jugador){
		//console.log("Estado mirando tarjetas");
		jugador.tarjetas = false;
		
		jugador.body.velocity.x = 0;
		jugador.anims.play("idle", true);
		jugador.sExtTarjeta.play();
		
		for(var i = 0; i < arrayTarjetas.length; i++){
			arrayTarjetas[i].setScale(1);
			arrayTarjetas[i].setPosition(width / 2 + arrayTarjetas[i].imagenes[0].width * 1.25 * i, height / 2);
			arrayTarjetas[i].setAngle(0);
		}
	}
	
	execute(delta, scene, jugador){
		if(jugador.tarjetas){
			jugador.tarjetas = false;
			
			for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i] = ColocarTarjeta(arrayTarjetas[i], i);
			}
			
			jugador.sGuarTarjeta.play();
		
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		
		if(jugador.dirX != 0 && arrayTarjetas[0].x + jugador.dirX * 10 < width / 2 && arrayTarjetas[arrayTarjetas.length - 1].x + jugador.dirX * 10 > width / 2){
			for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i].x += jugador.dirX * 10;
			}
		}
		/*
		jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, jugador.dirX * jugador.velActual, aceleracion));
		if (jugador.dirX == -1){
			jugador.resetFlip();
		}else{
			jugador.flipX = true;
		}
		*/
	}
}
