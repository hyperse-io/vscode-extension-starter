import { injectable } from 'inversify';
import * as vscode from 'vscode';
import { Printer } from './printer';

@injectable()
export class DefaultPrinter implements Printer {
  print(message: string): void {
    console.log(message);

    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage(
      `${message} from vscode-extension-starter!`
    );
  }
}
