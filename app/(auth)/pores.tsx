import ProgressBar from "@/components/ProgressBar";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: deviceWidth } = Dimensions.get("window");

const slides = [
  {
    key: "pores",
    title: "Are your facial skin pores visible at noon?",
    subtitle: "Pore visibility at noon gives us a clue of your skin type, helping us recommend best products",
    options: [
      { id: "yes", label: "Yes", icon: "thumb-up-outline" as const },
      { id: "no", label: "No", icon: "thumb-down-outline" as const },
      { id: "unsure", label: "Unsure", image: require("@/assets/images/moji.png") },
    ]
  },
  {
    key: "sensitivity",
    title: "Does your skin react easily to products?",
    subtitle: "Your skin sensitivity tells us the ideal product concentrations suitable for you",
    options: [
      { id: "yes", label: "Yes", icon: "thumb-up-outline" as const },
      { id: "no", label: "No", icon: "thumb-down-outline" as const },
    ]
  },
  {
    key: "age",
    title: "What's your age range?",
    subtitle: "Your biological age tells us what product types and formulations are most suitable for you",
    options: [
      { id: "below_18", label: "Below 18" },
      { id: "18_25", label: "18 - 25 years" },
      { id: "26_30", label: "26 - 30 years" },
      { id: "31_45", label: "31 - 45 years" },
      { id: "46_60", label: "46 - 60 years" },
      { id: "60_above", label: "60 and above" },
    ]
  }
];

const AssessmentOption = ({
  label,
  isSelected,
  onPress,
  iconName,
  imageSource,
  height = 80,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  imageSource?: ImageSourcePropType;
  height?: number;
}) => (
  <TouchableOpacity
    activeOpacity={isSelected ? 1 : 0.7}
    onPress={onPress}
    style={[
      styles.optionButton,
      { height },
      isSelected && styles.selectedOptionButton,
    ]}
  >
    <View style={styles.optionContent}>
      {imageSource ? (
        <Image source={imageSource} style={{ width: 32, height: 32 }} resizeMode="contain" />
      ) : iconName ? (
        <MaterialCommunityIcons
          name={iconName}
          size={28}
          color="#611485"
        />
      ) : null}
      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const PoresSelection = () => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelect = (slideKey: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [slideKey]: optionId }));

    // Auto-advance to the next slide or transition to the next assessment step
    setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        scrollViewRef.current?.scrollTo({ x: deviceWidth * (currentIndex + 1), animated: true });
      } else {
        router.push("/(auth)/concerns");
      }
    }, 400);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / deviceWidth);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      scrollViewRef.current?.scrollTo({ x: deviceWidth * (currentIndex - 1), animated: true });
    } else {
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Navigation header with back button and progress tracking */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: insets.top + 12,
          gap: 16,
        }}
      >
        <TouchableOpacity onPress={handleBack}>
          <Feather name="chevron-left" size={28} color="#263238" />
        </TouchableOpacity>

        {/* Dynamic progress bar reflecting the current diagnostic step */}
        <ProgressBar step={3 + currentIndex} total={7} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {slides.map((slide) => (
          <View key={slide.key} style={{ width: deviceWidth }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              {/* Main question and descriptive subtitle for context */}
              <View style={{ paddingHorizontal: 24, marginTop: 40 }}>
                <Text
                  style={{
                    fontSize: 32,
                    fontFamily: "Grotley",
                    color: "#352A2A",
                    lineHeight: 40,
                  }}
                >
                  {slide.title}
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
                  {slide.subtitle}
                </Text>
              </View>

              {/* List of selectable assessment options */}
              <View style={styles.optionsContainer}>
                {slide.options.map((option) => {
                  const isSelected = answers[slide.key] === option.id;
                  const isAgeSlide = slide.key === "age";

                  return (
                    <AssessmentOption
                      key={option.id}
                      label={option.label}
                      isSelected={isSelected}
                      onPress={() => handleSelect(slide.key, option.id)}
                      iconName={"icon" in option ? option.icon : undefined}
                      imageSource={"image" in option ? option.image : undefined}
                      height={isAgeSlide ? 64 : 80}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    paddingHorizontal: 24,
    marginTop: 48,
    gap: 16,
  },
  optionButton: {
    backgroundColor: "#F9F5FF",
    borderRadius: 100,
    justifyContent: "center",
    paddingHorizontal: 32,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOptionButton: {
    borderColor: "#611485",
    backgroundColor: "#F4EBFF",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  optionText: {
    fontSize: 20,
    color: "#352A2A",
    fontWeight: "500",
    fontFamily: "Grotley",
  },
  selectedOptionText: {
    fontWeight: "700",
    color: "#611485",
  },
});

export default PoresSelection;
