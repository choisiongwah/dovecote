module.exports = {
  expo: {
    name: "Dovecote",
    slug: "dovecote",
    version: "1.0.0",
    platforms: [
      "ios",
      "android"
    ],
    android: {
      package: "com.daemon.dovecote",
      googleServicesFile: "./google-services.json"
    },
    ios: {
      bundleIdentifier: "com.daemon.dovecote",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    extra: {
      eas: {
        projectId: "8b22cf1c-ee0a-440c-bb0d-70f47d4481ee"
      }
    }
  }
};
