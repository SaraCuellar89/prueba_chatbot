import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

const estilos_imagen_completa = StyleSheet.create({

    // --------- Estilos para visualizar la imagen de un plato ---------

    contenedor: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', 
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagen: {
        width: '90%',
        height: '70%',
    },
    btn_cerrar: {
        position: 'absolute',
        top: 50,
        right: 20,
        borderRadius: 40,
        paddingHorizontal: 10,
        backgroundColor: "#0000009c"
    },
    x: {
        color: "white",
        fontSize: 25
    }
});

export default estilos_imagen_completa;