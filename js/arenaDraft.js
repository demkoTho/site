var nbCards = 0;
var cadre;
var cards;
var cardsInDeck;
var classes = ['shaman', 'paladin', 'priest', 'rogue', 'mage', 'warrior', 'druid', 'warlock', 'hunter'];
var choosenClass;

function loadCards() {
	
	$.ajax({
		dataType: "json",
		url: "http://api.hearthstonejson.com/v1/latest/enUS/cards.json",
		data: "",
		success: function(json) {
			console.log(json); // this will show the info it in firebug console
			cards = json
		}
	});
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

function init_draft()
{
	cadre = $("#draftDiv");
	if(choosenClass != null)
	{
		cadre.html('<p>Deck : ' + nbCards + ' cartes</p><div class="col-xs-3" id="deck_status"></div><div class="col-xs-9" id="card_choice"></div>');
		displayNewCards();
	}
}

function displayNewCards()
{
	var zone = $("#card_choice");
	var cardId = Math.floor((Math.random() * 100) + 1); 
	$("#card1").setAttribute("src", "images/cartes/" + cards[cardId].name);
}