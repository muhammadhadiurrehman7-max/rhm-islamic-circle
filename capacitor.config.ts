import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.rhm.islam360",
  appName: "RHM Islam 360",
  webDir: "www",
  server: {
    url: "https://rhm-islamic-circle.vercel.app",
    androidScheme: "https",
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
