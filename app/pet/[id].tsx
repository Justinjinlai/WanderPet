import { router, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
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
  petName: string;
  petType: string;
  description: string;
  imageURL: string;
  contact: string;
  timestamp?: any;
};

export default function PetDetails() {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      const ref = doc(db, "lostPets", String(id));
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPet(snap.data() as Pet);
      }
      setLoading(false);
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18 }}>Pet not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* IMAGE */}
      {pet.imageURL ? (
        <Image source={{ uri: pet.imageURL }} style={styles.petImage} />
      ) : (
        <View style={styles.noImageBox}>
          <Text style={styles.noImageText}>No Photo Available</Text>
        </View>
      )}

      {/* INFO */}
      <View style={styles.infoSection}>
        <Text style={styles.petName}>{pet.petName}</Text>
        <Text style={styles.petType}>Type: {pet.petType}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{pet.description}</Text>

        <Text style={styles.sectionTitle}>Contact Owner</Text>
        <Text style={styles.contact}>{pet.contact}</Text>

        {/* CONTACT BUTTON */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => {
            alert(`Contact: ${pet.contact}`);
          }}
        >
          <Text style={styles.contactButtonText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  backText: {
    fontSize: 18,
    color: "#FF7F50",
    fontWeight: "600",
  },
  petImage: {
    width: "100%",
    height: 320,
  },
  noImageBox: {
    width: "100%",
    height: 320,
    backgroundColor: "#ffe9df",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#FF7F50",
    fontWeight: "600",
    fontSize: 16,
  },
  infoSection: {
    padding: 20,
  },
  petName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7F50",
  },
  petType: {
    fontSize: 20,
    color: "#777",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 6,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  contact: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: "#FF7F50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  contactButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});
