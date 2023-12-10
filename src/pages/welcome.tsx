import React from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import  {useFetch}  from '../hooks/useFetch';

const WelcomeScreen = ({ navigation }) => {
  const styles = {
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: "dodgerblue",
    },
  };

  const { data, isLoading, error } = useFetch("google.com", { param1: "" });

  console.log(data);

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Welcome")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default WelcomeScreen;
