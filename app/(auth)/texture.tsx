import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressBar from "@/components/ProgressBar";

const textureRows = [
  ["Greasy", "Balanced"],
  ["Flaky", "Shiny"],
  ["Tight", "Rough"],
];

const TextureSelection = () => {
  const insets = useSafeAreaInsets();
  const [selectedTextures, setSelectedTextures] = useState<string[]>([]);

  const toggleTexture = (texture: string) => {
    if (selectedTextures.includes(texture)) {
      setSelectedTextures(selectedTextures.filter((t) => t !== texture));
    } else {
      setSelectedTextures([...selectedTextures, texture]);
    }
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

        <ProgressBar step={2} total={7} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 24, marginTop: 40 }}>
          <Text
            style={{
              fontSize: 36,
              fontFamily: "Grotley",
              color: "#352A2A",
              lineHeight: 44,
            }}
          >
            How does your skin feel at noon?
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
            The texture of your skin on a sunny day tells us your skin type
          </Text>
        </View>

        <View style={styles.grid}>
          {textureRows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.row,
                { paddingLeft: rowIndex * 30 },
              ]}
            >
              {row.map((texture) => {
                const isSelected = selectedTextures.includes(texture);
                return (
                  <Pressable
                    key={texture}
                    onPress={() => toggleTexture(texture)}
                    style={({ pressed }) => [
                      styles.pill,
                      isSelected && styles.selectedPill,
                      pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        isSelected && styles.selectedPillText,
                      ]}
                    >
                      {texture}
                    </Text>
                    {isSelected && (
                      <Feather
                        name="x"
                        size={18}
                        color="#352A2A"
                        style={{ marginLeft: 8 }}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 20 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(auth)/pores")}
          disabled={selectedTextures.length === 0}
          style={[
            styles.continueButton,
            selectedTextures.length === 0 && styles.disabledButton,
          ]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 24,
    marginTop: 40,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    width: "100%",
  },
  pill: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  selectedPill: {
    borderColor: "#611485",
    backgroundColor: "#fff",
  },
  pillText: {
    fontSize: 16,
    color: "#98A2B3", 
    fontWeight: "500",
  },
  selectedPillText: {
    color: "#352A2A", 
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#611485",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#E4E7EC",
  }
});

export default TextureSelection;
