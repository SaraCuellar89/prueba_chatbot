/**
 * Hoja de estilos exclusiva del modo voz del chatbot.
 */

import { StyleSheet } from "react-native";

export const chatbotVozStyles = StyleSheet.create({
  robotGestureArea: {zz
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    paddingBottom: 8,
  },
  robotGestureAreaExpanded: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  usageWrapper: {
    width: "50%",
    maxWidth: 320,
    backgroundColor: "rgba(255,250,232,0.92)",
    borderWidth: 1,
    borderColor: "#D8C898",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 180,
    marginBottom: 10,
  },
  usageHeader: {
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  usageTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2E2418",
  },
  usageMeta: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6D5633",
  },
  usageBarTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#E8DFC0",
    marginBottom: 8,
  },
  usageBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#000000",
  },
  gestureHint: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3D3122",
    marginBottom: 6,
  },
  hiddenHint: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
  },
  
  robotExpanded: {
    marginBottom: 1,
  },
  robotVoiceMode: {
    marginTop:1,
  },
  voicePanel: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    marginTop: 100,
  },
  voiceStatus: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2C2419",
    marginTop: 60,
  },
  voiceTranscript: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.74)",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginTop: 10,
    fontSize: 22,
    lineHeight: 30,
    color: "#1E1A16",
    fontWeight: "600",
    minHeight: 120,
  },
  voiceError: {
    marginTop: 10,
    color: "#A11D1D",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
