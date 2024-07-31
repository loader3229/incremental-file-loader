
function getLoaderSpeed(){
	let a=new Decimal(1);
	a=a.mul(getAchievementBonus());
	a=a.mul(Decimal.pow(1.5,getUpgradeLevel(0).pow(0.8)));
	if((sha512_256(localStorage.supporterCode+"loader3229").slice(2) == '97b4061c3a44e2950549613ba148eff34250441a9b3121698a15fcefdb4f5a'))a = a.mul(1.5);
	return a;
}

function show_file_loader(){
	if(getLoadedFiles(0).gte(1)){
		show_window('main');
	}else{
		loadFile(0);
	}
}

function show_upgrades(){
	if(getLoadedFiles(2).gte(1)){
		show_window('upgrades');
	}else{
		loadFile(2);
	}
}

function show_format(){
	if(getLoadedFiles(5).gte(1)){
		show_window('format');
	}else{
		loadFile(5);
	}
}

function loadFile(a){
	player.loading=a;
}

function getLoadedFiles(a){
	if(player.loaded_files[a])return player.loaded_files[a];
	player.loaded_files[a]=new Decimal(0);
	return player.loaded_files[a];
}

function getUpgradeLevel(a){
	if(player.upgrades[a])return player.upgrades[a];
	player.upgrades[a]=new Decimal(0);
	return player.upgrades[a];
}

function getUpgradeCost(a){
	if(a==0)return Decimal.pow(2,getUpgradeLevel(a).pow(1.2));
}

function upgrade(a){
	if(player.data.gte(getUpgradeCost(a))){
		player.data=player.data.sub(getUpgradeCost(a));
		player.upgrades[a]=getUpgradeLevel(a).add(1);
	}
}

function format_reset(){
	alert("Coming Soon...");
}

function dataGain(){
	let a=getLoadedFiles(1).floor().div(10).mul(getLoadedFiles(3).floor().sqrt().mul(1).add(1)).mul(getLoadedFiles(4).floor().sqrt().mul(1).add(1));
	
	if((sha512_256(localStorage.supporterCode+"loader3229").slice(2) == '97b4061c3a44e2950549613ba148eff34250441a9b3121698a15fcefdb4f5a'))a = a.mul(1.5);
	return a;
}

var LENGTH=[5,5,5,50,100,500];
var tick=Date.now();
var devSpeed=1;
function update(){
	var temp=Date.now();
	var diff=(temp-tick)/1000*devSpeed;
	tick=temp;
	
	
	player.playTime+=diff;
	
	var gain=dataGain().mul(diff);
	player.data=player.data.add(gain);
	player.totalData=player.totalData.add(gain);
	if(player.loading>=0){
		player.loaded_files[player.loading]=getLoadedFiles(player.loading).add((getLoaderSpeed()).mul(diff).div(LENGTH[player.loading]));
	}
	
	for(var i=0;i<=5;i++){
		$("#p"+i).width(getLoadedFiles(i).sub(Decimal.floor(getLoadedFiles(i))).mul(100).toNumber()+"%");
		if(player.loading==i)$("#p"+i+"a").addClass("active");
		else $("#p"+i+"a").removeClass("active");
		if(i==1||i==3||i==4){
			$("#cnt"+i).html(formatWhole(getLoadedFiles(i).floor()));
		}
	}
	
	$("#upg0").html(formatWhole(getUpgradeLevel(0).floor().add(1)));
	$("#upg0c").html(formatData(getUpgradeCost(0)));
	$("#speed").html(format(getLoaderSpeed()));
	
	if(player.loading==0 || player.loading==2 || player.loading==5){
		if(player.loaded_files[player.loading].gte(1)){
			player.loaded_files[player.loading]=new Decimal(1);
			player.loading=-1;
		}
	}
	
	$("#p0a").css("display",getLoadedFiles(0).gte(1)?"none":"");
	$("#p2a").css("display",getLoadedFiles(2).gte(1)?"none":"");
	$("#p5a").css("display",getLoadedFiles(5).gte(1)?"none":"");
	$("#upgrades_exe").css("display",hasAchievement(0)?"":"none");
	$("#adder_exe").css("display",hasAchievement(1)?"":"none");
	$("#multiplier_exe").css("display",hasAchievement(2)?"":"none");
	$("#format_exe").css("display",hasAchievement(3)?"":"none");
	
	$("#data_generator_effect").html("data_generator.exe: +"+formatData2(dataGain())+(zhMode?" 数据/秒":" Data/s")+"<br>");
	$("#adder_effect").html("adder.exe: +"+formatData2(getLoadedFiles(3).floor().sqrt().mul(1).div(10))+(zhMode?" data_generator.exe的基本数据/秒":" Base Data/s to data_generator.exe")+"<br>");
	$("#multiplier_effect").html("multiplier.exe: *"+format(getLoadedFiles(4).floor().sqrt().mul(1).add(1))+(zhMode?" data_generator.exe的速度":" to data_generator.exe")+"<br>");
	
	$("#total_time").html(formatTime(player.playTime));
	$("#total_data").html(formatData(player.totalData));
	$("#data1").html(formatData(player.data));
	$("#data2").html(formatData(player.data));
	$("#data3").html(formatData(player.data));
	
	checkAchievements();
}


function getUpgrade(a){
	if(player.upgrades[a])return player.upgrades[a];
	player.upgrades[a]=new Decimal(0);
	return player.upgrades[a];
}

setInterval(update,20);