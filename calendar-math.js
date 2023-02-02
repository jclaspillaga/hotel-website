//months indexes go from 0 to 11
const monthsDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//add a number of days to a date (date, month, year), return date after that number of days
function addToDate(date, month, year, days) {
    let daysInMonth = month === 1 && year%4 === 0 ? 29 : monthsDays[month]
    if (date+days <= daysInMonth) {
        return {date: date+days, month: month, year: year}
    } else {
        days -= (daysInMonth - date)
        if (month === 11) {
            date = 0
            month = 0
            year++
            return (addToDate(date, month, year, days))
        } else {
            date = 0
            month ++
            return (addToDate(date, month, year, days))
        }
    }
}

//calculate and return the number of days between 2 dates
//is there a way to use recurssion to simplify this function?
function daysBetween(date1, month1, year1, date2, month2, year2) {
    let monthDifference = month2 - month1
    let yearDifference = year2 - year1
    if (monthDifference === 0 && yearDifference === 0) {
        return date2 - date1
    } else if (yearDifference === 0) {
        let days = monthsDays[month1] - date1 + date2
        for (let i=1; i<monthDifference; i++) {
            days += monthsDays[month1+i]
        } return days
    } else {
        let days = monthsDays[month1] - date1 + date2
        for (let i=month1+1; i<12; i++) {
            if (year1%4===0 && i === 1) {
                days += monthsDays[i] + 1
            } else {
                days += monthsDays[i]
            }
        }
        for (let i=0; i<month2; i++) {
            if (year2%4===0 && i === 1) {
                days += monthsDays[i] + 1
            } else {
                days += monthsDays[i]
            }
        }
        for (let i=year1+1; i<year2; i++) {
            i%4 === 0 ? days += 366 : days += 365
        } return days
    }
}

//tests for addToDate
console.log(addToDate(25, 5, 2019, 6), 'expected: [1, 6, 2019]')
console.log(addToDate(25, 5, 2019, 5), 'expected: [30, 5, 2019]')
console.log(addToDate(25, 11, 2019, 8), 'expected: [2, 0, 2020]')
console.log(addToDate(25, 11, 2017, 365), 'expected: [25, 11, 2018]')
console.log(addToDate(25, 1, 2020, 10), 'expected: [6, 2, 2020]')
console.log(addToDate(25, 1, 2020, 365), 'expected: [24, 1, 2021]')

//tests for daysBetween
console.log(daysBetween(15, 3, 1995, 21, 3, 1995), 'expected: 6')
console.log(daysBetween(15, 3, 1995, 21, 4, 1995), 'expected: 36')
console.log(daysBetween(15, 3, 1995, 21, 5, 1996), 'expected: 433')
console.log(daysBetween(15, 3, 2009, 21, 5, 2011), 'expected: 797')
console.log(daysBetween(15, 3, 2011, 21, 5, 2013), 'expected: 798')
console.log(daysBetween(15, 3, 1994, 21, 5, 1996), 'expected: 798')
