import { Container } from 'inversify';
import { AddCommand } from './commands/AddCommand';
import { Command } from './commands/command';
import { CommandsManager } from './commands/CommandsManager';
import { RemoveCommand } from './commands/RemoveCommand';
import { TYPES } from './constants';
import { DefaultPrinter } from './printer/default-printer';
import { Printer } from './printer/printer';
import 'reflect-metadata';

const ioc = new Container();

ioc.bind<Printer>(TYPES.Printer).to(DefaultPrinter);
ioc.bind<Command>(TYPES.Command).to(AddCommand);
ioc.bind<Command>(TYPES.Command).to(RemoveCommand);
ioc.bind<CommandsManager>(TYPES.CommandManager).to(CommandsManager);

export const container = ioc;
