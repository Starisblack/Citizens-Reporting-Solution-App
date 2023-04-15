import { CapacitorConfig } from '@capacitor/cli';

/// <reference types="@capacitor/push-notifications" />

const config: CapacitorConfig = {
  appId: 'com.notifyMe.app',
  appName: 'NotifyMe',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },

  },

};

export default config;
