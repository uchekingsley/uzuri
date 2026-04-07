import { router } from "expo-router";
import React, { useState } from "react";
import {
  DimensionValue,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProgressBar from "@/components/ProgressBar";

const genders = [
  { id: "male", label: "Male", image: require("@/assets/images/gender_male.png") },
  { id: "female", label: "Female", image: require("@/assets/images/gender_female.png") },
];

const GenderSelection = () => {
  const insets = useSafeAreaInsets();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);

    setTimeout(() => {
      router.push("/(auth)/texture");
    }, 400);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: insets.top + 12,
          gap: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="#263238" />
        </TouchableOpacity>

        <ProgressBar step={1} total={7} />
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 40 }}>
        <Text
          style={{
            fontSize: 36,
            fontFamily: "Grotley",
            color: "#352A2A",
            lineHeight: 44,
          }}
        >
          What's your gender?
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#667085",
            marginTop: 12,
            lineHeight: 24,
            fontWeight: "400",
          }}
        >
          Our hormonal makeup significantly determines what our skin will need
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 24,
          marginTop: 60,
          paddingHorizontal: 24,
        }}
      >
        {genders.map((gender) => {
          const isSelected = selectedGender === gender.id;
          return (
            <Pressable
              key={gender.id}
              onPress={() => handleGenderSelect(gender.id)}
              style={({ pressed }) => [
                styles.card,
                isSelected && styles.selectedCard,
                pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }
              ]}
            >
              <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                {gender.image ? (
                  <Image source={gender.image} style={{ width: 64, height: 64 }} resizeMode="contain" />
                ) : (
                  <Ionicons name="sparkles-outline" size={48} color="#611485" />
                )}
              </View>
              <Text style={[styles.cardTitle, isSelected && styles.selectedCardTitle]}>
                {gender.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    height: 180,
    backgroundColor: "#F9F5FF", // Very light purple
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#611485",
    backgroundColor: "#F4EBFF",
  },
  selectedIconContainer: {

  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#611485",
  },
  selectedCardTitle: {
    fontWeight: "700",
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  }
});

export default GenderSelection;
