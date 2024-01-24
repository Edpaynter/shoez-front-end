// BottomTabBar.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';;
import WelcomeScreen from '../pages/welcome';
import ProfileScreen from '../screens/proflie';
import HomeScreen from '../screens/home';



const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle:{
    backgroundColor:'#0000ff',
    height:100,
  },
  tabBarItemStyle:{
    backgroundColor:'#00ff00',
    margin:5,
    borderRadius:10,
  }
};

const BottomTabBar: any = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can add more icons based on your pages

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="Welcome" component={WelcomeScreen} /> */}
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};

export default BottomTabBar;
