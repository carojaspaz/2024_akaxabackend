import * as dotenv from 'dotenv';
dotenv.config();

import { ApiConfig } from '../core/constants';

const production = process.env.NODE_ENV || ApiConfig.setup.productionEnv;
const version = 1; 
const urlDatabase = process.env.DATA_DB_URL || "mongodb+srv://developer:eD3Big5TuFNEsJAF@akaxadevelopment.uddpu.azure.mongodb.net/akaxadata?retryWrites=true&w=majority";
const jwtSecret = process.env.JWT_SECRET || "l36wo6zrSraxGsd5AITXyPhfy9m5Mxio9z4tMiNc";
const port = process.env.PORT || 4000;
const awsBucket = process.env.AWS_BUCKET || "akaxabucket"
const awsId = process.env.AWS_ID || "AKIAYNQVSAE2QFV7TIOQ"
const awsSecret = process.env.AWS_SECRET || "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"
const awsRegion = process.env.AWS_REGION || 'us-east-2'
const sendGrid = process.env.SENDGRID || "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"
const email = process.env.EMAIL
const superUserEmail = 'superuser@safetyntrust.com'

export const Config = {
  version,
  port,
  urlDatabase,
  jwtSecret,
  production,
  awsBucket,
  awsId,
  awsSecret,
  awsRegion,
  sendGrid,
  email,
  superUserEmail
}