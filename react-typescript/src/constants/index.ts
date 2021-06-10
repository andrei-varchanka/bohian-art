
export const genres = ['Abstract', 'Still life', 'Landscape', 'Portrait', 'Genre art', 'Historical', 'Animalism', 'Nude'];

export const roles = ['Admin', 'Artist'];

export const navigationItems = [
    {
        route: '/gallery',
        label: 'Gallery'
    },
    {
        route: '/contacts',
        label: 'Contacts'
    }
];

export const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{6,128}$)');
