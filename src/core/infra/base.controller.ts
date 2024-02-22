import * as express from "express";
import { ValidationError } from 'express-validator';

//
import { HttpMessages } from '../constants/http.messages';
import { writeLog, logType } from '../../logger';

export abstract class BaseController {
  
  protected req!: any;
  protected res!: any;

  protected abstract executeImpl(): Promise<void | any>;

  public async execute(req: any, res: any): Promise<void> {
    this.req = req;
    this.res = res;    

    const globalAny:any = global;
    const lang = req.header('Accept-Language');
    globalAny.lang = lang;    
    try {
      await this.executeImpl();
    } catch (err) {
      console.log(`${HttpMessages.msj.baseError} - ${req.route.path}`);
      console.log(err);
    }
  }

  protected jsonResponse(code: number, message: string) {
    return this.res.status(code).json({ message });
  }

  protected ok<T>(dto?: T) {
    if (!!dto) {
      return this.res.status(200).json(dto);
    } else {
      return this.res.status(200).json(true);
    }
  }

  protected created() {
    return this.res.sendStatus(201);
  }

  protected deleted(message?: string) {
    return this.jsonResponse(202, message ? message : HttpMessages.msj.deleted);
  }

  protected clientError(message?: string) {
    return this.jsonResponse(400, message ? message : HttpMessages.msj.badRequest);
  }

  protected unauthorized(message?: string) {
    return this.jsonResponse(401, message ? message : HttpMessages.msj.unauthorized);
  }

  protected paymentRequired(message?: string) {
    return this.jsonResponse(402, message ? message : HttpMessages.msj.paymentRequired);
  }

  protected forbidden(message?: string) {
    return this.jsonResponse(403, message ? message : HttpMessages.msj.forbidden);
  }

  protected notFound(message?: string) {
    return this.jsonResponse(404, message ? message : HttpMessages.msj.notFound);
  }

  protected conflict(message?: string) {
    return this.jsonResponse(409, message ? message : HttpMessages.msj.conflict);
  }

  protected tooMany(message?: string) {
    return this.jsonResponse(429, message ? message : HttpMessages.msj.tooManyRequests);
  }

  protected fail(error: any | string | ValidationError[]) {
    this.log(error);
    return this.res.status(500).json({
      message: error
    })
  }  

  private log(error: any | string){
    writeLog(error, logType.error);
  }
}