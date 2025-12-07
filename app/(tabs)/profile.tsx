import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase";
import { AuthContext } from "../../hooks/authContext";

export default function Profile() {
  // Get current authenticated user
  const { user } = useContext(AuthContext);

  // Handles Log Out button press
  const onLogout = () => {
    Alert.alert(
      "Log Out?",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace("/login");
            } catch (err: any) {
              Alert.alert("Logout failed", err.message);
            }
          },
        },
      ]
    );
  };

  return (
    // Gradient background wrapper for profile card
    <LinearGradient
      colors={["#A7F3D0", "#FFB6A3"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.card}>
        <Image
          source={require("../../assets/images/logo_noName.png")}
          style={styles.avatar}
        />

        <Text style={styles.name}>Welcome!</Text>

        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Info</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
        </View>

        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutTxt}>Log Out</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
// Profile card container
  card: {
    width: "92%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 5,
  },
  // Avatar image styling
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    marginBottom: 14,
  },

  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },

  email: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },

  section: {
    width: "100%",
    marginTop: 15,
    paddingTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },

  value: {
    fontSize: 16,
    color: "#4b5563",
    fontWeight: "500",
  },
  // Logout button styling
  logoutBtn: {
    backgroundColor: "#FF7A59",
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    marginTop: 25,
    alignItems: "center",
  },

  logoutTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
