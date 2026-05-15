import { Dimensions, StyleSheet } from 'react-native';
import { colores } from '../../estilos_global';

const { height, width } = Dimensions.get('window');

const estilos_notificacion = StyleSheet.create({

    // --------- Estilos del mensaje (con temporizador) que sale al, por ejemplo, guardar una publicacion ---------

    container: {
        position: "absolute",
        top: height * 0.15,
        right: 0,
        backgroundColor: colores.color_5,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        zIndex: 999,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 8,
        overflow: "hidden",
    },
    contenido: {
        flexDirection: "row",
        alignItems: "center",
        padding:10,
        gap: 10,
    },
    iconoContainer: {
        borderRadius: 20,
        padding: 4,
    },
    icono: {
        width: 30,
        height: 30
    },
    texto: {
        fontSize: 16,
        fontFamily: "JetBrainsMono_700Bold",
        color: "#1a1a1a",
        textAlign: "center",
    },
    barra: {
        height: 4,
        backgroundColor: colores.color_4,
    },
});

export default estilos_notificacion;