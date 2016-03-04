$(document).ready(function(){
	$("h2").click(function(){
			
			
		var block = $(this);
		while(block.next().size() > 0 && !(block.next().is("h2")))
			{
				block = block.next();
				block.toggle();
			}
	});
});