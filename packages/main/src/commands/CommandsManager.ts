import { injectable, multiInject } from 'inversify';
import * as vscode from 'vscode';
import { TYPES } from '../constants';
import { Command } from './Command';

@injectable()
export class CommandsManager {
  constructor(@multiInject(TYPES.Command) private commands: Command[]) {}

  registerCommands(context: vscode.ExtensionContext) {
    for (const c of this.commands) {
      const disposableCmd = vscode.commands.registerCommand(
        c.id,
        c.execute.bind(c, context),
        c
      );
      context.subscriptions.push(disposableCmd);
    }
  }
}
