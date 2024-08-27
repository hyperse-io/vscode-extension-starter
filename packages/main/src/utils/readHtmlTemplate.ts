export const readHtmlTemplate = async (htmlUrl: string): Promise<string> => {
  return fetch(htmlUrl, {}).then((result) => {
    return result.text();
  });
};
