const express = require('express');
const app = express();

require("dotenv").config();

//Modules
import * as connectionChecker from './connectionChecker';
import * as configLoader from './configLoader';
import axios from 'axios';

const port = process.env.PORT;

//create router
const router = express.Router();

app.use(router);

router.get('/check', async (req: any, res: any) => {
    let config = await configLoader.loadConfig();
    let result = await connectionChecker.Check(config);
    res.send(result);
});

router.get("/endpoint1", (req: any, res: any) => {
    res.send("endpoint1");
});


app.listen(port, () => {

});