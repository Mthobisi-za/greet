
module.exports = function database(pool){
 async function getData(){
    console.log("Getting data")
    var promise = new Promise((resolve, reject)=>{
      resolve(pool.query('select * from data'))
    })
    .then(value =>{
      return value.rows
    }).catch(err =>{
      console.log(err)
    })
    console.log(promise)
    return promise
 }
 async function setData(name, age, grade){
    await pool.query("insert into data(name,grade,age) values($1,$2,$3)", [name,grade,age]);
    return "done"
 }
 
 return{
     getData,
     setData
 } 
}