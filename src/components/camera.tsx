// CameraComponent.tsx

import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import CameraButton from "./CameraButton";
import { useFetch } from "../hooks/useFetch";

interface CameraComponentProps {
  navigation: any;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type["back"]);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode["off"]);
  
  const [state, setState] = useState({});

  const processImage = async (image) => {
     // POST request using fetch with error handling
     let formData = new FormData();
     formData.append('file' , image.uri)
     const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
  };
  fetch('localhost:5000/classify-image', requestOptions)
      .then(async response => {
          // const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = await response.json();
        console.log(data);
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

  const cameraRef: any = useRef(null);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      console.log("Camera Status", cameraStatus);
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef) {
      try {
        // const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current?.takePictureAsync();
        setImage(data.uri);
        await processImage(data);
        console.log("DataUri", data.uri);
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const handleSaveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
     
        alert("Picture saved! Woo!");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleClose = () => {
    navigation.navigate("Dashboard");
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
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
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back,
                )
              }
            />
            <CameraButton
              icon="flash"
              color={
                flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off,
                );
              }}
            />
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
              }}
            />
            <CameraButton
              title={"Save"}
              icon="check"
              onPress={handleSaveImage}
            />
          </View>
        ) : (
          <CameraButton
            title={"Take a picture"}
            icon="camera"
            onPress={handleTakePicture}
          />
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
