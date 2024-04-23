import express from 'express';
import router from '../server/route'

const app = express();
const port : Number = 6001;

app.get("/" , router)

app.listen(port , () => {
    console.log("port connected");
    
})


