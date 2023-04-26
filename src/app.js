import express from 'express';
//import path from "path";
import authApiRoutes from "./routes/api.auth.route.js";
import { PORT } from './config/config.js';


// Initializations
const app = express();

app.use(express.json())

// settings
app.set('port', process.env.PORT || PORT);

//ROutes
app.use(authApiRoutes);

//MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Static files
//app.use(express.static(path.join(__dirname,'public')));


export default app;
