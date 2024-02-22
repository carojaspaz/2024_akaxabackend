enum Roles {
    SuperAdmin = 0,
    Admin = 1,
    Operator = 2,
    Associated = 3,
    Client = 4,
    AdminClient = 5,
    User = 6,
    Anonymous = 7
}

const roles = Object.freeze({
    SuperAdmin: 'SuperAdmin',
    Admin: 'Admin',
    Operator: 'Operator',
    Associated: 'Associated',
    Client: 'Client',
    AdminClient:'AdminClient',
    User: 'User',
    Anonymous: 'Anonymous'
});

const rolesNames = {
    SuperAdmin: 'SuperAdmin',
    Admin: 'Admin',
    Operator: 'Operator',
    Associated: 'Associated',
    Client: 'Client',
    AdminClient:'AdminClient',
    User: 'User',
    Anonymous: 'Anonymous'
};

const rolesNamesArray = [
    'SuperAdmin',
    'Admin',
    'Operator',
    'Associated',
    'Client',
    'AdminClient',
    'User',
    'Anonymous'
];

export { Roles, roles, rolesNames, rolesNamesArray }