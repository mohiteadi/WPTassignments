const express=require('express');
const app=express();


const mysql=require('mysql2');
app.use(express.static('sf'));


app.get("/pininfo",(req,res)=>{

    console.log('ajax function called');
    const dbobject={
        host:"localhost",
        user:"root",
        password:"cdac",
        database:"pleasework",
        port:3306
    }
    const con=mysql.createConnection(dbobject);
    

    let output={status:false,detail:{pin:0,city:""}}

    let pin=req.query.pin;
    console.log(pin);

    con.query("select pin,city from location where pin= ?",[pin],
    (error,row)=>{
        if(error)
        {
            console.log(error);
          }
        else
        {
            if(row.length>0)
            {
                output.status=true;
                output.detail=row[0]
            }
        }
        res.send(output);
    })

})

app.get("/update",(req,res)=>{
    console.log('update ajx called');
    const dbobject={
        host:"localhost",
        user:"root",
        password:"cdac",
        database:"pleasework",
        port:3306
    }
    const conn=mysql.createConnection(dbobject);
    let output={status:false}
    let pin=req.query.pin;
    let city=req.query.city;

    conn.query("update location set pin=?,city=? where pin=?",[pin,city,pin],
    (err,resp)=>{
        if(err)
        console.log(err)
        else
        {
            if(resp.affectedRows>0)
            output.status=true;
            else
            console.log("not updated");
        }
        res.send(output);
    })


})
app.listen(400 ,function(){
    console.log("listening to port 400");
})