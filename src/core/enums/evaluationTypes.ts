enum EvaluationTypes {
    vulnerability = 0,
    efficacy = 1    
}

const evaluationTypes = Object.freeze({
    vulnerability: 'vulnerability',
    efficacy: 'efficacy'
});

const evaluationTypesArray = [
    "Vulnerability",
    "Efficacy"
]

const evaluationTypesArrayEs = [
    "Vulnerabilidad",
    "Eficacia"
]

export { EvaluationTypes, evaluationTypes, evaluationTypesArray, evaluationTypesArrayEs }