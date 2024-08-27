export {};

// Here we declare the members of the process.env object, so that we
// can use them in our application code in a type-safe manner.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXT_UMAMI_ID: string;
    }
  }

  interface Window {
    vscode: any;
    acquireVsCodeApi: () => any;
  }
}
