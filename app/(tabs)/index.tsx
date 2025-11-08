import { Text } from "@react-navigation/elements";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBlock}>
        <View style={styles.header} >
          <View style={styles.logoWrapper}>
            <Image
            source={require("../../assets/images/logo_noName.png")}
            style={styles.logo}
          />
          </View>
          <Text style={styles.title}>
            WANDERS <Text style={[styles.title, styles.titlePets]}>PETS</Text>
          </Text>
        </View>
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
  backgroundBlock: {
    backgroundColor: "#7DFCD5",
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#FF7F50",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginTop: 15,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 90,
    marginTop: -20
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