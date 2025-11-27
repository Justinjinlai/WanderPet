import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../firebase";

type Pet = {
  id: string;
  petName: string;
  petType: string;
  description: string;
  imageURL: string;
  contact: string;
  timestamp?: any;
};

export default function Index() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const q = query(
      collection(db, "lostPets"),
      orderBy("timestamp", sortOrder === "newest" ? "desc" : "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const petsData: Pet[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Pet[];

      setPets(petsData);
      setLoading(false);
    });

    return unsubscribe;
  }, [sortOrder]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* HEADER */}
      <View style={styles.backgroundBlock}>
        <View style={styles.header}>
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

      <Text style={styles.feedTitle}>Lost Pets Near You</Text>

      {/* FILTER BUTTONS */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            sortOrder === "newest" && styles.filterButtonActive,
          ]}
          onPress={() => setSortOrder("newest")}
        >
          <Text
            style={[
              styles.filterText,
              sortOrder === "newest" && styles.filterTextActive,
            ]}
          >
            Newest
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            sortOrder === "oldest" && styles.filterButtonActive,
          ]}
          onPress={() => setSortOrder("oldest")}
        >
          <Text
            style={[
              styles.filterText,
              sortOrder === "oldest" && styles.filterTextActive,
            ]}
          >
            Oldest
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOADING */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF7F50" style={{ marginTop: 20 }} />
      ) : (
        pets.map((pet) => (
          <View key={pet.id} style={styles.card}>
            {pet.imageURL ? (
              <Image source={{ uri: pet.imageURL }} style={styles.petImage} />
            ) : (
              <View style={styles.noImageBox}>
                <Text style={styles.noImageText}>No Photo</Text>
              </View>
            )}

            <View style={styles.cardInfo}>
              <Text style={styles.petName}>{pet.petName}</Text>
              <Text style={styles.petType}>Type: {pet.petType}</Text>
              <Text style={styles.petDescription} numberOfLines={2}>
                {pet.description}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
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
    marginTop: -20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7F50",
    letterSpacing: 2,
    marginTop: -40,
  },
  titlePets: {
    color: "#EF7A8B",
  },
  logoWrapper: {
    borderRadius: 90,
    shadowColor: "#EF7A8B",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  feedTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    paddingLeft: 20,
    color: "#333",
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#FFE0D6",
  },
  filterButtonActive: {
    backgroundColor: "#FF7F50",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "white",
    fontWeight: "700",
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFF4EF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#FF7F50",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  petImage: {
    width: "100%",
    height: 200,
    borderRadius: 14,
  },
  noImageBox: {
    width: "100%",
    height: 200,
    backgroundColor: "#ffe9df",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  noImageText: {
    color: "#FF7F50",
    fontWeight: "600",
  },
  cardInfo: {
    marginTop: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF7F50",
  },
  petType: {
    fontSize: 16,
    color: "#555",
    marginTop: 2,
  },
  petDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },
});
