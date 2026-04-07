import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: deviceWidth } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Get on demand skin assesment",
    image: require("@/assets/images/onboarding-1.png"),
  },
  {
    id: "2",
    title: "Buy products from top brands",
    image: require("@/assets/images/onboarding-2.png"),
  },
  {
    id: "3",
    title: "Get skin tailored suggestions",
    image: require("@/assets/images/onboarding-3.png"),
  },
];

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setcurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const next = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollViewRef?.current?.scrollTo({
        x: deviceWidth * (currentIndex + 1),
        animated: true,
      });
    } else {
      router.push("/(auth)/gender");
    }
  };

  const skip = () => {
    scrollViewRef?.current?.scrollTo({
      x: deviceWidth * (onboardingData.length - 1),
      animated: true,
    });
    // Directly skips to the next screen if already at last page
    if (currentIndex === onboardingData.length - 1) {
      router.push("/(auth)/gender");
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / deviceWidth);
    setcurrentIndex(index);
  };

  return (
    <ImageBackground
      source={onboardingData[currentIndex].image}
      resizeMode="cover"
      style={{
        flex: 1,
        paddingBottom: 88,
        paddingTop: insets.top + 10,
      }}
    >

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 34,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Image
            source={require("@/assets/images/uzuri-logo.png")}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Grotley",
              color: "#fff",
            }}
          >
            Uzuri
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                {
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#DFE1E6",
                },

                index === currentIndex && {
                  backgroundColor: "#611485",
                  width: 26,
                  borderRadius: 20,
                },
              ]}
            />
          ))}
        </View>
      </View>


      <View style={{ flex: 1, paddingBottom: 80 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate={"fast"}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          onMomentumScrollEnd={handleScroll}

        >
          {onboardingData.map((item) => (
            <View
              key={item.id}
              style={{
                width: deviceWidth,
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 46,
                  fontFamily: "Grotley",
                  color: "#fff",
                  paddingHorizontal: 34,
                }}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>


      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 34,
        }}
      >
        <Pressable onPress={skip}>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            skip
          </Text>
        </Pressable>

        <TouchableOpacity
          style={{
            width: 58,
            height: 58,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#611485",
            borderRadius: "50%",
            overflow: "hidden",
          }}
          onPress={next}
        >
          <Feather name="arrow-right-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;
