function getOSName(){
	return "Loadux "+formatWhole(player.os.add(1))+".0";
}

function getNextOSName(){
	return "Loadux "+formatWhole(player.os.add(2))+".0";
}

function getNextOSName2(){
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
	return "暂无更多加成";
}

function getOSUpgradeCost(){
	if(player.os.gte(9))return Decimal.dInf;
	return Decimal.pow(10,player.os.add(15).pow(1.25).mul(3));
}

function osupg(){
	if(player.data.gte(getOSUpgradeCost())){
		format_reset(true);
		player.os=player.os.add(1);
	}
}

function getOSFlatBonus(){
	if(player.os.lt(8))return 1;
	return player.os.add(1);
}