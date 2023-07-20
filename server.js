const express = require("express");
const bodyParser = require("body-parser");
const keyking = require(__dirname + "/API Keys.js")
const https = require("https")
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
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
app.get("/blog", (request, response)=>{
  response.render("blog")
  })
app.post("/contact", (request, response)=> {
    const firstName = request.body.firstname;
    const lastName = request.body.lastname;
    const email = request.body.email;
    const phone = request.body.phone;
    console.log(firstName);
    const userData = {
        members : [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName,
                    PHONE : phone
                }
            }
        ]
    }
    const userInfo = JSON.stringify(userData);
    const url="https://us21.api.mailchimp.com/3.0/lists/lssksk";
    const contactKey = keyking.keystore.mailchimp;
    const options = {
        method : "POST",
        auth: "contactList:" +contactKey,
      };
      const req = https.request(url, options, function(res){
        if(res.statusCode === 200){
     const sucessText = "Congratulations You have successfully signed up to my newsletter. Always Check your inbox for exiting information from me."
          response.render("success-contact", {sucess : sucessText, dater:date.universalDate()});
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
app.listen(5000, function(){
    console.log("server is running on port 5000");
});