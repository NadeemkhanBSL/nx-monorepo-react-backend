const { json } = require('body-parser')
const express = require('express')
const cors = require('cors')
var cartlist = "./cartlist.json"
const app = express()
app.use(cors())
app.use(json())
app.use(express.json())
var fs = require("fs")
const { param } = require('express/lib/request')


app.get("/getcarts", (req, res) => {
    fs.readFile(__dirname + "/" + "cartlist.json", "utf8", (err, data) => {
        res.end(data)
    })
})

app.post('/addcart', (req, res) => {
    fs.readFile(cartlist, 'utf8', (err, listdata) => {
        if (err) {
            console.log('file read failed', err)
            return
        }
        var data = JSON.parse(listdata)
        newData = data.concat(req.body)
        fs.writeFile(cartlist, JSON.stringify(newData), (err) => {
            if (err) throw err;
            res.send("data added successfully")
        })
    })
})

app.delete('/delete/:id', (req, res) => {
    // const id = req.params.id;
    // const data = JSON.parse(fs.readFileSync('cartlist.json'));
    // const updatedData = data.filter(item => item.id != id);
    // fs.writeFileSync('cartlist.json', JSON.stringify(updatedData));
    // res.status(204).send();

    const id = req.params.id;
    fs.readFile(cartlist, 'utf8', (err, listdata) => {
        var data = JSON.parse(listdata)
        const idx= data.findIndex((item)=>item.id==id)
        data.splice(idx,1)
        fs.writeFile(cartlist, JSON.stringify(data), (err) => {
            if (err) throw err;
            res.send("data deleted successfully")
        })
    })
})

app.delete('/deleteall', (req, res) => {
    const updatedData = [];
    fs.writeFileSync('cartlist.json', JSON.stringify(updatedData));
    res.status(204).send();
})


app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(4004, () => {
    console.log("connected")
})