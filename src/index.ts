import * as express from 'express'
import * as cors from 'cors'
import * as config from '../config.json'

import { loggerInfo } from './utils/logger'

var bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

// db
const mysql = require('mysql');

const { host, user, password, database } = config
export const pool = mysql.createPool({
    host,
    user,
    port: config.dbPort,
    password,
    database,
    multipleStatements: true
});

// routes 

// server
app.listen(config.port, () => {
    loggerInfo.info(`Minisun Server listening at ${config.port}`)
    console.log(`Minisun Server listening at ${config.port}`)
})