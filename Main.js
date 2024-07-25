import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Main = () => {
  const navigation = useNavigation();
  function openEncrypt() {
    // Alert.alert("hi", "this is Me");
    navigation.navigate("Encryption");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.innerContainer}>Introduction</Text>
      <View>
        <Text style={styles.innerContainer1}>
          This is an app where you can encrypt and decrypt your images and send
          your encrypted and decrypted images to someone.
        </Text>
      </View>
      <View>
        <Pressable
          onPress={openEncrypt}
          style={({ pressed }) => [styles.btn, pressed ? styles.pressed : null]}
        >
          <Text style={styles.btnText}>Encrypt Here</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 20,
  },
  innerContainer: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  innerContainer1: {
    color: "white",
    textAlign: "center",
    marginVertical: 30,
    fontSize: 20,
  },
  btn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
});
