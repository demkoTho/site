var nbCards = 0;
var cadre;
var cards;
var rarity;
var cardsInDeck = [];
var classes = ['shaman', 'paladin', 'priest', 'rogue', 'mage', 'warrior', 'druid', 'warlock', 'hunter'];
var choosenClass;
var probas = [0.6,0.3,0.08,0.02];
var chosenCards = [];

function init_draft()
{
	if(choosenClass != null)
	{
		loadCards();
	}
}

function loadCards() {
	
	$.ajax({
		dataType: "json",
		url: "http://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json",
		data: "",
		success: function(json) {
			cards = json.filter(filterWrongClassCard);
			cadre = $("#draftDiv");
			cadre.html('<div class="col-xs-3" id="deck_status"></div><div class="col-xs-9" id="card_choice"></div>');
			displayNewCards();
		}
	});
}

function filterWrongClassCard(obj) 
{
	return ! ('playerClass' in obj && obj.playerClass != choosenClass.toUpperCase())
}

function filterNeutralCard(obj) 
{
	return ! ('playerClass' in obj)
}

function filterClassCard(obj)
{
	return 'playerClass' in obj && obj.playerClass == choosenClass.toUpperCase()
}
      
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

function displayNewCards()
{
	$("#nbCards").text(nbCards);
	var zone = $("#card_choice");
	rarity = getRarity(Math.random())
	console.log(rarity);
	
	var pool = cards.filter(filterCardRarity);
<<<<<<< HEAD
	var poolClass = pool.filter(filterClassCard);
	var poolNeutral = pool.filter(filterNeutralCard);
	console.log(poolClass);
	console.log(poolNeutral);
	var chosenCards = [];
=======
	
>>>>>>> origin/master
	for(var i = 0; i < 3; i++)
	{
		if(Math.random() > 0.1)
		{
			chosenCards.push(poolClass[Math.floor(Math.random() * poolClass.length)]);
			poolClass.splice(poolClass.indexOf(chosenCards[i]), 1);
		}
		else
		{
			chosenCards.push(poolNeutral[Math.floor(Math.random() * poolNeutral.length)]);
			poolNeutral.splice(poolNeutral.indexOf(chosenCards[i]), 1);
		}
		console.log(chosenCards[i].name);
		$("#card"+(i+1)).attr("src", "images/cartes/" + chosenCards[i].name + ".png");
		$("#card"+(i+1)).attr("alt", chosenCards[i].name);
	}
	
	$("#cardsDiv").show();
	
}

function chooseCard(card){
	cardsInDeck.push(chosenCards[card]);
	nbCards++;
	chosenCards = []
	
	if(nbCards < 30){
		displayNewCards();
	}
	
}

function filterCardRarity(obj)
{

	return (obj.rarity == rarity || (rarity == 'COMMON' && obj.rarity =='FREE'))
}

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