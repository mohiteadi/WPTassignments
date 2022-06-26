let express =require('express');

let app=express();

const mysql=require("mysql2");
const { createConnection } = require('net');

app.use(express.static('sf'));;

const dbparams={
    host:"localhost",
    user:"root",
    password:"cdac",
    database:"exam",
    port:3306
}

const con=mysql.createConnection(dbparams);

app.get("/getaccinfo",(req,res)=>{
    console.log("get accoumnt indfo gets called");

    let accno=req.query.accno;
    let output={status:false,info:{accno:0,balance:0}}
    con.query("select balance from bank where accno=?",[accno],
(err,rows)=>{
    if(err)
    console.log(err)
    else
    {
        if(rows.length>0)
        {
            output.status=true;
            output.info=rows[0];
        }
        res.send(output);
    }
})
})


app.get("/addacc",(req,res)=>{

      let output={status:false}
      let accno=req.query.accno
      let bal=req.query.balance

    con.query("insert into bank values(?,?)",[accno,bal],
    (err,resp)=>{
        if(err)
        console.log(err)
        else
        {
            if(resp.affectedRows>0)
            output.status=true;
            else
            console.log("not added");
        }
        res.send(output);

    })
})

app.listen(300,()=>{
    console.log("listening to port 300");
})
