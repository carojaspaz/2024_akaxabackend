enum StudyLevelTypes {
    School = 0,
    Graduate = 1,
    Postgraduate = 2,
    Master = 3,
    PhD = 4,
    Certification = 5,
    Other = 6
}

const studyLevelTypes = Object.freeze({    
    School: 'School',
    Graduate: 'Graduate',
    Postgraduate: 'Postgraduate',
    Master: 'Master',
    PhD: 'PhD',
    Certification: 'Certification',
    Other: 'Other'
});

const studyLevelTypesArray = [
    "School",
    "Graduate",
    "Postgraduate",
    "Master",
    "PhD",
    "Certification",
    "Other"
]

const studyLevelTypesArrayEs = [
    "Bachiller",
    "Pregrado",
    "Postgrado",
    "Maestria",
    "PhD",
    "Cerficación",
    "Otro"
]

export { StudyLevelTypes, studyLevelTypes, studyLevelTypesArray, studyLevelTypesArrayEs }