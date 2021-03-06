let express = require("express");
let app = express();
const {Pool} = require("pg");
var connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}})
var exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main", layoutsDir: "views/layout" })
);
app.set("view engine", "handlebars");
////used var
async function getData() {
  console.log("i was clled")
  var promise = new Promise((resolve, reject)=>{
    resolve(pool.query('select * from data'))
  })
  .then(value =>{
    console.log(value.rows)
  }).catch(err =>{
    console.log(err)
  })
  return promise.rows
}

const data = require("./dbLogic");
const database = data(pool);
app.get("/", (req,res)=>{
  async function getData(){
    console.log("Getting data")
    var promise = new Promise((resolve, reject)=>{
      resolve(pool.query('select * from data'))
    })
    .then(value =>{
      res.render('index', {data: value.rows})
      
    }).catch(err =>{
      console.log(err)
    })
    console.log(promise)
 }
 getData()
})
app.post('/signUser', (req,res)=>{
  var name = req.body.name;
  var age = req.body.age;
  var grade = req.body.grade;
  async function setData(){
    console.log("Getting data")
    var promise = new Promise((resolve, reject)=>{
      resolve(pool.query('insert into data(name,grade,age) values($1,$2,$3)', [name,grade,age]))
    })
    .then(value =>{
      res.redirect('/')
    }).catch(err =>{
      console.log(err)
    })
 }
 setData()
})
let PORT = process.env.PORT || 3009;
app.listen(PORT, ()=>{
  console.log("server started on port :" + PORT)
});
 