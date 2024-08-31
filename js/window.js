var current_window='about';
var current_subtab='';

function show_window(a){
	hide_window(current_window);
	$("#"+a).addClass('shown');
	
	document.getElementById("export1").value="";
	current_window=a;
	
	if(a=='infinity')show_subtab('infinity_upgrades');
}

function show_subtab(a){
	hide_subtab(current_subtab);
	
	$("#"+a).addClass('shown');
	current_subtab=a;
	
	if(a=='infinity_upgrades'){
		setupInfinityUpgradesHTML();
	}
}

function hide_window(a){
	hide_subtab(current_subtab);
	
	$("#"+a).removeClass('shown');
}

function hide_subtab(a){
	if(a=='')return;
	
	if(a=='infinity_upgrades'){
		document.getElementById(a).innerHTML="";
	}
	current_subtab='';
	$("#"+a).removeClass('shown');
}