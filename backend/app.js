const express = require('express')
const {sequelize, User, Ticket} = require('./db')
const bodyParser = require('body-parser')
const { query } = require('express')
const { Target } = require('puppeteer')

const app = express()
const port = 3000
sequelize.sync();


//Allow for parsing JSON.
app.use(bodyParser.json())

//Allowing CROSS access.
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//CATEGORY = USER ROUTES
//create new user.
app.get('/user/register', async(req, res)=>{
    if (req.body.username && req.body.password && req.body.admin){
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            admin: req.body.admin
        })
        res.send({
            message: `Created new user.`
        })
    }else{
        res.send({
            message: `User not created. Sufficient details not provided.`
        })
    }
})
//Return all users.
app.get('/user/all', async(req,res)=>{
    res.send({
        users: await User.findAll()
    })
})


//CATEGORY = TICKET ROUTES
//Create new ticket
app.get('/ticket/create', async(req, res)=>{
    if (req.body.title, req.body.task, req.body.reporter, req.body.assignee, req.body.priority, req.body.progress){
        const newTicket = await Ticket.create({
            title: req.body.title,
            task: req.body.task,
            progress: req.body.progress,
            reporter: req.body.reporter,
            assignee: req.body.assignee,
            priority: req.body.priority
        })
        res.send({
            message: `New ticket created successfully.`
        })
    }else{
        res.send({
            message: `Failed to create ticket. Please try again.`
        })
    }
})
//Return all tickets
app.get('/tickets/all', async(req, res)=>{
    res.send({
        tickets: await Ticket.findAll()
    })
})
//Delete a ticket
app.delete('/ticket/:id', async(req,res)=>{
    if (req.params.id){
        Ticket.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            message: `deleted ticket.`
        })
    }else{
        res.send({
            message: `Ticket not found.`
        })
    }
    
})
//Update ticket
app.patch('/ticket/:id/update', async(req, res)=>{
    if (req.params.id){
        Ticket.update(
            { 
                title: req.body.title,
                task: req.body.task,
                progress: req.body.progress,
                reporter: req.body.reporter,
                assignee: req.body.assignee,
                priority: req.body.priority
            },
            { where: {id: req.params.id} }
        ).then(
            res.send({
                message: `Updated ticket n.${req.params.id}`
            })
        ).catch(err =>{
            res.send({
                message: err
            })
        })
    }else{
        res.send({
            message: `No ticket ID provided.`
        })
    }
})


app.listen(port, ()=>{
    console.log(`App listening at port ${port}. Ctrl + C to terminate.`)
})