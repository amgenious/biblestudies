const Login = require("../models/login")
const Blog = require("../models/blog")

exports.adminSignup =async(req, res)=>{
    const login = new Login({
           username: 'SuperUser',
            password: 'Empowered4Act',
    })
      login.save()
            .then((result) => {
                res.send(result)
            })
           .catch((err) => {
                console.log(err)
            })
}
exports.adminLogin = async (req,res) => {
  try{
   const check = await Login.findOne({username:req.body.username,password:req.body.password})

   if(check.password === req.body.password){
    res.redirect("/dashboard");
   }
   else{
       res.send("wrong password")
   }
  }
  catch{
       res.send("Wrong Credentials")
  }   
}

exports.createblog = async (req,res) => {
    const blog = new Blog(req.body);

      blog
        .save()
        .then((result) => {
          res.redirect("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
}

exports.editblogs = async (req,res) => {
    const id = req.params.id;
    Blog.findById(id,req.body, {new: true})
     .then(data => {
        if(!data){
            console.log("cannot edit")
        }else{
            res.render('edit', {title:'Admin Update Blog', Blogs: data})
        }
     })
}


exports.updateblogs = async (req,res) => {
    const id = req.params.id;
    Blog.findOneAndUpdate(id,req.body)
    .then(data => {
        if(!data){
            res.status(404).console.log("cannot update")
        }else{
            res.redirect("/dashboard")
        }
    })
}

exports.deleteblogs = async (req,res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).console.log("cannot delete")
        }else{
            res.redirect("/dashboard")
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.displaydashboard = (req,res) => {
    Blog.find()
    .then((data) => {
    res.render('admin_home', {title:"Admin Dashboard", Blogs: data})
})
    .catch(err =>{
        console.log(err)
    })

}

exports.displaydetails = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("details", { blog: result, title: "Blog Details" });
      })
      .catch((err) => {
        console.log(err);
      });
}