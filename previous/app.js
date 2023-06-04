const express = require("express")
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
app.use(cors())
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
const fake=[];
app.get("/",(req,res)=>{
    res.send(fake)
})
app.post("/",async (req,res,next)=>{
    if(req.body.giris_bal>0 && req.body.giris_bal<=50 && req.body.final_bal>0 && req.body.final_bal<=50){
        let toplam_bal=Number(req.body.giris_bal)+Number(req.body.final_bal)
        let letter="";
        if(toplam_bal>90){
            letter="A"
        }
        else if(toplam_bal>80){
            letter="B"
        }
        else if(toplam_bal>70){
            letter="C"
        }
        else if(toplam_bal>60){
            letter="D"
        }
        else if(toplam_bal>50){
            letter="E"
        }
        else{
            letter="F"
        }
        await fake.push({"toplam":toplam_bal,"letter":letter})
    }
    else{
        await fake.push({"xeta":"parametrler duzgun daxil edilmedi"})
    }
    res.redirect("http://127.0.0.1:5500/index.html")
})
app.listen(1234,()=>{
    console.log("node js ishe dushdu")
})