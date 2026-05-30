# Authentication and Token Storage (Dovecote)

This file documents the client-side authentication flow and how tokens are stored for the Dovecote mobile app.

## Login flow (client)

1. User opens the app and sees the login screen.
2. User provides credentials and taps Sign in.
3. App POSTs credentials to `POST /auth/login`.
4. Server responds with `{ access_token, refresh_token, expires_in }`.
5. App stores `refresh_token` and `access_token` in secure storage (`expo-secure-store`).
6. App calls `POST /devices` with `Authorization: Bearer <access_token>` to register push token.

## Token refresh flow

1. Before making API requests, the client checks access token expiry.
2. If expired (or close to expiring), client POSTs `refresh_token` to `POST /auth/refresh`.
3. Server responds with new `access_token` (and optionally a new `refresh_token`).
4. Client updates stored tokens accordingly.

## Logout

1. Client calls `DELETE /devices/:token` to remove push-token association.
2. Client clears tokens from `expo-secure-store`.

## Secure store usage

Use `expo-secure-store` for both `accessToken` and `refreshToken`. Example:

```js
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('refreshToken', refreshToken);
const r = await SecureStore.getItemAsync('refreshToken');
await SecureStore.deleteItemAsync('refreshToken');
```
