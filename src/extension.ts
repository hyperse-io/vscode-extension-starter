// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CommandsManager } from './commands/CommandsManager';
import { TYPES } from './constants';
import { container } from './container';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const cmdManager = container.get<CommandsManager>(TYPES.CommandManager);
  cmdManager.registerCommands(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
