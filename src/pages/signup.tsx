import React from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";

const SignUpScreen = ({ navigation }) => {

  const styles = {
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#b8860b"
    },
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up Now!</Text>
      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate("Welcome")}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Welcome")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SignUpScreen;
