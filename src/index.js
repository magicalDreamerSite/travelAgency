import app from "./app.js";
//import {sequelize} from "./config/database.js"
import { PORT } from './config/config.js';
import './config/database-pg.js';

//Settings
app.set('port', process.env.PORT || PORT);

//Server is Listenning
app.listen(app.get('port'), () => {
    console.log('Server Running on Port', app.get('port'));
});

