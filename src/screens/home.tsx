// HomeScreen.tsx

import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface HomeScreenProps {
  navigation: any; // Replace 'any' with the correct navigation type
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleSearch = (searchQuery: string) => {
    console.log('Search Query:', searchQuery);
  };

  const handleCameraAccess = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={handleSearch}
      />
      <Button title="Access Camera" onPress={handleCameraAccess} />

      {/* Additional UI components or content can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
