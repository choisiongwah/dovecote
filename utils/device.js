import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function getExpoPushToken() {
  if (!Device.isDevice) return null;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return null;
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export async function registerPushTokenWithServer(accessToken) {
  const token = await getExpoPushToken();
  if (!token) return null;
  try {
    await fetch('https://example.com/devices', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, platform: Device.osName }),
    });
  } catch (e) {
    console.warn('Could not register device token', e);
  }
}
