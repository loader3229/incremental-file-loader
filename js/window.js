var current_window='about';

function show_window(a){
	hide_window( current_window);
	$("#"+a).addClass('shown');
}

function hide_window(a){
	$("#"+a).removeClass('shown');
}