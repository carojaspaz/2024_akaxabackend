const path = require('path');
const fs = require('fs');

import { ApiConfig } from '../../constants/api.config';

var locales: any = {};
var locale: string = 'es';

var directory = __dirname + '/codes/'

const getFilePath = (locale: string) => {
    var ext = '.json',
        filepath = path.join(directory + locale + ext);
    return filepath;
}

const read = (locale: string) => {
    var localeFile: string = '',
        file = getFilePath(`ciiu.${locale}`)
    try {
        localeFile = fs.readFileSync(file)
        locales[locale] = JSON.parse(localeFile)
    } catch (parseError) {
        console.info('[Error] : Error trying reading file.')
    }    
}

export const ciiu = (): string => {
    locale = 'es'
    read(locale)    
    return locales[locale]
}