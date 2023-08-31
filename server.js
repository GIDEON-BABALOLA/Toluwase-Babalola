require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const keyking = require(__dirname + "/API Keys.js")
const https = require("https")
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const firstBlog = require(__dirname + "/first-blog.js");
const secondBlog = require(__dirname + "/second-blog.js");
const thirdBlog = require(__dirname + "/third-blog.js");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const url = process.env.URK;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  ssl: true, }
  ).then(()=>{
    console.log("connection successful")
  }).catch((error)=>{
    console.log("connection-unsuccessful", error)
  })
  const blogSchema = new mongoose.Schema({
    userName : String,
    userTitle : String,
    userContent : String,
    userDate:String,
    sender: String,
    picture: String,
    timestamp: { type: Date, default: Date.now }
  })
const blogModel = mongoose.model("blogContent", blogSchema)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/'); // The directory where the uploaded images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 	2000000, // 2 Megabyte in bytes (1 kilobyte = 1024 bytes)
  },
});
app.get("/", (request, response)=> {
    const about = "Welcome to my portfolio website! As a data scientist with expertise in machine learning, I aim to explore my skills, experience, and projects in the field of data science and how real-world problems are solved. With 1+ years of experience in the industry, I have worked on a wide range of projects that have enhanced my skills in statistical analysis and predictive modeling for production. My passion for solving complex problems using data-driven insights drives me to excel in this field. I’m open to collaborate on open-source projects on model development, building and deployment for production";
    response.render("home" , { apple: about});
});
app.get("/resume", (request, response) => {
    response.sendFile(__dirname + "/public/Toluwase Babalola CV.pdf")
});
app.get("/projects", (request, response)=>{
    response.render("projects");
})
app.get("/contact", (request, response)=>{
response.render("contact", {dater:date.universalDate()})
})
console.log(process.env.API_KEY)
console.log(process.env.ID)
console.log(process.env.URL)

app.get("/blog", (request, response)=>{
  const firstTitle= firstBlog.title;
  const firstContent=firstBlog.content;
  const secondTitle = secondBlog.title;
  const secondContent = secondBlog.content;
  const thirdTitle = thirdBlog.title;
  const thirdContent = thirdBlog.content;
  const loader1 = _.lowerCase(firstBlog.title);
  const loadman1 = _.replace(loader1, /\s+/g, '-');
       const loader2 = _.lowerCase(secondBlog.title);
  const loadman2 = _.replace(loader2, /\s+/g, '-');
       const loader3 = _.lowerCase(thirdBlog.title);
  const loadman3 = _.replace(loader3, /\s+/g, '-');
  const currentURL = request.protocol + '://' + request.get('host');
  const urlWithLatest = _.trimEnd(currentURL, '/') + '/latest/';
  const urlWithLatestP = _.trimEnd(currentURL, '/') + '/posts/';
  console.log(currentURL)
  blogModel.find().sort({ timestamp: -1 })
  .then((data)=>{
    console.log(data)
    response.render("blog",  {dataman:date.universalDate(), firstT: firstTitle, firstC: firstContent, secondT: secondTitle,
      secondC:secondContent, thirdT: thirdTitle, thirdC : thirdContent, content : data, doman : urlWithLatest, domane :urlWithLatestP
      ,  first: loadman1, second : loadman2, third:  loadman3});
  })
  .catch((error)=>{
    console.log("Error in Finding the values of the blog", error)
  })
  })
  app.get("/blog/compose", (request, response)=>{
    response.render("compose", {dataman:date.universalDate()});
  })
