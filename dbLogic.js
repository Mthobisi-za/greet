module.exports = function database(pool){
 async function getData(){
    var data = await pool.query("select * from data");
    return data.rows;
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