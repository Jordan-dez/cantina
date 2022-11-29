// fonction de filtres de recherche
// sur titre
export const titleFilter = (title, val) => { 
    const res = val? title.toLowerCase().includes(val.toLowerCase()) : true
    return res
}

// sur le niveau
export const levelFilter = (level, val) => {
    const levels = ["padawan", "jedi", "maitre"]
    const res = val? levels.findIndex((elmt) => elmt === level)+1 == val : true
    return res
}

//sur le temps de préparation
export const timeFilter = (time, val) => {
    const res = val? time < val : true
    return res
}

// sur le nombre de personnes
export const nbPersFilter = (nbPers, min, max) => {
    if(max >= min){
        const res = (min && max)? (nbPers >= min && nbPers <= max) : true
        return res
    }
}

// retourne les minutes en heures minutes
export function getTimeFromMins(mins) {
    const h = mins / 60 | 0
    const m = mins % 60 | 0;
    return h === 0? m+"min" : h+"h"+(m === 0? "" : m+"min") 
}