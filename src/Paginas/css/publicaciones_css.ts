import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_publicaciones = StyleSheet.create({

    // --------- Estilos de publicaciones ---------

    container: { 
        flex: 1, 
        backgroundColor: colores.color_2,
        padding: 20,
        gap: 20
    },
    caja_formu_comentario: {
        paddingHorizontal: 20
    },
    btn_ingredientes: {
        alignSelf: "center",
        backgroundColor: colores.color_5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4
    },

    caja_vacio: {
        alignItems: "center",
        gap: 10,
        marginVertical: 20
    },
    img_vacio: {
        width: 25,
        height: 25,
    },
    texto_vacio: {
        textAlign: "center"
    }

})

export default estilos_publicaciones;