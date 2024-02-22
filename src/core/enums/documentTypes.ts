enum DocumentTypes {
    Dni = 0,
    Nit = 1,
    Rut = 2,
    Passport = 3,
    Ce = 4
}

const documentTypes = Object.freeze({
    Dni: 'CC',
    Nit: 'Nit',
    rut: 'Rut',
    passport: 'Passport',
    ce: 'CE'
});

const documentTypesArray = [
    "CC",
    "Nit",
    "Rut",
    "Passport",
    "CE"
]

const documentTypesArrayEs = [
    "CC",
    "Nit",
    "Rut",
    "Pasaporte",
    "CE"
]

export { DocumentTypes, documentTypes, documentTypesArray, documentTypesArrayEs }