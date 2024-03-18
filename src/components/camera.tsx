// CameraComponent.tsx

import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "./CameraButton";

const CameraComponent = ({ navigation }) => {
  const cameraRef: any = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
  const [image, setImage] = useState(undefined);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode["off"]);
  const [state, setState] = useState({});

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })();
  }, []);

 

  const processImage = async (image) => {
    // POST request using fetch with error handling
    let formData = new FormData();
    formData.append('file', image)
 
    const requestOptions: any = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    };

    fetch('http://10.0.0.156:5000/classify-image', requestOptions)
      .then(async response => {
        // const isJson = response.headers.get('content-type')?.includes('application/json');
        const data: any = await response.json();
        console.log('Data From Fetch Response', data);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setState({ postId: data.id })
      })
      .catch(error => {
        setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  };




  const handleTakePicture = async () => {
    if (cameraRef) {
      try {
        const options = { quality: 1, base64: true, exif: false };
        const data = await cameraRef.current?.takePictureAsync(options);
        setImage(data.uri);
        console.log("DataUri", data.uri);
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const handleSaveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.saveToLibraryAsync(image)
        await processImage(image);
        alert("Picture saved to cameraroll");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleClose = () => {
    navigation.navigate("Dashboard");
  };

  if (!hasCameraPermission) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>
          We need access to your camera
        </Text>
        <CameraButton onPress={setHasCameraPermission(true)} title={"Grant permission"} icon="retweet" color={'red'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 30,
            }}
          >
            <CameraButton
              icon="retweet"
              onPress={() => setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              )} title={undefined} color={undefined}            />
            <CameraButton
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode['off']
                    ? Camera.Constants.FlashMode['on']
                    : Camera.Constants.FlashMode['off']
                );
              } } title={undefined}            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <CameraButton
              title={"Retake"}
              icon="retweet"
              onPress={() => {
                setImage(null);
              } } color={undefined}            />
            <CameraButton
              title={"Save"}
              icon="check"
              onPress={handleSaveImage} color={undefined}            />
          </View>
        ) : (
          <CameraButton
              title={"Take a picture"}
              icon="camera"
              onPress={handleTakePicture} color={undefined}          />
        )}
      </View>
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
    flexDirection: "column",
    backgroundColor: "black",
  },
});

export default CameraComponent;
