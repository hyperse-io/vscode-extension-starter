import { Uri, Webview } from 'vscode';
import { getNonce } from './getNonce';
import { getUri } from './getUri';

interface IInjectLinkSrc {
  sourcePath: string;
  srcPath: string;
}
export const injectResource = (
  htmlStr: string,
  paths: Record<string, IInjectLinkSrc>,
  webview: Webview,
  extensionUri: Uri
) => {
  const nonce = getNonce();
  let templateStr = htmlStr
    .replace(/{{nonce}}/gm, nonce)
    .replace(/<script /g, `<script nonce="${nonce}" `);
  Object.keys(paths).forEach((key) => {
    const path = paths[key];
    const { sourcePath, srcPath } = path;
    const uri = getUri(webview, extensionUri, [sourcePath]);
    templateStr = templateStr.replace(
      new RegExp(srcPath + '\\?\\d+'),
      uri.toString()
    );
  });

  return templateStr;
};
