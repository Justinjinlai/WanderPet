import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { db, storage } from "../../firebase";

export default function ReportPet() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [showTypeOptions, setShowTypeOptions] = useState(false);

  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  // Error states
  const [errors, setErrors] = useState({
    petName: "",
    petType: "",
    description: "",
    contact: "",
  });

  // ====== VALIDATION ======
  const validatePetName = (text) => {
    const cleaned = text.replace(/[^a-zA-Z ]/g, "");
    setPetName(cleaned);

    if (cleaned.length < 2) {
      setErrors((prev) => ({ ...prev, petName: "Enter at least 2 letters." }));
    } else {
      setErrors((prev) => ({ ...prev, petName: "" }));
    }
  };

  const validatePetType = (value) => {
    setPetType(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, petType: "Please select a pet type." }));
    } else {
      setErrors((prev) => ({ ...prev, petType: "" }));
    }
  };

  const validateDescription = (text) => {
    const cleaned = text.replace(/[^\w\s.,!?-]/g, "");
    setDescription(cleaned);

    if (cleaned.length < 10) {
      setErrors((prev) => ({
        ...prev,
        description: "Description must be at least 10 characters.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const formatPhone = (text) => {
    const nums = text.replace(/\D/g, "").slice(0, 10);
    let formatted = nums;

    if (nums.length >= 4 && nums.length < 7) {
      formatted = `${nums.slice(0, 3)}-${nums.slice(3)}`;
    } else if (nums.length >= 7) {
      formatted = `${nums.slice(0, 3)}-${nums.slice(3, 6)}-${nums.slice(6)}`;
    }

    setContact(formatted);

    if (nums.length < 10) {
      setErrors((prev) => ({
        ...prev,
        contact: "Phone number must be 10 digits.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, contact: "" }));
    }
  };

  // Pick Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload to Firebase
  const uploadImage = async () => {
    if (!image) return null;

    const response = await fetch(image);
    const blob = await response.blob();

    const fileName = `pets/${Date.now()}.jpg`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  // Submit
 const submit = async () => {
  if (
    !petName ||
    !petType ||
    !description ||
    !contact ||
    Object.values(errors).some((e) => e !== "")
  ) {
    Alert.alert("Error", "Please fix the errors before submitting.");
    return;
  }

  setUploading(true);

  try {
    const imageURL = await uploadImage();

    await addDoc(collection(db, "lostPets"), {
      petName,
      petType,
      description,
      contact,
      imageURL: imageURL || "",
      timestamp: serverTimestamp(),
    });

    Alert.alert("Success", "Pet reported successfully!");

    // reset fields
    setPetName("");
    setPetType("");
    setDescription("");
    setContact("");
    setImage(null);

  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Something went wrong.");
  }

  setUploading(false);
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report Lost Pet</Text>

      {/* Image Upload */}
      <Text style={styles.label}>📸 Pet Photo</Text>
      <TouchableOpacity style={styles.imageCard} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to upload a pet photo</Text>
        )}
      </TouchableOpacity>

      {/* Pet Name */}
      <Text style={styles.label}>🐶 Pet Name</Text>
      <TextInput
        style={[styles.input, errors.petName && styles.inputError]}
        placeholder="e.g., Bella"
        placeholderTextColor="#FFB6A6"
        value={petName}
        onChangeText={validatePetName}
      />
      {errors.petName ? <Text style={styles.errorText}>{errors.petName}</Text> : null}

      {/* CUSTOM PET TYPE SELECTOR */}
      <Text style={styles.label}>🐾 Pet Type</Text>

      <TouchableOpacity
        style={[styles.selectBox, errors.petType && styles.inputError]}
        onPress={() => setShowTypeOptions(!showTypeOptions)}
      >
        <Text style={{ color: petType ? "#333" : "#FFB6A6" }}>
          {petType || "Tap to choose pet type"}
        </Text>
      </TouchableOpacity>

      {showTypeOptions && (
        <View style={styles.optionList}>
          {["Dog", "Cat", "Bird", "Rabbit", "Other"].map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.optionItem}
              onPress={() => {
                validatePetType(type);
                setShowTypeOptions(false);
              }}
            >
              <Text style={styles.optionText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {errors.petType ? <Text style={styles.errorText}>{errors.petType}</Text> : null}

      {/* Description */}
      <Text style={styles.label}>📝 Description</Text>
      <TextInput
        style={[styles.input, styles.description, errors.description && styles.inputError]}
        placeholder="Describe the pet..."
        placeholderTextColor="#FFB6A6"
        value={description}
        onChangeText={validateDescription}
        multiline
      />
      {errors.description ? (
        <Text style={styles.errorText}>{errors.description}</Text>
      ) : null}

      {/* Contact */}
      <Text style={styles.label}>📞 Contact Number</Text>
      <TextInput
        style={[styles.input, errors.contact && styles.inputError]}
        placeholder="e.g. 716-555-1234"
        placeholderTextColor="#FFB6A6"
        keyboardType="number-pad"
        value={contact}
        onChangeText={formatPhone}
      />
      {errors.contact ? <Text style={styles.errorText}>{errors.contact}</Text> : null}

      {/* Submit */}
      <TouchableOpacity
        style={[styles.button, uploading && styles.buttonDisabled]}
        onPress={submit}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Submitting..." : "Submit Report"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ========== STYLES ==========
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF7F50",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF4D4D",
  },
  errorText: {
    color: "#FF4D4D",
    marginBottom: 8,
    marginLeft: 4,
  },

  // Custom selector
  selectBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
  },
  optionList: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginTop: 5,
    overflow: "hidden",
  },
  optionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },

  description: {
    height: 100,
    textAlignVertical: "top",
  },

  imageCard: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#FF7F50",
    backgroundColor: "#FFF4EF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    color: "#FF7F50",
    fontSize: 15,
    opacity: 0.7,
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },

  button: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#FF7F50",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#FFA07A",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
