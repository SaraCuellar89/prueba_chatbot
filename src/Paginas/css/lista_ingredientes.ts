import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_lista_ingredientes = StyleSheet.create({

    // --------- Estilos de la vista de ingredientes ---------

    texto: {
        textAlign: "center",
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 18,
        paddingVertical: 20
    }

})

export default estilos_lista_ingredientes;