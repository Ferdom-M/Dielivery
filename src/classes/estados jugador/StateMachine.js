class StateMachine{
	constructor(initialState, possibleStates, stateArgs = []){
		this.initialState = initialState;
		this.possibleStates = possibleStates;
		this.stateArgs = stateArgs;
		this.state = null;
		
		for (const state of Object.values(this.possibleStates)){
			state.stateMachine = this;
		}
	}
	
	step(delta){
		if(this.state === null){
			this.state = this.initialState;
			this.possibleStates[this.state].enter(delta, ...this.stateArgs);
		}
		
		this.possibleStates[this.state].execute(delta, ...this.stateArgs);
	}
	
	transition(delta, newState, ...enterArgs){
		this.state = newState;
		this.possibleStates[this.state].enter(delta, ...this.stateArgs, ...enterArgs);
	}
}

class State{
	enter(){
		
	}
	
	execute(){
		
	}
}