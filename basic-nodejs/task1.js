let radius= process.argv.slice(2)[0]*1
function sahe(r) {
    return (3.14*r*r)
}
console.log(`Yarıçapı ${radius} olan dairenin alanı: ${sahe(radius)} şeklinde olmalıdır.`)