var ACHIEVEMENTS=[
	["You gotta start somewhere","Start producing data.","Unlock upgrades.exe","从零开始","开始生产数据。","解锁upgrades.exe"],
	["100 bytes is a lot?","Produce a total of 100B data.","Unlock adder.exe in file_loader.exe","100个字节就算多了？","总计生产100字节数据。","在file_loader.exe里面解锁adder.exe"],
	["10x Speed!","Reach Level 10 File Loader.","Unlock multiplier.exe in file_loader.exe","10倍速度！","将文件加载器升级到10级","在file_loader.exe里面解锁multiplier.exe"],
	["Millionaire","Produce a total of 1MB data.","Unlock format.exe","百万富翁","总计生产1MB数据。","解锁format.exe"],
	["All that data are gone!","Perform a format reset.","Unlock a new upgrade in upgrades.exe","所有的数据都丢失了！","进行一次格式化。","在upgrades.exe里面解锁新的升级"],
	["Unsigned Integer overflow","Produce a total of 4GB data.","Unlock producer.exe in file_loader.exe","无符号整型溢出","总计生产4GB数据。","在file_loader.exe里面解锁producer.exe"],
	["Money Get!","Produce a total of 1 Bitcoin.","Unlock shop.exe","新的点数！","总计生产1文件点数。","解锁shop.exe"],
	["Millionaire II","Produce a total of 1000000 Format Points.","Unlock a new upgrade in upgrades.exe","百万富翁2","总计生产1000000格式化点数。","在upgrades.exe里面解锁新的升级"],
	["100 Bitcoins is a lot","Have 100 Bitcoins at once.","Unlock a new shop upgrade","100文件点数就是很多了","拥有100文件点数","在shop.exe里面解锁新的升级"],
	["Data Apocalypse","Produce a total of 1YB data.","Double Format Points and Bitcoin gain","数据洪流","总计生产1YB数据。","格式化点数和文件点数获取翻倍"],
	["Meta-Achievement","Have 10 Achievements.","adder.exe and multiplier.exe are better based on achievements (max 20)","元-成就","拥有10个成就。","根据成就数量（最大20），adder.exe和multiplier.exe的公式变得更好"],
	["Scientific Notation","Produce a total of 1e30B data.","Unlock a new upgrade in upgrades.exe","科学计数法","总计生产1e30B数据。","在upgrades.exe里面解锁新的升级"],
	["That's FAST!","Reach Level 100 File Loader.","Unlock a new shop upgrade","这很快了！","将文件加载器升级到100级","在shop.exe里面解锁新的升级"],
	["Unsigned Integer overflow II","Load data_generator.exe 4294967296 times.","Unlock data_generator_loader.exe in file_loader.exe","无符号整型溢出2","加载4294967296次data_generator.exe","在file_loader.exe里面解锁data_generator_loader.exe"],
	["1000x harder","Let actual bitcoin gain < 0.1% of base bitcoin gain.","Double Format Points and Bitcoin gain","1000倍压力","使实际文件点数获取<0.1%的基础文件点数获取","格式化点数和文件点数获取翻倍"],
	["100 quindecillion=sqrt(googol)","Produce a total of 1e50B data.","Achievement Bonus boost Data and Bitcoin gain","100极=0.01恒河沙=古戈尔的平方根","总计生产1e50B数据。","成就加成对数据和文件点数生效"],
	["Completely Formatted","Produce a total of 1e20 Format Points.","Achievement Bonus boost Format Points gain and data_generator_loader.exe","完全格式化","总计生产1e20格式化点数。","成就加成对格式化点数和data_generator_loader.exe生效"],
	["A New Beginning","Buy a new PC.","2.5x Format Point gain","新的开始","购买一台新的计算机。","格式化点数获取变为2.5倍"],
	["Small Network","Buy 3 new PCs.","2.5x Bitcoin gain","小型网络","购买三台新的计算机。","文件点数获取变为2.5倍"],
	["One for each day in a week","Buy 7 new PCs.","Data price of 3rd upgrade is cheaper.","一周内每天都有一个","购买7台新的计算机。","使用数据购买第3个升级的价格更便宜"],
	["Meta-Achievement II","Have 20 Achievements.","data_generator_loader.exe and producer.exe are better based on achievements","元-成就 II","拥有20个成就。","根据成就数量，data_generator_loader.exe和producer.exe的公式变得更好"],
	["DecaSpeed","Buy 10 new PCs.","Unlock os_upgrader.exe","十倍速度","购买10台新的计算机。","解锁os_upgrader.exe"],
	["Googol!","Produce a total of 1e100B data.","Divide PC price by 2","古戈尔！","总计生产1e100B数据。","购买计算机的花费除以2。"],
	["Minor Version","Reach OS version 10.1","Achievement Bonus boost adder_loader.exe and multiplier_loader.exe","小版本号","操作系统版本号达到10.1。","成就加成对adder_loader.exe和multiplier_loader.exe生效"],
	["Googol^2","Produce a total of 1e200B data.","adder_loader.exe and multiplier_loader.exe are better based on achievements","古戈尔的平方","总计生产1e200B数据。","根据成就数量，adder_loader.exe和multiplier_loader.exe的公式变得更好"],
	["A Small Group","Buy 35 new PCs.","Reduce data requirement for OS","小团体","购买35台新的计算机。","减少操作系统升级所需数据。"],
	["That's FASTER!","Reach Level 500 File Loader.","Divide PC price by 10","这更快了！","将文件加载器升级到500级","购买计算机的花费除以10。"],
	["Half of a hundred PCs","Buy 50 new PCs.","Reduce data requirement for OS","一百台计算机的一半","购买50台新的计算机。","减少操作系统升级所需数据。"],
]

