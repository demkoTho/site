var nbCards = 0;
var cadre;
var cards;
var rarity;
var cardsInDeck = [];
var classes = ['shaman', 'paladin', 'priest', 'rogue', 'mage', 'warrior', 'druid', 'warlock', 'hunter'];
var choosenClass;
var probas = [0.6,0.3,0.08,0.02];
var chosenCards = [];

// Autorise le début de la draft
function init_draft()
{
	if(choosenClass != null)
	{
		loadCards();
	}
}

// Charge en mémoire toutes les cartes du jeu correspondant à la classe choisie
function loadCards() {
	
	$.ajax({
		dataType: "json",
		url: "http://localhost:8000/cards",
		data: "",
		success: function(json) {
			cards = json.filter(filterWrongClassCard);
			$("#draftDiv").hide();
			loadNotes();
		}
	});
}

// Charge en mémoire les notes des cartes présentées
function loadNotes() {
	
	$.ajax({
		dataType: "json",
		url: "http://localhost:8000/tierlist",
		data: "",
		success: function(json) {
			console.log(json);
			displayNewCards();
		}
	});
}

// Elimine les cartes qui sont de la mauvaise classe (garde les neutres)
function filterWrongClassCard(obj) 
{
	return ! (('playerClass' in obj && obj.playerClass != choosenClass.toUpperCase()) || ('type' in obj && obj.type == "HERO"))
}

// Garde les cartes neutres
function filterNeutralCard(obj) 
{
	return ! ('playerClass' in obj)
}

// Garde les cartes de la classe choisie (élimine les neutres)
function filterClassCard(obj)
{
	return 'playerClass' in obj && obj.playerClass == choosenClass.toUpperCase()
}
 
// Sélection de la classe
function activate(hero)
{
	if(choosenClass == null)
	{
		$("#button_init").removeClass("disabled");
		$("#button_init").text("Commencer la draft");
		
	}
	choosenClass = hero;
	for(var i = 0; i < classes.length; i++)
	{
		var c = classes[i];
		if(c == hero)
		{
			$("."+c).css("opacity", "0.95");
		}
		else
		{
			$("."+c).css("opacity", "0.7");
		}
	}
}

// Affiche trois nouvelles cartes sélectionnables
function displayNewCards()
{
	// Choix d'une rareté
	$("#nbCards").text(nbCards);
	var zone = $("#card_choice");
	rarity = getRarity(Math.random())
	console.log(rarity);
	
	// Tri des cartes
	var pool = cards.filter(filterCardRarity);
	var poolClass = pool.filter(filterClassCard);
	var poolNeutral = pool.filter(filterNeutralCard);

	var chosenCards = [];
	
	// Sélection des cartes
	for(var i = 0; i < 3; i++)
	{
		if(Math.random() > 0.6)
		{
			chosenCards.push(poolClass[Math.floor(Math.random() * poolClass.length)]);
			poolClass.splice(poolClass.indexOf(chosenCards[i]), 1);
		}
		else
		{
			chosenCards.push(poolNeutral[Math.floor(Math.random() * poolNeutral.length)]);
			poolNeutral.splice(poolNeutral.indexOf(chosenCards[i]), 1);
		}
		console.log(chosenCards[i]);
		if(chosenCards[i].set == "BRM" || chosenCards[i].set == "TGT" || chosenCards[i].set == "LOE")
			$("#card"+(i+1)).addClass("hearthpwn");
		else
			$("#card"+(i+1)).removeClass("hearthpwn");

		$("#card"+(i+1)).attr("src", "images/cartes/" + chosenCards[i].name.replace(':', '') + ".png");
		$("#card"+(i+1)).attr("alt", chosenCards[i].name);
	}
	
	$("#cardsDiv").show();
	
}

// Gestion du choix de carte
function chooseCard(card){
	cardsInDeck.push(chosenCards[card]);
	nbCards++;
	chosenCards = []
	
	if(nbCards < 30){
		displayNewCards();
	}
	
}

// Garde les cartes de la bonne rareté
function filterCardRarity(obj)
{

	return (obj.rarity == rarity || (rarity == 'COMMON' && obj.rarity =='FREE'))
}

// Choisit la rareté des cartes proposées
function getRarity(rand)
{
	if(rand <= probas[0])
	{
		return 'COMMON';
	}
	else if(rand <= probas[0] + probas[1])
	{
		return 'RARE';
	}
	else if(rand <= probas[0] + probas[1] + probas[2])
	{
		return 'EPIC';
	}
	else
	{
		return 'LEGENDARY';
	}
}