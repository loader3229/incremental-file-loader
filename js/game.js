﻿function getLoaderSpeed(){
	let a=new Decimal(1);
	a=a.mul(getAchievementBonus());
	a=a.mul(getUpgradeEffect(0));
	a=a.mul(getPcBonus());
	a=a.mul(getOSFlatBonus());
	if(hasInfinityOneUpgrade(0,0))a=a.mul(player.infinity.count.add(1));
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

function show_shop(){
	if(getLoadedFiles(7).gte(1)){
		show_window('shop');
	}else{
		loadFile(7);
	}
}

function show_os_upgrader(){
	if(getLoadedFiles(9).gte(1)){
		show_window('oswindow');
	}else{
		loadFile(9);
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

function getFormatUpgradeLevel(a){
	if(player.formatUpgrades[a])return player.formatUpgrades[a];
	player.formatUpgrades[a]=new Decimal(0);
	return player.formatUpgrades[a];
}

function getBcUpgradeLevel(a){
	if(player.bcUpgrades[a])return player.bcUpgrades[a];
	player.bcUpgrades[a]=new Decimal(0);
	return player.bcUpgrades[a];
}

function getUpgradeEffect(a){
	if(a==0)return Decimal.pow(1.5,getUpgradeLevel(a).add(getFormatUpgradeLevel(a)).add(getBcUpgradeLevel(a)).pow(0.8).div(hasInfinityOneUpgrade(2,3)?2:hasInfinityOneUpgrade(2,2)?1.6:hasInfinityOneUpgrade(2,1)?1.3:hasInfinityOneUpgrade(2,0)?1.1:1));
	if(a==1)return Decimal.pow(1.5,getUpgradeLevel(a).add(getFormatUpgradeLevel(a)).add(getBcUpgradeLevel(a)));
	if(a==2)return Decimal.pow(1.5,getUpgradeLevel(a).add(getFormatUpgradeLevel(a)).add(getBcUpgradeLevel(a)));
	if(a==3)return Decimal.pow(1.5,getUpgradeLevel(a).add(getFormatUpgradeLevel(a)).add(getBcUpgradeLevel(a)));
}

function getUpgradeCost(a,x){
	if(x===undefined)x=getUpgradeLevel(a);
	x=new Decimal(x);
	if(a==0)return Decimal.pow(2,x.pow(1.2));
	if(a==1)return Decimal.pow(2,x.mul(2).add(player.os.gte(17)?0:10));
	if(a==2 && hasAchievement(19))return Decimal.pow(player.os.gte(47)?1.35:player.os.gte(17)?1.5:1.9,Decimal.pow(player.os.gte(47)?1.35:player.os.gte(17)?1.5:1.9,x));
	if(a==2)return Decimal.pow(2,Decimal.pow(2,x.add(5)));
	if(a==3)return Decimal.pow(10,Decimal.pow(player.os.gte(17)?1.05:1.1,x.pow(2)).mul(player.os.gte(17)?1:30));
}

function getFormatUpgradeCost(a,x){
	if(x===undefined)x=getFormatUpgradeLevel(a);
	x=new Decimal(x);
	if(a==0)return Decimal.pow(2,x);
	if(a==1)return Decimal.pow(player.os.gte(27)?2:3,x);
	if(a==2)return Decimal.pow(4,x.add(player.os.gte(15)?0:13));
	if(a==3)return Decimal.pow(5,x.pow(1.5)).mul(player.os.gte(15)?1:1e10);
}

function getBcUpgradeCost(a,x){
	if(x===undefined)x=getBcUpgradeLevel(a);
	x=new Decimal(x);
	if(a==0)return Decimal.pow(player.os.gte(59)?3.5:5,x);
	if(a==1)return Decimal.pow(player.os.gte(69)?2.5:3,x.add(player.os.gte(69)?0:1));
	if(a==2)return Decimal.pow(2,x.add(2)).mul(25);
	if(a==3)return Decimal.pow(4,x.add(3));
}

function getUpgradeBulk(a,x){
	if(x===undefined)x=player.data;
	x=new Decimal(x);
	if(a==0)return x.max(0.1).log(2).pow(1/1.2).add(1).floor().max(0);
	if(a==1)return x.max(0.1).log(2).sub(player.os.gte(17)?0:10).div(2).add(1).floor().max(0);
	if(a==2 && hasAchievement(19))return x.max(0.1).log(player.os.gte(47)?1.35:player.os.gte(17)?1.5:1.9).max(0.1).log(player.os.gte(47)?1.35:player.os.gte(17)?1.5:1.9).add(1).floor().max(0);
	if(a==2)return x.max(0.1).log(2).max(0.1).log(2).sub(5).add(1).floor().max(0);
	if(a==3)return x.max(0.1).log(10).div(player.os.gte(17)?1:30).max(0.1).log(player.os.gte(17)?1.05:1.1).pow(0.5).add(1).floor().max(0);
}

function getFormatUpgradeBulk(a,x){
	if(x===undefined)x=player.formatPoints;
	x=new Decimal(x);
	if(a==0)return x.max(0.1).log(2).add(1).floor().max(0);
	if(a==1)return x.max(0.1).log(player.os.gte(27)?2:3).add(1).floor().max(0);
	if(a==2)return x.max(0.1).log(4).sub(player.os.gte(15)?0:13).add(1).floor().max(0);
	if(a==3)return x.div(player.os.gte(15)?1:1e10).max(0.1).log(5).pow(1/1.5).add(1).floor().max(0);
}

function getBcUpgradeBulk(a,x){
	if(x===undefined)x=player.bitcoin;
	x=new Decimal(x);
	if(a==0)return x.max(0.1).log(player.os.gte(59)?3.5:5).add(1).floor().max(0);
	if(a==1)return x.max(0.1).log(player.os.gte(69)?2.5:3).add(player.os.gte(69)?1:0).floor().max(0);
	if(a==2)return x.div(25).max(0.1).log(2).add(-1).floor().max(0);
	if(a==3)return x.max(0.1).log(4).add(-2).floor().max(0);
}

function upgrade(a){
	if(player.data.gte(getUpgradeCost(a))){
		if(!hasAchievement(29))player.data=player.data.sub(getUpgradeCost(a));
		player.upgrades[a]=getUpgradeLevel(a).add(1);
	}
}

function formatUpgrade(a){
	if(player.formatPoints.gte(getFormatUpgradeCost(a))){
		if(!hasAchievement(30))player.formatPoints=player.formatPoints.sub(getFormatUpgradeCost(a));
		player.formatUpgrades[a]=getFormatUpgradeLevel(a).add(1);
	}
}

function buyMaxUpgrade1(a){
	if(player.data.gte(getUpgradeCost(a))){
		var b=getUpgradeBulk(a);
		if(!hasAchievement(29))player.data=player.data.sub(getUpgradeCost(a,b.sub(1)));
		player.upgrades[a]=b;
	}
	if(player.formatPoints.gte(getFormatUpgradeCost(a))){
		var b=getFormatUpgradeBulk(a);
		if(!hasAchievement(30))player.formatPoints=player.formatPoints.sub(getFormatUpgradeCost(a,b.sub(1)));
		player.formatUpgrades[a]=b;
	}
}

function bcUpgrade(a){
	if(player.bitcoin.gte(getBcUpgradeCost(a))){
		if(!hasAchievement(31))player.bitcoin=player.bitcoin.sub(getBcUpgradeCost(a));
		player.bcUpgrades[a]=getBcUpgradeLevel(a).add(1);
	}
}

function bcMaxUpgrade(a){
	if(player.bitcoin.gte(getBcUpgradeCost(a))){
		var b=getBcUpgradeBulk(a);
		if(!hasAchievement(31))player.bitcoin=player.bitcoin.sub(getBcUpgradeCost(a,b.sub(1)));
		player.bcUpgrades[a]=b;
	}
}

function format_reset(a){
	if(formatPointGain().gte(1) || a){
		player.formatPoints=player.formatPoints.add(formatPointGain());
		player.totalFormatPoints=player.totalFormatPoints.add(formatPointGain());
		if(formatPointGain().gte(1)){
			if(player.formatTime<player.bestFormatTime)player.bestFormatTime=player.formatTime;
			player.formatCount=player.formatCount.add(1);
		}
		player.loading=-1;
		player.formatTime=0;
		player.data=new Decimal(0);
		player.loaded_files[1]=new Decimal(0);
		player.loaded_files[3]=new Decimal(0);
		player.loaded_files[4]=new Decimal(0);
		player.loaded_files[6]=new Decimal(0);
		player.loaded_files[8]=new Decimal(0);
		player.loaded_files[10]=new Decimal(0);
		player.loaded_files[11]=new Decimal(0);
	}
}

function metaAch1Eff(){
	if(player.achievements.length>=20)return 1;
	if(player.achievements.length<=10)return 0.5;
	return player.achievements.length/20;
}

function metaAch2Eff(){
	if(player.achievements.length<=20)return 1;
	return player.achievements.length/20;
}

function metaAch2Eff2(){
	if(player.achievements.length<=20||!hasAchievement(24))return 1;
	return player.achievements.length/20;
}

function dataGain(){
	let a=getLoadedFiles(1).pow(getFilePower()).floor().div(player.os.gte(2)?1:10).mul(getLoadedFiles(3).pow(getFilePower()).floor().pow(metaAch1Eff()).mul(1).add(1)).mul(getLoadedFiles(4).pow(getFilePower()).floor().pow(metaAch1Eff()).mul(1).add(1)).mul(getUpgradeEffect(1));
	if(hasAchievement(15))a=a.mul(getAchievementBonus());
	a=a.mul(getPcBonus());
	a=a.mul(getOSFlatBonus());
	if(hasAchievement(28))a=a.mul(10);
	if((sha512_256(localStorage.supporterCode+"loader3229").slice(2) == '97b4061c3a44e2950549613ba148eff34250441a9b3121698a15fcefdb4f5a'))a = a.mul(1.5);
	return a;
}

function formatPointGain(){
	let a=player.data.add(1).max(1).log(2).div(player.os.gte(19)?10:20).pow(15);
	a=a.mul(getUpgradeEffect(2));
	if(hasAchievement(9))a=a.mul(2);
	if(hasAchievement(14))a=a.mul(2);
	if(hasAchievement(17))a=a.mul(2.5);
	if(hasAchievement(16))a=a.mul(getAchievementBonus());
	if(player.os.gte(7))a=a.mul(getPcBonus());
	if(hasInfinityOneUpgrade(1,0))a=a.mul(player.formatCount.add(1));
	a=a.floor();
	return a;
}

function bitcoinGain(){
	let a=player.data.add(1).max(1).log10().pow(metaAch2Eff()).mul(getLoadedFiles(6).pow(getFilePower()).floor().add(1).max(1).log10().pow(2)).div(100);
	if(hasAchievement(9))a=a.mul(2);
	if(hasAchievement(14))a=a.mul(2);
	if(hasAchievement(18))a=a.mul(2.5);
	if(hasAchievement(15))a=a.mul(getAchievementBonus());
	a=a.mul(getUpgradeEffect(3));
	a=a.mul(getPcBonus());
	a=a.mul(getOSFlatBonus2());
	return a;
}

function realBitcoinGain(){
	let a=player.bitcoin.add(2).div(2).pow(2).add(bitcoinGain()).sqrt().mul(2).sub(2).sub(player.bitcoin);
	return a;
}

function getFilePower(){
	let a=new Decimal(hasInfinityOneUpgrade(2,3)?2:hasInfinityOneUpgrade(2,2)?1.6:hasInfinityOneUpgrade(2,1)?1.3:hasInfinityOneUpgrade(2,0)?1.1:1);
	return a;
}

function fileEffect(a){
	if(a==8)return getLoadedFiles(a).pow(getFilePower()).floor().mul(player.data.add(10).log10().pow(metaAch2Eff())).mul(hasAchievement(16)?getAchievementBonus():1).mul(player.os.gte(4)?getPcBonus():1).mul(player.os.gte(13)?getOSFlatBonus():1);
	if(a==10)return getLoadedFiles(a).pow(getFilePower()).floor().mul(player.data.add(10).log10().pow(metaAch2Eff2())).mul(hasAchievement(23)?getAchievementBonus():1).mul(player.os.gte(6)?getPcBonus():1).mul(player.os.gte(13)?getOSFlatBonus():1);
	if(a==11)return getLoadedFiles(a).pow(getFilePower()).floor().mul(player.data.add(10).log10().pow(metaAch2Eff2())).mul(hasAchievement(23)?getAchievementBonus():1).mul(player.os.gte(6)?getPcBonus():1).mul(player.os.gte(13)?getOSFlatBonus():1);
}

function getPcReq(){
	return Decimal.pow(1.5,player.pc).mul(hasAchievement(26)?1000:hasAchievement(22)?10000:20000).div(player.os.gte(53)?1000:player.os.gte(35)?100:player.os.gte(23)?10:1);
}

function getPcBulk(){
	return player.bitcoin.div(hasAchievement(26)?1000:hasAchievement(22)?10000:20000).mul(player.os.gte(53)?1000:player.os.gte(35)?100:player.os.gte(23)?10:1).max(0.1).log(1.5).add(1).floor().max(0);
}

function getPcBulkNext(){
	return Decimal.pow(1.5,getPcBulk()).mul(hasAchievement(26)?1000:hasAchievement(22)?10000:20000).div(player.os.gte(53)?1000:player.os.gte(35)?100:player.os.gte(23)?10:1);
}

function getPcBonus(){
	return player.pc.add(1).pow(player.os.gte(11)?3:player.os.gte(5)?2:player.os.gte(1)?1.5:1);
}

function buypc(){
	if(player.bitcoin.gte(getPcReq())){
		format_reset(true);
		player.upgrades=[];
		player.formatPoints=new Decimal(0);
		player.formatUpgrades=[];
		player.pc=getPcBulk().sub(1);
		player.bitcoin=player.bitcoin.sub(getPcReq());
		player.pc=player.pc.add(1);
	}
}

var LENGTH=[5,5,5,50,100,500,1e3,4e3,100,1e16,100,100];

function getLength(a){
	if(a<12 && player.os.gte(25))return 1;
	return LENGTH[a];
}
var tick=Date.now();
var devSpeed=1;
var offlineSpeed=0;

function freeze_game(a){
	player.freeze=a;
}

function adjustSpeed(a){
	offlineSpeed=a;
	player.freeze=0;
}

function update(){
	player.offline+=(tick-player.lastTick)/1000;
	var temp=Date.now();
	var diff=(temp-tick)/1000;
	
	if(player.freeze==1){
		player.offline+=(temp-tick)/1000;
		diff=0;
	}
	
	if(player.freeze==2 && temp-tick>=20){
		player.offline+=(temp-tick-20)/1000;
		diff=0.02;
	}
	
	player.lastTick=tick=temp;
	
	$("#gamespeed").html(format(offlineSpeed+1)+"x");
	if(player.freeze==1)$("#gamespeed").html(zhMode?"已冻结":"Freezed");
	$("#offline1").html(formatTime(player.offline));
	$("#offline2").html(formatTime2(player.offline)+(zhMode?[offlineSpeed?"("+(format(offlineSpeed+1)+"x)"):"","（已冻结）"]:[offlineSpeed?"("+(format(offlineSpeed+1)+"x)"):"","(Freezed)"])[player.freeze ?? 0]);
	
	if(player.freeze!=1&&player.freeze!=2){
		if(!isFinite(offlineSpeed))offlineSpeed=0;
		if(offlineSpeed<=-1){
			player.offline+=diff;player.freeze=1;return;
		}else{
			var offlineCost=diff*offlineSpeed;
			if(offlineCost>player.offline){
				offlineCost=player.offline;
				offlineSpeed=Math.min(offlineSpeed,0);
			}
			player.offline-=offlineCost;
			diff+=offlineCost;
		}
	}
	
	diff*=devSpeed;
	
	player.playTime+=diff;
	player.formatTime+=diff;
	player.infinity.currentTime+=diff;
	
	var gain=dataGain().mul(diff);
	player.data=player.data.add(gain);
	player.totalData=player.totalData.add(gain);
	
	gain=bitcoinGain().mul(diff);
	gain=player.bitcoin.add(2).div(2).pow(2).add(gain).sqrt().mul(2).sub(2).sub(player.bitcoin);
	
	if(hasAchievement(13)){
		player.loaded_files[1]=getLoadedFiles(1).add(fileEffect(8).mul(diff));
	}
	if(player.os.gte(2)){
		player.loaded_files[3]=getLoadedFiles(3).add(fileEffect(10).mul(diff));
	}
	if(player.os.gte(3)){
		player.loaded_files[4]=getLoadedFiles(4).add(fileEffect(11).mul(diff));
	}
	if(player.os.gte(9)){
		player.formatPoints=player.formatPoints.add(formatPointGain().mul(diff));
		player.totalFormatPoints=player.totalFormatPoints.add(formatPointGain().mul(diff));
	}
	
	player.bitcoin=player.bitcoin.add(gain);
	player.totalBitcoin=player.totalBitcoin.add(gain);
	
	if(player.loading>=0){
		player.loaded_files[player.loading]=getLoadedFiles(player.loading).add((getLoaderSpeed()).mul(diff).div(getLength(player.loading)));
	}
	
	for(var i=0;i<=11;i++){
		$("#p"+i).width(getLoadedFiles(i).sub(Decimal.floor(getLoadedFiles(i))).mul(100).toNumber()+"%");
		if(player.loading==i)$("#p"+i+"a").addClass("active");
		else $("#p"+i+"a").removeClass("active");
		if(i==1||i==3||i==4||i==6||i==8||i==10||i==11){
			$("#cnt"+i).html(formatWhole(getLoadedFiles(i).floor()));
			$("#p"+i+"a")[getLoadedFiles(i).gte(4503599627370496)?"addClass":"removeClass"]("super_speed");
		}else{
			$("#p"+i+"a").css("display",getLoadedFiles(i).gte(1)?"none":"");
		}
	}
	
	for(var i=0;i<=3;i++){
		$("#upg"+i).html(formatWhole(getUpgradeLevel(i).floor().add(i==0?1:0).add(getFormatUpgradeLevel(i).floor()).add(getBcUpgradeLevel(i).floor())));
		$("#upg"+i+"c").html((zhMode?"升级（":"Upgrade (")+formatData(getUpgradeCost(i))+(zhMode?"数据）":" Data)"));
		if(i!=0)$("#upg"+i+"e").html(format(getUpgradeEffect(i)));
		$("#format_upg"+i).css("display",hasAchievement(4)?"":"none");
		$("#format_upg"+i).html((zhMode?"升级（":"Upgrade (")+formatWhole(getFormatUpgradeCost(i))+(zhMode?"格式化点数）":" Format Points)"));
	}
	
	for(var i=0;i<=3;i++){
		$("#bcu"+i+"a").html(formatWhole(getBcUpgradeLevel(i)));
		$("#bcu"+i+"b").html(formatWhole(getBcUpgradeLevel(i)));
		$("#bcupg"+i).html((zhMode?"升级（":"Upgrade (")+format(getBcUpgradeCost(i))+(zhMode?"文件点数）":" Bitcoins)"));
	}
	
	$("#speed").html(format(getLoaderSpeed()));
	
	if(player.loading==0 || player.loading==2 || player.loading==5 || player.loading==7 || player.loading==9){
		if(player.loaded_files[player.loading].gte(1)){
			player.loaded_files[player.loading]=new Decimal(1);
			player.loading=-1;
		}
	}
	
	var plIndex=[1,3,4,6,8,10,11];
	for(var i=0;i<player.infinity.passiveLoader;i++){
		player.loaded_files[plIndex[i]]=getLoadedFiles(plIndex[i]).add((getLoaderSpeed()).mul(diff).div(getLength(plIndex[i])).div(12.5).mul(player.infinity.passiveLoader));
	}
	
	if(hasInfinityOneUpgrade(0,1)){
		for(var i=0;i<=3;i++){
			if(player.data.gte(getUpgradeCost(i))){
				var b=getUpgradeBulk(i);
				if(!hasAchievement(29))player.data=player.data.sub(getUpgradeCost(i,b.sub(1)));
				player.upgrades[i]=b;
			}
		}
	}
	
	
	if(hasInfinityOneUpgrade(1,1)){
		for(var i=0;i<=3;i++){
			if(player.formatPoints.gte(getFormatUpgradeCost(i))){
				var b=getFormatUpgradeBulk(i);
				if(!hasAchievement(30))player.formatPoints=player.formatPoints.sub(getFormatUpgradeCost(i,b.sub(1)));
				player.formatUpgrades[i]=b;
			}
		}
	}
	
	if(hasInfinityOneUpgrade(0,2)){
		for(var i=0;i<=3;i++){

			if(player.bitcoin.gte(getBcUpgradeCost(i))){
				var b=getBcUpgradeBulk(i);
				if(!hasAchievement(31))player.bitcoin=player.bitcoin.sub(getBcUpgradeCost(i,b.sub(1)));
				player.bcUpgrades[i]=b;
			}
		}
	}
	
	if(hasInfinityOneUpgrade(1,2)){
		player.formatCount=player.formatCount.add(player.infinity.count.mul(diff));
	}
	
	$("#upgrades_exe").css("display",hasAchievement(0)?"":"none");
	$("#adder_exe").css("display",hasAchievement(1)?"":"none");
	$("#multiplier_exe").css("display",hasAchievement(2)?"":"none");
	$("#format_exe").css("display",hasAchievement(3)?"":"none");
	$("#upgrade1").css("display",hasAchievement(4)?"":"none");
	$("#producer_exe").css("display",hasAchievement(5)?"":"none");
	$("#shop_exe").css("display",hasAchievement(6)?"":"none");
	$("#upgrade2").css("display",hasAchievement(7)?"":"none");
	$("#bcu2").css("display",hasAchievement(8)?"":"none");
	$("#upgrade3").css("display",hasAchievement(11)?"":"none");
	$("#bcu3").css("display",hasAchievement(12)?"":"none");
	$("#file8").css("display",hasAchievement(13)?"":"none");
	$("#file10").css("display",player.os.gte(2)?"":"none");
	$("#file11").css("display",player.os.gte(3)?"":"none");
	$("#os_upgrader_exe").css("display",hasAchievement(21)?"":"none");
	
	$("#adder_effect").css("display",hasAchievement(1)?"":"none");
	$("#multiplier_effect").css("display",hasAchievement(2)?"":"none");
	$("#producer_effect").css("display",hasAchievement(5)?"":"none");
	$("#file8_effect").css("display",hasAchievement(13)?"":"none");
	$("#file10_effect").css("display",player.os.gte(2)?"":"none");
	$("#file11_effect").css("display",player.os.gte(3)?"":"none");
	
	$("#data_generator_effect").html("data_generator.exe: +"+formatData2(dataGain())+(zhMode?" 数据/秒":" Data/s")+"<br>");
	$("#adder_effect").html("adder.exe: +"+formatData2(getLoadedFiles(3).pow(getFilePower()).floor().pow(metaAch1Eff()).mul(1).div(player.os.gte(2)?1:10))+(zhMode?" data_generator.exe的基本数据/秒":" Base Data/s to data_generator.exe")+"<br>");
	$("#multiplier_effect").html("multiplier.exe: *"+format(getLoadedFiles(4).pow(getFilePower()).floor().pow(metaAch1Eff()).mul(1).add(1))+(zhMode?" data_generator.exe的速度":" to data_generator.exe")+"<br>");
	$("#producer_effect").html("producer.exe: +"+format(realBitcoinGain(),4)+(zhMode?" 文件点数/秒（基础：":" Bitcoin/sec (Base:")+format(bitcoinGain(),4)+(zhMode?" 文件点数/秒，基于数据）":" Bitcoin/sec based on data)")+"<br>");
	$("#file8_effect").html("data_generator_loader.exe: "+(zhMode?"每秒加载":"Load data_generator.exe ")+format(fileEffect(8))+(zhMode?"次data_generator.exe（基于数据）":" times per second (based on data)")+"<br>");
	$("#format_reset_link").html((zhMode?"格式化以得到":"Format for ")+formatWhole(formatPointGain())+(zhMode?"格式化点数":" Format Points")+"<br>");
	$("#file10_effect").html("adder_loader.exe: "+(zhMode?"每秒加载":"Load adder.exe ")+format(fileEffect(10))+(zhMode?"次adder.exe（基于数据）":" times per second (based on data)")+"<br>");
	$("#file11_effect").html("multiplier_loader.exe: "+(zhMode?"每秒加载":"Load multiplier.exe ")+format(fileEffect(11))+(zhMode?"次multiplier.exe（基于数据）":" times per second (based on data)")+"<br>");
	
	if(player.formatCount.gte(1)){
		$("#format_stat").css("display","");
		$("#format_stat1").html(formatWhole(player.totalFormatPoints));
		$("#format_stat2").html(formatWhole(player.formatCount));
		$("#format_stat3").html(formatTime(player.bestFormatTime));
		$("#format_stat4").html(formatTime(player.formatTime));
		$("#fp2").html((zhMode?"，":", ")+formatWhole(player.formatPoints)+(zhMode?"格式化点数":" Format Points"));
	}else{
		$("#format_stat").css("display","none");
		$("#fp2").html("");
	}
	
	if(hasAchievement(5)){
		$("#bitcoin_stat").css("display","");
		$("#bitcoin_stat1").html(format(player.totalBitcoin));
		$("#bc2").html((zhMode?"，":", ")+format(player.bitcoin)+(zhMode?"文件点数":" Bitcoins"));
	}else{
		$("#bitcoin_stat").css("display","none");
		$("#bc2").html("");
	}
	
	$("#total_time").html(formatTime(player.playTime));
	$("#total_data").html(formatData(player.totalData));
	$("#data1").html(formatData(player.data));
	$("#data2").html(formatData(player.data));
	$("#data3").html(formatData(player.data));
	$("#fp1").html(formatWhole(player.formatPoints));
	$("#bc1").html(format(player.bitcoin));
	
	$("#pc1").html(formatWhole(player.pc));
	$("#pc2").html(format(getPcBonus()));
	$("#os1").html(getOSName());
	$("#buypc").html((zhMode?"购买新的计算机（":"Buy a new PC (")+format(getPcReq())+(zhMode?"文件点数）":" Bitcoins)"));
	if(player.bitcoin.gte(getPcReq().mul(1.5))){
		$("#buypc").html((zhMode?"购买"+formatWhole(getPcBulk().sub(player.pc))+"台新的计算机（":"Buy "+formatWhole(getPcBulk().sub(player.pc))+" new PCs (")+format(getPcReq().mul(Decimal.pow(1.5,getPcBulk().sub(player.pc).sub(1))))+(zhMode?"文件点数）":" Bitcoins)"));
	}
	$("#osupg").html((zhMode?"升级到":"Upgrade to ")+getNextOSName()+(zhMode?"，需要":", requires ")+formatData(getOSUpgradeCost(getOSUpgradeBulk().sub(1).max(player.os)))+(zhMode?"数据。在":" data. At ")+getNextOSName2()+(zhMode?"，"+getNextOSBonusZH():", "+getNextOSBonus()));
	infinityUpdate();
	
	checkAchievements();
}


function getUpgrade(a){
	if(player.upgrades[a])return player.upgrades[a];
	player.upgrades[a]=new Decimal(0);
	return player.upgrades[a];
}