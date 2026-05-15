/**
 * Hoja de estilos exclusiva del chatbot principal.
 */

import { StyleSheet } from "react-native";

export const chatbotPrincipalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  robotGestureArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginBottom: 10,
  },
  usageHeader: {
    alignItems: "center",
    marginBottom: 4,
  },
  usageMeta: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6D5633",
    textAlign:"center"
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
  robot: {
    marginBottom: 2,
  },
  robotExpanded: {
    marginBottom: 0,
  },
  chatBox: {
    flex: 1,
    maxWidth: "100%",
    backgroundColor: "rgba(255,255,255,0.58)",
    borderRadius: 18,
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
  },
  chatContent: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 8,
  },
  bubble: {
    maxWidth: "88%",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFDF5",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#FFD600",
  },
  bubbleText: {
    color: "#000",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 2,
  },
  replayButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#E8DFC0",
  },
  replayButtonText: {
    color: "#3D3122",
    fontSize: 12,
    fontWeight: "700",
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#000",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 24,
    gap: 8,
    backgroundColor: "#EDE4C7",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    minHeight: 45,
    color: "#000",
    marginBottom:1
  },
  inputVoiceMode: {
    backgroundColor: "#FFF6D1",
    marginBottom:50
  },
  iconButton: {
    width: 36,
    height: 36,
    marginBottom:1
  },
  iconActive: {
    tintColor: "#B11818",
    marginBottom:50
  },
  iconDisabled: {
    opacity: 0.5,
    marginBottom:50
  },
});
