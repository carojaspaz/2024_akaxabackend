enum ScheduleTypes {
    Assigned = 0,
    InProcess = 1,
    Done = 2,
    CancelByClient = 3,
    Canceled = 4
}

const scheduleTypes = Object.freeze({
    Assigned: 'Assigned',
    InProcess: 'InProcess',
    Done: 'Done',
    CancelByClient: 'CancelByClient',
    Canceled:'Canceled'
});

const scheduleTypeNames = {
    Assigned: 'Assigned',
    InProcess: 'InProcess',
    Done: 'Done',
    CancelByClient: 'CancelByClient',
    Canceled:'Canceled'
};

const scheduleTypeNamesArray = [
    'Assigned',
    'InProcess',
    'Done',
    'CancelByClient',
    'Canceled'
];

const scheduleTypeNamesArrayEs = [
    'Assigned',
    'InProcess',
    'Done',
    'CancelByClient',
    'Canceled'
];

export { ScheduleTypes, scheduleTypes, scheduleTypeNames, scheduleTypeNamesArray, scheduleTypeNamesArrayEs }