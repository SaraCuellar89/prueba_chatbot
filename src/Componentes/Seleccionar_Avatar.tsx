/**
 * Selector modal de avatar para el flujo de registro del usuario.
 */

import React, { useState } from "react";
import { View, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import seleccionar_avatar_css from "./css/seleccionar_avatar_css";
import Texto from "./Texto";
import estilos_global from "../estilos_global";

const avatares = [
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_1.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_2.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_3.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_4.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_5.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_6.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_7.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_8.png' },
    { uri: 'https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_9.png' },
];

type Props = {
  onChange: (av: ImageSourcePropType) => void;
};

const Seleccionar_Avatar = ({ onChange }: Props) => {

    // ================= Estados y funciones seleccionar el avatar de foto de perfil =================
    const [seleccionado, setSeleccionado] = useState<number | null>(null);

    const Aceptar = () => {
        if (seleccionado === null) return;
        onChange(avatares[seleccionado]);
    }

    return(
        <View style={seleccionar_avatar_css.contenedor}>
            <View style={seleccionar_avatar_css.grid}>
                {avatares.map((avatar, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            seleccionar_avatar_css.contenedor_avatar,
                            seleccionado === index && seleccionar_avatar_css.seleccionado
                        ]}
                        onPress={() => setSeleccionado(index)}
                    >
                        <Image
                            source={avatar}
                            style={seleccionar_avatar_css.avatar}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={seleccionar_avatar_css.contenedor_boton}>
                <TouchableOpacity style={estilos_global.btn_1} onPress={Aceptar}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Seleccionar_Avatar;