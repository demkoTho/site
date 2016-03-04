$(document).ready(function()
{
	$("td.card").mouseover(function(){

		var name = $(this).text();
		var s = '<img src="images/cartes/'+name+'.png" alt="'+name+'">';
		$(".preview").html(s);
		console.log(name);
	});

});