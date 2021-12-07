import * as express from 'express'
import * as cors from 'cors'
import * as config from '../config.json'
import { loggerInfo, loggerError } from './utils/logger'
import { insertNewRow, updateSwitchingTime } from './routes/insert'
import { deleteTimeDetail, deleteSwitchTime } from './routes/delete'
import { getSpecificRow, showYearAverage, showYearDetails } from './routes/select'


const app = express();
app.use(cors());
app.use(express.json())

// db
const mysql = require('mysql');

const { host, user, password, database } = config
export const poolConnection = mysql.createPool({
    host,
    user,
    port: config.dbPort,
    password,
    database,
    multipleStatements: true
});

// routes 
app.post('/insertNewBulbsData', async (req, res) => {
    try {
        const { branch, machine, year, month, clockCounter, usedMonthCounter } = req.body
        const result = await insertNewRow(branch, machine, year, month, clockCounter, usedMonthCounter)
        res.send(result)
    } catch (err) {
        loggerError.error(`${Date.now()}: failed to add a new bulbs data in /insertNewBulbsData route. ${err}`)
    }
})

app.post('/deleteBulbsData', async (req, res) => {
    try {
        const { branch, machine, year, month } = req.body
        const result = await deleteTimeDetail(branch, machine, year, month)
        res.send(result)
    } catch (err) {
        loggerError.error(`${Date.now()}: failed to delete time detail in /deleteBulbsData route. ${err}`)
    }
})

app.post('/deleteSwitchTimeData', async (req, res) => {
    try {
        const { branch, machine, year, month } = req.body
        const result = await deleteSwitchTime(branch, machine, year, month)
        res.send(result)
    } catch (err) {
        loggerError.error(`${Date.now()}: failed to delete switch time data in /deleteSwitchTimeData route. ${err}`)
    }
})

app.post('/updateSwitchBulbs', async (req, res) => {
    try {
        const { branch, machine, year, month } = req.body
        const result = await updateSwitchingTime(branch, machine, year, month)
        res.send(result)
    } catch (err) {
        loggerError.error(`${Date.now()}: failed to add a new switch time data in /updateSwitchBulbs route. ${err}`)
    }
})

app.post('/showBulbsData', async (req, res) => {
    try {
        const { branch, machine, year } = req.body
        const result = await showYearDetails(branch, machine, year)
        res.send(result)
    } catch (err) {
        loggerError.error(`${Date.now()}: failed to show details of year in /showBulbsData route. ${err}`)
    }
})

app.post('/showAverageBulbsData', async (req, res) => {
    try {
        const { branch, machine, year } = req.body
        const result = await showYearAverage(branch, machine, year)
        res.send(result)
    } catch (err) {
        loggerError.error(`${Date.now()}: failed to show year average data in /insertNewBulbsData route. ${err}`)
    }
})

app.post('/getSpecificClockCounter', async (req, res) => {
    try {
        const { branch, machine, year, month } = req.body
        const result = await getSpecificRow(branch, machine, year, month)
        res.send(result)
    } catch (err) {
        loggerError.error(`${Date.now()}: failed to show specific row data in /getSpecificClockCounter route. ${err}`)
    }
})

// server
app.listen(config.port, () => {
    loggerInfo.info(`Minisun Server listening at ${config.port}`)
    console.log(`Minisun Server listening at ${config.port}`)
})