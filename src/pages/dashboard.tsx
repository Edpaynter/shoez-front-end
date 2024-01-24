import React from "react";
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from 'formik'
import { Entypo as Icon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  BottomTabBar from '../components/BottomTabBar'
import Ionicons from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DashBoardScreen = () => {

  

  const handleLogout = () => {
    // Handle logout logic here
    // For simplicity, let's just navigate back to the login screen
   
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomTabBar />
    </View>
  );
};

export default DashBoardScreen;
