export const getDaysDifference = (dayToCompare) => {
    const today = new Date()
    const lastDay = new Date(dayToCompare)
    const difference = today.getTime() - lastDay.getTime()

    return difference / (1000 * 60 * 60 * 24)
}

export const plantCareNeeds = (freqDays, record) => {
    if (!record || record.length === 0) return true;
    const daysFromLastCare = getDaysDifference(record[record.length - 1])
    return daysFromLastCare > freqDays
}