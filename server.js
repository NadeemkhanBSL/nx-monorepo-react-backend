const {json} =require('body-parser')
const express=require('express')
const cors=require('cors')
var cartlist="./cartlist.json"
const app=express()
app.use(cors())
app.use(json())
app.use(express.json())
var fs=require("fs")
const { param } = require('express/lib/request')


app.get("/getcarts",(req,res)=>{
    fs.readFile(__dirname+"/"+"cartlist.json","utf8",(err,data)=>{
        res.end(data)
    })
})

app.post('/addcart',(req,res)=>{
    fs.readFile(cartlist,'utf8',(err,listdata)=>{
        if(err){
            console.log('file read failed',err)
            return
        }
        var data=JSON.parse(listdata)
        newData=data.concat(req.body)
        fs.writeFile(cartlist,JSON.stringify(newData),(err)=>{
            if(err) throw err;
            res.send("data added successfully")
        })
    })
})

app.delete('/delete/:id',(req,res)=>{
    // fs.readFile(cartlist,"utf8",(err,data)=>{
    //     if(err){
    //         console.log(err)
    //         return
    //     }
    //     console.log(req.params.id)
    //      var   data1=JSON.parse(data)
    //     console.log(data1.find((item)=>item.id==req.params.id))
    // })
    const id = req.params.id;

    // load the JSON file and parse it into a JavaScript object
    const data = JSON.parse(fs.readFileSync('cartlist.json'));
  console.log(id)
    const updatedData = data.filter(item => item.id != id);
console.log("updatedData",updatedData)
  // write the updated JSON data back to the file
  fs.writeFileSync('cartlist.json', JSON.stringify(updatedData));

  res.status(204).send();
})

// app.delete('/delete/:id', function(req, res) {
//     var indexOfCouseInJson = cartlist.map(function(item) { return item.id; }).indexOf(req.params.id); //find the index of :id
//       if(indexOfCouseInJson === -1) {
//         res.statusCode = 404;
//         return res.send('Error 404: No quote found');
//       }
    
//       var result = json.splice(indexOfCouseInJson,1);
//       fs.writeFile(cartlist, JSON.stringify(result), function(err){
//        if(err) throw err;
//        res.json(true);
//      });
    
//     });

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(4004,()=>{
    console.log("connected")
})