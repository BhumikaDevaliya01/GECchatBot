import app from "./app.js";
import connectToDatabase from "./db/connection.js";
// connections and listneres
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(()=>{
        app.listen(PORT, () => console.log("Server Open & connected to Database🤟"));
    })
    .catch((err)=>console.log(err));
