import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <LinearGradient
      colors={["#A7F3D0", "#FFB6A3"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      <View style={s.card}>
        <Image
          source={require("../../assets/images/logo_noName.png")}
          style={s.logo}
        />

        <Text style={s.h1}>Welcome to Wander Pets 🐾</Text>
        <Text style={s.sub}>
          Let's together be the hero that they need. Login to explore more features!
        </Text>

        <Link href="/login" asChild>
          <Pressable style={s.btnPrimary}>
            <Text style={s.btnTxt}>Log in</Text>
          </Pressable>
        </Link>

        <Link href="/register" asChild>
          <Pressable style={s.btnGhost}>
            <Text style={s.btnGhostTxt}>Create account</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={s.footer}>Life is better when you have them 💕</Text>
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
    width: 160,
    height: 160,
    borderRadius: 90,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  h1: { fontSize: 26, fontWeight: "800", color: "#111827", textAlign: "center" },
  sub: {
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 12,
    fontSize: 15,
    lineHeight: 22,
  },
  btnPrimary: {
    backgroundColor: "#FF7A59",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    minWidth: 220,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#FF7A59",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  btnTxt: { color: "#fff", fontWeight: "800", fontSize: 16 },
  btnGhost: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    minWidth: 220,
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  btnGhostTxt: { color: "#111827", fontWeight: "700", fontSize: 15 },
  footer: {
    marginTop: 20,
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
