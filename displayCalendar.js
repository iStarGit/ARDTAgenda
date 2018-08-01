function displayCalendar()
{
	var htmlContent = "";
	var febNumOfDays = "";
	var counter = 1; //used to keep track of month

	var d = new Date(); 

	var month = d.getMonth(); //returns a number based on month, January is 0, December is 11

	var nextMonth = month++;
	var prevMonth = month--;

	var day = d.getDate(); //returns day (returns 1-31)
	var year = d.getFullYear(); // returns year

	//Determines if Feburary has 28 or 29 days, month = 1 = feburary due to array 
	//Nested if statement to determine if its Feburary, then to determine if it is a leap year
	// Years divisible by 4 are considered leap year, since years usually have 365 days, but revolutions are actually 365.25 days - leap years make up for the error - Use of Gregorian calendar
	// However, years that are divisible by 100 aren't always a leap year even though they are divisible by 4. They need to be divisble by 400, example 1800 isn't a leap year, but is divisible by 4

	febNumOfDays = calculateFebDays(month);
	

	//Arrays for month names, day names, and Total number of days 
	var monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satuday"];
	var dayPerMonth = ["31", ""+febNumOfDays+"", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]

	// days for prev month and next month, and the day of week
	// creating a date object with two arguments specifies year and month
	var nextDate = new Date(nextMonth + ' 1 ,' + year);
	var weekdays = nextDate.getDay(); //.getDay gets the weekday (0-6)
	var weekdays2 = weekdays;
	var numOfDays = dayPerMonth[month]; // pulls from array how many days are in the month


	//leaves whitespace for days of previous month 

	while(weekdays > 0)
	{
		htmlContent += "<td class = 'monthPre'></td>";

		//used in the next loop 
		weekdays--;
	}

	// loop to build the calendar body
	// counter == 1
	while(counter <= numOfDays)
	{
		// when to start a newLine 
		if(weekdays2 > 6) // used to detect when weekdays2 reaches 7, which is after saturday
		{
			weekdays2 = 0
			htmlContent += "</tr><tr>";
		}

		//if counter is the current day, then highlight it
		 if (counter == day)
		 {
        	htmlContent +="<td class='dayNow'  onMouseOver='this.style.background=\"#FF0000\"; this.style.color=\"#FFFFFF\"' "+
        	"onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>"+counter+"</td>";
   		 }
    	else
    	{
        	htmlContent +="<td class='monthNow' onMouseOver='this.style.background=\"#FF0000\"'"+
        	" onMouseOut='this.style.background=\"#FFFFFF\"'>"+counter+"</td>";    
 
    	}

		weekdays2++;
		counter++; 
		//used to keep track of day of the week, and day of the month
	}

	//building calendar html body using table element
	var calendarBody = "<table class = 'calendar'> <tr class='monthNow'><th colspan = '7'>"
	+monthNames[month] + " " + year + "</th></tr>"; 

	calendarBody += "<tr class = 'dayNames'>	<td>Sun</td>	<td>Mon</td>	<td>Tues</td>"+
	"<td>Wed</td>	<td>Thurs</td>	<td>Fri</td>	<td>Sat</td> </tr>";

	calendarBody += "<tr>";
	calendarBody += htmlContent;
	calendarBody += "</tr></table>";

	//set content of div
	document.getElementById("calendar").innerHTML=calendarBody;	


}

function calculateFebDays(month)
{
	if(month == 1)
	{
		// First comparision is TRUE when it isn't a year that is divisible by 100, example 1784, but is divisible by 4, therefore is a leap year.
		// Second comparision is used for whenever it is a year that is divisible by 100, therefore, first side is FALSE, but right side is TRUE - making it a leap year 
		if (((year%100 != 0) && (year%4 == 0)) || (year%400 == 0))
		{
			return 29;
		}

		else
		{
			return 28;
		} 

	}
}



