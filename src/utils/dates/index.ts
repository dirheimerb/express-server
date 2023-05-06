// let prevMonth = 0;
// let currMonth = 0;
// let nextMonth = 0;
// let month = 0;
// let year = 2023;
// let currentMonth = new Date().getMonth();
// let currentYear = new Date().getFullYear();

export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 30).getDate();
}

export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function addMonth(currentMonth: number, currentYear: number): number {
    if (currentMonth === 11) {
        currentYear++;
        currentMonth = 0;
    } else {
        currentMonth++;
    }
    return currentMonth;
}

export function subtractMonth(currentMonth: number, currentYear: number): number {
    if (currentMonth === 0) {
        currentYear--;
        currentMonth = 11;
    } else {
        currentMonth--;
    }
    return currentMonth;
}


export function formatDate(date: Date, format: string): string {
  const pad = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return format
    .replace(/yyyy/g, `${yyyy}`)
    .replace(/MM/g, MM)
    .replace(/dd/g, dd)
    .replace(/hh/g, hh)
    .replace(/mm/g, mm)
    .replace(/ss/g, ss);
}

export function dateDiffInDays(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / msPerDay);
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getFirstDateOfMonth(month: number, year: number): Date {
  return new Date(year, month, 1);
}

export function getLastDateOfMonth(month: number, year: number): Date {
  return new Date(year, month + 1, 0);
}
export function getStartDayOfWeek(month: number, year: number): number {
  const firstDate = getFirstDateOfMonth(month, year);
  return firstDate.getDay();
}

export function getEndDayOfWeek(month: number, year: number): number {
  const lastDate = getLastDateOfMonth(month, year);
  return lastDate.getDay();
}

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function generateMonthGridWithAdjacentMonths(
    month: number,
    year: number
  ): Date[][] {
    const startDayOfWeek = getStartDayOfWeek(month, year);
    const daysInMonth = getDaysInMonth(month, year);
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const grid: Date[][] = [];
    let week: Date[] = [];
    let dayCounter = 1;
    let nextMonthDayCounter = 1;
  
    // Fill the first week with previous month's days until the start day of the month
    for (let i = 0; i < 7; i++) {
      if (i < startDayOfWeek) {
        week.push(
          new Date(prevYear, prevMonth, daysInPrevMonth - startDayOfWeek + i + 1)
        );
      } else {
        week.push(new Date(year, month, dayCounter));
        dayCounter++;
      }
    }
  
    grid.push(week);
  
    // Fill the remaining weeks
    while (
      dayCounter <= daysInMonth ||
      (week.length > 0 && week[week.length - 1]?.getMonth() === month)
    ) {
      week = [];
  
      for (let i = 0; i < 7; i++) {
        if (dayCounter <= daysInMonth) {
          week.push(new Date(year, month, dayCounter));
          dayCounter++;
        } else {
          week.push(new Date(nextYear, nextMonth, nextMonthDayCounter));
          nextMonthDayCounter++;
        }
      }
  
      grid.push(week);
    }
  
    return grid;
  }
  



// function generateMonthGrid(month: number, year: number): Date[][] {
//   const startDayOfWeek = getStartDayOfWeek(month, year);
//   const daysInMonth = getDaysInMonth(month, year);
//   const grid: Date[][] = [];
//   let week: Date[] = [];
//   let dayCounter = 1;

//   // Fill the first week with empty days until the start day of the month
//   for (let i = 0; i < 7; i++) {
//     if (i < startDayOfWeek) {
//       week.push(null);
//     } else {
//       week.push(new Date(year, month, dayCounter));
//       dayCounter++;
//     }
//   }

//   grid.push(week);

//   // Fill the remaining weeks
//   while (dayCounter <= daysInMonth) {
//     week = [];

//     for (let i = 0; i < 7; i++) {
//       if (dayCounter <= daysInMonth) {
//         week.push(new Date(year, month, dayCounter));
//         dayCounter++;
//       } else {
//         week.push(null);
//       }
//     }

//     grid.push(week);
//   }

//   return grid;
// }

// function generateMonthGridWithPreviousMonth(
//   month: number,
//   year: number
// ): Date[][] {
//   const startDayOfWeek = getStartDayOfWeek(month, year);
//   const daysInMonth = getDaysInMonth(month, year);
//   const prevMonth = month === 0 ? 11 : month - 1;
//   const prevYear = month === 0 ? year - 1 : year;
//   const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
//   const grid: Date[][] = [];
//   let week: Date[] = [];
//   let dayCounter = 1;

//   // Fill the first week with previous month's days until the start day of the month
//   for (let i = 0; i < 7; i++) {
//     if (i < startDayOfWeek) {
//       week.push(
//         new Date(prevYear, prevMonth, daysInPrevMonth - startDayOfWeek + i + 1)
//       );
//     } else {
//       week.push(new Date(year, month, dayCounter));
//       dayCounter++;
//     }
//   }

//   grid.push(week);

//   // Fill the remaining weeks
//   while (dayCounter <= daysInMonth) {
//     week = [];

//     for (let i = 0; i < 7; i++) {
//       if (dayCounter <= daysInMonth) {
//         week.push(new Date(year, month, dayCounter));
//         dayCounter++;
//       } else {
//         week.push(null);
//       }
//     }

//     grid.push(week);
//   }

//   return grid;
// }

