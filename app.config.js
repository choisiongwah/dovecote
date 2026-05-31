const appJson = require('./app.json');

module.exports = ({ config }) => {
  const googleServicesJsonPath = process.env.GOOGLE_SERVICES_JSON || appJson.expo.android?.googleServicesFile;
  const googleServicesInfoPlistPath = process.env.GOOGLE_SERVICES_INFO_PLIST || appJson.expo.ios?.googleServicesFile;

  return {
    ...appJson,
    expo: {
      ...appJson.expo,
      android: {
        ...appJson.expo.android,
        googleServicesFile: googleServicesJsonPath,
      },
      ios: {
        ...appJson.expo.ios,
        googleServicesFile: googleServicesInfoPlistPath,
      },
    },
  };
};
