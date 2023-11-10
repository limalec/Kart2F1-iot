import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen';
import LeaderBoard from './pages/LeaderBoard';
import Login from './pages/Login';
import NfcScreen from './pages/NfcScreen';
import NfcDetails from './pages/NfcDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='LeaderBoard' component={LeaderBoard} />
        <Stack.Screen name='NfcScreen' component={NfcScreen} />
        <Stack.Screen name='NfcDetails' component={NfcDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

