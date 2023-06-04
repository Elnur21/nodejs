let d1 = new Date();
let d2 = new Date(2023, 06, 1);
let difference = d2-d1
let days = Math.floor(difference/1000/60/60/24)
let hours = Math.floor((difference/1000/60/60/24 - days)*24)
let minutes = Math.floor(((difference/1000/60/60/24 -days)*24-hours)*60)
let seconds = Math.floor((((difference/1000/60/60/24 -days)*24-hours)*60-minutes)*60)
let milli_seconds = Math.floor(((((difference/1000/60/60/24 -days)*24-hours)*60-minutes)*60-seconds)*1000)


console.log(d1);
console.log(d2);
console.log(days)
console.log(hours)
console.log(minutes)
console.log(seconds)
console.log(milli_seconds)
