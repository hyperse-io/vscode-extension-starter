import {
  Disposable,
  Uri,
  ViewColumn,
  Webview,
  WebviewPanel,
  window,
} from 'vscode';
import { injectResource } from '@/utils/injectResource';
import { readHtmlTemplate } from '@/utils/readHtmlTemplate';
import { readHtmlTemplateByFile } from '@/utils/readHtmlTemplateByFile';

export abstract class WebviewPanelBase {
  protected disposables: Disposable[] = [];
  protected currentPanel: WebviewPanel | undefined;

  public get moduleName(): string {
    return '';
  }

  /**
   * The HelloWorldPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  constructor(protected extensionUri: Uri) {
    // If a webview panel does not already exist create and show a new one
    this.setupWebview(this.extensionUri);
  }

  private setupWebview(extensionUri: Uri) {
    this.currentPanel = this.createWebviewPanel(extensionUri);

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this.currentPanel.onDidDispose(
      () => this.dispose(),
      null,
      this.disposables
    );

    // Mount the webview panel lifecycle events
    this.mountLifeCycle();

    // console.log(
    //   'process.env.FLATJS_WEBVIEW_SERVE_HOST',
    //   process.env.FLATJS_WEBVIEW_SERVE_HOST
    // );

    const isProd = Boolean(IS_PRODUCTION);

    console.log('isProd', isProd);

    const setupHtml = isProd
      ? this.setupWebviewFileContent(extensionUri, this.currentPanel)
      : this.setupWebviewContent();
    // Set the HTML content for the webview panel
    setupHtml
      .then((html) => {
        this.onMount?.();
        console.log('html', html);
        if (this.currentPanel) {
          this.currentPanel.webview.html = html;
        }
        // Set an event listener to listen for messages passed from the webview context
        this.setupWebviewMessageListener(this.webview!);
      })
      .catch((err) => {
        window.showErrorMessage(err);
      });
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  abstract setupWebviewMessageListener(webview: Webview): void;

  /**
   * Create a new webview panel.
   * @param extensionUri The URI of the directory containing the extension
   */
  abstract createWebviewPanel(extensionUri: Uri): WebviewPanel;

  /**
   * Called when the webview panel is first revealed.
   */
  abstract onMount?(): void;

  /**
   * Called when the webview panel is disposed.
   */
  abstract onDispose?(): void;

  /**
   * Called when the webview panel is shown.
   */
  abstract onShow?(): void;

  /**
   * Called when the webview panel is hidden.
   */
  abstract onHide?(): void;

  /**
   * Returns the current webview panel if it exists.
   */
  protected get webview(): Webview | undefined {
    return this.currentPanel?.webview;
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public render() {
    // If the webview panel already exists reveal it
    if (this.currentPanel) {
      this.currentPanel.reveal(ViewColumn.One);
    } else {
      this.setupWebview(this.extensionUri);
    }
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    // Dispose of the current webview panel
    this.currentPanel?.dispose();
    this.onDispose?.();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }

    this.currentPanel = undefined;
  }

  /**
   * Post a message to the webview content.
   *
   * Messages are only delivered if the webview is live (either visible or in the
   * background with `retainContextWhenHidden`).
   *
   * @param message Body of the message. This must be a string or other json serializable object.
   *
   *   For older versions of vscode, if an `ArrayBuffer` is included in `message`,
   *   it will not be serialized properly and will not be received by the webview.
   *   Similarly any TypedArrays, such as a `Uint8Array`, will be very inefficiently
   *   serialized and will also not be recreated as a typed array inside the webview.
   *
   *   However if your extension targets vscode 1.57+ in the `engines` field of its
   *   `package.json`, any `ArrayBuffer` values that appear in `message` will be more
   *   efficiently transferred to the webview and will also be correctly recreated inside
   *   of the webview.
   *
   * @returns A promise that resolves when the message is posted to a webview or when it is
   * dropped because the message was not deliverable.
   *
   *   Returns `true` if the message was posted to the webview. Messages can only be posted to
   * live webviews (i.e. either visible webviews or hidden webviews that set `retainContextWhenHidden`).
   *
   *   A response of `true` does not mean that the message was actually received by the webview.
   *   For example, no message listeners may be have been hooked up inside the webview or the webview may
   *   have been destroyed after the message was posted but before it was received.
   *
   *   If you want confirm that a message as actually received, you can try having your webview posting a
   *   confirmation message back to your extension.
   */
  public postMessage(message: unknown): Thenable<boolean> | undefined {
    return this.currentPanel?.webview.postMessage(message);
  }

  /**
   * Mounts the webview panel lifecycle events.
   * onShow and onHide are called when the webview panel is shown and hidden respectively.
   *
   */
  mountLifeCycle() {
    this.currentPanel?.onDidChangeViewState((state) => {
      const { visible } = state.webviewPanel;
      if (visible) {
        this.onShow?.();
      } else {
        this.onHide?.();
      }
    });
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the React webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  async setupWebviewContent() {
    try {
      const serveHost = process.env.FLATJS_WEBVIEW_SERVE_HOST;
      const servePort = process.env.FLATJS_WEBVIEW_SERVE_PORT;
      const webviewOnlineUrl =
        'http://' + serveHost + ':' + servePort + '/pages/' + this.moduleName;
      return readHtmlTemplate(webviewOnlineUrl);
    } catch (error) {
      return '';
    }
  }

  async setupWebviewFileContent(extensionUri: Uri, panel: WebviewPanel) {
    const output = `./public/${this.moduleName}`;
    const htmlPath = `${output}/index-ntv.html`;
    const htmlFileText = readHtmlTemplateByFile(extensionUri, htmlPath);
    return injectResource(
      htmlFileText,
      {
        appScriptUri: {
          sourcePath: `${output}/bundle.js`,
          srcPath: `bundle.js`,
        },
        appStyleUri: {
          sourcePath: `${output}/bundle.css`,
          srcPath: `bundle.css`,
        },
      },
      panel.webview,
      extensionUri
    );
  }
}
