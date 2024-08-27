# webviews guidelines

https://code.visualstudio.com/api/ux-guidelines/overview#webviews

https://code.visualstudio.com/api/ux-guidelines/webviews

Do

- Only use webviews when absolutely necessary
- Activate your extension only when contextually appropriate
- Open webviews only for the active window
- Ensure all elements in the view are themeable (see the ([webview-view-sample](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/media/main.css)) and [color tokens](https://code.visualstudio.com/api/references/theme-color) documentation)
- Ensure your views follow [accessibility guidance](https://code.visualstudio.com/docs/editor/accessibility) (color contrast, ARIA labels, keyboard navigation)
- Use command actions in the toolbar and in the view
