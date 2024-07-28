function getInitPlayer(){
	return {
		loaded_files:[],
		data:new Decimal(0),
		upgrades:[],
		loading:-1,
		playTime:0,	
	};
}

var player=getInitPlayer();

function savegame(){
	localStorage.FileLoaderSave=btoa(JSON.stringify(player));
}

var saveInterval=setInterval(savegame,1000);

function loadgame(){
	let player1;
	try{
		player1=JSON.parse(atob(localStorage.FileLoaderSave));
	}catch(e){
		return;
	}
	
	if(player1.data)player.data=new Decimal(player1.data);
	for(var i in player1.loaded_files)player.loaded_files[i]=new Decimal(player1.loaded_files[i]);
	for(var i in player1.upgrades)player.upgrades[i]=new Decimal(player1.upgrades[i]);
	player.loading=player1.loading;
	player.playTime=player1.playTime;
}

function resetgame(){
	if(!confirm("Are you sure to reset your game?"))return;
	clearInterval(saveInterval);
	localStorage.FileLoaderSave=btoa(JSON.stringify(getInitPlayer()));
	document.location.reload();
}

function exportgame(){
	document.getElementById("export1").value=btoa(JSON.stringify(player));
}

function importgame(){
	let s=prompt("Input your save.");
	try{
		let player1=JSON.parse(atob(s));
		if(player1.loaded_files === undefined)return;
		clearInterval(saveInterval);
		localStorage.FileLoaderSave=btoa(JSON.stringify(player1));
		document.location.reload();
	}catch(e){
		
	}
}