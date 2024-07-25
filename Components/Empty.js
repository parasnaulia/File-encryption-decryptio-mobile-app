import { StyleSheet, View, Text } from "react-native";
const Empty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.inner}>No Image is There</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    alignItems: "center",
  },
  inner: {
    color: "white",
  },
});
export default Empty;
