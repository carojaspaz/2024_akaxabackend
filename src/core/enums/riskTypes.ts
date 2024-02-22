enum RiskTypes {
    VeryHigh = 0,
    High = 1,
    Moderate = 2,
    Medium = 3,
    Low = 4
}

const riskTypes = Object.freeze({
    VeryHigh: 'VeryHigh',
    High: 'High',
    Moderate: 'Moderate',
    Medium: 'Medium',
    Low:'Low'
});

const riskTypesNames = {
    VeryHigh: 'VeryHigh',
    High: 'High',
    Moderate: 'Moderate',
    Medium: 'Medium',
    Low:'Low'
};

const riskTypeNamesArray = [
    'Very High',
    'High',
    'Moderate',
    'Medium',
    'Low'
];

const riskTypeNamesArrayEs = [
    'Muy Alto',
    'Alto',
    'Moderado',
    'Medio',
    'Bajo'
];

export { RiskTypes, riskTypes, riskTypesNames, riskTypeNamesArray, riskTypeNamesArrayEs }