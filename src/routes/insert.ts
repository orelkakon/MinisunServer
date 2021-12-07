import { insertNewData, updateSwitchTime } from './../db/mysqlAPI'

export const insertNewRow = async (branch: string, machine: string, year: string, month: string, clockCounter: number, usedMonthCounter: number) => {
    return await insertNewData(branch, machine, year, month, clockCounter, usedMonthCounter)
}   

export const updateSwitchingTime = async (branch: string, machine: string, year: string, month: string) => {
    return await updateSwitchTime(branch, machine, year, month)
}