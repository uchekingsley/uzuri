import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import ProgressBar from "@/components/ProgressBar";

const RoutineScreen = () => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>(["Salicylic acid", "Hyaluronic acid", "Niacinamide"]);

  const addTag = () => {
    if (text.trim() && !tags.includes(text.trim())) {
      setTags([...tags, text.trim()]);
      setText("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFinish = () => {
    router.replace("/(auth)/onboarding"); 
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="#263238" />
        </TouchableOpacity>
        <ProgressBar step={7} total={7} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>What products are you currently using?</Text>
          <Text style={styles.subtitle}>
            We'll mostly recommend products that help you manage these major concerns
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(tag)}>
                <Feather name="x" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#98A2B3"
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTag}
            returnKeyType="done"
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={handleFinish}
        >
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 120,
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
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    marginTop: 32,
    gap: 12,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE", // Soft blue highlight
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 8,
  },
  tagText: {
    fontSize: 16,
    color: "#352A2A",
    fontWeight: "500",
  },
  inputSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  input: {
    height: 64,
    backgroundColor: "#F9F5FF",
    borderRadius: 16,
    paddingHorizontal: 24,
    fontSize: 18,
    color: "#352A2A",
    borderWidth: 1,
    borderColor: "#F4EBFF",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  finishButton: {
    height: 64,
    backgroundColor: "#611485",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  finishText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default RoutineScreen;
