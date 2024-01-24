import React from "react";
import WelcomeScreen from "./src/pages/welcome";
import SignUpScreen from "./src/pages/signup";
import LogInScreen from "./src/pages/login";
import DashBoardScreen from "./src/pages/dashboard";
import CameraComponent from "./src/components/camera";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


export default function App() {


  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer style={''}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Dashboard" component={DashBoardScreen} />
        <Stack.Screen name="Camera" component={CameraComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
