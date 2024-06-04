declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      ICON_URL: string;
      ICON_LABEL: string;
      CONNECTION_URL: string;
      PROGRAM_ID: string;
    }
  }
}

export {}