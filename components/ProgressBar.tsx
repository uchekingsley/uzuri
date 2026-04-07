import React from "react";
import { View, DimensionValue, StyleSheet } from "react-native";

interface ProgressBarProps {
  step: number;
  total?: number;
}

const ProgressBar = ({ step, total = 7 }: ProgressBarProps) => {
  const width = `${(step / total) * 100}%`;
  
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: width as DimensionValue }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 6,
    backgroundColor: "#F2F4F7",
    borderRadius: 10,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#611485",
    borderRadius: 10,
  }
});

export default ProgressBar;
