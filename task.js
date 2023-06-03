function Setup() {
    let msg =0
    console.log(msg)
    return function(){
        msg+=1
        console.log(msg)
    }
}
let Increment = Setup()
Increment()
Increment()
Increment()