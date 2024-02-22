import { ICommand } from "../domain/commands";

export interface ICommandBus{
    execute<T extends ICommand>(command: T): Promise<any>;
}