app.post("/blog", (request, response, next)=>{
  upload.single('image')(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      // Handle multer-specific errors (e.g., file size exceeded)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return response.status(400).render("error-compose",  {dataman:date.universalDate()});
      }
    } else if (err) {
      // Handle other errors (if any)
      return response.status(500).send('An unexpected error occurred during file upload.');
    }
  const bloggerName = request.body.bloggername;
  const blogTitle = request.body.blogtitle;
  const blogContent = request.body.blogcontent;
  const datetime = request.body.dater;
  const newSend = "continue reading...";
 
  let cleanedImagePath = null; // Default value when no image is uploaded
  if (request.file) {
    const image = request.file.path; // Assuming multer saves the path to the 'path' property
    cleanedImagePath = _.replace(image, 'public', '');
  }
  const userData = {
    userName : bloggerName,
    userTitle : blogTitle,
    userContent : blogContent,
    userDate:datetime,
    sender: newSend,
    picture: cleanedImagePath
  }
  const blogAdd = new blogModel(userData)
  blogAdd.save()
  response.redirect("/blog");
  })
});
  app.get ("/latest/:value", (request, response)=>{
    const loader1 = _.lowerCase(firstBlog.title);
    const loadman1 = _.replace(loader1, /\s+/g, '-');
         const loader2 = _.lowerCase(secondBlog.title);
    const loadman2 = _.replace(loader2, /\s+/g, '-');
         const loader3 = _.lowerCase(thirdBlog.title);
    const loadman3 = _.replace(loader3, /\s+/g, '-');
    if(request.params.value === loadman1){
      response.render("latest", {  contentTitle:firstBlog.title,
        contentContent:firstBlog.content});
      }
      else if (request.params.value === loadman2)
      {
        response.render("latest", {  contentTitle:secondBlog.title,
          contentContent:secondBlog.content});
        }
  else if(request.params.value === loadman3){
    response.render("latest", { contentTitle:thirdBlog.title,
      contentContent:thirdBlog.content})
  }
  else{
    console.log("error");
  }
  })
  app.get("/posts/:value", (request, response) => {
    const originalString = request.url
    const loadman = _.replace(originalString, '/posts/', '');
    blogModel.find({_id : loadman})
    .then((data)=>{
      if(request.params.value === loadman){
        response.render("post", {contentName:data[0].userName,  contentTitle:data[0].userTitle,
          contentContent:data[0].userContent, contentTime: data[0].userDate, contentURL:data[0].sender, contentImage: data[0].picture});
      }
      else if(request.params.value === data[0].userTitle){
        response.render("post", {contentName:data[0].userName,  contentTitle:data[0].userTitle,
          contentContent:data[0].userContent, contentTime: data[0].userDate, contentURL:data[0].sender, contentImage: data[0].picture});
      }
    })
  });
app.post("/contact", (request, response)=> {
    const firstName = request.body.firstname;
    const lastName = request.body.lastname;
    const email = request.body.email;
    const phone = request.body.phone;
    const address = request.body.address;
    console.log(firstName);
    const userData = {
        members : [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName,
                    PHONE : phone,
                    ADDRESS: address
                }
            }
        ]
    }
    const userInfo = JSON.stringify(userData);
    const url="https://us21.api.mailchimp.com/3.0/lists/82ab7d2590";
    const contactKey = keyking.keystore.mailchimp || process.env.API_KEY;
    console.log(contactKey);
    const options = {
        method : "POST",
        auth: "contactList:" +contactKey,
      };
      const req = https.request(url, options, function(res){
        if(res.statusCode === 200){
     const sucessText = "Congratulations You have successfully signed up to my newsletter. Always Check your inbox for exiting information from me."
          response.render("success-contact", {success : sucessText, dater:date.universalDate()});
           }
              else{
            const failureText = "UH Oh, You were unable to signUp for the Newsletter,check if you have an active internet connection or contact the developer"
          response.render("failure-contact", {failure: failureText, dater:date.universalDate()});
            }
        res.on("data", function(data){
          console.log(JSON.parse(data));
        })
      })
     
    req.write(userInfo);
    req.end();
})
app.use( function(request, response, next){
    response.status(404).render("error", {dat:date.universalDate() });
  })
app.listen(5000 || process.env.PORT, function(){
    console.log("server is running on port 5000");
});
