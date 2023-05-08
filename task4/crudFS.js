let fs = require("fs")
fs.writeFile("crud.json",'{"name": "Employee 1 Name", "salary": 2000}',(err)=>{
    if(err) console.log(err)
})
let dat={};
fs.readFile("crud.json","utf-8",async(err,data)=>{
    if(err) console.log(err)
    dat=await JSON.parse(data);
    console.log(dat)
})
fs.appendFile("crud.json",',{"name": "Employee 2 Name", "salary": 200}',(err)=>{
    if(err) console.log(err)
})
fs.readFile("crud.json","utf-8",async(err,data)=>{
    if(err) console.log(err)
    // dat=await JSON.parse(data);
    console.log(data)
})