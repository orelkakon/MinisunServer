import { poolConnection } from './../index'
import { loggerError, loggerInfo } from './../utils/logger'

export const insertNewData = (branch: string, machine: string, year: string, month: string, clockCounter: number, usedMonthCounter: number) => {
    return new Promise((resolve, reject) => {
        const SQL_STATEMENT_INSERT_NEW_DATA = `INSERT INTO time_details (year, machine, month, branch, counter_time, used_time) 
        VALUES ('${year}', '${machine}', '${month}', '${branch}', '${clockCounter}', '${usedMonthCounter}')
        ON DUPLICATE KEY UPDATE counter_time = '${clockCounter}', used_time = '${usedMonthCounter}'`
        poolConnection.query(SQL_STATEMENT_INSERT_NEW_DATA, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to insert a new row data ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info('Success to insert a new row data')
                    resolve(true)
                } else {
                    loggerError.error(`failed to insert a new row data -  ${result}`)
                    resolve('failed')
                }
            }
        })
    })
}

export const updateSwitchTime = (branch: string, machine: string, year: string, month: string) => { 
    return new Promise((resolve, reject) => {
        const SQL_STATEMENT_UPDATE_SWITCH_TIME = `INSERT INTO switch_times (year, machine, month, branch) 
        VALUES ('${year}', '${machine}', '${month}', '${branch}')
        ON DUPLICATE KEY UPDATE month = '${month}' , year = '${year}'`
        poolConnection.query(SQL_STATEMENT_UPDATE_SWITCH_TIME, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to insert/update a new switch time data ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info('Success to insert/update a new switch time data')
                    resolve(true)
                } else {
                    loggerError.error(`failed to insert/update a new switch time data -  ${result}`)
                    resolve('failed')
                }
            }
        })
    })
}
export const selectYearData = (branch: string, machine: string, year: string) => { 
    return new Promise((resolve, reject) => {
        const SQL_STATEMENT_GET_SPECIFIC_YEAR_DATA = `SELECT month, counter_time, used_time FROM time_details WHERE (branch = '${branch}' AND machine = '${machine}' AND year = '${year}')`
        poolConnection.query(SQL_STATEMENT_GET_SPECIFIC_YEAR_DATA, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to get specific year row data. ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info('Success to get specific year row data')
                    resolve(result)
                } else {
                    resolve('failed')
                }
            }
        })
    })
}

export const selectSpecificData = (branch: string, machine: string, year: string, month: string) => {
    return new Promise((resolve, reject) => {
        const SQL_STATEMENT_GET_SPECIFIC_DATA = `SELECT counter_time FROM time_details WHERE (branch = '${branch}' AND machine = '${machine}' AND year = '${year}' AND month = '${month}')`
        poolConnection.query(SQL_STATEMENT_GET_SPECIFIC_DATA, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: to get specific row data. ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info('Success to get specific row data')
                    resolve(result[0])
                } else {
                    resolve('failed')
                }
            }
        })
    })
}


export const selectSwitchTime = (branch: string, machine: string) => {
    return new Promise((resolve, reject) => {
        const SQL_STATEMENT_GET_SPECIFIC_SWITCH_TIME = `SELECT year, month FROM switch_times WHERE (branch = '${branch}' AND machine = '${machine}')`
        poolConnection.query(SQL_STATEMENT_GET_SPECIFIC_SWITCH_TIME, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: to get specific switch timw data. ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info('Success to get specific switch timw data')
                    resolve(result[0])
                } else {
                    resolve('failed')
                }
            }
        })
    })
}

export const deleteRowData = (branch: string, machine: string, year: string, month: string) => {
    return new Promise((resolve, reject) => {
        const SQL_STATEMENT_DELETE_ROW_DATA = `DELETE FROM time_details WHERE WHERE (branch = '${branch}' AND machine = '${machine}' AND year = '${year}' AND month='${month}')`
        poolConnection.query(SQL_STATEMENT_DELETE_ROW_DATA, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to delete a row data ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info('Success to delete a row data')
                    resolve(true)
                } else {
                    loggerError.error(`failed to delete a row data -  ${result}`)
                    resolve('failed')
                }
            }
        })
    })
}

export const deleteSwitchTimeData = (branch: string, machine: string, year: string, month: string) => {
    return new Promise((resolve, reject) => {
        const SQL_STATEMENT_DELETE_SWITCH_TIME_DATA = `DELETE FROM switch_time WHERE WHERE (branch = '${branch}' AND machine = '${machine}' AND year = '${year}' AND month='${month}')`
        poolConnection.query(SQL_STATEMENT_DELETE_SWITCH_TIME_DATA, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to delete a switch time data ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info('Success to delete a switch time data')
                    resolve(true)
                } else {
                    loggerError.error(`failed to delete a switch time data -  ${result}`)
                    resolve('failed')
                }
            }
        })
    })
}