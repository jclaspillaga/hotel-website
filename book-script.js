//calendar math functions and constants
const monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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

//date related constants
//date for testing, paste inside Date brackets: '1995-11-30T03:24:00'
const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth()
const currentDay = date.getDay()
const currentDate = date.getDate()

let lengthOfStay = 1

//html elements
const selectIn = document.getElementById('month-in')
const selectOut = document.getElementById('month-out')
const calendarIn = document.getElementById('days-in')
const calendarOut = document.getElementById('days-out')
const defaultImage = document.getElementById('default')
const summer = document.getElementById('summer')
const fall = document.getElementById('fall')
const winter = document.getElementById('winter')
const spring = document.getElementById('spring')

document.querySelectorAll('.month-year').forEach(select => {
    for (let i=0; i<12; i++) {
        let newOption = document.createElement('option')
        newOption.innerText = `${monthsNames[(currentMonth+i)%12]} ${(currentMonth+i)%12<currentMonth ? currentYear+1 : currentYear}`
        newOption.value = `${(currentMonth+i)%12} ${(currentMonth+i)%12<currentMonth ? currentYear+1 : currentYear}`
        select.appendChild(newOption)
        }
    }
)

//this functions changes the check out date based on changes in check in
function setCheckOutMonth(dayIn) {
    document.querySelectorAll('option').forEach(option => option.disabled = false)
    let [monthIn, yearIn] = selectIn.value.split(' ').map(value => parseInt(value))
    let dateOut = addToDate(dayIn, monthIn, yearIn, lengthOfStay)
    selectOut.value = `${dateOut.month} ${dateOut.year}`
    let indexOfMonthOut = selectOut.selectedIndex
    for (let i=0; i<indexOfMonthOut; i++) {
        selectOut[i].disabled = true
    } 
}

function nextMonth(select) {
    let nextIndex = select.selectedIndex + 1
    let change = new Event('change')
    if(!select[nextIndex]) {
        return
    }
    select.value = select[nextIndex].value
    select.dispatchEvent(change)
}

function prevMonth(select) {
    let prevIndex = select.selectedIndex - 1
    let change = new Event('change')
    if(!select[prevIndex] || select[prevIndex].disabled) {
        return
    }
    select.value = select[prevIndex].value
    select.dispatchEvent(change)
}

setCheckOutMonth(currentDate)

function createDays(select, calendar, inOrOut, selectedDate = 1) {
    while (calendar.firstChild) {
        calendar.removeChild(calendar.firstChild)
    }
    let [selectedMonth, selectedYear] = select.value.split(' ').map(value => parseInt(value))
    let previousMonth = selectedMonth-1
    let daysInSelectedMonth = selectedMonth === 1 && selectedYear%4 === 0 ? 29 : monthsDays[selectedMonth]
    let daysInPreviousMonth = previousMonth === 1 && selectedYear%4 === 0 ? 29 : monthsDays[previousMonth]
    let firstDayOfSelectedMonth = new Date(selectedYear, selectedMonth).getDay()

    if (selectedMonth === currentMonth && inOrOut === 'In') {
        selectedDate = currentDate
    } else if (selectOut.value != selectIn.value) {
        selectedDate = 1
    }

    for (let i=firstDayOfSelectedMonth; i>0; i--) {
        let day = document.createElement('p')
        day.className = 'day shaded prev'
        day.innerText = daysInPreviousMonth - i + 1
        calendar.appendChild(day)
    }

    for (let i=1; i<daysInSelectedMonth+1; i++) {
        let day = document.createElement('p')
        day.className = `day ${inOrOut} ${inOrOut}-${i}`
        day.innerText = i
        if (i < selectedDate) {
            day.className = 'day shaded'
        }
        calendar.appendChild(day)
    }

    for (let i=1; i<43-daysInSelectedMonth-firstDayOfSelectedMonth; i++) {
        let day = document.createElement('p')
        day.className = 'day shaded next'
        day.innerText = i
        calendar.appendChild(day)
    }
}

function setSelectedDayOut(event) {
    if (document.querySelector('.check-out')) {
        document.querySelector('.check-out').classList.remove('check-out')
    }
    if (document.querySelector('.selected-day')){
        document.querySelectorAll('.selected-day').forEach(node => node.classList.remove('selected-day'))
    }
    let dayOut = parseInt(event.target.innerText)
    let dayIn = parseInt(document.querySelector('.check-in').innerText)
    let [monthIn, yearIn] = selectIn.value.split(' ').map(value => parseInt(value))
    let [monthOut, yearOut] = selectOut.value.split(' ').map(value => parseInt(value))
    event.target.classList.add('check-out')
    
    let newLengthOfStay = daysBetween(dayIn, monthIn, yearIn, dayOut, monthOut, yearOut)
    lengthOfStay = newLengthOfStay
}

