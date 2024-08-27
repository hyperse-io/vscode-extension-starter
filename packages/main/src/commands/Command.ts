import { ExtensionContext } from 'vscode';

export interface Command {
  id: string;
  execute(context: ExtensionContext, ...args: any[]): any;
  dispose(): void;
}
