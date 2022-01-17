const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv").config();

//Modules
import * as connectionChecker from './connectionChecker';
import * as configLoader from './configLoader';
import * as performanceAnalyzer from './Performance/performanceAnalyzer';


const port = process.env.PORT;

//create router
const router = express.Router();

app.use(cors());

app.use(router);

router.get('/check/:cfgJson', async (req: any, res: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    let cfgJson = req.params.cfgJson;
    let config = JSON.parse(unescape(cfgJson));
    // performanceAnalyzer.startTimer("Config Load");
    // let config = await configLoader.loadConfig();
    // performanceAnalyzer.endTimer("Config Load");
    let result = await connectionChecker.Check(config);
    res.send(result);
});

router.get("/endpoint1", (req: any, res: any) => {
    res.send("endpoint1");
});


app.listen(port, () => {

});