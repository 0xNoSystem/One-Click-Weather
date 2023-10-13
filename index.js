import express from 'express';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

dotenv.config();

app.use(express.static('public'));

app.get('/', (req,res)=>{

    res.sendFile(__dirname + '/index.html');
});

app.get('/api-key', (req,res)=>{
    const apiKey = process.env.apiKey;
    res.json({apiKey});
})



app.listen(port, (req,res)=>{
    console.log('Listening on port '+ port);
})