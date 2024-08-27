const getCodeInfo = (codeInfo) =>
  'codeInfo' in codeInfo ? codeInfo.codeInfo : codeInfo;

const launchEditorEndpoint = '/pages/__inspect-open-in-editor';

/**
 * fetch server api to open the code editor
 */
export const gotoServerEditor = (
  codeInfo?,
  options?: {
    editor?;
  }
) => {
  if (!codeInfo) return;
  codeInfo = getCodeInfo(codeInfo);

  const { lineNumber, columnNumber, relativePath, absolutePath } = codeInfo;

  const isRelative = Boolean(relativePath);
  const fileName = isRelative ? relativePath : absolutePath;

  if (!fileName) {
    console.error(
      `[react-dev-inspector] Cannot open editor without source fileName`,
      codeInfo
    );
    return;
  }

  const launchParams = {
    fileName,
    lineNumber,
    colNumber: columnNumber,
    editor: options?.editor,
  };

  const urlParams = new URLSearchParams(
    Object.entries(launchParams).filter(([, value]) => Boolean(value)) as [
      string,
      string,
    ][]
  );

  fetchToServerEditor({
    apiUrl: launchEditorEndpoint,
    urlParams,
  });
};

const fetchToServerEditor = async ({
  apiUrl,
  urlParams,
  fallbackUrl,
}: {
  apiUrl: string;
  urlParams: URLSearchParams;
  fallbackUrl?: string;
}) => {
  const response = await fetch(`${apiUrl}?${urlParams}`);
  // only 404 need to try fallback legacy endpoint
  if (response.status === 404 && fallbackUrl) {
    return await fetch(`${fallbackUrl}?${urlParams}`);
  }
  return response;
};
