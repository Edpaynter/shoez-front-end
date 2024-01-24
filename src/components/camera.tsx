// CameraComponent.tsx

import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

interface CameraComponentProps {
  navigation: any
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ navigation }) => {
  const cameraRef: any = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(undefined);
  const [type, setType] = useState(Camera.Constants.Type['back']);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode['off']);

  useEffect(() => {
   
    const updateImage = async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus: any = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
    }
    updateImage();
    console.log('Value of image', image);
  }, [image])


  const handleTakePicture = async () => {
    if (cameraRef) {
    
      try {
        console.log('IN TRY block')
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current?.takePictureAsync(options);
        await setImage(data.uri);
        console.log('DataUri', data.uri);
      } catch (e) {
        console.log('Error', e);
      }
    }
  };

  const handleClose = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {image === null ?
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        /> :
        <Image source={{ uri: image }} style={styles.camera}></Image>
      }


      {image !== null ?
        <View style={styles.captureContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={setImage(null)}>
            RETAKE PICTURE
          </TouchableOpacity>
        </View>
        :
        <View style={styles.captureContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture}>
            <Text style={styles.captureText}>CAPTURE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose} >
            <Text style={styles.closeText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    borderRadius: 20,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    margin: 15,
  },
  captureText: {
    color: '#000',
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 15,
    margin: 15,
  },
  closeText: {
    color: '#fff',
  },
});

export default CameraComponent;
