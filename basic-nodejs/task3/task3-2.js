const {sahe} = require("./task3-1")
let radius= process.argv.slice(2)[0]*1
console.log(`Yarıçapı ${radius} olan dairenin alanı: ${sahe(radius)} şeklinde olmalıdır.`)