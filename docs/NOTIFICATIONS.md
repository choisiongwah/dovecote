# Notification Flow and Best Practices

This document outlines recommended notification flows, token lifecycle, and secure storage practices for the Dovecote Expo app.

## Overview

- The app uses `expo-notifications` to register devices and obtain an Expo Push Token (or native FCM/APNs tokens for standalone builds).
- Notifications can be sent via the Expo Push Service (using Expo Push Tokens) or via vendor services (FCM for Android, APNs for iOS) when using standalone builds.

## Token lifecycle

1. App starts and requests notification permissions.
2. App obtains a push token (`ExpoPushToken` while using Expo services).
3. If user is authenticated, app POSTs the push token to your backend to associate it with the user's account.
4. Backend stores mapping: `user_id -> [device_tokens]` with device metadata (platform, app version, last seen).
5. When sending user-specific notifications, backend looks up tokens for the user and sends via Expo or FCM.
6. When user logs out, app calls backend to remove the token association.

## Authentication & token storage

- Use short-lived access JWTs and long-lived refresh tokens.
- Store tokens securely on device (do NOT use plain `AsyncStorage` for refresh tokens):
  - Expo: `expo-secure-store` (`SecureStore`) for both access and refresh tokens.
  - Native: iOS Keychain and Android Keystore.
- On app start:
  - Read refresh token from `SecureStore`.
  - If present, call `POST /auth/refresh` to obtain a fresh access token.
  - If refresh succeeds, continue to app; otherwise, present the login screen.
- On login:
  - Receive `access_token` and `refresh_token`.
  - Store both in `SecureStore` and send the push token to the backend to associate with the user.
- On logout:
  - Remove tokens from `SecureStore` and POST to backend to remove push token association.

## Push-token association API (suggested endpoints)

- `POST /devices` — associate a device token with authenticated user
  - Body: `{ token: string, platform: 'android'|'ios', metadata?: {...} }`
- `DELETE /devices/:token` — remove association

## Sending notifications

- For user-specific notifications, server must target tokens associated with that user.
- For app-wide announcements, you can target all tokens or use topics (FCM topics) if preferred.

## Security notes

- Use HTTPS for all endpoints.
- Validate tokens server-side and implement revocation and rotation for refresh tokens.
- Treat push tokens as sensitive: don't expose them publicly or log them indiscriminately.

## Implementation notes for Dovecote

- The app scaffold contains automated retrieval of Expo push token and UI to show it. We will:
  - Add `expo-secure-store` to store JWTs.
  - Add Login screen that accepts credentials and stores tokens.
  - Add Landing screen with a burger menu (using `react-navigation` + `react-native-paper` or similar).
  - On login success, call `POST /devices` on your server to register the push token for the logged-in user.

If you'd like, I can also add a minimal server example that accepts login and device registration endpoints.
