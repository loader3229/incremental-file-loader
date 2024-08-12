function getOSName(){
	if(player.os.gte(9))return "Loadux "+formatWhole(player.os.add(11).div(2).floor())+"."+formatWhole(player.os.add(1).toNumber() % 2);
	return "Loadux "+formatWhole(player.os.add(1))+".0";
}

function getNextOSName(){
	if(player.os.gte(9))return "Loadux "+formatWhole(player.os.add(12).div(2).floor())+"."+formatWhole(player.os.toNumber() % 2);
	return "Loadux "+formatWhole(player.os.add(2))+".0";
}

function getNextOSName2(){
	if(player.os.gte(9))return "Loadux "+formatWhole(player.os.add(13).div(2).floor())+".0";
	return "Loadux "+formatWhole(player.os.add(2))+".0";
}

function getNextOSBonus(){
	if(player.os.lt(1))return "Bought PC's effect ^1.5";
	if(player.os.lt(2))return "Unlock adder_loader.exe, base effect of data_generator.exe and adder.exe are 1B";
	if(player.os.lt(3))return "Unlock multiplier_loader.exe";
	if(player.os.lt(4))return "Bought PC's effect boost data_generator_loader.exe";
	if(player.os.lt(5))return "Bought PC's effect ^1.3333";
	if(player.os.lt(6))return "Bought PC's effect boost adder_loader.exe and multiplier_loader.exe";
	if(player.os.lt(7))return "Bought PC's effect boost Format Points";
	if(player.os.lt(8))return "Boost File Loader and data gain based on your OS.";
	if(player.os.lt(9))return "Gain 100% of Format Point gain per second.";
	if(player.os.lt(11))return "Bought PC's effect ^1.3333";
	if(player.os.lt(13))return "Boost data_generator_loader.exe, adder_loader.exe and multiplier_loader.exe based on your OS.";
	if(player.os.lt(15))return "Format Point cost of Upgrades 3-4 are cheaper";
	if(player.os.lt(17))return "Data cost of Upgrades 2-4 are cheaper";
	if(player.os.lt(19))return "Format Point gain is better";
	if(player.os.lt(21))return "OS boost is better";
	if(player.os.lt(23))return "Divide PC price by 10";
	if(player.os.lt(25))return "Reduce file loading time before Infinity layer.";
	if(player.os.lt(27))return "Format Point cost of Upgrade 2 is cheaper";
	if(player.os.lt(29))return "Unlock Infinity (TBD)";
	return "No new bonuses";
}

function getNextOSBonusZH(){
	if(player.os.lt(1))return "购买的计算机效果变为原来的1.5次方。";
	if(player.os.lt(2))return "解锁adder_loader.exe, data_generator.exe和adder.exe的基础效果为1B";
	if(player.os.lt(3))return "解锁multiplier_loader.exe";
	if(player.os.lt(4))return "购买的计算机效果加成data_generator_loader.exe";
	if(player.os.lt(5))return "购买的计算机效果变为原来的1.3333次方。";
	if(player.os.lt(6))return "购买的计算机效果加成adder_loader.exe和multiplier_loader.exe";
	if(player.os.lt(7))return "购买的计算机效果加成格式化点数";
	if(player.os.lt(8))return "基于操作系统加成文件加载器和数据";
	if(player.os.lt(9))return "每秒获得格式化可以得到的格式化点数的100%。";
	if(player.os.lt(11))return "购买的计算机效果变为原来的1.3333次方。";
	if(player.os.lt(13))return "基于操作系统加成data_generator_loader.exe，adder_loader.exe和multiplier_loader.exe";
	if(player.os.lt(15))return "使用格式化点数购买第3-4个升级的价格更便宜";
	if(player.os.lt(17))return "使用数据购买第2-4个升级的价格更便宜";
	if(player.os.lt(19))return "格式化点数的获取变得更好";
	if(player.os.lt(21))return "操作系统加成变得更好。";
	if(player.os.lt(23))return "购买计算机的花费除以10。";
	if(player.os.lt(25))return "减少无限层级之前的文件加载时间。";
	if(player.os.lt(27))return "使用格式化点数购买第2个升级的价格更便宜";
	if(player.os.lt(29))return "解锁无限（暂未开放）";
	return "暂无更多加成";
}

function getOSUpgradeCost(){
	if(player.os.gte(29))return Decimal.dInf;
	return Decimal.pow(10,player.os.add(hasAchievement(27)?12:hasAchievement(25)?13.5:15).pow(1.25).mul(3));
}

function osupg(){
	if(player.data.gte(getOSUpgradeCost())){
		format_reset(true);
		player.os=player.os.add(1);
	}
}

function getOSFlatBonus(){
	if(player.os.lt(8))return 1;
	if(player.os.gte(21))return player.os.add(1).pow(2);
	return player.os.add(1);
}