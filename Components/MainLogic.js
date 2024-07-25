import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";
import CryptoJS from "crypto-js";

const db = SQLite.openDatabaseAsync("imageDatabase.db");

export default function App() {
  const [image, setImage] = useState(null);
  const [key, setKey] = useState("");

  // Function to pick an image from the library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera roll is required!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to encrypt and save the image
  const encryptImage = async () => {
    if (image && key) {
      const response = await fetch(image);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];
        const encryptedImage = CryptoJS.AES.encrypt(
          base64Image,
          key
        ).toString();
        saveToDatabase(encryptedImage);
      };
      reader.readAsDataURL(blob);
    } else {
      Alert.alert("Error", "Please select an image and provide a key");
    }
  };

  // Function to save encrypted image to SQLite database
  const saveToDatabase = (encryptedImage) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT);"
      );
      tx.executeSql(
        "INSERT INTO images (image) VALUES (?);",
        [encryptedImage],
        () => {
          Alert.alert("Success", "Image saved successfully!");
        },
        (_, error) => {
          Alert.alert("Error", "Error saving image: " + error.message);
        }
      );
    });
  };

  // Function to decrypt image from database and display it
  const decryptImage = () => {
    if (key) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM images ORDER BY id DESC LIMIT 1;",
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
              const encryptedImage = rows.item(0).image;
              const decryptedBytes = CryptoJS.AES.decrypt(encryptedImage, key);
              const decryptedImage = decryptedBytes.toString(CryptoJS.enc.Utf8);
              setImage(`data:image/jpeg;base64,${decryptedImage}`);
            } else {
              Alert.alert("Error", "No images found in the database");
            }
          }
        );
      });
    } else {
      Alert.alert("Error", "Please provide a key to decrypt");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Enter key"
        value={key}
        onChangeText={setKey}
      />
      <Button title="Encrypt and Save Image" onPress={encryptImage} />
      <Button title="Decrypt Image" onPress={decryptImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
});
