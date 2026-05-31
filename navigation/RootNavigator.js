import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default function RootNavigator({ isSignedIn }) {
  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <AuthStack />
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={LandingScreen} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
