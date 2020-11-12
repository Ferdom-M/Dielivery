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

var arrayCausaMuerte = new Array();
var arrayCausaMuerteEspanol = new Array();
var arrayCausaMuerteIngles = new Array();

arrayCausaMuerteEspanol.push("Se cayó por las\nescaleras de la\ncafetería de la\nuniversidad");
arrayCausaMuerteEspanol.push("Sufrió un derrame\ncerebral tras\njugar 453 horas\nseguidas al Isaac");
arrayCausaMuerteEspanol.push("Fue el sacrificio\npara la invocación\nde un dios primigenio");
arrayCausaMuerteEspanol.push("Murió apuñalado\npor la espalda\npor un villero");
arrayCausaMuerteEspanol.push("Muerte por triple\nmortal.\nAhora ya sabe por qué\nse llama así");
arrayCausaMuerteEspanol.push("Cayó por un acantilado\npor exceso de velocidad\nen una motocicleta");
arrayCausaMuerteEspanol.push("Sacó un 1 de natural\nen DnD");
arrayCausaMuerteEspanol.push("Murió por comer kebab\nmientras saltaba\nal hiperespacio");
arrayCausaMuerteEspanol.push("Broncoaspiración por\nvómito");
arrayCausaMuerteEspanol.push("Murió haciendo lo que\nmás disfrutaba,\ndurmiendo");
arrayCausaMuerteEspanol.push("Pintando con acuarelas\nmetió el pincel en\nel té");
arrayCausaMuerteEspanol.push("De tanto escribir se le\nimbuyó la mano en\ny terminó calcinado");
arrayCausaMuerteEspanol.push("Se le cortocircuitó\nel cerebro debido a\necuaciones diferenciales");
arrayCausaMuerteEspanol.push("Intentó pasarse cierto\nshooter en Legendario");
arrayCausaMuerteEspanol.push("Tuvo un accidente al\nintentar realizar un\nviaje en el tiempo\n a Egipto");
arrayCausaMuerteEspanol.push("No durmió su siesta\nde 3 horas");
arrayCausaMuerteEspanol.push("Se murió del susto");
arrayCausaMuerteEspanol.push("Diabetes");
arrayCausaMuerteEspanol.push("Diabetes");

arrayCausaMuerteIngles.push("Fell down the stairs\nat the café");
arrayCausaMuerteIngles.push("Sufrió un pito\ncerebral tras\njugar 453 horas\nseguidas al Isaac");
arrayCausaMuerteIngles.push("Fue el sacrificio\npara la invocación\nde un pito primigenio");
arrayCausaMuerteIngles.push("Murió apuñalado\npor la espalda\npor un pito");
arrayCausaMuerteIngles.push("Muerte por pito\nmortal.\nAhora ya sabe por qué\nse llama así");
arrayCausaMuerteIngles.push("Cayó por un pito\npor exceso de velocidad\nen una motocicleta");
arrayCausaMuerteIngles.push("Sacó un 1 de pito\nen DnD");
arrayCausaMuerteIngles.push("Murió por comer pito\nmientras saltaba\nal hiperespacio");
arrayCausaMuerteIngles.push("Broncoaspiración por\npito");
arrayCausaMuerteIngles.push("Murió haciendo lo que\nmás disfrutaba,\npito");

if(idioma.includes("es")){
	arrayCausaMuerte = arrayCausaMuerteEspanol;
	// LO PONGO EN ELSE IF POR SI ACASO AÑADIMOS MÁS IDIOMAS
}else if(idioma.includes("en")){
	arrayCausaMuerte = arrayCausaMuerteIngles;
}else{ // 
	idioma = "es";
	
	arrayCausaMuerte = arrayCausaMuerteIngles;
}
		
var perfilesUsados = new Set();