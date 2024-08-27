import * as fs from 'fs';
import path from 'path';
import { Uri } from 'vscode';

export const readHtmlTemplateByFile = (extensionUri: Uri, paths: string) => {
  return fs.readFileSync(
    path.join(extensionUri.path, paths).toString(),
    'utf-8'
  );
};
