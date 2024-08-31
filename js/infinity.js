function infinityDataGain(){
	if(player.data.lt(Number.MAX_VALUE))return new  Decimal(0);
	return Decimal.pow(10,player.data.add(100).log10().div(308).pow(0.75)).mul(10).sub(100).mul(8).floor().div(8).max(0);
}

var infinityOneUpgrades=[
[
["Infinity Count boost File Loader","无限次数加成文件加载器",1,function(){return format(player.infinity.count.add(1))+"x"}],
["Autobuy Upgrades with data","自动使用数据购买升级",2],
//["Upgrade 3 is cheaper when buying with data","升级3的数据价格变得更便宜",1e308],
//["Unlock a new program","解锁新的程序",1e308],//loader_booster.exe
],

[
["Format Count boost Format Points","格式化次数加成格式化点数",5,function(){return format(player.formatCount.add(1))+"x"}],
["Autobuy Upgrades with format points","自动使用格式化点数购买升级",10],
//["Format Point gain formula is better","格式化点数公式更好"],
//["Gain Format Count per second equals to Infinity Count","每秒得到无限次数的格式化次数"],
//["Unlock Format Challenges","解锁格式化挑战"]
],

[
["Base File Loader Speed ^(1/1.1) but Program Power x1.1","基础文件加载器效果^(1/1.1)但是文件力量1.1倍",4],
["Base File Loader Speed ^(1/1.3) but Program Power x1.3 (Replace upgrade above)","基础文件加载器效果^(1/1.3)但是文件力量1.3倍（覆盖上一个升级）",40],
//["Base File Loader Speed ^(1/1.6) but Program Power x1.6 (Replace upgrade above)","基础文件加载器效果^(1/1.6)但是文件力量1.6倍（覆盖上一个升级）"],
//["Base File Loader Speed ^(1/2.0) but Program Power x2.0 (Replace upgrade above)","基础文件加载器效果^(1/2.0)但是文件力量2.0倍（覆盖上一个升级）"],
],

[
["You start with OS Version 5.0","以5.0版操作系统开始无限",2],
["You start with OS Version 10.0","以10.0版操作系统开始无限",16],
//["You start with OS Version 15.0","以15.0版操作系统开始无限"],
//["You start with OS Version 20.0","以20.0版操作系统开始无限"]
],

];

function buyInfinityOneUpgrade(x,y){
	if(!isFinite(infinityOneUpgrades[x][y][2])){
		return;
	}
	if(x==2){
		if(!confirm(zhMode?"购买此升级会强制格式化重置！确认吗？":"Buying this upgrade will force a format reset! Confirm?"))return;
		format_reset(true);
	}
	if(hasInfinityOneUpgrade(x,y))return;
	if(player.infinity.data.lt(infinityOneUpgrades[x][y][2]))return;
	player.infinity.data=player.infinity.data.sub(infinityOneUpgrades[x][y][2]);
	player.infinity.oneUpgrades.push(y*10+x);
	setupInfinityUpgradesHTML();
	if(x==3){
		if(y==0)player.os=player.os.max(4);
		if(y==1)player.os=player.os.max(9);
		if(y==2)player.os=player.os.max(20);
		if(y==3)player.os=player.os.max(30);
	}
}

function hasInfinityOneUpgrade(x,y){
	x=parseInt(x);y=parseInt(y);
	return player.infinity.oneUpgrades.indexOf(y*10+x)!=-1;
}

function infinity_reset(a){
	if(player.data.gte(Number.MAX_VALUE) || a){
		player.infinity.totalData=player.infinity.totalData.add(infinityDataGain());
		player.infinity.data=player.infinity.data.add(infinityDataGain());
		if(player.data.gte(Number.MAX_VALUE)){
			if(player.infinity.currentTime<player.infinity.bestTime)player.infinity.bestTime=player.infinity.currentTime;
			player.infinity.count=player.infinity.count.add(1);
		}
		format_reset(true);
		player.upgrades=[];
		player.formatPoints=new Decimal(0);
		player.formatUpgrades=[];
		player.formatCount=new Decimal(0);
		player.bitcoin=new Decimal(0);
		player.pc=new Decimal(0);
		player.os=new Decimal(0);
		player.bcUpgrades=[];
		player.loading=-1;
		player.formatTime=0;
		player.bestFormatTime=1e308;
		player.infinity.currentTime=0;
		player.data=new Decimal(0);
		player.loaded_files[1]=new Decimal(0);
		player.loaded_files[3]=new Decimal(0);
		player.loaded_files[4]=new Decimal(0);
		player.loaded_files[6]=new Decimal(0);
		player.loaded_files[8]=new Decimal(0);
		player.loaded_files[10]=new Decimal(0);
		player.loaded_files[11]=new Decimal(0);
		if(hasInfinityOneUpgrade(3,0))player.os=player.os.max(4);
		if(hasInfinityOneUpgrade(3,1))player.os=player.os.max(9);
		if(hasInfinityOneUpgrade(3,2))player.os=player.os.max(20);
		if(hasInfinityOneUpgrade(3,3))player.os=player.os.max(30);
	}
}

