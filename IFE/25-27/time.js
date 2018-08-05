function compareDate(year, month, day, hours, minutes, seconds) {
	var birthday = new Date();
	birthday.setFullYear(year, month-1, day);
	birthday.setHours(hours);
	birthday.setMinutes(minutes);
	birthday.setSeconds(seconds);
	birthday.setMilliseconds(0);
	var now = new Date();
	var a = birthday.getTime();
	var b = now.getTime();
	var c = (a - b)/1000;
	day = parseInt(c/86400);
	c=c%86400;
	hours = parseInt(c/3600);
	c=c%3600;
	minutes = parseInt(c/60);
	c=parseInt(c%60);
	return [day,hours,minutes,c];
}
x=compareDate(9182,8,6,18,0,0);
console.log(x);
