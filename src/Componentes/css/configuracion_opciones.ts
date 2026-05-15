import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";


const estilos_configuracion_opciones = StyleSheet.create({

    // --------- Estilos de la configuracion ---------

    card:{
        backgroundColor: colores.color_2,
        padding:20,
        borderRadius:10,
        marginBottom:20,
        borderWidth:1,
        marginHorizontal:10
    },

    titulo:{
        marginBottom:5,
        textAlign: "center"
    },

    descripcion:{
        fontSize:12,
        marginBottom:10,
        textAlign: "center",
    },

    botonTema:{
        backgroundColor: colores.color_5,
        padding:6,
        borderRadius:10,
        width:60,
        alignItems:"center",
        alignSelf: "center"
    },
});

export default estilos_configuracion_opciones;