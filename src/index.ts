const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv").config();

//Modules
import * as connectionChecker from './connectionChecker';
import * as performanceAnalyzer from './Performance/performanceAnalyzer';


const port = process.env.PORT || 3000;

//create router
const router = express.Router();

app.use(cors());

app.use(router);

router.get('/check/:cfgJson', async (req: any, res: any) => {
    let cfgJson = req.params.cfgJson;
    let config = JSON.parse(unescape(cfgJson));
    let result = await connectionChecker.Check(config);
    res.send(result);
});

app.listen(port, () => {

});
