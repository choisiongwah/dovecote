# dovecote
React Native Expo messenger

This repository is an Expo-managed React Native app scaffold configured to receive push notifications (Expo Push + FCM for Android). The project is set up for cloud builds using Expo Application Services (EAS).

**Quick start (cloud build)**

- Install CLI tools:

```bash
npm install -g eas-cli expo-cli
```

- Install dependencies (locally to edit / test):

```bash
npm install
```

- Login to Expo / EAS:

```bash
eas login
expo login
```

- Configure Firebase (Android) and FCM:
	- Create a Firebase project in the Firebase console.
	- Add an Android app and download `google-services.json`.
	- Place `google-services.json` at the project root (it's referenced in `app.json`).
	- In the Firebase console go to Project Settings → Cloud Messaging and copy the Server key if you plan to send FCM messages directly.

- Build on Expo cloud (EAS):

```bash
eas build -p android --profile production
eas build -p ios --profile production
```

When building for Android, EAS will prompt to configure credentials. You can also upload `google-services.json` and FCM credentials via `eas credentials` or the Expo web dashboard.

**How notifications work in this scaffold**

- The app uses `expo-notifications` to obtain an Expo Push Token. The app shows the token in the UI.
- For development with Expo Go you can use the Expo Push Notification tool and the Expo push token.
- For standalone builds on Android you must provide FCM credentials (`google-services.json` and server key) to receive pushes.

**Sending a test push via Expo Push API**

Use the token shown in the app. Example curl:

```bash
curl -X POST https://exp.host/--/api/v2/push/send \
	-H "Content-Type: application/json" \
	-d '{"to":"<EXPO_PUSH_TOKEN>","title":"Test","body":"Hello from curl"}'
```

**Notes / next steps**

- Do NOT commit `google-services.json` or any secret keys to version control. Add them to `.gitignore` if needed.
- To send pushes from your server, either use the Expo push service (send to Expo token) or send directly via FCM using the native token and your server key.
- If you want, I can:
	- Add CI for automated builds with EAS
	- Add server-side example to send FCM messages
	- Walk you through uploading credentials to EAS step-by-step

