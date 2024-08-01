var ACHIEVEMENTS=[
	["You gotta start somewhere","Start producing data.","Unlock upgrades.exe","从零开始","开始生产数据。","解锁upgrades.exe"],
	["100 bytes is a lot?","Produce a total of 100B data.","Unlock adder.exe in file_loader.exe","100个字节就算多了？","总计生产100字节数据。","在file_loader.exe里面解锁adder.exe"],
	["10x Speed!","Reach Level 10 File Loader.","Unlock multiplier.exe in file_loader.exe","10倍速度！","将文件加载器升级到10级","在file_loader.exe里面解锁multiplier.exe"],
	["Millionaire","Produce a total of 1MB data.","Unlock format.exe","百万富翁","总计生产1MB数据。","解锁format.exe"],
	["All that data are gone!","Perform a format reset.","Unlock a new upgrade in upgrades.exe","所有的数据都丢失了！","进行一次格式化。","在upgrades.exe里面解锁新的升级"],
	["Unsigned Integer overflow","Produce a total of 4GB data.","Unlock producer.exe in file_loader.exe","无符号整型溢出","总计生产4GB数据。","在file_loader.exe里面解锁producer.exe"],
	["Money Get!","Produce a total of 1 Bitcoin.","Unlock shop.exe","新的点数！","总计生产1文件点数。","解锁shop.exe"]
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
	if(getUpgradeLevel(0).gte(9)){
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
	
	$('#achcount').html(player.achievements.length);
	$('#achbonus').html(format(getAchievementBonus()));
	
	for(var i in player.achievements){
		$("#achievement"+i).addClass('achievementdone');
	}
}