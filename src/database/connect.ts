import mongoose, { ConnectOptions } from 'mongoose';

function connect(){
    const dbUri = process.env.dbUri as string;
    return mongoose.connect(dbUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }as ConnectOptions).then(() =>{
        console.log("Mongodb is up and running")
    }).catch(err =>{
        console.error("db error", err)
        process.exit(1);
    })
}

export default connect;