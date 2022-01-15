const express = require('express');
const app = express();

require("dotenv").config();

//Modules
import * as connectionChecker from './connectionChecker';
import * as configLoader from './configLoader';
import * as performanceAnalyzer from './Performance/performanceAnalyzer';


const port = process.env.PORT;

//create router
const router = express.Router();

app.use(router);

router.get('/check', async (req: any, res: any) => {
    performanceAnalyzer.startTimer("Config Load");
    let config = await configLoader.loadConfig();
    performanceAnalyzer.endTimer("Config Load");
    let result = await connectionChecker.Check(config);
    res.send(result);
});

router.get("/endpoint1", (req: any, res: any) => {
    res.send("endpoint1");
});


app.listen(port, () => {

});