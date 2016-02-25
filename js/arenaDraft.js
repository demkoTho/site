var nbCards = 0;
var cadre;
var cards;
var rarity;
var cardsInDeck;
var classes = ['shaman', 'paladin', 'priest', 'rogue', 'mage', 'warrior', 'druid', 'warlock', 'hunter'];
var choosenClass;
var probas = [0.6,0.3,0.08,0.02];

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
	
	var chosenCards = [];
	for(var i = 0; i < 3; i++)
	{
		chosenCards.push(pool[Math.floor(Math.random() * pool.length)]);
		zone.append($("<p>").text(chosenCards[i].name));
	}

	console.log(chosenCards);
	
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