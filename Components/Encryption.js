import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Empty from "./Empty";
import MainLogic from "./MainLogic";

const Encryption = () => {
  const navigation = useNavigation();
  const data = "Encrption";
  useLayoutEffect(() => {
    navigation.setOptions({
      title: data,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => {
          return [styles.button, pressed ? styles.pressed1 : null];
        }}
      >
        <Text style={styles.buttonText}>Add Image</Text>
      </Pressable>

      <Empty />
      <Pressable
        style={({ pressed }) => {
          return [styles.button, pressed ? styles.pressed1 : null];
        }}
      >
        <Text style={styles.buttonText}>Encrytion</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => {
          return [styles.button, pressed ? styles.pressed1 : null];
        }}
      >
        <Text style={styles.buttonText}>Decryption</Text>
      </Pressable>

      <MainLogic />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "black",
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    padding: 10,
    backgroundColor: "white",
    textAlign: "center",
  },
  pressed1: {
    opacity: 0.5,
    backgroundColor: "red",
  },
});

export default Encryption;
