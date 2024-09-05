function getOSName(x){
	if(x===undefined)x=player.os;
	x=new Decimal(x);
	if(x.gte(59))return "Loadux "+formatWhole(x.add(91).div(5).floor())+"."+formatWhole(x.add(1).toNumber() % 5);
	if(x.gte(29))return "Loadux "+formatWhole(x.add(31).div(3).floor())+"."+formatWhole(x.add(1).toNumber() % 3);
	if(x.gte(9))return "Loadux "+formatWhole(x.add(11).div(2).floor())+"."+formatWhole(x.add(1).toNumber() % 2);
	return "Loadux "+formatWhole(x.add(1))+".0";
}

function getNextOSName(){
	return getOSName(getOSUpgradeBulk().max(player.os.add(1)));
}

function getNextOSName2(){
	if(player.os.gte(59))return "Loadux "+formatWhole(player.os.add(101).div(10).floor().mul(2))+".0";
	if(player.os.gte(29))return "Loadux "+formatWhole(player.os.add(37).div(6).floor().mul(2))+".0";
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
	if(player.os.lt(29))return "Unlock Infinity";
	if(player.os.lt(35))return "Divide PC price by 10";
	if(player.os.lt(41))return "Boost Bitcoin gain based on your OS.";
	if(player.os.lt(47))return "Data cost of Upgrade 3 is cheaper";
	if(player.os.lt(53))return "Divide PC price by 10";
	if(player.os.lt(59))return "CPU is cheaper";
	if(player.os.lt(69))return "RAM is cheaper";
	if(player.os.lt(79))return "Hard Disk is cheaper";
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
	if(player.os.lt(29))return "解锁无限";
	if(player.os.lt(35))return "购买计算机的花费除以10。";
	if(player.os.lt(41))return "基于操作系统加成文件点数";
	if(player.os.lt(47))return "使用数据购买第3个升级的价格更便宜";
	if(player.os.lt(53))return "购买计算机的花费除以10。";
	if(player.os.lt(59))return "CPU更便宜";
	if(player.os.lt(69))return "内存更便宜";
	if(player.os.lt(79))return "硬盘更便宜";
	return "暂无更多加成";
}

function getOSUpgradeCost(x){
	if(x===undefined)x=player.os;
	x=new Decimal(x);
	if(x.gte(88))return Decimal.dInf;
	return Decimal.pow(10,x.add(hasAchievement(27)?12:hasAchievement(25)?13.5:15).pow(1.25).mul(3));
}

function getOSUpgradeBulk(){
	if(hasInfinityOneUpgrade(3,1)){
		return player.data.max(0.1).log(10).div(3).pow(1/1.25).sub(hasAchievement(27)?12:hasAchievement(25)?13.5:15).add(1).floor().max(0).min(88);
	}
	return player.os.add(1).min(88);
}

function osupg(){
	if(player.data.gte(getOSUpgradeCost())){
		player.os=player.os.max(getOSUpgradeBulk());
		format_reset(true);
	}
}

function getOSFlatBonus(){
	if(player.os.lt(8))return 1;
	if(player.os.gte(21))return player.os.add(1).pow(2);
	return player.os.add(1);
}

function getOSFlatBonus2(){
	if(player.os.lt(41))return 1;
	return player.os.add(5).log(5).pow(2);
}