var arrayNombres = new Array();
arrayNombres.push("adrvapor");
arrayNombres.push("SrAleSelz");
arrayNombres.push("AlbertoRayo");
arrayNombres.push("It'sGonza :D");
arrayNombres.push("Mokito");
arrayNombres.push("Shofiris");
arrayNombres.push("Whiite");
arrayNombres.push("Shelby");
arrayNombres.push("Neji");
arrayNombres.push("Pijama Games");
arrayNombres.push("BlancaDraws");
arrayNombres.push("JFerry");
arrayNombres.push("Gato Condensado");
arrayNombres.push("Andrés");
arrayNombres.push("Sabelton Studios");
arrayNombres.push("Raúl");
arrayNombres.push("Candle Games");
arrayNombres.push("Ataraxia");
arrayNombres.push("Serendipy Studios");
arrayNombres.push("Laratheia");
arrayNombres.push("Leavy");
arrayNombres.push("JuanmCasper");

var arrayCausaMuerte = new Array();
var arrayCausaMuerteEspanol = new Array();
var arrayCausaMuerteIngles = new Array();

arrayCausaMuerteEspanol.push("Se cayó por las escaleras de la cafetería de la universidad");
arrayCausaMuerteEspanol.push("Sufrió un derrame cerebral tras jugar 453 horas seguidas al Isaac");
arrayCausaMuerteEspanol.push("Fue el sacrificio para la invocación de un dios primigenio");
arrayCausaMuerteEspanol.push("Murió apuñalado por la espalda por un villero");
arrayCausaMuerteEspanol.push("Muerte por triple mortal. Ahora ya sabe por qué se llama así");
arrayCausaMuerteEspanol.push("Cayó por un acantilado por exceso de velocidad en una motocicleta");
arrayCausaMuerteEspanol.push("Sacó un 1 de natural en DnD");
arrayCausaMuerteEspanol.push("Murió por comer kebab mientras saltaba al hiperespacio");
arrayCausaMuerteEspanol.push("Broncoaspiración por vómito");
arrayCausaMuerteEspanol.push("Murió haciendo lo que más disfrutaba, durmiendo");
arrayCausaMuerteEspanol.push("Pintando con acuarelas metió el pincel en el té");
arrayCausaMuerteEspanol.push("De tanto escribir se le imbuyó la mano en y terminó calcinado");
arrayCausaMuerteEspanol.push("Se le cortocircuitó el cerebro debido a ecuaciones diferenciales");
arrayCausaMuerteEspanol.push("Intentó pasarse cierto shooter en Legendario");
arrayCausaMuerteEspanol.push("Tuvo un accidente al intentar realizar un viaje en el tiempo  a Egipto");
arrayCausaMuerteEspanol.push("No durmió su siesta de 3 horas");
arrayCausaMuerteEspanol.push("Se murió del susto");
arrayCausaMuerteEspanol.push("Diabetes");
arrayCausaMuerteEspanol.push("Intentó hacer paracaidismo sin paracaidas");
arrayCausaMuerteEspanol.push("Murió al intentar hacer una Jojo pose y romperse en dos");
arrayCausaMuerteEspanol.push("Murió al resbalarse y caer al mar durante una persecución tras una invocación a Cthulhu fallida");
arrayCausaMuerteEspanol.push("El artista del juego le mató de la risa");

arrayCausaMuerteIngles.push("He fell down the stairs of the university cafe. Ouchie ouch");
arrayCausaMuerteIngles.push("He suffered a stroke after playing Isaac for 453 hours in a row");
arrayCausaMuerteIngles.push("He was the sacrifice for the invocation of a primal god");
arrayCausaMuerteIngles.push("He was stabbed in the back by a villager");
arrayCausaMuerteIngles.push("Death by triple backflip. Now they know why it's called that way");
arrayCausaMuerteIngles.push("She fell off a cliff for speeding on a motorcycle");
arrayCausaMuerteIngles.push("They got a Natural 1 in DnD");
arrayCausaMuerteIngles.push("He died eating a kebab while jumping to the hyperspace");
arrayCausaMuerteIngles.push("Breathing vomit is not a cool thing");
arrayCausaMuerteIngles.push("They died while doing what they loved most, sleeping");
arrayCausaMuerteIngles.push("While painting with watercolor, she accidentally dip the brush on the tea");
arrayCausaMuerteIngles.push("His hand caught fire from writing too much and burned to death");
arrayCausaMuerteIngles.push("She had a stroke due to differential equations");
arrayCausaMuerteIngles.push("He tried to complete a certain shooter on Legendary difficulty");
arrayCausaMuerteIngles.push("They had an accident while trying to time-travel to Egypt");
arrayCausaMuerteIngles.push("Didn't sleep his 3 hour long nap");
arrayCausaMuerteIngles.push("They scared to death");
arrayCausaMuerteIngles.push("Diabetes");
arrayCausaMuerteIngles.push("They tried parachuting without a parachute");
arrayCausaMuerteIngles.push("She died trying to make a JoJo pose and broke in two");
arrayCausaMuerteIngles.push("He slipped and fell to the sea during a chase after a failed Chtulhu summoning");
arrayCausaMuerteIngles.push("The game artist made him laugh until death");

if(idioma.idioma.includes("es")){
	arrayCausaMuerte = arrayCausaMuerteEspanol;
	// LO PONGO EN ELSE IF POR SI ACASO AÑADIMOS MÁS IDIOMAS
}else if(idioma.idioma.includes("en")){
	arrayCausaMuerte = arrayCausaMuerteIngles;
}else{ // 
	idioma.idioma = "en";
	
	arrayCausaMuerte = arrayCausaMuerteIngles;
}
		
var perfilesUsados = new Set();