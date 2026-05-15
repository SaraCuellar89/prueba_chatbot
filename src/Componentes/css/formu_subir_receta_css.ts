import { Dimensions, StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

export const estilos_formu_subir_receta = StyleSheet.create({

    // --------- Estilos del primer formulario para subir una publicacion (datos iniciales) ---------
    
    contenedor: {
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        padding: 20,
        gap: 25
    },
    caja_input: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    label: {
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 16
    },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderTopWidth: 1,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4,
    },
    caja_ingredientes: {
        width: "100%",
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center", 
        gap: 5,    
    },
    input_ingrediente: {
        height: 45,
        flex: 1,
        flexShrink: 1,
        minWidth: 0, 
        borderWidth: 1,
        borderTopWidth: 1,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4
    },
    icono_x: {
        width: 20,
        height: 20,
    },
    icono_mas: {
        width: 20,
        height: 20,
        margin: 5,
    },
    caja_tiempo: {
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        gap: 5,
    },
    input_tipo_tiempo: {
        borderWidth: 1,
        borderTopWidth: 1,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4,
    },
    caja_boton: {
        width: "100%",
        alignItems: "center",
        marginVertical: 20,
        gap: 20,
    },
    boton: {
        width: width * 0.5
    },
    imagePicker: {
        height: 200,
        width: '100%',
        backgroundColor: colores.color_3,
        borderRadius: 10,
        borderWidth: 1,
        borderTopWidth: 1,
        borderStyle: "solid",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    preview: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    imagePlaceholder: {
        fontSize: 15,
        color: "#9ca3af",
    },


    // --------- Estilos del segundo formulario para subir una publicacion (descripcion y pasos) ---------

    input_grande: {
        width: "100%",
        height: height * 0.5,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4
    },
    caja_editor: {
        width: "100%",
        borderRadius: 10,
    },
    editor: {
        backgroundColor: colores.color_3,
        borderRadius: 10,
    },
    estilos_rich_editor: {
        flex: 1,
        borderWidth: 1,
        borderColor: colores.color_4,
        borderRadius: 10,
        overflow: "hidden"
    }
});