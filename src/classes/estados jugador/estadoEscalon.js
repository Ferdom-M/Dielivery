class Escalon extends State{
	enter(delta, scene, jugador){
		console.log("Estado escalon");
		
		
		jugador.anims.play("caidaSalto");
		
		jugador.body.setAllowGravity(true);
		
		jugador.body.velocity.y = velEscalon;
		jugador.body.velocity.x = jugador.velActual/4  * jugador.dirX;
		
	}
	execute(delta, scene, jugador){
		if(!jugador.enParedIzq && !jugador.enParedIzqNormal && !jugador.enParedDcha && !jugador.enParedDchaNormal){
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		
		jugador.body.velocity.y = velEscalon;
		jugador.body.velocity.x = jugador.velActual/4  * jugador.dirX;
	}
}