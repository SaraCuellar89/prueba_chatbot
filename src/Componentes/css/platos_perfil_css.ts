import { StyleSheet } from 'react-native';

const estilos_platos_perfil = StyleSheet.create({

    // --------- Estilos de los platos que hay en el perfil del usuario ---------

    contendor_platos: {
        marginVertical: 10
    },
    texto: {
        textAlign: "center",
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 18,
        marginTop: 25,
    },
    icono_puntos: {
            width: 40,
            height: 40,
            transform: [{ rotate: '90deg' }],    
    },
    caja_publicacion: {
        alignItems: "center"
    },
    caja_opciones: {
        width: "100%",
        position: "absolute",
        top: 50,
        alignItems: "center"
    }
  
});

export default estilos_platos_perfil;