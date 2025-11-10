import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  const onRegister = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return Alert.alert("Invalid email");
    if (pwd.length < 6) return Alert.alert("Password must be 6+ chars");
    if (pwd !== confirm) return Alert.alert("Passwords do not match");
    Alert.alert("Account created (demo)", "Backend will wire this later 🐾");
  };

  return (
    <LinearGradient
      colors={["#A7F3D0", "#FFB6A3"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      <View style={s.card}>
        <Image
          source={require("../assets/images/logo_noName.png")}
          style={s.logo}
        />

        <Text style={s.h1}>Create Account</Text>
        <Text style={s.sub}>Join our community and let's help each other 💕</Text>

        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          style={s.input}
          value={pwd}
          onChangeText={setPwd}
          placeholder="password"
          secureTextEntry
          placeholderTextColor="#999"
        />
        <TextInput
          style={s.input}
          value={confirm}
          onChangeText={setConfirm}
          placeholder="confirm password"
          secureTextEntry
          placeholderTextColor="#999"
        />

        <Pressable onPress={onRegister} style={s.btn}>
          <Text style={s.btnTxt}>Create Account</Text>
        </Pressable>

        <Link href="/login" style={s.link}>
          Back to sign in
        </Link>
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 90,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  h1: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  sub: {
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 12,
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#FF7A59",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    shadowColor: "#FF7A59",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  btnTxt: { color: "#fff", fontWeight: "800", fontSize: 16 },
  link: {
    textAlign: "center",
    marginTop: 16,
    color: "#111827",
    fontWeight: "600",
  },
});
