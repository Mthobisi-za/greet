let express = require("express");
let app = express();
const {Pool} = require("pg");
var connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString, ssl: true})
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
const data = require("./dbLogic");
const database = data(pool);
app.get("/", (req,res)=>{
  async function getData() {
    var promise = new Promise((resolve, reject)=>{
      resolve(pool.query('select * from data'))
    })
    .then(value =>{
      console.log(value)
    }).catch(err =>{
      console.log(err)
    })
    return promise
  }
  getData()
})
app.post('/signUser', (req,res)=>{
  var name = req.body.name;
  var age = req.body.age;
  var grade = req.body.grade;
  (async ()=>{
    await database.setData(name, age, grade);
    res.redirect("/");
  })()
})
let PORT = process.env.PORT || 3009;
app.listen(PORT, ()=>{
  console.log("server started on port :" + PORT)
});
 