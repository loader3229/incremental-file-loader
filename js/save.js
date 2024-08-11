function getInitPlayer(){
	return {
		loaded_files:[],
		data:new Decimal(0),
		totalData:new Decimal(0),
		formatPoints:new Decimal(0),
		totalFormatPoints:new Decimal(0),
		bitcoin:new Decimal(0),
		totalBitcoin:new Decimal(0),
		upgrades:[],
		formatUpgrades:[],
		bcUpgrades:[],
		loading:-1,
		playTime:0,
		formatTime:0,
		formatCount:0,
		bestFormatTime:1e308,
		achievements:[],
		pc:new Decimal(0),
		os:new Decimal(0),
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
	if(player1.totalData)player.totalData=new Decimal(player1.totalData);
	if(player1.formatPoints)player.formatPoints=new Decimal(player1.formatPoints);
	if(player1.totalFormatPoints)player.totalFormatPoints=new Decimal(player1.totalFormatPoints);
	if(player1.bitcoin)player.bitcoin=new Decimal(player1.bitcoin);
	if(player1.totalBitcoin)player.totalBitcoin=new Decimal(player1.totalBitcoin);
	if(player1.pc)player.pc=new Decimal(player1.pc);
	if(player1.os)player.os=new Decimal(player1.os);
	for(var i in player1.loaded_files)player.loaded_files[i]=new Decimal(player1.loaded_files[i]);
	for(var i in player1.upgrades)player.upgrades[i]=new Decimal(player1.upgrades[i]);
	for(var i in player1.formatUpgrades)player.formatUpgrades[i]=new Decimal(player1.formatUpgrades[i]);
	for(var i in player1.bcUpgrades)player.bcUpgrades[i]=new Decimal(player1.bcUpgrades[i]);
	for(var i in player1.achievements)player.achievements[i]=player1.achievements[i];
	player.loading=player1.loading || -1;
	player.playTime=player1.playTime || 0;
	player.formatTime=player1.formatTime || player1.playTime;
	player.formatCount=player1.formatCount || 0;
	player.bestFormatTime=player1.bestFormatTime || 1e308;
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
	let s=prompt(zhMode?"请输入存档":"Input your save.");
	try{
		let player1=JSON.parse(atob(s));
		if(player1.loaded_files !== undefined && player1.data !== undefined){
			clearInterval(saveInterval);
			localStorage.FileLoaderSave=btoa(JSON.stringify(player1));
			document.location.reload();
			return;
		}
	}catch(e){
		
	}
	alert(zhMode?"存档不合法":"Your save is invalid.");
}