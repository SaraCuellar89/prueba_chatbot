/**
 * Barra visual de presupuesto del chatbot.
 * Muestra solo las interacciones restantes y una barra de progreso.
 */
import React from "react";
import { Text, View } from "react-native";

type ChatbotUsageBarStyles = {
  usageWrapper: object;
  usageHeader: object;
  usageTitle: object;
  usageMeta: object;
  usageBarTrack: object;
  usageBarFill: object;
};

type ChatbotUsageBarProps = {
  progress: number;
  remainingInteractions: number;
  styles: ChatbotUsageBarStyles;
};

export default function ChatbotUsageBar({
  progress,
  remainingInteractions,
  styles,
}: ChatbotUsageBarProps) {
  return (
    <View style={styles.usageWrapper}>
      <View style={styles.usageHeader}>
        <Text style={styles.usageMeta}>
          {remainingInteractions} interacciones restantes
        </Text>
      </View>

      <View style={styles.usageBarTrack}>
        <View style={[styles.usageBarFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}
