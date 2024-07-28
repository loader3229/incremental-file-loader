var ACHIEVEMENTS=[
	["You gotta start somewhere","Start producing data.","Unlock upgrades.exe","从零开始","开始生产数据。","解锁upgrades.exe"],
	["100 bytes is a lot?","Produce a total of 100B data.","Unlock adder.exe in file_loader.exe","100个字节就算多了？","生产100字节数据。","在file_loader.exe里面解锁adder.exe"]
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

function checkAchievements(){
	var achSpan=document.getElementById('ach');
	achSpan.style.opacity*=0.99;
	
	if(dataGain().gt(0)){
		getAchievement(0);
	}
	if(player.totalData.gte(100)){
		getAchievement(1);
	}
}