const express=require('express')
const PORT=3001
const hbs =require('hbs')
const app = express()
const path =require('path')
const bodyParser=require('body-parser')
const User = require('./models/users')

require('./db/mongoose')
// parse application/json
app.use(bodyParser.json())
//partials
const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)
//handlebars
const viewsPath=path.join(__dirname,`../templates/views`)
app.set('view engine','hbs')
app.set('views',viewsPath)
app.get('/gogaga/post',(req,res)=>{
    res.render('add',{title:"Post details"})
})
app.get('/gogaga/list',async (req,res)=>{
   const users= await User.find({})
   await res.status(200).render('list',{body:JSON.stringify(users),title:'List'})
})
app.post('/gogaga/post',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const users=User.find({})
        
        await res.status(200).send({error:null})
        }
    catch(e)
    {
        res.status(400).send({error:e}) 

    }
    
})
app.listen(PORT,()=>{
    console.log("Server Running")
})
