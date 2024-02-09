import { connect, disconnect } from "mongoose";

export default async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);
    }catch(error){
        console.log(error);
        throw new Error("can't connect to MongoDB");
    }
}

async function disconnectFromDatabase() {
    try{
        await disconnect();
    }catch(error){
        console.log(error);
        throw new Error("can't disconnect to MongoDB");
    }  
} 

export{connectToDatabase,disconnectFromDatabase};