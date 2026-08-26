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

export const normalizeString = (word) => {
    
    if (!word || typeof word !== 'string') return '';

    const simplifiedWord = word.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    return simplifiedWord
}

export const getNormalizedLocations = (plants) => {
    const map = new Map();

    plants
        .filter(p => p?.location)
        .forEach(p => {
            const original = p.location.trim();

            const key = normalizeString(original)

            if (!map.has(key) || (original.match(/[áéíóúÁÉÍÓÚ]/) && !map.get(key).match(/[áéíóúÁÉÍÓÚ]/))) {
                const capitalized = original
                    .toLowerCase()
                    .replace(/(^|[\s,-])\S/g, letter => letter.toUpperCase());

                map.set(key, capitalized);
            }
        });

    return Array.from(map.values());
};