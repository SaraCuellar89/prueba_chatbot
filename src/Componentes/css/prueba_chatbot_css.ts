import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_prueba_chatbot = StyleSheet.create({

    // --------- Estilos de las publicaciones ---------

    contenedor: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        gap: 10,
    },
    caja_chat: {
        flex: 1,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        gap: 10,
        overflow: "scroll",
    },
    mensaje_bot: {
        backgroundColor: "#FFE979",
        maxWidth: "70%",
        alignSelf: "flex-start",
        padding: 10,
        borderRadius: 10
    },
    mensaje_usuario: {
        backgroundColor: "white",
        maxWidth: "70%",
        alignSelf: "flex-end",
        padding: 10,
        borderRadius: 10
    },
    texto_mensaje: {
        fontSize: 12
    },

    contenedor_input: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    caja_input: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colores.color_3,
        borderRadius: 10,
        color: "black",
        borderColor: "black",
        borderWidth: 1
    },
    input: {
        flex: 1
    },
    icono_hablar: {
        width: width * 0.09,
        height: height * 0.05,
    },
    icono_enviar: {
        width: 35,
        height: 35
    },

    caja_hablar: {
        flex: 1,
        height: height * 0.05,
        overflow: "hidden",  
        alignItems: "center",
        justifyContent: "center",
    },
    animacion_hablar: { 
        width: "100%", 
        height: height * 0.12,  
        opacity: 0.5
    }


})

export default estilos_prueba_chatbot;