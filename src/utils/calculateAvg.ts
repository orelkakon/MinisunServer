export const calculateAvg = (data) => {
    let used_sum = 0;
    data && data.forEach(month => {
        used_sum += month.used_time
    })
    const length = data.length
    if (length > 0) {
        const usedAvg = used_sum / length
        return { usedAvg }
    }
    const emptyValue = { usedAvg: 0 }
    return emptyValue

}