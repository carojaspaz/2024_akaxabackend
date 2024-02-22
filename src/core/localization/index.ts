const path = require('path');
const fs = require('fs');

import { ApiConfig } from '../constants/api.config';

const globalAny:any = global;
var locales: any = {};
var locale: string = 'es';
var updateFiles: boolean;
var indent: any;
var objectNotation: any;

var directory = __dirname + '/locales/';
var directoryPermissions: any;

var getStorageFilePath = (locale: string) => {
    // changed API to use .json as default, #16
    var ext = '.json',
      filepath = path.normalize(directory + ext);    
    return filepath;
}

const getFilePath = (locale: string) => {
    var ext = '.json',
        filepath = path.join(directory + locale + ext);
    return filepath;
}

const read = (locale: string) => {
    var localeFile: string = '',
        file = getFilePath(locale);
        try {            
            localeFile = fs.readFileSync(file);
            try {
              // parsing file contents to locales[locale]
              locales[locale] = JSON.parse(localeFile);
            } catch (parseError) {
              console.info('[Error] : Error trying reading file.');
            }
          } catch (readError) {
            // unable to read, so initialize that file
            // locales[locale] are already set in memory, so no extra read required
            // or locales[locale] are empty, which initializes an empty locale.json file
      
            // since the current invalid locale could exist, we should back it up
            if (fs.existsSync(file)) {              
              fs.renameSync(file, file + '.invalid');
            }                
            write(locale);
          }
}

const write = (locale: string) => {
    var stats, target, tmp;

    // don't write new locale information to disk if updateFiles isn't true
    if (!updateFiles) {
      return;
    }

    // creating directory if necessary
    try {
      stats = fs.lstatSync(directory);
    } catch (e) {      
      try {
        fs.mkdirSync(directory, directoryPermissions);
      } catch (e) {
        // in case of parallel tasks utilizing in same dir
        if ((<NodeJS.ErrnoException>e).code !== 'EEXIST') throw e;
      }
    }

    // first time init has an empty file
    if (!locales[locale]) {
      locales[locale] = {};
    }

    // writing to tmp and rename on success
    try {
      target = getStorageFilePath(locale);
      tmp = target + '.tmp';
      fs.writeFileSync(tmp, JSON.stringify(locales[locale], null, indent), 'utf8');
      stats = fs.statSync(tmp);
      if (stats.isFile()) {
        fs.renameSync(tmp, target);
      } else {
          console.info('[Error]: unable to write locales to file');
      }
    } catch (e) {
        console.info('[Error]: unexpected error trying to write locales to file');
    }
}

export const translate = (phrase: string, key?: string, param?: string[]): string => {    
    locale = globalAny.lang;
    if (locale === undefined) {
      locale = ApiConfig.setup.defaultLanguage;
    }
    read(locale);
    let msg = locales[locale][key][phrase];    
    if(param){
      try{
        
        param.forEach((value, i) => {
          var template = `@${i}`;
          var re = new RegExp(template, 'gi');
          msg = msg.replace(re, value);
        });
        return msg;
      } catch(e){
        console.info("[Error]: Parameters does not match");
      }
    } else {
      return msg;
    }
}