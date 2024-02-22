import { ICommandBus } from "./ICommandBus";
import { ICommand, ICommandHandler } from "../domain/commands";
import { Either, GenericAppError, Result, left, right } from "../logic";
import { MessagingErrors } from './messaging.errors';
import { Config } from '../constants/cqrs.config';
import { Type } from "./type.interface";

type Response = Either<
    GenericAppError.UnexpectedError |
    MessagingErrors.UnregisteredDomainCommand,    
    Result<Promise<void>>>

export declare type CommandHandlerMetaType = Type<ICommandHandler<ICommand>>;

export class CommandBus implements ICommandBus{    
    private _handlers = new Map();
     /**
     *
     */
    constructor(handlers: CommandHandlerMetaType[]) {        
        this.register(handlers);
    } 

    async execute<T extends ICommand>(command: T): Promise<any> {        
        let commandName = this.getCommandName(command);
        const handler = this._handlers.get(commandName);
        if(!handler){
            left(new MessagingErrors.UnregisteredDomainCommand(commandName));
        }             
        return handler.execute(command);        
    }
    
    bind<T extends ICommand>(handler: ICommandHandler<T>, name: string): void{
        this._handlers.set(name, handler);
    }

    protected getCommandName<T extends ICommand>(command: T){
        const { constructor } = Object.getPrototypeOf(command);        
        return constructor.name;
    }

    protected register(handlers: CommandHandlerMetaType[]): void{        
        handlers.forEach((value) => {
            this.registerHandler(value);            
        });
    }

    protected registerHandler(handler: CommandHandlerMetaType) : void {
        const target = this.reflectCommandName(handler);                
        if(!target){
            throw new Error('Invalid command handler.');
        } else {
            this.bind(handler.prototype, target.name);
        }        
    }        

    protected reflectCommandName(handler: any){        
        return Reflect.getMetadata(Config.cqrs.COMMAND_HANDLER_METADATA, handler);
    }
}