import { Text } from "@react-navigation/elements";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
        <View style={styles.header} >
        <View style={styles.logoWrapper}>
          <Image
          source={require("../../assets/images/logo_noName.png")}
          style={styles.logo}
        />
        </View>

        <Text style={styles.title}>
          WANDER <Text style={[styles.title, styles.titlePets]}>PETS</Text>
          </Text>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff", 
  },
  header: {
    alignItems: "center",
    marginTop: 15,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 90,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7F50",
    letterSpacing: 2,
    marginTop: -40
  },
  titlePets: {
    color: "#EF7A8B"
  },
    logoWrapper: {
    borderRadius: 90,
    shadowColor: "#EF7A8B",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 }
  },
})