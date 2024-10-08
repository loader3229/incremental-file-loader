
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = new Decimal(1)
        e = e.add(1)
    }
    e = (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function exponentialFormat1(num, precision, mantissa = true) {
    let e = num.log10().floor().sub(1)
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = new Decimal(1)
        e = e.add(1)
    }
    e = (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}


function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    return num.toStringWithDecimalPlaces(precision).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return new Decimal(0)
    return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = 2,) {
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e1000000000")) return "e" + format(decimal.log10(), 3)
    else if (decimal.gte("1e10000000")) return exponentialFormat(decimal, 0, false)
    else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else return regularFormat(decimal, precision)
}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.98) && !decimal.eq(0)) return format(decimal, 2)
    return format(decimal, 0)
}

function formatData(decimal) {
    decimal = new Decimal(decimal)
	if (decimal.gte(1e30))return format(decimal)+"B";
	if (decimal.lt(1))return format(decimal.mul(8),0)+"b";
	if (decimal.lt(1024))return formatWhole(decimal)+"B";
	if (decimal.lt(2**20))return format(decimal.div(1024))+"KB";
	if (decimal.lt(2**30))return format(decimal.div(2**20))+"MB";
	if (decimal.lt(2**40))return format(decimal.div(2**30))+"GB";
	if (decimal.lt(2**50))return format(decimal.div(2**40))+"TB";
	if (decimal.lt(2**60))return format(decimal.div(2**50))+"PB";
	if (decimal.lt(2**70))return format(decimal.div(2**60))+"EB";
	if (decimal.lt(2**80))return format(decimal.div(2**70))+"ZB";
	return format(decimal.div(2**80))+"YB";
}

function formatData2(decimal) {
    decimal = new Decimal(decimal)
	if (decimal.gte(1e30))return format(decimal)+"B";
	if (decimal.lt(1))return format(decimal.mul(8))+"b";
	if (decimal.lt(1024))return format(decimal)+"B";
	if (decimal.lt(2**20))return format(decimal.div(1024))+"KB";
	if (decimal.lt(2**30))return format(decimal.div(2**20))+"MB";
	if (decimal.lt(2**40))return format(decimal.div(2**30))+"GB";
	if (decimal.lt(2**50))return format(decimal.div(2**40))+"TB";
	if (decimal.lt(2**60))return format(decimal.div(2**50))+"PB";
	if (decimal.lt(2**70))return format(decimal.div(2**60))+"EB";
	if (decimal.lt(2**80))return format(decimal.div(2**70))+"ZB";
	return format(decimal.div(2**80))+"YB";
}

function formatData3(decimal) {
    decimal = new Decimal(decimal)
	if (decimal.gte(1e30))return format(decimal)+"B";
	if (decimal.lt(1))return format(decimal.mul(8),0)+"b";
	if (decimal.lt(1024))return format(decimal)+"B";
	if (decimal.lt(2**20))return format(decimal.div(1024))+"KB";
	if (decimal.lt(2**30))return format(decimal.div(2**20))+"MB";
	if (decimal.lt(2**40))return format(decimal.div(2**30))+"GB";
	if (decimal.lt(2**50))return format(decimal.div(2**40))+"TB";
	if (decimal.lt(2**60))return format(decimal.div(2**50))+"PB";
	if (decimal.lt(2**70))return format(decimal.div(2**60))+"EB";
	if (decimal.lt(2**80))return format(decimal.div(2**70))+"ZB";
	return format(decimal.div(2**80))+"YB";
}

function formatTime(s) {
	if(zhMode)return formatTimeZh(s);
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function formatTimeZh(s) {
    if (s < 60) return format(s) + "秒"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "分钟" + format(s % 60) + "秒"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "小时" + formatWhole(Math.floor(s / 60) % 60) + "分钟" + format(s % 60) + "秒"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "天" + formatWhole(Math.floor(s / 3600) % 24) + "小时" + formatWhole(Math.floor(s / 60) % 60) + "分钟" + format(s % 60) + "秒"
    else return formatWhole(Math.floor(s / 31536000)) + "年" + formatWhole(Math.floor(s / 86400) % 365) + "天" + formatWhole(Math.floor(s / 3600) % 24) + "小时" + formatWhole(Math.floor(s / 60) % 60) + "分钟" + format(s % 60) + "秒"
}

function formatTime2(s) {
	var a=function(x){
		if(x<10)return "0"+x;
		else return x;
	}
    return formatWhole(Math.floor(s / 3600)) + ":" + a(Math.floor(s / 60) % 60) + ":" + a(Math.floor(s % 60))
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}
