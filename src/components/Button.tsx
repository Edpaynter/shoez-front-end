import React from 'react';
import { Text, Pressable } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    <Pressable
      style={{
        borderRadius: 8,
        height: 50,
        width: 245,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e94832',
        margin: 10
      }} 
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: 'white', textTransform: 'uppercase' }}
      >
        {label}
      </Text>
    </Pressable>
  );
}