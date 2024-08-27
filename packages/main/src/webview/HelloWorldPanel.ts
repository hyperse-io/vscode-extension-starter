import {
  Disposable,
  Uri,
  ViewColumn,
  Webview,
  WebviewPanel,
  window,
} from 'vscode';
import { WebviewPanelBase } from './WebviewPanelBase';

/**
 * This class manages the state and behavior of HelloWorld webview panels.
 *
 * It contains all the data and methods for:
 *
 * - Creating and rendering HelloWorld webview panels
 * - Properly cleaning up and disposing of webview resources when the panel is closed
 * - Setting the HTML (and by proxy CSS/JavaScript) content of the webview panel
 * - Setting message listeners so data can be passed between the webview and extension
 */
export class HelloWorldPanel extends WebviewPanelBase {
  get moduleName() {
    return 'dashboard';
  }

  createWebviewPanel(extensionUri: Uri) {
    return window.createWebviewPanel(
      // Panel view type
      'showHelloWorld',
      // Panel title
      'Hello World',
      // The editor column the panel should be displayed in
      ViewColumn.One,
      // Extra panel configurations
      {
        // Enable JavaScript in the webview
        enableScripts: true,
        // Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
        localResourceRoots: [Uri.joinPath(extensionUri, 'public/')],
      }
    );
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  setupWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case 'hello':
            // Code that should run in response to the hello message command
            window.showInformationMessage(text);
            return;
          // Add more switch case statements here as more webview message commands
          // are created within the webview context (i.e. inside media/main.js)
        }
      },
      undefined,
      this.disposables
    );
  }

  onMount(): void {
    // Code that should run when the webview panel is first revealed
    console.log('HelloWorldPanel mounted');
  }
  onDispose(): void {
    // Code that should run when the webview panel is disposed
    console.log('HelloWorldPanel onDispose');
  }
  onShow(): void {
    // Code that should run when the webview panel is shown
    console.log('HelloWorldPanel onShow');
  }
  onHide(): void {
    // Code that should run when the webview panel is hidden
    console.log('HelloWorldPanel onHide');
  }
}
