import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <LinearGradient
        colors={["#aaf0ea", "#7ee4e0", "#4fd3d0"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Image source={require("../../assets/images/logo.png")} resizeMode="contain" style={styles.logo} />

          <View style={styles.form}>
            <TextInput
              placeholder="Username or Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity onPress={() => console.log("Sign in pressed")} style={[styles.btn, styles.btnTeal]}>
              <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.inline}>
              <Text style={styles.inlineText}>New here?</Text>
              <Link href="/register" style={styles.linkText}>Register</Link>
            </View>

            <TouchableOpacity onPress={() => router.replace("/(tabs)")} style={[styles.btn, styles.btnBlack]}>
              <Text style={styles.btnText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  logo: { width: 220, height: 220, marginBottom: 8 },
  form: { width: "100%", maxWidth: 360, marginTop: 8 },
  input: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  btn: {
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  btnTeal: { backgroundColor: "#0ea5e9" }, // bright teal
  btnBlack: { backgroundColor: "#000000" },
  btnText: { color: "#fff", fontWeight: "600" },
  inline: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 8, gap: 6 },
  inlineText: { color: "rgba(0,0,0,0.8)" },
  linkText: { color: "#000", fontWeight: "600" },
});
