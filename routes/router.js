const express = require("express")
const Blog = require("../models/blog")
const route = express.Router()
const service = require("../services/authentication")


route.get('/', (req,res) => {
    Blog.find()
    .then((data) => {
    res.render("home", { title: "Nubs Uenr Bible Studies Blog", Blogs:data })
    })
})
route.get('/login', (req,res) => {
    res.render('login', {title:"Admin Login"})
})

route.post('/login', service.adminLogin)

route.get('/create', (req,res) => {
    res.render("create", { title: "Admin Create Blog" })
})

route.post('/createblog', service.createblog)

route.get('/edit/:id', service.editblogs)

route.get('/delete/:id', service.deleteblogs);

route.post('/update/:id', service.updateblogs);

route.get('/dashboard', service.displaydashboard);

route.get('/blogs/:id', service.displaydetails)

module.exports = route;