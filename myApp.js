let express = require("express");
let app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
/* console.log('Hello World') */

/* app.get("/",(req, res)=>{
  res.send('Hello Express');

});  */

/* monLogger = (req, res, next) => { console.log(req.url); next(); }; */

const public = __dirname + "/public";
app.use("/public", express.static(public));
const absolutePath = __dirname + "/views/index.html";
app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

/* app.get('/',(req,res)=>{
  res.send({"message": "Hello json"});
})
 */
/* 
app.get('/json',(req,res)=>{
  res.json({"message": "HELLO test"});
}) */
/* 
app.get('/json',(req,res)=>{
  if (process.env.MESSAGE_STYLE === "uppercase") res.json({"message": "HELLO JSON"});
  else res.json({"message": "Hello json"});
})

 */

/*  app.use(function(req, res, next) {
   console.log(req.method+" "+req.path+" - "+req.ip);
   next();
})
 */

/* app.use((req,res)=>{

}); */
/* app.get('/:word/echo', (req, res)=> {
  res.send({echo: req.params.word});
})
 */
/* app.get('/name', (req, res)=> {
  res.send({ name: req.query.first+" "+req.query.last});
}) */
var jsonParser = bodyParser.json();
const handler = (req, res) => {
  res.send({ name: req.body.first + " " + req.body.last });
};
app.post("/name", jsonParser, handler);
//app.route("/name").post(handler)

/* app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);
 */
