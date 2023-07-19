const express = require("express");
const bodyParser = require("body-parser");
const keyking = require(__dirname + "/API Keys.js")
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
response.render("contact")
})
app.post("/contactMe", (request, response)=> {
    const firstName = request.body.firstname;
    const lastName = request.body.lastname;
    const email = request.body.email;
    const phone = request.body.phone;
    console.log(firstName);
})
app.listen(5000, function(){
    console.log("server is runnin on port 5000")
});
