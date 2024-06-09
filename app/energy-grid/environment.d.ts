declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      ICON_URL: string;
      ICON_LABEL: string;
      CONNECTION_URL: string;
      PROGRAM_ID: string;
      HOURLY_PRICE: string;
      MERCHANT_SECRET_KEY: string;
      ENERGY_DEVICE_NAME: string;
      ENERGY_DEVICE_OUTPUT_POWER: string;
      ENERGY_DEVICE_CAPACITY: string;
      ENERGY_DEVICE_LATITUDE: string;
      ENERGY_DEVICE_LONGITUDE: string;
    }
  }
}

export {}