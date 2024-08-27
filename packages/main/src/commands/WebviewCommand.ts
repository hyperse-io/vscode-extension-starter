import { inject, injectable } from 'inversify';
import { ExtensionContext } from 'vscode';
import { HelloWorldPanel } from '@/webview/HelloWorldPanel';
import { TYPES } from '../constants';
import { Printer } from '../printer/printer';
import { Command } from './Command';

@injectable()
export class WebviewCommand implements Command {
  constructor(@inject(TYPES.Printer) private printer: Printer) {}

  private webview: HelloWorldPanel | undefined;
  get id() {
    return 'extension.webview';
  }

  execute(context: ExtensionContext) {
    if (!this.webview) {
      this.webview = new HelloWorldPanel(context.extensionUri);
    }
    this.webview.render();
  }

  dispose(): void {
    this.webview?.dispose();
    this.webview = undefined;
  }
}
