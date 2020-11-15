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
		
		if(!enPc){
			scene.zonaSwipe.setVisible(false);
			scene.base.setVisible(false);
			scene.thumb.setVisible(false);
			scene.botonAccion.setVisible(false);
			scene.zonaMoverTarjetas.setVisible(true);
			
			var downX;
			var upX;
			
			scene.zonaMoverTarjetas.on('dragstart', function (pointer) {
				downX = pointer.x;
			}   
			);

			scene.zonaMoverTarjetas.on('drag', function (pointer) {
				upX = pointer.x;
				if(arrayTarjetas[0].x + (upX - downX) < width / 2 && arrayTarjetas[arrayTarjetas.length - 1].x + (upX - downX) > width / 2){
					for(var i = 0; i < arrayTarjetas.length; i++){
						arrayTarjetas[i].x += (upX - downX) / (arrayTarjetas.length - 1);
					}
				}
				downX = pointer.x;
			}    
			);
		}
	}
	
	execute(delta, scene, jugador){
		// TRANSICIONES
		if(jugador.tarjetas){
			jugador.tarjetas = false;
			
			for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i] = ColocarTarjeta(arrayTarjetas[i], i);
			}
			
			jugador.sGuarTarjeta.play();
			
			if(!enPc){
				scene.zonaSwipe.setVisible(true);
				scene.base.setVisible(true);
				scene.thumb.setVisible(true);
				scene.botonAccion.setVisible(true);
				scene.zonaMoverTarjetas.setVisible(false);
			}
		
			jugador.stateMachine.transition(delta, 'idle');
			return;
		}
		
		if(enPc){
			if(jugador.dirX != 0 && arrayTarjetas[0].x + jugador.dirX * 10 < width / 2 && arrayTarjetas[arrayTarjetas.length - 1].x + jugador.dirX * 10 > width / 2){
				for(var i = 0; i < arrayTarjetas.length; i++){
					arrayTarjetas[i].x += jugador.dirX * 10;
				}
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
