$(document).ready(function()
{
	$("td.card").mouseover(function(){

		var name = $(this).text();
		var s = '<img src="images/cartes/'+name+'.png" alt="'+name+'">';
		$(".preview").html(s);
		console.log(name);
	});

	
});

function activateHuntard() {
		 
		$("#huntard").show(200);
		$("#freeze").hide(200);
		$("#control").hide(200);
		$("#message").hide(200);
		$(".preview").html("");
   }
			
	function activateControl() {
 
		$("#huntard").hide(200);
		$("#freeze").hide(200);
		$("#control").show(200);
		$("#message").hide(200);
		$(".preview").html("");
	}
			
	function activateFreeze() {
 
		$("#huntard").hide(200);
		$("#freeze").show(200);
		$("#control").hide(200);
		$("#message").hide(200);
		$(".preview").html("");
	}