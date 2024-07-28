
function getLoaderSpeed(){
	let a=new Decimal(1);
	return a;
}

function show_file_loader(){
	if(getLoadedFiles(0).gte(1)){
		show_window('main');
	}else{
		loadFile(0);
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

function dataGain(){
	return getLoadedFiles(1).floor().div(10);
}

var LENGTH=[5,5,5];
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
	
	for(var i=0;i<=1;i++){
		$("#p"+i).width(getLoadedFiles(i).sub(Decimal.floor(getLoadedFiles(i))).mul(100).toNumber()+"%");
		if(player.loading==i)$("#p"+i+"a").addClass("active");
		else $("#p"+i+"a").removeClass("active");
		if(i>=1){
			$("#cnt"+i).html(formatWhole(getLoadedFiles(i).floor()));
		}
	}
	
	if(player.loading==0 && player.loaded_files[0].gte(1)){
		player.loaded_files[0]=new Decimal(1);
		player.loading=-1;
	}
	
	$("#p0a").css("display",player.loaded_files[0].gte(1)?"none":"");
	
	$("#total_time").html(formatTime(player.playTime));
	$("#total_data").html(formatData(player.totalData));
	$("#data1").html(formatData(player.data));
	$("#data2").html(formatData(player.data));
	
	checkAchievements();
}


function getUpgrade(a){
	if(player.upgrades[a])return player.upgrades[a];
	player.upgrades[a]=new Decimal(0);
	return player.upgrades[a];
}

setInterval(update,20);