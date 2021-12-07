import { selectSpecificData, selectYearData } from './../db/mysqlAPI'
import { calculateAvg } from './../utils/calculateAvg'

export const showYearDetails = async (branch: string, machine: string, year: string) => {
    return await selectYearData(branch, machine, year)
}

export const showYearAverage = async (branch: string, machine: string, year: string) => {
    const yearData = await selectYearData(branch, machine, year)
    const yearAvg = calculateAvg(yearData)
    return yearAvg
}

export const getSpecificRow = async (branch: string, machine: string, year: string, month: string) => {
    return await selectSpecificData(branch, machine, year, month)
}