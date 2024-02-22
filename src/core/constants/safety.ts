export class Safety {
    static safetyValidation = [
        { id: 1, type: 'safety', isSelected: false, value: 1},
        { id: 2, type: 'safetyGood', isSelected: false, value: 2 },
        { id: 3, type: 'safetyRegular', isSelected: false, value: 5},
        { id: 4, type: 'safetyNo', isSelected: false, value: 10},
        { id: 5, type: 'noCritic', isSelected: false, value: 20},
    ]
    static safetyValidationNoCritic = [
        { id: 1, type: 'safety', isSelected: false, value: 1},
        { id: 2, type: 'safetyGood', isSelected: false, value: 2 },
        { id: 3, type: 'safetyRegular', isSelected: false, value: 5},
        { id: 4, type: 'safetyNo', isSelected: false, value: 10},        
    ]
    static riskLevel = [
        {
            code: 'VH',
            values: [{code:'VH', value :5},{code:'H',value:5},{code:'M',value:5},{code:'MD',value:4},{code:'L',value:4}]
        },
        {
            code: 'H',
            values: [{code:'VH', value :5},{code:'H',value:5},{code:'M',value:5},{code:'MD',value:4},{code:'L',value:4}]
        },
        {
            code: 'M',
            values: [{code:'VH', value :5},{code:'H',value:4},{code:'M',value:4},{code:'MD',value:3},{code:'L',value:3}]
        },
        {
            code: 'MD',
            values: [{code:'VH', value :4},{code:'H',value:3},{code:'M',value:3},{code:'MD',value:2},{code:'L',value:2}]
        },
        {
            code: 'L',
            values: [{code:'VH', value :3},{code:'H',value:3},{code:'M',value:2},{code:'MD',value:2},{code:'L',value:1}]
        }
    ]
    static range = [0.2,0.4,0.6,0.8,1]
    static safetyOptions = [
        { id: 1,  value:0, type: 'safety' },
        { id: 2,  value:0, type: 'safetyGood'},
        { id: 3,  value:0, type: 'safetyRegular'},
        { id: 4,  value:0, type: 'safetyNo'},
        { id: 5,  value:0, type: 'noCritic'},
    ]
    static paramsQualy = {
        minPrecent: 75,
        lowRisk: ['Medio', 'Bajo']        
    }
}