function init_achievements(){
	var achDiv=document.createElement("div");
	achDiv.id='achievements';
	achDiv.className='window';
	var achDivClose=document.createElement("div");
	achDivClose.className='close';
	achDivClose.innerHTML='X';
	achDivClose.addEventListener('click',function(){hide_window('achievements')});
	achDiv.append(achDivClose);
	document.body.append(achDiv);
	var achDivInner=document.createElement("div");
	achDivInner.className='inner';
	achDiv.append(achDivInner);
	var achSpan=document.createElement("span");
	achSpan.innerHTML="You have <span id=achcount> </span> Achievements, which are boosting File Loader by <span id=achbonus></span>x<hr>";
	if(zhMode)achSpan.innerHTML="你获得了<span id=achcount> </span>个成就，文件加载器的速度变为原来的<span id=achbonus></span>倍。<hr>";
	achDivInner.append(achSpan);
	for(var i in ACHIEVEMENTS){
		achSpan=document.createElement("span");
		achSpan.id="achievement"+i;
		achSpan.innerHTML="["+ACHIEVEMENTS[i][0]+"] "+ACHIEVEMENTS[i][1]+" - Reward: "+ACHIEVEMENTS[i][2]+"<br>";
		if(zhMode)achSpan.innerHTML="["+ACHIEVEMENTS[i][3]+"] "+ACHIEVEMENTS[i][4]+" - 奖励："+ACHIEVEMENTS[i][5]+"<br>";
		achDivInner.append(achSpan);
	}
}

window.addEventListener('load',init_achievements);

function hasAchievement(a){
	return player.achievements.indexOf(a)!=-1;
}

function getAchievement(a){
	if(hasAchievement(a))return;
	var achSpan=document.getElementById('ach');
	achSpan.style.opacity=1;
	achSpan.innerHTML="Achievement Get! ["+ACHIEVEMENTS[a][0]+"], Reward: "+ACHIEVEMENTS[a][2];
	if(zhMode)achSpan.innerHTML="获得成就！ ["+ACHIEVEMENTS[a][3]+"]，奖励："+ACHIEVEMENTS[a][5];
	player.achievements.push(a);
}

function getAchievementBonus(){
	return Decimal.pow(1.1,player.achievements.length);
}

function checkAchievements(){
	var achSpan=document.getElementById('ach');
	achSpan.style.opacity*=0.99;
	
	if(dataGain().gt(0)){
		getAchievement(0);
	}
	if(player.totalData.gte(100)){
		getAchievement(1);
	}
	if(getUpgradeLevel(0).add(getFormatUpgradeLevel(0)).add(getBcUpgradeLevel(0)).gte(9)){
		getAchievement(2);
	}
	if(player.totalData.gte(2**20)){
		getAchievement(3);
	}
	if(player.formatCount>=1){
		getAchievement(4);
	}
	if(player.totalData.gte(2**32)){
		getAchievement(5);
	}
	if(player.totalBitcoin.gte(1)){
		getAchievement(6);
	}
	if(player.totalFormatPoints.gte(1e6)){
		getAchievement(7);
	}
	if(player.bitcoin.gte(100)){
		getAchievement(8);
	}
	if(player.totalData.gte(2**80)){
		getAchievement(9);
	}
	if(player.achievements.length>=10){
		getAchievement(10);
	}
	if(player.totalData.gte(1e30)){
		getAchievement(11);
	}
	if(getUpgradeLevel(0).add(getFormatUpgradeLevel(0)).add(getBcUpgradeLevel(0)).gte(99)){
		getAchievement(12);
	}
	if(getLoadedFiles(1).gte(2**32)){
		getAchievement(13);
	}
	if(realBitcoinGain().mul(1000).lt(bitcoinGain())){
		getAchievement(14);
	}
	if(player.totalData.gte(1e50)){
		getAchievement(15);
	}
	if(player.totalFormatPoints.gte(1e20)){
		getAchievement(16);
	}
	if(player.pc.gte(1)){
		getAchievement(17);
	}
	if(player.pc.gte(3)){
		getAchievement(18);
	}
	if(player.pc.gte(7)){
		getAchievement(19);
	}
	if(player.achievements.length>=20){
		getAchievement(20);
	}
	if(player.pc.gte(10)){
		getAchievement(21);
	}
	if(player.totalData.gte(1e100)){
		getAchievement(22);
	}
	if(player.os.gte(10)){
		getAchievement(23);
	}
	if(player.totalData.gte(1e200)){
		getAchievement(24);
	}
	if(player.pc.gte(35)){
		getAchievement(25);
	}
	if(getUpgradeLevel(0).add(getFormatUpgradeLevel(0)).add(getBcUpgradeLevel(0)).gte(499)){
		getAchievement(26);
	}
	if(player.pc.gte(50)){
		getAchievement(27);
	}
	
	$('#achcount').html(player.achievements.length);
	$('#achbonus').html(format(getAchievementBonus()));
	
	for(var i in player.achievements){
		$("#achievement"+i).addClass('achievementdone');
	}
}