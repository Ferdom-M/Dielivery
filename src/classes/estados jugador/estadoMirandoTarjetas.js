class MirandoTarjetas extends State{
	enter(delta, scene, jugador){
		//console.log("Estado mirando tarjetas");
		jugador.tarjetas = false;
		
		jugador.body.velocity.x = 0;
		jugador.anims.play("idle", true);
		
		for(var i = 0; i < arrayTarjetas.length; i++){
			arrayTarjetas[i].setScale(1);
			arrayTarjetas[i].setPosition(width / 2 + arrayTarjetas[i].imagenes[0].width * 1.25 * i, height / 2);
		}
	}
	
	execute(delta, scene, jugador){
		if(jugador.tarjetas){
			jugador.tarjetas = false;
			
			for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i].setScale(escalaTarjeta);
				arrayTarjetas[i].setPosition(margenInicialTarjeta + (i / (maxPedidos - 1)) * (width - 2 * margenInicialTarjeta), -35);
			}
				
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