function infinityUpdate(){
	$("#id1").html(formatData3(player.infinity.data));
	$("#infinity_reset_link").html((zhMode?"无限重置以得到":"Infinity for ")+formatData3(infinityDataGain())+(zhMode?"无限数据":" Infinity Data")+"<br>");
	
	
	if(player.infinity.count.gte(1)){
		$("#infinity_stat").css("display","");
		$("#infinity_stat1").html(formatData(player.infinity.totalData));
		$("#infinity_stat2").html(formatWhole(player.infinity.count));
		$("#infinity_stat3").html(formatTime(player.infinity.bestTime));
		$("#infinity_stat4").html(formatTime(player.infinity.currentTime));
	}else{
		$("#infinity_stat").css("display","none");
	}
	
	updateInfinityUpgradesHTML();
	updatepassiveLoaderHTML();
}

function setupInfinityUpgradesHTML(){
	var tempHTML="";
	for(var i in infinityOneUpgrades){
		let flag=0;
		for(var j in infinityOneUpgrades[i]){
			tempHTML+=infinityOneUpgrades[i][j][zhMode?1:0]+"<span id=infinityOneUpgradeEffect"+i+j+"></span>";
			if(hasInfinityOneUpgrade(i,j)){
				tempHTML+=(zhMode?"，已购买":", Bought");
			}else{
				tempHTML+=(zhMode?"，<a href=javascript:buyInfinityOneUpgrade("+i+","+j+");>购买（"+formatData(infinityOneUpgrades[i][j][2])+"无限数据）</a>":", <a href=javascript:buyInfinityOneUpgrade("+i+","+j+");>Buy ("+formatData(infinityOneUpgrades[i][j][2])+" Infinity Data)</a>");
				flag=1;
			}
			tempHTML+="<br>";
			if(flag)break;
		}
		tempHTML=tempHTML.slice(0,-4)+"<hr>";
	}
	$('#infinity_upgrades').html(tempHTML);
}

function updateInfinityUpgradesHTML(){
	if(current_subtab!='infinity_upgrades')return;
	for(var i in infinityOneUpgrades){
		let flag=0;
		for(var j in infinityOneUpgrades[i]){
			$("#infinityOneUpgradeEffect"+i+j).html(infinityOneUpgrades[i][j][3]?(zhMode?"，当前：":", Currently: ")+infinityOneUpgrades[i][j][3]():"");
			if(hasInfinityOneUpgrade(i,j)){
				flag=0;
			}else{
				flag=1;
			}
			if(flag)break;
		}
	}
}

function getplUpgradeCost(){
	if(player.infinity.passiveLoader>=5)return Decimal.dInf;
	return Decimal.pow(2,player.infinity.passiveLoader*(player.infinity.passiveLoader+1)/2-3);
}

function updatepassiveLoaderHTML(){
	if(current_subtab!='passive_loader')return;
	$('#passive_loader_level1').html(player.infinity.passiveLoader);
	$('#passive_loader_level2').html(player.infinity.passiveLoader);
	$('#passive_loader_level3').html(player.infinity.passiveLoader*8);
	$("#plupg").html((zhMode?"升级（":"Upgrade (")+formatData(getplUpgradeCost())+(zhMode?"无限数据）":" Infinity Data)"));
}

function plUpgrade(){
	if(player.infinity.data.gte(getplUpgradeCost())){
		player.infinity.data=player.infinity.data.sub(getplUpgradeCost());
		player.infinity.passiveLoader++;
	}
}