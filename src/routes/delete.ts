import { deleteRowData, deleteSwitchTimeData } from './../db/mysqlAPI'

export const deleteTimeDetail = async (branch: string, machine: string, year: string, month: string) => {
    return await deleteRowData(branch, machine, year, month)
}

export const deleteSwitchTime = async (branch: string, machine: string, year: string, month: string) => {
    return await deleteSwitchTimeData(branch, machine, year, month)
}   