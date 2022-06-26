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
app.get("/additem",(req,res)=>{
    console.log("ajax for add item in data base");
    let itemno=req.query.itemno;
    let itename=req.query.itemname
    let price=req.query.price
    let category=req.query.category
    console.log(price,category);
    output={status:false};
    con.query("insert into item values(?,?,?,?)",[itemno,itename,price,category],
    (err,resp)=>{
        if(err)
        console.log(err)
        else
        {
            if(resp.affectedRows>0)
            output.status=true;
            else
            {
                console.log("affected rows are 0")
            }

        }
        res.send(output);
    })
})///logic for adding item end here


app.get("/updateitem",(req,res)=>{
    console.log("ajax for update item in data base");
    let itemno=req.query.itemno;
    let price=req.query.price
    let category=req.query.category
    //console.log(price,category);
    output={status:false};
    con.query("update item set price=?,category=? where  itemno=?;",[price,category,itemno],
    (err,resp)=>{
        if(err)
        console.log(err)
        else
        {
            if(resp.affectedRows>0)
            output.status=true;
            else
            {
                console.log("affected rows are 0")
            }

        }
        res.send(output);
    })
})//updae ends here




app.get("/getinfo",(req,res)=>{
    console.log("ajax for get info");
    let itemno=req.query.itemno;
    //console.log(price,category);
    output={status:false,info:{itemno:0,name:"",price:0,category:""}};
    con.query("select itemno,name,price,category from item where itemno=?;",[itemno],
    (err,rows)=>{
        if(err)
        console.log(err)
        else
        {
            if(rows.length>0){
            output.status=true;

            output.info=rows[0];
        }
            else
            {
                console.log("affected rows are 0")
            }

        }
        res.send(output);
    })
})//get info ends







app.get("/catinfo",(req,res)=>{
    console.log("ajax multiselect called");
    let category=req.query.category;
    console.log(category);
    output={status:false,info:[]};
    con.query("select itemno,name,price,category from item where category=?;",[category],
    (err,rows)=>{
        if(err)
        console.log(err)
        else
        {
            if(rows.length>0){
            output.status=true;

            output.info=rows;
        }
            else
            {
                console.log("affected rows are 0")
            }

        }
        res.send(output);
    })
})













app.listen(200,()=>{
    console.log("listening to port 200");
})