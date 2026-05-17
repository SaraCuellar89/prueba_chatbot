/**
 * Barra visual de presupuesto del chatbot.
 * Muestra solo las interacciones restantes y una barra de progreso.
 */
import React from "react";
import { Text, View } from "react-native";
import estilos_usage_bar from "../css/chatbot_usage_bar";
import Texto from "../Texto";

type ChatbotUsageBarProps = {
  progress: number;
  remainingInteractions: number;
};


export default function ChatbotUsageBar({progress, remainingInteractions}: ChatbotUsageBarProps) {

  return (
    <View style={estilos_usage_bar.usageWrapper}>
      <View style={estilos_usage_bar.usageHeader}>
        <Texto style={estilos_usage_bar.usageMeta}>
          {remainingInteractions} interacciones restantes
        </Texto>
      </View>
      <View style={estilos_usage_bar.usageBarTrack}>
        <View style={[estilos_usage_bar.usageBarFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
  
}
