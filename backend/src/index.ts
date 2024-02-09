import express from 'express'
const app = express();

// middlewere

// GET
app.get("/hello",(req, res, next )=>{
    return res.send("Hello");
})

// POST
app.post("/hello",(req, res, next )=>{
    return res.send("Hello");
})

// // If we want to read the data into the JSON file placed at the POSTman than we must add another middlewere of the express
// // app.use() use to define middlewere
app.use(express.json());
app.post("/hello",(req, res, next )=>{
    console.log(req.body.name); //receive bhumika(value of name var) in this terminal
    return res.send("Hello");//receive helow at postman
})

app.use(express.json());
// send u data directly from the frontend, 
// modify something into the backend
app.put("/hello",(req, res, next )=>{
    console.log(req.body.name);
    return res.send("Hello");
})

// all above ones are static routs
app.use(express.json());
// But the following is dynamic routs
app.delete("/user/:id",(req, res, next )=>{
    console.log(req.params.id);
    return res.send("Hello");
})

app.listen(5000,()=>console.log("server open"));