function setSelectedDayIn(event) {
    let [monthIn, yearIn] = selectIn.value.split(' ').map(value => parseInt(value))
    if (document.querySelector('.check-in')) {
        document.querySelector('.check-in').classList.remove('check-in')
    }
    if (document.querySelector('.selected-day')){
        document.querySelectorAll('.selected-day').forEach(node => node.classList.remove('selected-day'))
    }
    event.target.classList.add('check-in')
    let dayIn = parseInt(document.querySelector('.check-in').innerText)
    let dayOut = addToDate(dayIn, monthIn, yearIn, lengthOfStay).date
    setCheckOutMonth(dayIn)
    createDays(selectOut, calendarOut, 'Out', addToDate(dayIn, monthIn, yearIn, 1).date)
    if (document.querySelector(`.Out-${dayOut}`)) {
        document.querySelector(`.Out-${dayOut}`).classList.add('check-out')
    } else {
        //document.querySelector(`.Out-${}`).classList.add('check-out')
    }
    document.querySelectorAll('.Out').forEach(node => node.addEventListener('click', setSelectedDayOut))
}

const createDaysIn = () => createDays(selectIn, calendarIn, 'In')
createDaysIn()
document.querySelector(`.In-${currentDate}`).classList.add('check-in')

const createDaysOut = () => {
    let [monthIn, yearIn] = selectIn.value.split(' ').map(value => parseInt(value))
    let dayIn = parseInt(document.querySelector('.check-in').innerText)
    createDays(selectOut, calendarOut, 'Out', addToDate(dayIn, monthIn, yearIn, 1).date)
}
createDaysOut()
document.querySelector(`.Out-${addToDate(currentDate, currentMonth, currentYear, lengthOfStay).date}`).classList.add('check-out')

function setDefaultIn() {
    let monthIn = parseInt(selectIn.value.split(' ')[0])
    if (monthIn === currentMonth) {
        document.querySelector(`.In-${currentDate}`).classList.add('check-in')
    } else {
        document.querySelector(`.In-1`).classList.add('check-in')
    }
}

function setDefaultOut() {
    let [monthIn, yearIn] = selectIn.value.split(' ').map(value => parseInt(value))
    if (monthIn === currentMonth) {
        document.querySelector(`.Out-${addToDate(currentDate, currentMonth, currentYear, lengthOfStay).date}`).classList.add('check-out')
    } else {
        document.querySelector(`.Out-${addToDate(1, monthIn, yearIn, lengthOfStay).date}`).classList.add('check-out')
    }
}

function changeDaysOut() {
    let day = parseInt(selectIn.value.split(' ')[0]) === currentMonth ? currentDate : 1
    setCheckOutMonth(day)
    createDaysOut()
}

//add setSelectedDayIn only to days in the In calendar
function addSetDayIn() {
    document.querySelectorAll('.In').forEach(day => day.addEventListener('click', setSelectedDayIn))
}
function addSetDayOut() {
    document.querySelectorAll('.Out').forEach(node => node.addEventListener('click', setSelectedDayOut))
}

function setActiveImage() {
    document.querySelector('.active').classList.remove('active')
    let month = parseInt(selectIn.value.split(' ')[0])
    switch (month) {
        case 11:
        case 0:
        case 1:
            winter.classList.add('active')
            break
        case 2:
        case 3:
        case 4:        
            spring.classList.add('active')
            break    
        case 5:
        case 6:
        case 7:        
            summer.classList.add('active')
            break 
        case 8:
        case 9:
        case 10:        
            fall.classList.add('active')
            break 
        default:
            break
    }
    console.log(month)
}

addSetDayIn()
addSetDayOut()
setActiveImage()
selectIn.addEventListener('change', createDaysIn)
selectIn.addEventListener('change', addSetDayIn)
selectIn.addEventListener('change', setDefaultIn)
selectIn.addEventListener('change', changeDaysOut)
selectIn.addEventListener('change', setDefaultOut)
selectIn.addEventListener('change', addSetDayOut)
selectIn.addEventListener('change', setActiveImage)
selectOut.addEventListener('change', createDaysOut)
selectOut.addEventListener('change', addSetDayOut)






