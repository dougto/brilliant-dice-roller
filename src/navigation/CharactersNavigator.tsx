import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Characters from '../screens/Characters';
import Character from '../screens/Characters/Character';

const Stack = createStackNavigator();

export default function CharactersNavigation() {
  return (
    <Stack.Navigator initialRouteName="Characters" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Characters" component={Characters} />
      <Stack.Screen name="Character" component={Character} />
    </Stack.Navigator>
  );
}
