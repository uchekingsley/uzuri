import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import React, { useRef, useState } from "react";

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
  const [currentIndex, setcurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const next = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollViewRef?.current?.scrollTo({
        x: deviceWidth * (currentIndex + 1),
        animated: true,
      });
    }
  };

  const skip = () => {
    scrollViewRef?.current?.scrollTo({
      x: deviceWidth * (onboardingData.length - 1),
      animated: true,
    });
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
        paddingTop: 38,
      }}
    >
      {/* pagination-indicator */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 34,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "Grotley",
            color: "#fff",
          }}
        >
          Uzuri
        </Text>

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

      {/* scrollview */}

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

      {/* buttons */}

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
