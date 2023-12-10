import React from "react";
import WelcomeScreen from "./src/pages/welcome";
import SignUpScreen from "./src/pages/signup";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


export default function App() {
 

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer style={''}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
