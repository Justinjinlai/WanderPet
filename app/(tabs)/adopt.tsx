import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";



type Pet = {
  id: string;
  name: string;
  breed: string;
  age: string;
  photo: string;
  gender: "male" | "female";
};

const PETS: Pet[] = [
  {
    id: "1",
    name: "Coco",
    breed: "Golden Retriever",
    age: "2 yrs",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Milo",
    breed: "Corgi",
    age: "1 yr",
    gender: "male",
    photo:
      "https://images.unsplash.com/photo-1636910825036-da032f0114ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
  },
  {
    id: "3",
    name: "Luna",
    breed: "Tabby Cat",
    age: "3 yrs",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1589872267076-a0859175685b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
  },
  {
    id: "4",
    name: "Rocky",
    breed: "German Shepherd",
    age: "4 yrs",
    gender: "male",
    photo:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1067",
  },
   {
    id: "5",
    name: "Bella",
    breed: "Labrador Retriever",
    age: "3 yrs",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1537204696486-967f1b7198c8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
  },
     {
    id: "6",
    name: "Mochi",
    breed: "Scottish Fold",
    age: "4 yrs",
    gender: "male",
    photo:
      "https://images.unsplash.com/photo-1700162234258-8fb5a8f76ff4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
  },
     {
    id: "7",
    name: "Coco",
    breed: "Shiba Inu",
    age: "2 yrs",
    gender: "male",
    photo:
      "https://images.unsplash.com/photo-1614963366702-db2a49b009e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
  },
     {
    id: "8",
    name: "Nala",
    breed: "Calico Cat",
    age: "3 yrs",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1719414674839-34f3a0114461?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
  },
];

export default function AdoptHubInPawTab() {
  const [query, setQuery] = useState("");
  const filtered = PETS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.breed.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={s.container}>
      <Text style={s.title}>🐾 Adopt a pet</Text>
      <Text style={s.subtitle}>Every adoption story begins with an act of kindness</Text>

      {/* grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => <PetCard pet={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function PetCard({ pet }: { pet: Pet }) {
  return (
    <View style={s.card}>
      <Image source={{ uri: pet.photo }} style={s.image} />
      <View style={s.badgeRow}>
        <View style={[s.badge, { backgroundColor: "#FEE2E2" }]}>
          <Text style={[s.badgeTxt, { color: "#B91C1C" }]}>{pet.gender === "male" ? "♂" : "♀"}</Text>
        </View>
        <View style={[s.badge, { backgroundColor: "#E0F2FE" }]}>
          <Text style={[s.badgeTxt, { color: "#0369A1" }]}>{pet.age}</Text>
        </View>
      </View>

      <View style={s.info}>
        <Text style={s.name}>{pet.name}</Text>
        <Text style={s.breed}>{pet.breed}</Text>
      </View>

      <Pressable
        style={s.adoptBtn}
        onPress={() =>
          Alert.alert(
            "Adoption Request",
            "Thanks for your interest! We'll contact you soon 🧡"
          )
        }
  >
      <FontAwesome5 name="heart" size={14} color="#fff" />
      <Text style={s.adoptTxt}>Adopt</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 26, fontWeight: "800", color: "#111827" },
  subtitle: { color: "#6B7280", marginBottom: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  searchInput: { flex: 1, padding: 8 },

  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  image: { width: "100%", height: 150 },
  badgeRow: { position: "absolute", top: 10, left: 10, flexDirection: "row", gap: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeTxt: { fontWeight: "800", fontSize: 12 },

  info: { padding: 10 },
  name: { fontSize: 16, fontWeight: "700", color: "#111827" },
  breed: { color: "#6B7280", fontSize: 13 },
  meta: { color: "#9CA3AF", fontSize: 12, marginTop: 2 },

  adoptBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF7A59",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  adoptTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
