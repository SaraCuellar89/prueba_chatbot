import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_formu_lista_ingredientes = StyleSheet.create({

    // --------- Estilos de los cheklist de la lista de ingredientes ---------

    contenedor: {
        flexDirection: "column",
        gap: 20
    },
    caja_contenedor: {
        backgroundColor: colores.color_3,
        minHeight: height * 0.5,
        height: "auto",
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        gap: 10
    },
    caja_ingrediente: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    btn_no_check: {
        borderWidth: 1,
        height: 20,
        width: 20
    },
    btn_check: {
        borderWidth: 1,
        height: 20,
        width: 20,
        backgroundColor: colores.color_5
    },
    btn_check_icono: {
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center"
    },
    texto_check: {
        textDecorationLine: "line-through"
    },

    caja_btn_guardar: {
        width: "50%",
        alignSelf: "center"
    }

})

export default estilos_formu_lista_ingredientes;