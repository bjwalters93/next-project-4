export function getWeekRange() {
  const date = new Date();
  const dayOfMonth = date.getDate();
  let weekday;
  switch (date.getDay()) {
    case 0:
      weekday = 6;
      break;
    case 1:
      weekday = 0;
      break;
    case 2:
      weekday = 1;
      break;
    case 3:
      weekday = 2;
      break;
    case 4:
      weekday = 3;
      break;
    case 5:
      weekday = 4;
      break;
    case 6:
      weekday = 5;
  }
  const diff = dayOfMonth - weekday!;
  const range = <{ start: string; end: string }>{};
  range.start = new Date(date.setDate(diff)).toISOString().slice(0, 10);
  range.end = new Date(date.setDate(date.getDate() + 6))
    .toISOString()
    .slice(0, 10);
  return { range };
}

export function getPrev52Weeks() {
  const currentWeekRange = getWeekRange();
  const weekArr = [];
  const startLoopDate = new Date(currentWeekRange.range.start);
  const endLoopDate = new Date(currentWeekRange.range.end);
  for (let i = 0; i < 52; i++) {
    const weekStartDate = new Date(
      startLoopDate.setDate(startLoopDate.getDate() - 7)
    )
      .toISOString()
      .slice(0, 10);
    const weekEndDate = new Date(endLoopDate.setDate(endLoopDate.getDate() - 7))
      .toISOString()
      .slice(0, 10);
    weekArr.push({ weekStart: weekStartDate, weekEnd: weekEndDate });
  }
  console.log("weekArr:", weekArr);
  return weekArr;
}

// ---Referance below
// https://www.w3resource.com/javascript-exercises/javascript-date-exercise-50.php
// https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08
// --------------------------------------------------------------------------------------------
// The getDate() method returns the day of a date as a number (1-31):

// The getDay() method returns the weekday of a date as a number (0-6).
// In JavaScript, the first day of the week (day 0) is Sunday.
// Some countries in the world consider the first day of the week to be Monday.

// JavaScript counts months from 0 to 11:
// January = 0.
// December = 11.
// 3 numbers specify year, month, and day. In that order:

// function startOfWeek(date) {
//   var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

//   return new Date(date.setDate(diff));
// }

// dt = new Date();

// console.log(startOfWeek(dt).toString());

// let curr = new Date();
// let week = [];

// for (let i = 1; i <= 7; i++) {
//   let first = curr.getDate() - curr.getDay() + i;
//   let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
//   week.push(day);
// }
