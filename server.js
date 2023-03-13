const express = require('express');
const mongoose = require('mongoose')
const Money = require('./models/budget.js')
const MoneySeed = require('./models/money.js')
const methodOverride = require('method-override')
const app = express()

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))

// const MoneySeed=require('./models/budget.js')
 app.use(express.urlencoded({extended: true}))

 app.get('/seed',(req,res)=>{
     MoneySeed.create(Money).then(()=>{
    res.send(Money) 
 })
 })

app.get('/budget/new', (req, res) => {
    res.render('new.ejs');
});


app.get('/budget',(req, res) =>{
    MoneySeed.find({}).then((allMoney)=>{
        res.render('index.ejs', {Money:allMoney} )
    })
} )


app.get('/budget/:id/edit', (req, res) => {
    MoneySeed.findById(req.params.id).then((foundMoney) => {
      res.render('edit.ejs', {
        Money: foundMoney
      })
    })
  })


app.post('/budget', (req, res) => {
    MoneySeed.create(req.body).then((createdMoney) => {
        res.redirect('/budget');
    })
  }) 
                
  app.delete('/budget/:id', (req, res) => {
    MoneySeed.findByIdAndRemove(req.params.id).then(() => {
       res.redirect('/budget')
    })
  })

app.put('/budget/:id', (req, res) => {
  MoneySeed.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(() => {
    res.redirect('/budget')
  })
})
 
  
  

  mongoose.connect('mongodb://localhost:27017/budget').then(() => {
    console.log('conneciton with mongo established')
 })
 

app.listen(3000, ()=> {
    console.log('listening')
})

