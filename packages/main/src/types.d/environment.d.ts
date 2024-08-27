export {};

// Here we declare the members of the process.env object, so that we
// can use them in our application code in a type-safe manner.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FLATJS_WEBVIEW_DASHBOARD_SERVE_URL: string;
    }
  }
  const IS_PRODUCTION = boolean;
}
