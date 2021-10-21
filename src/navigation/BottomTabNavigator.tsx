import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Dices from '../screens/Dices';
import Calculator from '../screens/Calculator';
import CharactersNavigation from './CharactersNavigator';
import History from '../screens/History';

type BottomTabParamList = {
  Dices: undefined;
  Calculator: undefined;
  Characters: undefined;
  History: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Dices">
      <BottomTab.Screen
        name="Dices"
        component={Dices}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={30} name="dice-6" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={30} name="calculator" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Characters"
        component={CharactersNavigation}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={30} name="account" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={30} name="history" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
