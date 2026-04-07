import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProgressBar from "@/components/ProgressBar";

const { width: deviceWidth } = Dimensions.get("window");

const concerns = [
  { id: "acne", label: "Acne", image: require("@/assets/images/concerns/acne.png") },
  { id: "eczema", label: "Eczema", image: require("@/assets/images/concerns/eczema.png") },
  { id: "psoriasis", label: "Psoriasis", image: require("@/assets/images/concerns/psoriasis.png") },
  { id: "wrinkles", label: "Wrinkles", image: require("@/assets/images/concerns/wrinkles.png") },
  { id: "dark_spots", label: "Dark spots", image: require("@/assets/images/concerns/dark_spots.png") },
  { id: "redness", label: "Skin redness", image: require("@/assets/images/concerns/redness.png") },
  { id: "dryness", label: "Dryness", image: require("@/assets/images/concerns/dryness.png") },
  { id: "pores", label: "Enlarged pores", image: require("@/assets/images/concerns/pores.png") },
  { id: "none", label: "None of the above", icon: "checkbox-blank-circle-outline" as any },
];

const ConcernCard = ({ 
  label, 
  icon, 
  image,
  isSelected, 
  onPress 
}: { 
  label: string; 
  icon?: keyof typeof MaterialCommunityIcons.glyphMap; 
  image?: any;
  isSelected: boolean; 
  onPress: () => void;
}) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    style={[
      styles.card,
      isSelected && styles.selectedCard
    ]}
  >
    <View style={styles.cardHeader}>
      {image ? (
        <Image source={image} style={{ width: 32, height: 32 }} resizeMode="contain" />
      ) : icon ? (
        <MaterialCommunityIcons 
          name={icon} 
          size={32} 
          color={isSelected ? "#611485" : "#352A2A"} 
        />
      ) : null}
      <View style={[
        styles.checkbox,
        isSelected && styles.selectedCheckbox
      ]}>
        {isSelected && <Feather name="check" size={12} color="#fff" />}
      </View>
    </View>
    <Text style={[
      styles.cardLabel,
      isSelected && styles.selectedCardLabel
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const ConcernsScreen = () => {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleConcern = (id: string) => {
    if (id === "none") {
      setSelected(["none"]);
      return;
    }
    
    setSelected(prev => {
      const filtered = prev.filter(item => item !== "none");
      if (filtered.includes(id)) {
        return filtered.filter(item => item !== id);
      }
      return [...filtered, id];
    });
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      router.push("/(auth)/routine");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header with back button and progress indicator */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="#263238" />
        </TouchableOpacity>
        <ProgressBar step={6} total={7} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main query regarding skin concerns */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>What is your major skin concerns?</Text>
          <Text style={styles.subtitle}>
            We'll mostly recommend products that help you manage these major concerns
          </Text>
        </View>

        {/* Interactive grid for selecting multiple concerns */}
        <View style={styles.grid}>
          {concerns.map((item) => (
            <ConcernCard
              key={item.id}
              label={item.label}
              icon={"icon" in item ? item.icon : undefined}
              image={"image" in item ? item.image : undefined}
              isSelected={selected.includes(item.id)}
              onPress={() => toggleConcern(item.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Navigation action footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selected.length === 0 && { opacity: 0.5 }
          ]}
          onPress={handleContinue}
          disabled={selected.length === 0}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  titleSection: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: "Grotley",
    color: "#352A2A",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#667085",
    marginTop: 12,
    lineHeight: 22,
    fontWeight: "400",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginTop: 32,
    justifyContent: "space-between",
  },
  card: {
    width: (deviceWidth - 64) / 3,
    aspectRatio: 0.85,
    backgroundColor: "#F9F5FF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#611485",
    backgroundColor: "#F4EBFF",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCheckbox: {
    backgroundColor: "#611485",
    borderColor: "#611485",
  },
  cardLabel: {
    fontSize: 14,
    color: "#475467",
    fontWeight: "500",
    lineHeight: 18,
  },
  selectedCardLabel: {
    color: "#611485",
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  continueButton: {
    height: 64,
    backgroundColor: "#611485",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ConcernsScreen;
