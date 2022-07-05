const http = require("http");
// const https=require("https");
const express = require("express");
const fs = require("fs");
const sendMail = require('./mail');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + "/static"));

// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html", (err) => {
    if (err) throw err;
  });
});
app.get("/book_now.html", (req, res) => {
  res.sendFile(__dirname + "/public/book_now.html", (err) => {
    if (err) throw err;
  });
});
app.get("/gallery.html", (req, res) => {
  res.sendFile(__dirname + "/public/gallery.html", (err) => {
    if (err) throw err;
  });
});
app.get("/index.html",(req,res)=>{
  res.sendFile(__dirname+"/public/index.html",(err)=>{
    if(err) throw err;
  })
})
app.post("/bookNow", (req, res) => {
  const{subject,email,text,name,State,Address,Zip,Quantity}=req.body;
  console.log(req.body);
  sendMail(email, subject, text,name,State,Address,Zip,Quantity,function(err, data) {
    if (err) {
        console.log('ERROR: ', err);
        return res.status(500).json({ message: err.message || 'Internal Error' });
    }
    console.log('Email sent!!!');
    return res.status(200).json({ message: 'Email sent!!!!!' });
});
});

// var server = http.createServer(options, app);
// server.listen(process.env.PORT || 5000, () => {
//   console.log("server starting");
// });
var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 5000,()=>{
  console.log('Server Starting');
});

// app.listen(process.env.PORT || 5000, function () {
//   console.log('Server Starting.');
// });

