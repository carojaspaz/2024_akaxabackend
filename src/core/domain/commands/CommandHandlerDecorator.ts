import 'reflect-metadata';
import { ICommand } from './ICommand';
import { Config } from '../../constants/cqrs.config';
const CommandHandler = (command: ICommand) => {
    return (target: any) => {
        Reflect.defineMetadata(Config.cqrs.COMMAND_HANDLER_METADATA, command, target);
    }
};

export { CommandHandler };