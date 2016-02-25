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
			cards = json.filter(filterClassCard);
			cadre = $("#draftDiv");
			cadre.html('<p>Deck : ' + nbCards + ' cartes</p><div class="col-xs-3" id="deck_status"></div><div class="col-xs-9" id="card_choice"></div>');
			displayNewCards();
		}
	});
}

function filterClassCard(obj) 
{
	return ! ('playerClass' in obj && obj.playerClass != choosenClass.toUpperCase())
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
	var zone = $("#card_choice");
	rarity = getRarity(Math.random())
	console.log(rarity);
	
	var pool = cards.filter(filterCardRarity);
	
	for(var i = 0; i < 3; i++)
	{
		chosenCards.push(pool[Math.floor(Math.random() * pool.length)]);
	}
	$("#card1").attr("src","images/cartes/" + chosenCards[0].name + ".png");
	$("#card1").attr("alt", chosenCards[0].name);
	$("#card2").attr("src","images/cartes/" + chosenCards[1].name + ".png");
	$("#card2").attr("alt", chosenCards[1].name);
	$("#card3").attr("src","images/cartes/" + chosenCards[2].name + ".png");
	$("#card3").attr("alt", chosenCards[2].name);
	
	$("#cardsDiv").show();

	console.log(chosenCards);
	
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