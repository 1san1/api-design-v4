import * as dotenv from 'dotenv'

dotenv.config()
// we are importing dotenv in index.ts file because it is the entry point for all things

import config from './config';
import app from "./server";


app.listen(config.port, ()=> {
    console.log(`hello on http://localhost:${config.port}`)
})